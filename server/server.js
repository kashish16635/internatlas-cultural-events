const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Paths
const eventsFilePath = path.join(__dirname, 'data', 'events.json');
const registrationsFilePath = path.join(__dirname, 'data', 'registrations.json');

// Helper to read events safely
const getEvents = () => {
  try {
    const raw = fs.readFileSync(eventsFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading events.json:', err);
    return [];
  }
};

// Helper to save events safely
const saveEvents = (events) => {
  fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2), 'utf-8');
};

// Helper to read registrations
const getRegistrations = () => {
  try {
    const raw = fs.readFileSync(registrationsFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading registrations.json:', err);
    return [];
  }
};

// Helper to save registrations
const saveRegistrations = (regs) => {
  fs.writeFileSync(registrationsFilePath, JSON.stringify(regs, null, 2), 'utf-8');
};

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'InternAtlas',
    module: 'Cultural Events',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 2. Platform statistics summary
app.get('/api/stats', (req, res) => {
  const events = getEvents();
  const regs = getRegistrations();
  const totalPrizePool = events.reduce((acc, curr) => acc + (curr.prizePool || 0), 0);
  const collegesSet = new Set(events.map(e => e.college));
  const citiesSet = new Set(events.map(e => e.city));

  res.json({
    totalEvents: events.length,
    totalPrizePool,
    activeColleges: collegesSet.size,
    coveredCities: citiesSet.size,
    totalRegistrations: regs.length + events.reduce((acc, e) => acc + (e.registrationsCount || 0), 0)
  });
});

// 3. Category counts
app.get('/api/categories', (req, res) => {
  const events = getEvents();
  const categories = [
    { id: 'all', label: 'All Events', icon: '✨' },
    { id: 'dance', label: 'Dance & Choreo', icon: '💃' },
    { id: 'music', label: 'Music & Bands', icon: '🎸' },
    { id: 'drama', label: 'Drama & Theatre', icon: '🎭' },
    { id: 'fashion', label: 'Fashion & Glam', icon: '👗' },
    { id: 'arts', label: 'Fine Arts & Design', icon: '🎨' },
    { id: 'literary', label: 'Literary & Stand-Up', icon: '🎤' }
  ];

  const counts = categories.map(cat => {
    const count = cat.id === 'all' 
      ? events.length 
      : events.filter(e => e.category === cat.id).length;
    return { ...cat, count };
  });

  res.json(counts);
});

// 4. Get events with query filters
app.get('/api/events', (req, res) => {
  let events = getEvents();
  const { category, city, mode, fee, teamType, search, sortBy } = req.query;

  // Filter by category
  if (category && category !== 'all') {
    events = events.filter(e => e.category.toLowerCase() === category.toLowerCase());
  }

  // Filter by city
  if (city && city !== 'all') {
    events = events.filter(e => e.city.toLowerCase() === city.toLowerCase());
  }

  // Filter by mode (offline, online, hybrid)
  if (mode && mode !== 'all') {
    events = events.filter(e => e.mode.toLowerCase() === mode.toLowerCase());
  }

  // Filter by entry fee (free, paid)
  if (fee && fee !== 'all') {
    events = events.filter(e => e.feeType.toLowerCase() === fee.toLowerCase());
  }

  // Filter by team type (solo, team)
  if (teamType && teamType !== 'all') {
    events = events.filter(e => e.teamType.toLowerCase() === teamType.toLowerCase());
  }

  // Search filter (title, college, festName, city, description)
  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    events = events.filter(e => 
      e.title.toLowerCase().includes(q) ||
      e.college.toLowerCase().includes(q) ||
      e.festName.toLowerCase().includes(q) ||
      e.city.toLowerCase().includes(q) ||
      e.categoryLabel.toLowerCase().includes(q) ||
      (e.description && e.description.toLowerCase().includes(q))
    );
  }

  // Sorting
  if (sortBy === 'prize-high') {
    events.sort((a, b) => (b.prizePool || 0) - (a.prizePool || 0));
  } else if (sortBy === 'deadline-soon') {
    events.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  } else if (sortBy === 'popularity') {
    events.sort((a, b) => (b.registrationsCount || 0) - (a.registrationsCount || 0));
  } else {
    // Default: Featured first, then closest deadline
    events.sort((a, b) => {
      if (a.featured === b.featured) {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      return a.featured ? -1 : 1;
    });
  }

  res.json({
    count: events.length,
    events
  });
});

// 5. Get single event details
app.get('/api/events/:id', (req, res) => {
  const events = getEvents();
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: 'Cultural event not found' });
  }
  res.json(event);
});

// 6. Register for an event (Solo or Team)
app.post('/api/events/:id/register', (req, res) => {
  const { id } = req.params;
  const events = getEvents();
  const eventIndex = events.findIndex(e => e.id === id);

  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Cultural event not found' });
  }

  const {
    participantType, // 'solo' or 'team'
    fullName,
    email,
    phone,
    collegeName,
    yearOfStudy,
    teamName,
    members,
    agreeTerms
  } = req.body;

  if (!fullName || !email || !phone || !collegeName) {
    return res.status(400).json({ error: 'Please provide all mandatory participant fields (Name, Email, Phone, College).' });
  }

  // Generate unique registration ID and token
  const timestamp = Date.now().toString().slice(-5);
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const registrationId = `REG-IA-${timestamp}-${randomSuffix}`;
  const qrCodeToken = `IA-PASS-${id.toUpperCase()}-${randomSuffix}`;

  const newRegistration = {
    registrationId,
    eventId: id,
    eventTitle: events[eventIndex].title,
    festName: events[eventIndex].festName,
    college: events[eventIndex].college,
    venue: events[eventIndex].venue,
    dates: events[eventIndex].dates,
    participantType: participantType || events[eventIndex].teamType,
    fullName,
    email,
    phone,
    collegeName,
    yearOfStudy: yearOfStudy || 'Pre-final Year',
    teamName: teamName || (participantType === 'team' ? `${fullName}'s Crew` : null),
    members: Array.isArray(members) ? members : [],
    entryFee: events[eventIndex].entryFee,
    feeStatus: events[eventIndex].entryFee > 0 ? 'Paid' : 'Free Pass',
    registeredAt: new Date().toISOString(),
    status: 'Confirmed',
    qrCodeToken
  };

  // Save registration
  const regs = getRegistrations();
  regs.unshift(newRegistration);
  saveRegistrations(regs);

  // Increment event registrationsCount
  events[eventIndex].registrationsCount = (events[eventIndex].registrationsCount || 0) + 1;
  saveEvents(events);

  res.status(201).json({
    message: 'Registration successful! Your Cultural Fest Pass is ready.',
    registration: newRegistration
  });
});

// 7. Host / Post a new Cultural Event (for college societies)
app.post('/api/events', (req, res) => {
  const {
    title,
    category,
    festName,
    college,
    city,
    state,
    mode,
    venue,
    dates,
    deadline,
    prizePool,
    prizeDescription,
    entryFee,
    teamType,
    teamSize,
    eligibility,
    description,
    rules,
    image,
    coordinatorName,
    coordinatorPhone,
    coordinatorEmail
  } = req.body;

  if (!title || !festName || !college || !category || !deadline) {
    return res.status(400).json({ error: 'Title, Fest Name, College, Category, and Deadline are required.' });
  }

  const events = getEvents();
  const newId = `cult-${String(events.length + 1).padStart(3, '0')}`;

  const categoryLabels = {
    dance: 'Dance & Choreo',
    music: 'Music & Bands',
    drama: 'Drama & Theatre',
    fashion: 'Fashion & Glam',
    arts: 'Fine Arts & Design',
    literary: 'Literary & Stand-Up'
  };

  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = Math.max(0, deadlineDate - today);
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const newEvent = {
    id: newId,
    title,
    category,
    categoryLabel: categoryLabels[category] || 'Cultural Arts',
    festName,
    college,
    city: city || 'New Delhi',
    state: state || 'Delhi NCR',
    mode: mode || 'offline',
    venue: venue || `${college} Main Campus`,
    dates: dates || 'Upcoming November 2026',
    deadline,
    daysLeft,
    prizePool: Number(prizePool) || 25000,
    prizeDescription: prizeDescription || `₹${Number(prizePool || 25000).toLocaleString('en-IN')} Cash + Certificates`,
    entryFee: Number(entryFee) || 0,
    feeType: Number(entryFee) > 0 ? 'paid' : 'free',
    teamType: teamType || 'team',
    teamSize: teamSize || (teamType === 'solo' ? 'Solo (1 person)' : '2 - 6 members'),
    eligibility: eligibility || 'Open to all verified college & university students',
    featured: false,
    image: image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    description: description || 'Participate in one of the most exciting college cultural competitions of the year!',
    rules: Array.isArray(rules) && rules.length > 0 ? rules : [
      'Participants must produce valid college ID cards on the day of the event.',
      'Decisions of the jury panel are final and binding.',
      'Plagiarism or misconduct will result in immediate disqualification.'
    ],
    rounds: [
      {
        roundNumber: 1,
        title: 'Prelims Showcase',
        description: 'Initial performance / screening round.',
        date: dates ? dates.split('-')[0].trim() : 'Event Day 1',
        mode: mode === 'online' ? 'Online' : 'On-Campus'
      },
      {
        roundNumber: 2,
        title: 'Grand Finale',
        description: 'Shortlisted finalists battle for top spots.',
        date: dates ? dates.split('-')[1]?.trim() || dates : 'Event Day 2',
        mode: mode === 'online' ? 'Online' : 'On-Campus'
      }
    ],
    coordinators: [
      {
        name: coordinatorName || 'Event Secretary',
        phone: coordinatorPhone || '+91 99999 88888',
        email: coordinatorEmail || `cultural@${festName.toLowerCase().replace(/[^a-z0-9]/g, '')}.org`
      }
    ],
    registrationsCount: 1
  };

  events.unshift(newEvent);
  saveEvents(events);

  res.status(201).json({
    message: 'Event hosted successfully on InternAtlas!',
    event: newEvent
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 InternAtlas Cultural Events API Server`);
  console.log(`📡 Running on: http://localhost:${PORT}`);
  console.log(`✨ Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📋 Events Endpoint: http://localhost:${PORT}/api/events`);
  console.log(`====================================================`);
});
