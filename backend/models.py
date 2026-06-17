from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), default='client')  # 'client' | 'admin'
    avatar = db.Column(db.String(500))
    bio = db.Column(db.Text)
    communication_preference = db.Column(db.String(50), default='Email & SMS')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'role': self.role,
            'avatar': self.avatar,
            'bio': self.bio,
            'communicationPreference': self.communication_preference
        }

class Service(db.Model):
    __tablename__ = 'services'
    id = db.Column(db.String(50), primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    duration = db.Column(db.String(50))
    price = db.Column(db.Integer)  # Price raw integer in INR

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'duration': self.duration,
            'price': f"₹{self.price}",
            'priceRaw': self.price
        }

class TimeSlot(db.Model):
    __tablename__ = 'time_slots'
    id = db.Column(db.String(50), primary_key=True)
    date = db.Column(db.String(20), nullable=False)  # YYYY-MM-DD
    time = db.Column(db.String(20), nullable=False)  # e.g., '10:00 AM'
    status = db.Column(db.String(20), default='available')  # 'available' | 'blocked'

    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date,
            'time': self.time,
            'status': self.status
        }

class Appointment(db.Model):
    __tablename__ = 'appointments'
    id = db.Column(db.String(50), primary_key=True)  # APT-XXXX
    client_name = db.Column(db.String(100), nullable=False)
    client_email = db.Column(db.String(120), nullable=False)
    service = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    time = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), default='Pending')  # 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
    price = db.Column(db.Integer)
    notes = db.Column(db.Text, default='')
    meet_link = db.Column(db.String(200), default='')

    def to_dict(self):
        return {
            'id': self.id,
            'clientName': self.client_name,
            'clientEmail': self.client_email,
            'service': self.service,
            'date': self.date,
            'time': self.time,
            'status': self.status,
            'price': self.price,
            'notes': self.notes,
            'meetLink': self.meet_link or ''
        }
