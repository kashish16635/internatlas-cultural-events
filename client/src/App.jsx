import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Search,
  Calendar,
  MapPin,
  Trophy,
  Users,
  Flame,
  Bookmark,
  CheckCircle2,
  Share2,
  X,
  ChevronRight,
  Plus,
  Ticket,
  ArrowRight,
  Clock,
  Building2,
  Download,
  Filter,
  Layers,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { initialEvents, initialCategories, initialStats } from './data/initialEvents';

export default function App() {
  // Data states
  const [events, setEvents] = useState(initialEvents);
  const [stats, setStats] = useState(initialStats);
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedMode, setSelectedMode] = useState('all');
  const [selectedFee, setSelectedFee] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Bookmarks in localStorage
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('internatlas_cult_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal States
  const [detailEvent, setDetailEvent] = useState(null);
  const [detailTab, setDetailTab] = useState('overview'); // 'overview', 'rules', 'rounds', 'contact'
  
  const [registerEvent, setRegisterEvent] = useState(null);
  const [regForm, setRegForm] = useState({
    participantType: 'solo',
    fullName: '',
    email: '',
    phone: '',
    collegeName: '',
    yearOfStudy: '3rd Year (Pre-Final)',
    teamName: '',
    members: [{ name: '', role: '' }]
  });
  const [regSubmitting, setRegSubmitting] = useState(false);
  const [regSuccess, setRegSuccess] = useState(null);

  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [hostSubmitting, setHostSubmitting] = useState(false);
  const [hostForm, setHostForm] = useState({
    title: '',
    category: 'dance',
    festName: '',
    college: '',
    city: 'Delhi NCR',
    state: 'Delhi NCR',
    mode: 'offline',
    venue: '',
    dates: '',
    deadline: '',
    prizePool: '50000',
    prizeDescription: '',
    entryFee: '0',
    teamType: 'team',
    teamSize: '4 - 10 members',
    eligibility: 'All college students across India with valid college ID',
    description: '',
    coordinatorName: '',
    coordinatorPhone: '',
    coordinatorEmail: ''
  });

  // Toast notification
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Toggle bookmark
  const toggleBookmark = (id, e) => {
    e?.stopPropagation();
    let updated;
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter(item => item !== id);
      showToast('Event removed from saved items', 'info');
    } else {
      updated = [...bookmarks, id];
      showToast('Event saved to bookmarks! 📌', 'success');
    }
    setBookmarks(updated);
    localStorage.setItem('internatlas_cult_bookmarks', JSON.stringify(updated));
  };

  // Fetch events from API with fallback
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedCity !== 'all') params.append('city', selectedCity);
      if (selectedMode !== 'all') params.append('mode', selectedMode);
      if (selectedFee !== 'all') params.append('fee', selectedFee);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      if (sortBy) params.append('sortBy', sortBy);

      const res = await fetch(`/api/events?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.events && data.events.length >= 0) {
          setEvents(data.events);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      // Backend not running or static deployment
    }

    // Resilient client-side fallback filtering
    let filtered = [...initialEvents];
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(e => e.category === selectedCategory);
    }
    if (selectedCity !== 'all') {
      filtered = filtered.filter(e => e.city.toLowerCase() === selectedCity.toLowerCase());
    }
    if (selectedMode !== 'all') {
      filtered = filtered.filter(e => e.mode === selectedMode);
    }
    if (selectedFee !== 'all') {
      filtered = filtered.filter(e => e.feeType === selectedFee);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(e =>
        (e.title && e.title.toLowerCase().includes(q)) ||
        (e.college && e.college.toLowerCase().includes(q)) ||
        (e.city && e.city.toLowerCase().includes(q)) ||
        (e.festName && e.festName.toLowerCase().includes(q))
      );
    }
    if (sortBy === 'prize') {
      filtered.sort((a, b) => (b.prizePool || 0) - (a.prizePool || 0));
    } else if (sortBy === 'deadline') {
      filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => (b.registrationsCount || 0) - (a.registrationsCount || 0));
    }
    setEvents(filtered);
    setLoading(false);
  };

  // Fetch categories & stats
  const fetchMeta = async () => {
    try {
      const [resCats, resStats] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/stats')
      ]);
      if (resCats.ok) {
        const cats = await resCats.json();
        setCategories(cats);
      }
      if (resStats.ok) {
        const st = await resStats.json();
        setStats(st);
      }
    } catch (err) {
      // Keep initial stats/categories on static deployment
    }
  };

  useEffect(() => {
    fetchMeta();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEvents();
    }, 150);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedCity, selectedMode, selectedFee, searchQuery, sortBy]);

  // Filtered list if bookmarks active
  const displayedEvents = useMemo(() => {
    if (showBookmarksOnly) {
      return events.filter(e => bookmarks.includes(e.id));
    }
    return events;
  }, [events, showBookmarksOnly, bookmarks]);

  // Open Registration Modal
  const openRegister = (event, e) => {
    e?.stopPropagation();
    setRegisterEvent(event);
    setRegSuccess(null);
    setRegForm({
      participantType: event.teamType,
      fullName: '',
      email: '',
      phone: '',
      collegeName: '',
      yearOfStudy: '3rd Year (Pre-Final)',
      teamName: event.teamType === 'team' ? '' : '',
      members: event.teamType === 'team' ? [{ name: '', role: '' }] : []
    });
  };

  // Handle Registration Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regForm.fullName || !regForm.email || !regForm.phone || !regForm.collegeName) {
      showToast('Please fill in all mandatory fields.', 'error');
      return;
    }
    if (regForm.participantType === 'team' && !regForm.teamName) {
      showToast('Please provide your Team or Crew name.', 'error');
      return;
    }

    try {
      setRegSubmitting(true);
      const res = await fetch(`/api/events/${registerEvent.id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regForm)
      });
      if (res.ok) {
        const data = await res.json();
        setRegSuccess(data.registration);
        showToast('Registration Confirmed! 🎉', 'success');
        fetchEvents();
        fetchMeta();
        return;
      }
    } catch (err) {
      // Use client fallback below
    } finally {
      setRegSubmitting(false);
    }

    // Client-side instant digital pass generator fallback
    const mockReg = {
      id: `IA-CULT-${Math.floor(100000 + Math.random() * 900000)}`,
      eventId: registerEvent.id,
      eventTitle: registerEvent.title,
      festName: registerEvent.festName,
      college: registerEvent.college,
      city: registerEvent.city,
      dates: registerEvent.dates,
      venue: registerEvent.venue,
      participantType: regForm.participantType,
      leadName: regForm.fullName,
      email: regForm.email,
      phone: regForm.phone,
      participantCollege: regForm.collegeName,
      teamName: regForm.teamName || null,
      members: regForm.members || [],
      registeredAt: new Date().toISOString()
    };
    setRegSuccess(mockReg);
    showToast('Registration Confirmed! 🎉', 'success');
  };

  // Add member field in registration
  const addTeamMember = () => {
    setRegForm(prev => ({
      ...prev,
      members: [...prev.members, { name: '', role: '' }]
    }));
  };

  // Remove member field
  const removeTeamMember = (index) => {
    setRegForm(prev => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index)
    }));
  };

  // Handle Host Event Submit
  const handleHostSubmit = async (e) => {
    e.preventDefault();
    if (!hostForm.title || !hostForm.festName || !hostForm.college || !hostForm.deadline) {
      showToast('Please fill in all required event details.', 'error');
      return;
    }

    try {
      setHostSubmitting(true);
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hostForm)
      });
      if (res.ok) {
        showToast('Cultural Event Published Successfully! 🎪', 'success');
        setIsHostModalOpen(false);
        fetchEvents();
        fetchMeta();
        return;
      }
    } catch (err) {
      // Fallback below
    } finally {
      setHostSubmitting(false);
    }

    const newEvent = {
      id: `cult-${Date.now()}`,
      title: hostForm.title,
      category: hostForm.category,
      categoryLabel: hostForm.category.toUpperCase(),
      festName: hostForm.festName,
      college: hostForm.college,
      city: hostForm.city,
      state: hostForm.state,
      mode: hostForm.mode,
      venue: hostForm.venue || `${hostForm.college} Campus`,
      dates: hostForm.dates || 'Upcoming 2026-27',
      deadline: hostForm.deadline,
      daysLeft: 30,
      prizePool: Number(hostForm.prizePool) || 0,
      prizeDescription: hostForm.prizeDescription || `₹${hostForm.prizePool} Cash Prize`,
      entryFee: Number(hostForm.entryFee) || 0,
      feeType: Number(hostForm.entryFee) > 0 ? 'paid' : 'free',
      teamType: hostForm.teamType,
      teamSize: hostForm.teamSize,
      eligibility: hostForm.eligibility,
      featured: false,
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
      description: hostForm.description,
      rules: ["Must present valid college ID card", "Respect festival guidelines"],
      rounds: [{ roundNumber: 1, title: "Prelims", description: "First round of evaluation", date: hostForm.dates, mode: hostForm.mode }],
      coordinators: [{ name: hostForm.coordinatorName, phone: hostForm.coordinatorPhone, email: hostForm.coordinatorEmail }],
      registrationsCount: 0
    };
    initialEvents.unshift(newEvent);
    setEvents(prev => [newEvent, ...prev]);
    setIsHostModalOpen(false);
    showToast('Cultural Event Published Successfully! 🎪', 'success');
  };

  return (
    <div className="min-h-screen">
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          background: toast.type === 'error' ? '#ef4444' : toast.type === 'success' ? '#10b981' : '#6366f1',
          color: '#fff',
          padding: '12px 22px',
          borderRadius: '9999px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 600,
          fontSize: '0.9rem',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {toast.msg}
        </div>
      )}

      {/* Navigation Bar */}
      <header className="navbar">
        <div className="container nav-content">
          <div className="brand-wrapper">
            <div className="brand-logo-badge">IA</div>
            <div>
              <div className="brand-title">
                Intern<span>Atlas</span>
              </div>
            </div>
            <span className="brand-badge">Cultural 2026</span>
          </div>

          <nav className="nav-links">
            <a href="#explore" className="nav-link-item active">
              <Sparkles size={16} /> Cultural Events
            </a>
            <a href="#festivals" className="nav-link-item">
              <Flame size={16} /> Top College Fests
            </a>
            <a href="#societies" className="nav-link-item">
              <Building2 size={16} /> College Societies
            </a>
          </nav>

          <div className="nav-actions">
            <button
              className={`btn btn-sm ${showBookmarksOnly ? 'btn-fest' : 'btn-secondary'}`}
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              title="View Bookmarked Events"
            >
              <Bookmark size={15} className={bookmarks.length ? 'text-pink-400' : ''} />
              <span>Saved ({bookmarks.length})</span>
            </button>

            <button
              className="btn btn-fest btn-sm"
              onClick={() => setIsHostModalOpen(true)}
            >
              <Plus size={16} /> Host Fest Event
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-tag">
            <span className="pulse-dot"></span>
            India's Largest Collegiate Cultural Gateway • Season 2026-27
          </div>

          <h1 className="hero-title">
            Own the Spotlight. <br />
            <span className="gradient-text">Dance, Sing, Act & Conquer.</span>
          </h1>

          <p className="hero-subtitle">
            Compete against the most talented college societies across IIT Bombay, BITS Pilani, Delhi University & 150+ top universities. Grab cash prizes, fame, and national performance contracts.
          </p>

          {/* Quick Stats Strip */}
          <div className="glass-panel stats-strip">
            <div className="stat-item">
              <span className="stat-number">{stats.totalEvents}+</span>
              <span className="stat-label">Active Competitions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">₹{(stats.totalPrizePool / 100000).toFixed(1)}L+</span>
              <span className="stat-label">Total Cash Rewards</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.activeColleges}+</span>
              <span className="stat-label">Premier Institutes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.totalRegistrations}+</span>
              <span className="stat-label">Registrations Done</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="container" id="explore">
        {/* Category Horizontal Bar */}
        <div className="categories-container">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className="category-count">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Filter and Search Toolbar */}
        <div className="glass-panel toolbar-card">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by event, fest (e.g. Mood Indigo), college or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="filters-group">
            {/* City Filter */}
            <select
              className="filter-select"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="all">📍 All Cities</option>
              <option value="Mumbai">Mumbai</option>
              <option value="New Delhi">New Delhi</option>
              <option value="Pilani">Pilani</option>
              <option value="Goa">Goa</option>
              <option value="Kanpur">Kanpur</option>
              <option value="Mangaluru">Mangaluru</option>
              <option value="Vellore">Vellore</option>
            </select>

            {/* Mode Filter */}
            <select
              className="filter-select"
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
            >
              <option value="all">🌐 All Modes</option>
              <option value="offline">🏫 On-Campus (Offline)</option>
              <option value="hybrid">⚡ Hybrid</option>
              <option value="online">💻 Virtual / Online</option>
            </select>

            {/* Fee Filter */}
            <select
              className="filter-select"
              value={selectedFee}
              onChange={(e) => setSelectedFee(e.target.value)}
            >
              <option value="all">💰 Any Entry Fee</option>
              <option value="free">🎁 Free Registration</option>
              <option value="paid">🎟️ Paid Pass</option>
            </select>

            {/* Sort Order */}
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">⭐ Featured First</option>
              <option value="prize-high">🏆 Highest Prize Pool</option>
              <option value="deadline-soon">⏳ Closing Soon</option>
              <option value="popularity">🔥 Most Popular</option>
            </select>
          </div>
        </div>

        {/* Results Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem' }}>
              {showBookmarksOnly ? 'Bookmarked Cultural Events' : 'Available Competitions & Fests'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Showing {displayedEvents.length} opportunities for students
            </p>
          </div>

          {(selectedCategory !== 'all' || selectedCity !== 'all' || selectedMode !== 'all' || selectedFee !== 'all' || searchQuery || showBookmarksOnly) && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedCity('all');
                setSelectedMode('all');
                setSelectedFee('all');
                setSearchQuery('');
                setShowBookmarksOnly(false);
              }}
            >
              <X size={14} /> Clear All Filters
            </button>
          )}
        </div>

        {/* Loading Skeleton or Empty State */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-secondary)' }}>
            <div className="pulse-dot" style={{ margin: '0 auto 16px', width: '16px', height: '16px' }}></div>
            <p>Loading premier cultural events from InternAtlas...</p>
          </div>
        ) : displayedEvents.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 20px', margin: '20px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎭</div>
            <h3 style={{ marginBottom: '8px' }}>No Cultural Events Found</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto 20px', fontSize: '0.9rem' }}>
              We couldn't find any events matching your selected filters. Try searching for other categories or resetting filters!
            </p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedCity('all');
                setSelectedMode('all');
                setSelectedFee('all');
                setSearchQuery('');
                setShowBookmarksOnly(false);
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Events Grid */
          <div className="events-grid">
            {displayedEvents.map((event) => {
              const isBookmarked = bookmarks.includes(event.id);
              return (
                <article key={event.id} className="event-card">
                  {/* Poster Header */}
                  <div className="card-poster-wrapper">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="card-poster-img"
                      loading="lazy"
                    />
                    <div className="poster-overlay"></div>

                    {/* Badges Top */}
                    <div className="poster-badge-top">
                      <span className="category-badge">
                        {event.categoryLabel}
                      </span>
                      {event.featured && (
                        <span className="fest-featured-tag">
                          ⭐ Featured Fest
                        </span>
                      )}
                    </div>

                    {/* Bookmark Toggle Button */}
                    <button
                      className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
                      onClick={(e) => toggleBookmark(event.id, e)}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Event'}
                    >
                      <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="card-body">
                    <div className="fest-submeta">
                      <span>{event.festName}</span>
                      <span>•</span>
                      <span className="college-name">{event.college}</span>
                    </div>

                    <h3 className="card-title">{event.title}</h3>

                    {/* Key Metrics */}
                    <div className="card-key-metrics">
                      <div className="metric-box">
                        <div className="metric-icon-wrap prize">
                          <Trophy size={16} />
                        </div>
                        <div className="metric-content">
                          <span className="metric-label">Prize Pool</span>
                          <span className="metric-val">₹{event.prizePool.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="metric-box">
                        <div className="metric-icon-wrap clock">
                          <Clock size={16} />
                        </div>
                        <div className="metric-content">
                          <span className="metric-label">Deadline</span>
                          <span className="metric-val">{event.daysLeft} days left</span>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Chips */}
                    <div className="card-chips-row">
                      <span className="chip-meta">
                        <MapPin size={12} /> {event.city}, {event.mode.toUpperCase()}
                      </span>
                      <span className="chip-meta">
                        <Users size={12} /> {event.teamSize}
                      </span>
                      <span className={`chip-meta ${event.feeType}`}>
                        {event.feeType === 'free' ? '🎁 Free Entry' : `🎟️ Pass ₹${event.entryFee}`}
                      </span>
                    </div>

                    {/* Card Actions */}
                    <div className="card-actions">
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ flex: 1 }}
                        onClick={() => {
                          setDetailEvent(event);
                          setDetailTab('overview');
                        }}
                      >
                        View Rulebook
                      </button>

                      <button
                        className="btn btn-fest btn-sm"
                        style={{ flex: 1 }}
                        onClick={(e) => openRegister(event, e)}
                      >
                        Register Now <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* MODAL 1: EVENT DETAILS & RULEBOOK */}
      {detailEvent && (
        <div className="modal-overlay" onClick={() => setDetailEvent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-secondary)', textTransform: 'uppercase' }}>
                  {detailEvent.festName} • {detailEvent.college}
                </span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '2px' }}>{detailEvent.title}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setDetailEvent(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              {/* Event Hero Banner */}
              <div className="detail-hero-banner">
                <img src={detailEvent.image} alt={detailEvent.title} className="detail-hero-img" />
                <div className="poster-overlay"></div>
                <div className="detail-banner-content">
                  <div>
                    <span className="category-badge">{detailEvent.categoryLabel}</span>
                    <h4 style={{ color: '#fff', fontSize: '1.2rem', marginTop: '6px' }}>{detailEvent.prizeDescription}</h4>
                  </div>
                  <button
                    className="btn btn-fest btn-sm"
                    onClick={() => {
                      const evt = detailEvent;
                      setDetailEvent(null);
                      openRegister(evt);
                    }}
                  >
                    Register for Event
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="detail-tabs">
                <button
                  className={`detail-tab ${detailTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setDetailTab('overview')}
                >
                  Overview & Venue
                </button>
                <button
                  className={`detail-tab ${detailTab === 'rules' ? 'active' : ''}`}
                  onClick={() => setDetailTab('rules')}
                >
                  Rules & Eligibility
                </button>
                <button
                  className={`detail-tab ${detailTab === 'rounds' ? 'active' : ''}`}
                  onClick={() => setDetailTab('rounds')}
                >
                  Rounds & Timeline
                </button>
                <button
                  className={`detail-tab ${detailTab === 'contact' ? 'active' : ''}`}
                  onClick={() => setDetailTab('contact')}
                >
                  Coordinators
                </button>
              </div>

              {/* Tab 1: Overview */}
              {detailTab === 'overview' && (
                <div>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '20px' }}>
                    {detailEvent.description}
                  </p>

                  <div className="card-key-metrics" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    <div className="metric-box">
                      <div className="metric-icon-wrap prize"><Trophy size={16} /></div>
                      <div className="metric-content">
                        <span className="metric-label">Cash Rewards</span>
                        <span className="metric-val">₹{detailEvent.prizePool.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="metric-box">
                      <div className="metric-icon-wrap clock"><Calendar size={16} /></div>
                      <div className="metric-content">
                        <span className="metric-label">Event Dates</span>
                        <span className="metric-val">{detailEvent.dates}</span>
                      </div>
                    </div>

                    <div className="metric-box">
                      <div className="metric-icon-wrap" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }}>
                        <MapPin size={16} />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Campus Venue</span>
                        <span className="metric-val">{detailEvent.city}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                    <h5 style={{ marginBottom: '6px', fontSize: '0.9rem' }}>📍 Exact Venue Address:</h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{detailEvent.venue}</p>
                  </div>
                </div>
              )}

              {/* Tab 2: Rules */}
              {detailTab === 'rules' && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <h5 style={{ fontSize: '0.92rem', marginBottom: '6px' }}>🎓 Who Can Participate:</h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{detailEvent.eligibility}</p>
                    <p style={{ color: '#a5b4fc', fontSize: '0.82rem', marginTop: '4px' }}>
                      <strong>Participation Format:</strong> {detailEvent.teamSize} ({detailEvent.teamType.toUpperCase()})
                    </p>
                  </div>

                  <h5 style={{ fontSize: '0.92rem', marginBottom: '12px' }}>📋 Official Competition Guidelines:</h5>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {detailEvent.rules?.map((rule, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--accent-secondary)', fontWeight: 700 }}>•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tab 3: Rounds */}
              {detailTab === 'rounds' && (
                <div>
                  <h5 style={{ fontSize: '0.92rem', marginBottom: '16px' }}>🏆 Rounds & Evaluation Pipeline:</h5>
                  <div>
                    {detailEvent.rounds?.map((round) => (
                      <div key={round.roundNumber} className="round-timeline-item">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <h6 style={{ fontSize: '0.95rem', color: '#fff' }}>
                            Round {round.roundNumber}: {round.title}
                          </h6>
                          <span className="chip-meta" style={{ fontSize: '0.7rem' }}>{round.mode} • {round.date}</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{round.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Contact */}
              {detailTab === 'contact' && (
                <div>
                  <h5 style={{ fontSize: '0.92rem', marginBottom: '14px' }}>📞 Organizing Society Student Coordinators:</h5>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    {detailEvent.coordinators?.map((coord, idx) => (
                      <div key={idx} style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                        <div style={{ fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{coord.name}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>📱 {coord.phone}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', wordBreak: 'break-all' }}>✉️ {coord.email}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: INTERACTIVE REGISTRATION & TICKET PASS */}
      {registerEvent && (
        <div className="modal-overlay" onClick={() => setRegisterEvent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="category-badge">{registerEvent.categoryLabel}</span>
                <h3 style={{ fontSize: '1.2rem', marginTop: '4px' }}>Register: {registerEvent.title}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setRegisterEvent(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              {regSuccess ? (
                /* Confirmed Digital Ticket */
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <span className="ticket-badge-confirmed">
                      <CheckCircle2 size={16} /> Registration Confirmed
                    </span>
                    <h4 style={{ fontSize: '1.4rem', marginTop: '10px' }}>You're In! See you on Stage 🎭</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      Your digital entry ticket for {regSuccess.festName} ({regSuccess.college}) has been generated.
                    </p>
                  </div>

                  <div className="ticket-container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>PASS TOKEN</span>
                        <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#ec4899', fontSize: '1.1rem' }}>
                          {regSuccess.registrationId}
                        </div>
                      </div>
                      <div className="ticket-qr-placeholder">
                        <div style={{ textAlign: 'center', fontSize: '0.65rem', color: '#000', fontWeight: 800 }}>
                          INTERNATLAS<br />VERIFIED PASS
                        </div>
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>PARTICIPANT / LEADER</span>
                        <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>{regSuccess.fullName}</div>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>COLLEGE / INSTITUTE</span>
                        <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>{regSuccess.collegeName}</div>
                      </div>
                      {regSuccess.teamName && (
                        <div>
                          <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>TEAM / CREW</span>
                          <div style={{ fontWeight: 600, color: '#818cf8', fontSize: '0.9rem' }}>{regSuccess.teamName}</div>
                        </div>
                      )}
                      <div>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>DATES & VENUE</span>
                        <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.85rem' }}>{regSuccess.dates}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                      onClick={() => {
                        window.print();
                      }}
                    >
                      <Download size={16} /> Print / Save Pass PDF
                    </button>
                    <button
                      className="btn btn-secondary"
                      style={{ flex: 1 }}
                      onClick={() => setRegisterEvent(null)}
                    >
                      Done & Return to Explore
                    </button>
                  </div>
                </div>
              ) : (
                /* Registration Form */
                <form onSubmit={handleRegisterSubmit}>
                  <div style={{ padding: '12px 16px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: '12px', marginBottom: '20px', fontSize: '0.85rem', color: '#c7d2fe' }}>
                    <strong>Entry Info:</strong> {registerEvent.entryFee === 0 ? 'Free Entry (Sponsored by Fest Organizers)' : `Registration Fee: ₹${registerEvent.entryFee}`} • Team Format: {registerEvent.teamSize}
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Registration Type</label>
                      <select
                        className="form-select"
                        value={regForm.participantType}
                        onChange={(e) => setRegForm({ ...regForm, participantType: e.target.value })}
                      >
                        <option value="solo">Solo Participant</option>
                        <option value="team">Team / Society Crew</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Full Name (Leader / Solo) *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Kashish Khichi"
                        required
                        value={regForm.fullName}
                        onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="yourname@college.edu"
                        required
                        value={regForm.email}
                        onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">WhatsApp Contact Number *</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="+91 98765 43210"
                        required
                        value={regForm.phone}
                        onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">College / University Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Delhi Technological University"
                        required
                        value={regForm.collegeName}
                        onChange={(e) => setRegForm({ ...regForm, collegeName: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Year of Study</label>
                      <select
                        className="form-select"
                        value={regForm.yearOfStudy}
                        onChange={(e) => setRegForm({ ...regForm, yearOfStudy: e.target.value })}
                      >
                        <option value="1st Year (Fresher)">1st Year (Fresher)</option>
                        <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
                        <option value="3rd Year (Pre-Final)">3rd Year (Pre-Final)</option>
                        <option value="4th Year / Final Year">4th Year / Final Year</option>
                        <option value="Postgraduate / Masters">Postgraduate / Masters</option>
                      </select>
                    </div>

                    {regForm.participantType === 'team' && (
                      <div className="form-group form-full">
                        <label className="form-label">Crew / Team Name *</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. The Groove Collective"
                          required
                          value={regForm.teamName}
                          onChange={(e) => setRegForm({ ...regForm, teamName: e.target.value })}
                        />
                      </div>
                    )}
                  </div>

                  {/* Team Members List if Team */}
                  {regForm.participantType === 'team' && (
                    <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(0,0,0,0.25)', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h5 style={{ fontSize: '0.85rem' }}>Team Members ({regForm.members.length})</h5>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={addTeamMember}
                        >
                          <Plus size={14} /> Add Member
                        </button>
                      </div>

                      {regForm.members.map((member, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                          <input
                            type="text"
                            className="form-input"
                            style={{ flex: 2 }}
                            placeholder={`Member #${idx + 1} Full Name`}
                            value={member.name}
                            onChange={(e) => {
                              const list = [...regForm.members];
                              list[idx].name = e.target.value;
                              setRegForm({ ...regForm, members: list });
                            }}
                          />
                          <input
                            type="text"
                            className="form-input"
                            style={{ flex: 1 }}
                            placeholder="Role (e.g. Lead, Guitar)"
                            value={member.role}
                            onChange={(e) => {
                              const list = [...regForm.members];
                              list[idx].role = e.target.value;
                              setRegForm({ ...regForm, members: list });
                            }}
                          />
                          {regForm.members.length > 1 && (
                            <button
                              type="button"
                              className="modal-close-btn"
                              style={{ width: '38px', height: '38px' }}
                              onClick={() => removeTeamMember(idx)}
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <input type="checkbox" id="terms" required defaultChecked />
                    <label htmlFor="terms" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      I agree to abide by the festival rulebook and confirm all participants carry valid College IDs.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-fest"
                    style={{ width: '100%', padding: '14px' }}
                    disabled={regSubmitting}
                  >
                    {regSubmitting ? 'Confirming with Fest Portal...' : `Confirm Registration & Issue Pass`}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: HOST / LIST A CULTURAL FEST EVENT */}
      {isHostModalOpen && (
        <div className="modal-overlay" onClick={() => setIsHostModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="category-badge">Fest Organizers & Societies</span>
                <h3 style={{ fontSize: '1.2rem', marginTop: '4px' }}>Host a Cultural Event on InternAtlas</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsHostModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
                List your college cultural fest competition. Connect with over 100,000+ talented student participants across India.
              </p>

              <form onSubmit={handleHostSubmit}>
                <div className="form-grid">
                  <div className="form-group form-full">
                    <label className="form-label">Competition / Event Title *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Footloose: Western Group Dance 2026"
                      required
                      value={hostForm.title}
                      onChange={(e) => setHostForm({ ...hostForm, title: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select
                      className="form-select"
                      value={hostForm.category}
                      onChange={(e) => setHostForm({ ...hostForm, category: e.target.value })}
                    >
                      <option value="dance">💃 Dance & Choreo</option>
                      <option value="music">🎸 Music & Bands</option>
                      <option value="drama">🎭 Drama & Theatre</option>
                      <option value="fashion">👗 Fashion & Glam</option>
                      <option value="arts">🎨 Fine Arts & Design</option>
                      <option value="literary">🎤 Literary & Stand-Up</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Fest Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Waves 2026 / Mood Indigo"
                      required
                      value={hostForm.festName}
                      onChange={(e) => setHostForm({ ...hostForm, festName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">College / University *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. IIT Bombay / Hindu College"
                      required
                      value={hostForm.college}
                      onChange={(e) => setHostForm({ ...hostForm, college: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Mumbai, Delhi, Bangalore"
                      required
                      value={hostForm.city}
                      onChange={(e) => setHostForm({ ...hostForm, city: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Total Cash Prize Pool (₹) *</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="e.g. 50000"
                      required
                      value={hostForm.prizePool}
                      onChange={(e) => setHostForm({ ...hostForm, prizePool: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Registration Deadline *</label>
                    <input
                      type="date"
                      className="form-input"
                      required
                      value={hostForm.deadline}
                      onChange={(e) => setHostForm({ ...hostForm, deadline: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Event Mode</label>
                    <select
                      className="form-select"
                      value={hostForm.mode}
                      onChange={(e) => setHostForm({ ...hostForm, mode: e.target.value })}
                    >
                      <option value="offline">On-Campus (Offline)</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="online">Online / Virtual</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Entry Fee (₹ - 0 for Free)</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="0 for free"
                      value={hostForm.entryFee}
                      onChange={(e) => setHostForm({ ...hostForm, entryFee: e.target.value })}
                    />
                  </div>

                  <div className="form-group form-full">
                    <label className="form-label">Event Description & Vibe</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Describe the excitement, judging criteria, and festival atmosphere..."
                      value={hostForm.description}
                      onChange={(e) => setHostForm({ ...hostForm, description: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Lead Student Coordinator</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Coordinator Name"
                      value={hostForm.coordinatorName}
                      onChange={(e) => setHostForm({ ...hostForm, coordinatorName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Coordinator WhatsApp / Phone</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+91 99999 88888"
                      value={hostForm.coordinatorPhone}
                      onChange={(e) => setHostForm({ ...hostForm, coordinatorPhone: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-fest"
                  style={{ width: '100%', padding: '14px' }}
                  disabled={hostSubmitting}
                >
                  {hostSubmitting ? 'Publishing Event...' : '🚀 Publish Cultural Competition Live'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="brand-wrapper" style={{ marginBottom: '14px' }}>
                <div className="brand-logo-badge">IA</div>
                <div className="brand-title">
                  Intern<span>Atlas</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '340px' }}>
                Next-generation student discovery portal for internships, fresher jobs, national hackathons, and collegiate cultural festivals.
              </p>
            </div>

            <div className="footer-col">
              <h5>Cultural Categories</h5>
              <ul>
                <li><a href="#explore">Street Dance & Choreo</a></li>
                <li><a href="#explore">Battle of the Bands</a></li>
                <li><a href="#explore">Nukkad Natak (Street Play)</a></li>
                <li><a href="#explore">Fashion Runway</a></li>
                <li><a href="#explore">Slam Poetry & Open Mic</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Premier Fests</h5>
              <ul>
                <li><a href="#explore">Mood Indigo (IIT Bombay)</a></li>
                <li><a href="#explore">Oasis (BITS Pilani)</a></li>
                <li><a href="#explore">Rendezvous (IIT Delhi)</a></li>
                <li><a href="#explore">Mecca (Hindu College DU)</a></li>
                <li><a href="#explore">Antaragni (IIT Kanpur)</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>For Organizers</h5>
              <ul>
                <li><a href="#host" onClick={() => setIsHostModalOpen(true)}>Host Fest Event</a></li>
                <li><a href="#societies">Society Verification</a></li>
                <li><a href="#guidelines">Rulebook Templates</a></li>
                <li><a href="#sponsor">Sponsorship Network</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div>© 2026 InternAtlas Technologies Inc. Built with ❤️ for Indian Students.</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span style={{ color: 'var(--accent-secondary)' }}>Domain: internatlas.in</span>
              <span>Cultural Events Module v1.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
