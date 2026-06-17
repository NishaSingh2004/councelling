import datetime
import functools
import random
import jwt
import os
from flask import Flask, request, jsonify, g
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Service, TimeSlot, Appointment

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'avatars')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Configuration
app.config['SECRET_KEY'] = 'counselling_studio_super_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+pg8000://postgres:counselling_password@localhost:5433/counselling'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Authentication Decorators
def token_required(f):
    @functools.wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({'message': 'Authorization token is missing!'}), 401
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.filter_by(id=data['user_id']).first()
            if not current_user:
                return jsonify({'message': 'User session is invalid!'}), 401
            g.current_user = current_user
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token is invalid!'}), 401
            
        return f(*args, **kwargs)
    return decorated

def admin_required(f):
    @functools.wraps(f)
    def decorated(*args, **kwargs):
        if not hasattr(g, 'current_user') or g.current_user.role != 'admin':
            return jsonify({'message': 'Admin privileges required!'}), 403
        return f(*args, **kwargs)
    return token_required(decorated)

# Database Seeding Utility
# Database Seeding Utility
def seed_data():
    # 1. Seed Admin User
    admin = User.query.filter_by(email='vanshika@vanshikacounselling.com').first()
    if not admin:
        admin = User(
            name='Vanshika Singh',
            email='vanshika@vanshikacounselling.com',
            phone='+91 98765 43210',
            password_hash=generate_password_hash('adminpass'),
            role='admin',
            avatar='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
            bio='Lead Clinical Psychologist & Founder',
            communication_preference='Email & SMS'
        )
        db.session.add(admin)
        db.session.commit()

    # All demo data generation has been removed for production use.

# API Endpoints
# 1. Auth Routing
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({'message': 'Missing registration details!'}), 400
    
    email = data.get('email').strip().lower()
    exists = User.query.filter_by(email=email).first()
    if exists:
        return jsonify({'message': 'Email address already registered!'}), 400
        
    password_hash = generate_password_hash(data.get('password'))
    new_user = User(
        name=data.get('name'),
        email=email,
        phone=data.get('phone', ''),
        password_hash=password_hash,
        role='client',
        avatar='https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
        bio='',
        communication_preference='Email & SMS'
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    token = jwt.encode({
        'user_id': new_user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, app.config['SECRET_KEY'], algorithm='HS256')
    
    return jsonify({
        'token': token,
        'user': new_user.to_dict()
    }), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Missing email or password!'}), 400
        
    email = data.get('email').strip().lower()
    user = User.query.filter_by(email=email).first()
    
    if not user or not check_password_hash(user.password_hash, data.get('password')):
        return jsonify({'message': 'Invalid login credentials!'}), 401
        
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, app.config['SECRET_KEY'], algorithm='HS256')
    
    return jsonify({
        'token': token,
        'user': user.to_dict()
    }), 200

@app.route('/api/auth/me', methods=['GET'])
@token_required
def get_me():
    return jsonify({'user': g.current_user.to_dict()}), 200

@app.route('/api/profile', methods=['PUT'])
@token_required
def update_profile():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No profile data received!'}), 400
        
    user = g.current_user
    user.name = data.get('name', user.name)
    user.phone = data.get('phone', user.phone)
    user.bio = data.get('bio', user.bio)
    user.communication_preference = data.get('communicationPreference', user.communication_preference)
    
    db.session.commit()
    return jsonify({'user': user.to_dict(), 'message': 'Profile settings updated successfully.'}), 200

@app.route('/api/profile/avatar', methods=['POST'])
@token_required
def upload_avatar():
    if 'avatar' not in request.files:
        return jsonify({'message': 'No file part!'}), 400
    file = request.files['avatar']
    if file.filename == '':
        return jsonify({'message': 'No selected file!'}), 400
    
    if file:
        user = g.current_user
        ext = os.path.splitext(file.filename)[1]
        if not ext:
            ext = '.png'
        filename = f"avatar_user_{user.id}{ext}"
        
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        
        avatar_url = f"{request.host_url.rstrip('/')}/static/avatars/{filename}?t={int(datetime.datetime.utcnow().timestamp())}"
        user.avatar = avatar_url
        db.session.commit()
        
        return jsonify({
            'user': user.to_dict(),
            'avatar': avatar_url,
            'message': 'Profile picture uploaded successfully.'
        }), 200

@app.route('/api/services', methods=['GET'])
def get_services():
    services = Service.query.all()
    return jsonify([s.to_dict() for s in services]), 200

@app.route('/api/services', methods=['POST'])
@admin_required
def create_service():
    data = request.get_json()
    if not data or not data.get('title') or not data.get('price'):
        return jsonify({'message': 'Missing service title or price!'}), 400
        
    title = data.get('title')
    description = data.get('description', '')
    duration = data.get('duration', '50 Mins')
    price = int(data.get('price'))
    
    service_id = title.lower().replace(' ', '_')
    exists = Service.query.filter_by(id=service_id).first()
    if exists:
        service_id = f"{service_id}_{random.randint(10, 99)}"
        
    service = Service(
        id=service_id,
        title=title,
        description=description,
        duration=duration,
        price=price
    )
    
    db.session.add(service)
    db.session.commit()
    return jsonify(service.to_dict()), 201

@app.route('/api/services/<service_id>', methods=['PUT'])
@admin_required
def update_service(service_id):
    service = Service.query.filter_by(id=service_id).first()
    if not service:
        return jsonify({'message': 'Service not found!'}), 404
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No data provided!'}), 400
    service.title = data.get('title', service.title)
    service.description = data.get('description', service.description)
    service.duration = data.get('duration', service.duration)
    if data.get('price'):
        service.price = int(data.get('price'))
    db.session.commit()
    return jsonify(service.to_dict()), 200

@app.route('/api/services/<service_id>', methods=['DELETE'])
@admin_required
def delete_service(service_id):
    service = Service.query.filter_by(id=service_id).first()
    if not service:
        return jsonify({'message': 'Service not found!'}), 404
    db.session.delete(service)
    db.session.commit()
    return jsonify({'message': 'Category deleted successfully.', 'id': service_id}), 200

# 3. Slots Endpoints (Public list / Protected Management)
@app.route('/api/slots', methods=['GET'])
def get_slots():
    slots = TimeSlot.query.all()
    return jsonify([s.to_dict() for s in slots]), 200

@app.route('/api/slots', methods=['POST'])
@admin_required
def create_slot():
    data = request.get_json()
    if not data or not data.get('date') or not data.get('time'):
        return jsonify({'message': 'Missing date or time values!'}), 400
        
    date = data.get('date')
    time = data.get('time')
    slot_id = f"slot-{date}-{random.randint(1000, 9999)}"
    
    # Check if duplicate exists
    exists = TimeSlot.query.filter_by(date=date, time=time).first()
    if exists:
        return jsonify({'message': 'This slot is already configured!'}), 400
        
    slot = TimeSlot(id=slot_id, date=date, time=time, status='available')
    db.session.add(slot)
    db.session.commit()
    return jsonify(slot.to_dict()), 201

@app.route('/api/slots/<slot_id>', methods=['DELETE'])
@admin_required
def delete_slot(slot_id):
    slot = TimeSlot.query.filter_by(id=slot_id).first()
    if not slot:
        return jsonify({'message': 'Time slot not found!'}), 404
        
    db.session.delete(slot)
    db.session.commit()
    return jsonify({'message': 'Time slot removed successfully.', 'id': slot_id}), 200

@app.route('/api/slots/<slot_id>/toggle-block', methods=['PUT'])
@admin_required
def toggle_slot_block(slot_id):
    slot = TimeSlot.query.filter_by(id=slot_id).first()
    if not slot:
        return jsonify({'message': 'Time slot not found!'}), 404
        
    slot.status = 'available' if slot.status == 'blocked' else 'blocked'
    db.session.commit()
    return jsonify(slot.to_dict()), 200

@app.route('/api/slots/block-date', methods=['POST'])
@admin_required
def block_date():
    data = request.get_json()
    if not data or not data.get('date'):
        return jsonify({'message': 'Missing date to block!'}), 400
        
    date = data.get('date')
    slots = TimeSlot.query.filter_by(date=date).all()
    for slot in slots:
        slot.status = 'blocked'
    db.session.commit()
    return jsonify({'message': f"Blocked all availability slots on date: {date}"}), 200

# 4. Appointments Endpoints (Patient/Admin Routing)
@app.route('/api/appointments', methods=['GET'])
@token_required
def get_appointments():
    # If admin, fetch all appointments. If client, filter by clientEmail.
    if g.current_user.role == 'admin':
        apts = Appointment.query.order_by(Appointment.date.desc(), Appointment.time.desc()).all()
    else:
        apts = Appointment.query.filter_by(client_email=g.current_user.email).order_by(Appointment.date.desc(), Appointment.time.desc()).all()
    return jsonify([a.to_dict() for a in apts]), 200

@app.route('/api/appointments', methods=['POST'])
@token_required
def create_appointment():
    data = request.get_json()
    if not data or not data.get('service') or not data.get('date') or not data.get('time'):
        return jsonify({'message': 'Missing service, date, or time details!'}), 400
        
    date = data.get('date')
    time = data.get('time')
    service_title = data.get('service')
    price = data.get('price', 1500)
    
    # Verify slot is available
    slot = TimeSlot.query.filter_by(date=date, time=time, status='available').first()
    if not slot:
        return jsonify({'message': 'This time slot is no longer available!'}), 400
        
    apt_id = f"APT-{random.randint(1000, 9999)}"
    appointment = Appointment(
        id=apt_id,
        client_name=g.current_user.name,
        client_email=g.current_user.email,
        service=service_title,
        date=date,
        time=time,
        status='Confirmed',  # Autoconfirm bookings
        price=price,
        notes=data.get('notes', '')
    )
    
    # Block slot
    slot.status = 'blocked'
    
    db.session.add(appointment)
    db.session.commit()
    return jsonify(appointment.to_dict()), 201

@app.route('/api/appointments/<apt_id>/cancel', methods=['POST'])
@token_required
def cancel_appointment(apt_id):
    apt = Appointment.query.filter_by(id=apt_id).first()
    if not apt:
        return jsonify({'message': 'Appointment record not found!'}), 404
        
    # Safeguard: ensure client only cancels their own booking
    if g.current_user.role != 'admin' and apt.client_email != g.current_user.email:
        return jsonify({'message': 'Unauthorized to cancel this appointment!'}), 403
        
    apt.status = 'Cancelled'
    
    # Re-expose slot
    slot = TimeSlot.query.filter_by(date=apt.date, time=apt.time).first()
    if slot:
        slot.status = 'available'
        
    db.session.commit()
    return jsonify(apt.to_dict()), 200

@app.route('/api/appointments/<apt_id>/approve', methods=['POST'])
@admin_required
def approve_appointment(apt_id):
    apt = Appointment.query.filter_by(id=apt_id).first()
    if not apt:
        return jsonify({'message': 'Appointment record not found!'}), 404
        
    apt.status = 'Confirmed'
    db.session.commit()
    return jsonify(apt.to_dict()), 200

@app.route('/api/appointments/<apt_id>/reject', methods=['POST'])
@admin_required
def reject_appointment(apt_id):
    apt = Appointment.query.filter_by(id=apt_id).first()
    if not apt:
        return jsonify({'message': 'Appointment record not found!'}), 404
        
    apt.status = 'Cancelled'
    slot = TimeSlot.query.filter_by(date=apt.date, time=apt.time).first()
    if slot:
        slot.status = 'available'
        
    db.session.commit()
    return jsonify(apt.to_dict()), 200

@app.route('/api/appointments/<apt_id>/complete', methods=['POST'])
@admin_required
def complete_appointment(apt_id):
    apt = Appointment.query.filter_by(id=apt_id).first()
    if not apt:
        return jsonify({'message': 'Appointment record not found!'}), 404
        
    apt.status = 'Completed'
    db.session.commit()
    return jsonify(apt.to_dict()), 200

@app.route('/api/appointments/<apt_id>/notes', methods=['POST'])
@admin_required
def update_notes(apt_id):
    data = request.get_json()
    if not data or 'notes' not in data:
        return jsonify({'message': 'Missing notes text!'}), 400
        
    apt = Appointment.query.filter_by(id=apt_id).first()
    if not apt:
        return jsonify({'message': 'Appointment record not found!'}), 404
        
    apt.notes = data.get('notes')
    db.session.commit()
    return jsonify(apt.to_dict()), 200

@app.route('/api/appointments/<apt_id>/meet', methods=['POST'])
@admin_required
def generate_meet_link(apt_id):
    """Generate a working Jitsi Meet link for the session and save it to the appointment."""
    import string
    apt = Appointment.query.filter_by(id=apt_id).first()
    if not apt:
        return jsonify({'message': 'Appointment not found!'}), 404

    # Generate a unique, working Jitsi Meet room link
    # Using the appointment ID and a random string to ensure uniqueness
    chars = string.ascii_lowercase + string.digits
    unique_suffix = ''.join(random.choices(chars, k=6))
    room_name = f'VanshikaCounselling-{apt.id}-{unique_suffix}'
    meet_link = f'https://meet.jit.si/{room_name}'

    apt.meet_link = meet_link
    db.session.commit()
    return jsonify({'meetLink': meet_link, 'appointment': apt.to_dict()}), 200

# 5. Admin Directory Endpoints
@app.route('/api/admin/clients', methods=['GET'])
@admin_required
def get_clients_directory():
    # Retrieve all client users
    clients = User.query.filter_by(role='client').all()
    res = []
    for c in clients:
        sessions_count = Appointment.query.filter_by(client_email=c.email, status='Completed').count()
        res.append({
            'id': f"C-0{c.id}",
            'name': c.name,
            'email': c.email,
            'phone': c.phone or 'Not provided',
            'sessions': sessions_count,
            'status': 'Active'
        })
    return jsonify(res), 200

@app.route('/api/admin/reports', methods=['GET'])
@admin_required
def get_reports_summary():
    # Calculate revenue statistics
    appointments = Appointment.query.filter(Appointment.status != 'Cancelled').all()
    total_revenue = sum(a.price for a in appointments)
    completed_sessions = Appointment.query.filter_by(status='Completed').count()
    
    # Calculate category demands
    categories = db.session.query(
        Appointment.service, db.func.count(Appointment.id)
    ).filter(Appointment.status != 'Cancelled').group_by(Appointment.service).all()
    
    demands = [{'service': cat[0], 'count': cat[1]} for cat in categories]
    
    # Simulated monthly revenue increments for the area chart
    revenue_overview = [
        {'month': 'Jan', 'amount': int(total_revenue * 0.15)},
        {'month': 'Feb', 'amount': int(total_revenue * 0.20)},
        {'month': 'Mar', 'amount': int(total_revenue * 0.35)},
        {'month': 'Apr', 'amount': int(total_revenue * 0.55)},
        {'month': 'May', 'amount': int(total_revenue * 0.80)},
        {'month': 'Jun', 'amount': total_revenue}
    ]
    
    return jsonify({
        'grossRevenue': total_revenue,
        'sessionsCount': completed_sessions,
        'demands': demands,
        'revenueOverview': revenue_overview
    }), 200

if __name__ == '__main__':
    # Initial DB setup
    with app.app_context():
        db.create_all()
        seed_data()
    app.run(debug=True, port=5000)
