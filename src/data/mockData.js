export const services = [
  {
    id: 'anxiety',
    title: 'Anxiety Counselling',
    icon: 'Brain',
    description: 'Manage panic, conquer persistent worries, and restore emotional stability using evidence-based cognitive therapy strategies.',
    duration: '50 Mins',
    price: '₹1500',
    priceRaw: 1500
  },
  {
    id: 'depression',
    title: 'Depression Therapy',
    icon: 'Heart',
    description: 'Process low energy and persistent sadness in a compassionate space to rebuild positive life engagement.',
    duration: '50 Mins',
    price: '₹1800',
    priceRaw: 1800
  },
  {
    id: 'relationship',
    title: 'Relationship Therapy',
    icon: 'Users',
    description: 'Resolve communication gaps, rebuild shared emotional trust, and align partnership values with couples therapist counsel.',
    duration: '60 Mins',
    price: '₹2200',
    priceRaw: 2200
  },
  {
    id: 'family',
    title: 'Family Counselling',
    icon: 'ShieldCheck',
    description: 'De-escalate domestic conflicts, restore healthy family boundaries, and strengthen parent-child connections.',
    duration: '60 Mins',
    price: '₹2500',
    priceRaw: 2500
  },
  {
    id: 'career',
    title: 'Career Guidance',
    icon: 'Briefcase',
    description: 'Navigate professional adjustments, resolve burnout, and plan career milestones aligned with your goals.',
    duration: '50 Mins',
    price: '₹1200',
    priceRaw: 1200
  },
  {
    id: 'stress',
    title: 'Stress Management',
    icon: 'Activity',
    description: 'Develop immediate resilience strategies to handle work overload and maintain daily stress balance.',
    duration: '50 Mins',
    price: '₹1000',
    priceRaw: 1000
  }
];

export const therapists = [
  {
    id: 'th-evelyn',
    name: 'Vanshika Singh',
    title: 'Lead Clinical Psychologist',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    experience: '12 Years',
    specialization: 'Anxiety & Depression Therapy',
    rating: 4.9,
    bio: 'Vanshika Singh has spent over a decade helping individuals overcome severe panic, generalized anxiety, and depression using mindfulness-integrated CBT.'
  },
  {
    id: 'th-marcus',
    name: 'Dr. Marcus Vance',
    title: 'Senior Couples Counselor',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop',
    experience: '10 Years',
    specialization: 'Relationship & Marriage Therapy',
    rating: 4.8,
    bio: 'Dr. Vance specializes in evidence-based couples counselling and family mediation, utilizing the Gottman Method to restore healthy communication.'
  },
  {
    id: 'th-sarah',
    name: 'Sarah Sterling, LCSW',
    title: 'Family Therapist Specialist',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?q=80&w=300&auto=format&fit=crop',
    experience: '8 Years',
    specialization: 'Family & Adolescent Counselling',
    rating: 4.9,
    bio: 'Sarah is a licensed clinical social worker with a focus on resolving family conflict, teen adjustment challenges, and systemic relationship blocks.'
  },
  {
    id: 'th-alex',
    name: 'Alex Mercer, MS',
    title: 'Career Coach & Counselor',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop',
    experience: '7 Years',
    specialization: 'Career Transition & Burnout',
    rating: 4.7,
    bio: 'Alex supports individuals in mapping career transitions, restoring work-life boundaries, and overcoming professional burnout.'
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Marketing Executive',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    text: 'Working with Vanshika has completely transformed my relationship with anxiety. The tools she gave me for mindfulness and cognitive reframing are things I use every single day.',
    service: 'Anxiety Counselling'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Software Architect',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    text: 'The remote platform is so accessible and professional. Vanshika helped me navigate severe corporate burnout and re-establish boundaries between work and wellness.',
    service: 'Stress Management'
  },
  {
    id: 3,
    name: 'Elena & David',
    role: 'Co-founders & Partners',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    text: 'Couples sessions with Dr. Vance saved our relationship. We learned to step back from arguments, communicate openly, and rebuild emotional alignment.',
    service: 'Relationship Therapy'
  }
];

export const faqs = [
  {
    question: 'How do secure remote sessions work?',
    answer: 'Our sessions are conducted directly inside your client dashboard browser window. Simply navigate to the "My Sessions" tab and click "Join Session" to enter Vanshika\'s secure HIPAA-compliant video room. No downloads or additional software packages are needed.'
  },
  {
    question: 'What is the therapist credentials audit process?',
    answer: 'Every practitioner listed on Vanshika Counselling Studio undergoes a rigorous primary source verification process of their Ph.D./Psy.D. credentials, state board licenses, malpractice insurance logs, and clinical history audits.'
  },
  {
    question: 'What is the session cancellation policy?',
    answer: 'We operate under a standard 24-hour cancellation rule. If you request a rescheduling or cancellation at least 24 hours in advance, your payment is refunded. Within the 24-hour window, the full session fee is retained.'
  },
  {
    question: 'Do you accept health insurance packages?',
    answer: 'We operate on a direct self-pay model to protect patient privacy records. However, we generate formal invoices with clinical insurance diagnosis codes (DSM-5 super-bills) that you can easily download and submit for out-of-network reimbursement.'
  }
];

export const initialTimeSlots = [
  { id: 'slot-1', date: '2026-06-15', time: '09:00 AM', status: 'available' },
  { id: 'slot-2', date: '2026-06-15', time: '11:00 AM', status: 'available' },
  { id: 'slot-3', date: '2026-06-15', time: '02:00 PM', status: 'available' },
  { id: 'slot-4', date: '2026-06-15', time: '04:00 PM', status: 'blocked' },
  
  { id: 'slot-5', date: '2026-06-16', time: '10:00 AM', status: 'available' },
  { id: 'slot-6', date: '2026-06-16', time: '01:00 PM', status: 'available' },
  { id: 'slot-7', date: '2026-06-16', time: '03:00 PM', status: 'available' },
  { id: 'slot-8', date: '2026-06-16', time: '05:00 PM', status: 'available' }
];

export const initialAppointments = [];

export const initialClients = [];

export const reportsData = {
  summary: {
    totalClients: 0,
    totalSessions: 0,
    revenue: 0,
    upcoming: 0
  },
  revenueOverview: [
    { month: 'Jan', amount: 0 },
    { month: 'Feb', amount: 0 },
    { month: 'Mar', amount: 0 },
    { month: 'Apr', amount: 0 },
    { month: 'May', amount: 0 },
    { month: 'Jun', amount: 0 }
  ],
  appointmentsOverview: [],
  clientGrowth: []
};

export const initialNotifications = [];

export const counsellorProfile = {
  name: 'Vanshika Singh',
  title: 'Lead Clinical Psychologist',
  credentials: 'Ph.D., Psy.D.',
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
  bio: 'Vanshika Singh holds a Ph.D. in Clinical Psychology from Stanford and has spent over a decade helping individuals overcome severe panic, generalized anxiety, and depression using mindfulness-integrated CBT.',
  philosophy: 'I believe that therapy is a collaborative journey where we cultivate awareness and build practical, evidence-based tools to navigate life\'s challenges, ultimately nurturing self-compassion and mental resilience.',
  specializations: [
    'Anxiety Disorders',
    'Depression Support',
    'Trauma Recovery',
    'Cognitive Behavioral Therapy (CBT)',
    'Mindfulness-Based Stress Reduction (MBSR)'
  ],
  certifications: [
    'Licensed Clinical Psychologist (LCP) - State Board',
    'Certified Cognitive Behavioral Therapist (ACT)',
    'Board Certified Telebehavioral Provider (BC-TM)',
    'Member of American Psychological Association (APA)'
  ],
  qualifications: [
    { year: '2010 - 2014', degree: 'Ph.D. in Clinical Psychology', institution: 'Stanford University' },
    { year: '2008 - 2010', degree: 'M.S. in Counseling Psychology', institution: 'Northwestern University' },
    { year: '2004 - 2008', degree: 'B.A. in Psychology (Magna Cum Laude)', institution: 'Boston University' }
  ],
  timeline: [
    { year: '2020 - Present', role: 'Founder & Lead Therapist', company: 'Vanshika Counselling Studio', description: 'Pioneered integrated online cognitive therapy pathways and digital mental wellness programs.' },
    { year: '2016 - 2020', role: 'Senior Clinical Psychologist', company: 'Metro Mental Health Associates', description: 'Specialized in CBT programs for adult panic disorders and led clinical peer review teams.' },
    { year: '2014 - 2016', role: 'Postdoctoral Clinical Fellow', company: 'Stanford Medical Center', description: 'Conducted clinical trials on digital mindfulness interventions for anxiety and depression.' }
  ]
};
