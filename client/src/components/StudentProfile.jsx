import React, { useState, useEffect } from 'react';
import './StudentProfile.css';
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Code,
  FileText,
  Share2,
  Edit3,
  ExternalLink,
  Globe,
  Award,
  CheckCircle2,
  Calendar,
  Building,
  Download,
  Upload,
  Plus,
  Trash2,
  X,
  Search,
  Bell,
  Clock,
  ChevronRight,
  Sparkles,
  BookOpen,
  Bookmark
} from 'lucide-react';

const Github = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 14, color = "#0077b5" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function StudentProfile({ onNavigateToEvents }) {
  // Active Tab
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'academics', 'experience', 'skills', 'applications', 'resume'

  // Toast notification
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Student Profile Data State (persisted in localStorage)
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('internatlas_student_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      fullName: 'Kashish Khichi',
      headline: 'Computer Science Undergraduate & Full-Stack Developer',
      college: 'Delhi Technological University (DTU)',
      degree: 'B.Tech in Computer Science & Engineering',
      graduationYear: '2026',
      currentYear: '3rd Year (Pre-Final)',
      cgpa: '8.84',
      email: 'kashish.khichi@dtu.ac.in',
      phone: '+91 98765 43210',
      location: 'New Delhi, India',
      bio: 'Enthusiastic and detail-driven Computer Science undergraduate with a passion for designing and building clean, high-performance web applications. Experienced in React, Next.js, modern component architectures, and REST API development. Seeking full-time internship opportunities where I can contribute to high-impact products.',
      github: 'https://github.com/kashish16635',
      linkedin: 'https://linkedin.com/in/kashish-khichi',
      portfolio: 'https://kashishkhichi.dev',
      preferredRole: 'Frontend Developer / Full-Stack Intern',
      preferredLocation: 'Delhi NCR, Bengaluru, or Remote',
      availability: 'Immediate (Summer 2026 / 6-Month Internship)',
      expectedStipend: '₹25,000 – ₹45,000 / month',
      openToRelocation: true,
      skills: [
        { name: 'React.js', verified: true, level: 'Advanced' },
        { name: 'JavaScript (ES6+)', verified: true, level: 'Advanced' },
        { name: 'Next.js', verified: true, level: 'Intermediate' },
        { name: 'TypeScript', verified: false, level: 'Intermediate' },
        { name: 'HTML5 & CSS3', verified: true, level: 'Expert' },
        { name: 'Tailwind CSS', verified: true, level: 'Advanced' },
        { name: 'Node.js', verified: false, level: 'Intermediate' },
        { name: 'Express.js', verified: false, level: 'Intermediate' },
        { name: 'REST APIs', verified: true, level: 'Advanced' },
        { name: 'Git & GitHub', verified: true, level: 'Advanced' },
        { name: 'UI/UX Prototyping', verified: false, level: 'Advanced' },
        { name: 'PostgreSQL', verified: false, level: 'Familiar' }
      ]
    };
  });

  // Save profile to localStorage on changes
  useEffect(() => {
    localStorage.setItem('internatlas_student_profile', JSON.stringify(profile));
  }, [profile]);

  // Modal State for Editing Profile
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...profile });
  const [newSkillInput, setNewSkillInput] = useState('');

  const openEditModal = () => {
    setEditFormData({ ...profile });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({ ...editFormData });
    setIsEditModalOpen(false);
    showToast('Profile updated successfully! ✨');
  };

  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    if (editFormData.skills.some(s => s.name.toLowerCase() === newSkillInput.trim().toLowerCase())) {
      showToast('Skill already exists', 'error');
      return;
    }
    setEditFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { name: newSkillInput.trim(), verified: false, level: 'Intermediate' }]
    }));
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillName) => {
    setEditFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.name !== skillName)
    }));
  };

  // Copy Profile Link
  const handleShareProfile = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    showToast('Profile link copied to clipboard! 📋');
  };

  // Mock Download Resume
  const handleDownloadResume = () => {
    showToast('Downloading Kashish_Khichi_Resume.pdf 📄');
  };

  // Education Records
  const educationList = [
    {
      degree: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
      institution: 'Delhi Technological University (DTU), New Delhi',
      period: '2022 – 2026 (Expected)',
      score: 'CGPA: 8.84 / 10.0',
      description: 'Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, Web Technologies.'
    },
    {
      degree: 'Senior Secondary Certificate (Class XII) – CBSE',
      institution: 'Delhi Public School (DPS), R.K. Puram',
      period: '2020 – 2022',
      score: 'Aggregate: 95.2%',
      description: 'Major Subjects: Physics, Chemistry, Mathematics, Computer Science, English.'
    },
    {
      degree: 'Secondary School Examination (Class X) – CBSE',
      institution: 'Delhi Public School (DPS)',
      period: '2020',
      score: 'Aggregate: 96.8%',
      description: 'Graduated with Merit Certificate in Mathematics and Science.'
    }
  ];

  // Experience Records
  const experienceList = [
    {
      role: 'Frontend Engineering Intern',
      company: 'TheAiSignal / InternAtlas',
      type: 'Internship',
      period: 'Sep 2026 – Present',
      location: 'Remote',
      points: [
        'Collaborating with product team to build next-generation student opportunity modules (Cultural Events & Student Profile) on InternAtlas.',
        'Engineered responsive, accessible React components with sub-second page rendering and interactive filtering.',
        'Structured modular data schemas and REST API contracts for clean backend handoff.'
      ],
      tags: ['React 19', 'Next.js', 'Tailwind CSS', 'Vite', 'Git']
    },
    {
      role: 'Web Development Intern',
      company: 'TechSprint Solutions',
      type: 'Summer Internship',
      period: 'May 2025 – Jul 2025',
      location: 'New Delhi, India',
      points: [
        'Developed reusable dashboard widgets and application forms used by over 12,000+ collegiate learners.',
        'Optimized client-side bundle size by 35% through code-splitting and asset lazy loading.',
        'Participated in daily standups and weekly sprint code reviews.'
      ],
      tags: ['JavaScript', 'React', 'CSS Modules', 'REST APIs']
    }
  ];

  // Projects Records
  const projectsList = [
    {
      title: 'InternAtlas: Cultural Events & Discovery Engine',
      category: 'Web Application',
      period: 'Sep 2026',
      description: 'A comprehensive college fest and cultural competition portal built for Indian university students. Features multi-filter search, tabbed rulebooks, dynamic crew registration, and real-time digital pass generation.',
      tags: ['React', 'Express.js', 'REST API', 'Vite', 'CSS Architecture'],
      demoLink: 'https://internatlas-cultural-events.vercel.app',
      githubLink: 'https://github.com/kashish16635/internatlas-cultural-events'
    },
    {
      title: 'DevCollab: Real-Time Pair Programming Room',
      category: 'Full-Stack Web App',
      period: 'Jan 2026',
      description: 'In-browser synchronized code editor supporting live syntax highlighting, multi-cursor presence, and private room sharing for peer programming practice.',
      tags: ['TypeScript', 'Node.js', 'Socket.io', 'Monaco Editor'],
      demoLink: 'https://github.com/kashish16635',
      githubLink: 'https://github.com/kashish16635'
    },
    {
      title: 'CampusBazaar: P2P University Resource Exchange',
      category: 'Campus Platform',
      period: 'Oct 2025',
      description: 'Peer-to-peer textbook, calculator, and electronics marketplace serving 450+ verified college students with in-app chat and student ID verification.',
      tags: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind'],
      demoLink: 'https://github.com/kashish16635',
      githubLink: 'https://github.com/kashish16635'
    }
  ];

  // Applied Opportunities Records
  const applicationsList = [
    {
      id: 'APP-101',
      title: 'Frontend Developer Intern',
      company: 'AI Signal Labs',
      appliedDate: 'Sep 15, 2026',
      type: 'Internship • Remote',
      stipend: '₹25,000/mo',
      status: 'Shortlisted',
      statusClass: 'ia-status-shortlisted'
    },
    {
      id: 'APP-102',
      title: 'Software Engineering Intern (Summer 2026)',
      company: 'Adobe India',
      appliedDate: 'Sep 10, 2026',
      type: 'Internship • Noida',
      stipend: '₹50,000/mo',
      status: 'In Review',
      statusClass: 'ia-status-review'
    },
    {
      id: 'APP-103',
      title: 'Product Design & UI Intern',
      company: 'Razorpay',
      appliedDate: 'Aug 28, 2026',
      type: 'Internship • Bengaluru',
      stipend: '₹35,000/mo',
      status: 'In Review',
      statusClass: 'ia-status-review'
    },
    {
      id: 'APP-104',
      title: 'Campus Tech Innovator',
      company: 'Google Cloud Student Program',
      appliedDate: 'Aug 20, 2026',
      type: 'Ambassador • Campus',
      stipend: 'Perks & Swag',
      status: 'Applied',
      statusClass: 'ia-status-applied'
    }
  ];

  return (
    <div className="ia-profile-wrapper">
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          background: toast.type === 'error' ? '#ef4444' : '#10b981',
          color: '#ffffff',
          padding: '12px 22px',
          borderRadius: '9999px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          fontSize: '13.5px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {toast.message}
        </div>
      )}

      {/* Top Navigation Bar (Matching internatlas.in) */}
      <header className="ia-nav-header">
        <div className="ia-nav-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <a href="/" className="ia-logo">
              Intern<span className="ia-logo-dot">Atlas.</span>
            </a>
            <nav className="ia-nav-links">
              <a href="/" className="ia-nav-link">Home</a>
              <a href="/internships" className="ia-nav-link">Internships</a>
              {onNavigateToEvents && (
                <button
                  onClick={onNavigateToEvents}
                  className="ia-nav-link"
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                >
                  Cultural Events
                </button>
              )}
              <a href="/competitions" className="ia-nav-link">Competitions</a>
              <a href="/hackathons" className="ia-nav-link">Hackathons</a>
              <span className="ia-nav-link active">Student Profile</span>
            </nav>
          </div>

          <div className="ia-nav-actions">
            <button className="ia-icon-btn" title="Search Opportunities">
              <Search size={16} />
            </button>
            <button className="ia-icon-btn" title="Notifications">
              <Bell size={16} />
              <span className="ia-badge-dot"></span>
            </button>
            <div className="ia-user-pill" onClick={openEditModal} title="View Account Settings">
              <div className="ia-avatar-sm">
                {profile.fullName.split(' ').map(n => n[0]).join('')}
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#071c46' }}>
                {profile.fullName.split(' ')[0]}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="ia-main-container">
        {/* Breadcrumb */}
        <div className="ia-breadcrumb">
          <a href="/">Home</a>
          <ChevronRight size={13} />
          <span style={{ color: '#071c46', fontWeight: 600 }}>Student Profile</span>
        </div>

        {/* Profile Hero Card */}
        <section className="ia-profile-hero-card">
          <div className="ia-cover-banner">
            <div className="ia-cover-pattern"></div>
            <div className="ia-cover-badge">
              <Sparkles size={11} style={{ display: 'inline', marginRight: '4px' }} />
              Active Job Seeker
            </div>
          </div>

          <div className="ia-hero-content">
            <div className="ia-hero-top-row">
              <div className="ia-avatar-wrapper">
                <div className="ia-avatar-lg">
                  {profile.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ia-status-dot" title="Available for opportunities"></div>
                <button className="ia-avatar-edit-btn" onClick={openEditModal} title="Change Photo">
                  <Edit3 size={13} />
                </button>
              </div>

              <div className="ia-hero-actions">
                <button className="ia-btn-primary" onClick={openEditModal}>
                  <Edit3 size={14} />
                  Edit Profile
                </button>
                <button className="ia-btn-secondary" onClick={handleShareProfile}>
                  <Share2 size={14} />
                  Share Link
                </button>
                <button className="ia-btn-secondary" onClick={handleDownloadResume}>
                  <Download size={14} />
                  Download CV
                </button>
              </div>
            </div>

            {/* Profile Info Details */}
            <div className="ia-profile-name-row">
              <h1 className="ia-profile-name">{profile.fullName}</h1>
              <span className="ia-verified-tag">
                <CheckCircle2 size={12} />
                Verified Student
              </span>
            </div>

            <p className="ia-profile-headline">{profile.headline}</p>

            <div className="ia-profile-meta-chips">
              <span className="ia-meta-chip">
                <GraduationCap size={15} color="#2563eb" />
                {profile.college} ({profile.graduationYear})
              </span>
              <span className="ia-meta-chip">
                <MapPin size={15} color="#64748b" />
                {profile.location}
              </span>
              <span className="ia-meta-chip">
                <Mail size={15} color="#64748b" />
                {profile.email}
              </span>
              <span className="ia-meta-chip">
                <Phone size={15} color="#64748b" />
                {profile.phone}
              </span>
            </div>

            {/* Social & Portfolio Links */}
            <div className="ia-social-links">
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className="ia-social-badge">
                  <Github size={14} />
                  GitHub
                  <ExternalLink size={11} color="#94a3b8" />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="ia-social-badge">
                  <Linkedin size={14} color="#0077b5" />
                  LinkedIn
                  <ExternalLink size={11} color="#94a3b8" />
                </a>
              )}
              {profile.portfolio && (
                <a href={profile.portfolio} target="_blank" rel="noreferrer" className="ia-social-badge">
                  <Globe size={14} color="#06b6d4" />
                  Portfolio
                  <ExternalLink size={11} color="#94a3b8" />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Profile Strength Bar */}
        <section className="ia-strength-banner">
          <div className="ia-strength-info">
            <div className="ia-strength-circle">88%</div>
            <div className="ia-strength-text">
              <h4>Profile Completeness: All-Star ⭐</h4>
              <p>Great job! Complete your portfolio to increase recruiter visibility by 3.5x.</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div className="ia-strength-bar-bg">
              <div className="ia-strength-bar-fill" style={{ width: '88%' }}></div>
            </div>
            <button
              onClick={openEditModal}
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Add Section +
            </button>
          </div>
        </section>

        {/* Quick Stats Grid */}
        <section className="ia-stats-grid">
          <div className="ia-stat-card">
            <div className="ia-stat-icon-box" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <Briefcase size={20} />
            </div>
            <div>
              <div className="ia-stat-number">{applicationsList.length}</div>
              <div className="ia-stat-label">Applications Submitted</div>
            </div>
          </div>

          <div className="ia-stat-card">
            <div className="ia-stat-icon-box" style={{ background: '#f0fdf4', color: '#16a34a' }}>
              <CheckCircle2 size={20} />
            </div>
            <div>
              <div className="ia-stat-number">1</div>
              <div className="ia-stat-label">Interviews Scheduled</div>
            </div>
          </div>

          <div className="ia-stat-card">
            <div className="ia-stat-icon-box" style={{ background: '#faf5ff', color: '#9333ea' }}>
              <Bookmark size={20} />
            </div>
            <div>
              <div className="ia-stat-number">8</div>
              <div className="ia-stat-label">Saved Opportunities</div>
            </div>
          </div>

          <div className="ia-stat-card">
            <div className="ia-stat-icon-box" style={{ background: '#fff7ed', color: '#ea580c' }}>
              <Award size={20} />
            </div>
            <div>
              <div className="ia-stat-number">6</div>
              <div className="ia-stat-label">Verified Skill Badges</div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <nav className="ia-profile-nav-tabs">
          <button
            className={`ia-tab-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <User size={15} />
            Overview & About
          </button>

          <button
            className={`ia-tab-item ${activeTab === 'academics' ? 'active' : ''}`}
            onClick={() => setActiveTab('academics')}
          >
            <GraduationCap size={15} />
            Academics
            <span className="ia-tab-count">{educationList.length}</span>
          </button>

          <button
            className={`ia-tab-item ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            <Briefcase size={15} />
            Experience & Projects
            <span className="ia-tab-count">{experienceList.length + projectsList.length}</span>
          </button>

          <button
            className={`ia-tab-item ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <Code size={15} />
            Skills & Tech
            <span className="ia-tab-count">{profile.skills.length}</span>
          </button>

          <button
            className={`ia-tab-item ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            <Clock size={15} />
            Applications Tracker
            <span className="ia-tab-count">{applicationsList.length}</span>
          </button>

          <button
            className={`ia-tab-item ${activeTab === 'resume' ? 'active' : ''}`}
            onClick={() => setActiveTab('resume')}
          >
            <FileText size={15} />
            Resume Vault
          </button>
        </nav>

        {/* Tab Content Panels */}
        <div className="ia-panel-grid">
          {/* Main Left Column */}
          <div>
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <>
                <div className="ia-card">
                  <div className="ia-card-header">
                    <h3 className="ia-card-title">
                      <User size={18} color="#2563eb" />
                      About Me
                    </h3>
                    <button className="ia-card-action-btn" onClick={openEditModal}>
                      Edit Bio
                    </button>
                  </div>
                  <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#475569' }}>
                    {profile.bio}
                  </p>
                </div>

                <div className="ia-card">
                  <div className="ia-card-header">
                    <h3 className="ia-card-title">
                      <Sparkles size={18} color="#06b6d4" />
                      Career Preferences
                    </h3>
                    <button className="ia-card-action-btn" onClick={openEditModal}>
                      Update
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>Preferred Roles</div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#071c46', marginTop: '2px' }}>{profile.preferredRole}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>Preferred Locations</div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#071c46', marginTop: '2px' }}>{profile.preferredLocation}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>Availability</div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#071c46', marginTop: '2px' }}>{profile.availability}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>Expected Stipend</div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#071c46', marginTop: '2px' }}>{profile.expectedStipend}</div>
                    </div>
                  </div>
                </div>

                {/* Featured Projects in Overview */}
                <div className="ia-card">
                  <div className="ia-card-header">
                    <h3 className="ia-card-title">
                      <Code size={18} color="#2563eb" />
                      Featured Projects
                    </h3>
                    <button className="ia-card-action-btn" onClick={() => setActiveTab('experience')}>
                      View All ({projectsList.length})
                    </button>
                  </div>
                  {projectsList.slice(0, 2).map((proj, idx) => (
                    <div key={idx} className="ia-project-card">
                      <div className="ia-project-top">
                        <div>
                          <div className="ia-project-name">{proj.title}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>{proj.category} • {proj.period}</div>
                        </div>
                        <div className="ia-project-links">
                          {proj.demoLink && (
                            <a href={proj.demoLink} target="_blank" rel="noreferrer" className="ia-project-link-btn">
                              Live Demo
                              <ExternalLink size={11} />
                            </a>
                          )}
                          {proj.githubLink && (
                            <a href={proj.githubLink} target="_blank" rel="noreferrer" className="ia-project-link-btn">
                              <Github size={11} />
                              Code
                            </a>
                          )}
                        </div>
                      </div>
                      <p style={{ fontSize: '13px', color: '#475569', marginBottom: '10px' }}>
                        {proj.description}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {proj.tags.map((tag, tIdx) => (
                          <span key={tIdx} style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            background: '#f1f5f9',
                            color: '#071c46',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* TAB 2: ACADEMICS */}
            {activeTab === 'academics' && (
              <div className="ia-card">
                <div className="ia-card-header">
                  <h3 className="ia-card-title">
                    <GraduationCap size={18} color="#2563eb" />
                    Formal Education
                  </h3>
                  <button className="ia-card-action-btn" onClick={openEditModal}>
                    Edit Education
                  </button>
                </div>
                {educationList.map((edu, idx) => (
                  <div key={idx} className="ia-timeline-item">
                    <div className="ia-timeline-dot"></div>
                    <div className="ia-item-title">{edu.degree}</div>
                    <div className="ia-item-sub">{edu.institution}</div>
                    <div className="ia-item-meta">
                      📅 {edu.period} • <strong style={{ color: '#16a34a' }}>{edu.score}</strong>
                    </div>
                    <p className="ia-item-desc">{edu.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: EXPERIENCE & PROJECTS */}
            {activeTab === 'experience' && (
              <>
                <div className="ia-card">
                  <div className="ia-card-header">
                    <h3 className="ia-card-title">
                      <Briefcase size={18} color="#2563eb" />
                      Work Experience & Internships
                    </h3>
                  </div>
                  {experienceList.map((exp, idx) => (
                    <div key={idx} className="ia-timeline-item">
                      <div className="ia-timeline-dot"></div>
                      <div className="ia-item-title">{exp.role}</div>
                      <div className="ia-item-sub">
                        {exp.company} <span style={{ color: '#2563eb', fontWeight: 600 }}>({exp.type})</span>
                      </div>
                      <div className="ia-item-meta">
                        📅 {exp.period} • 📍 {exp.location}
                      </div>
                      <ul style={{ paddingLeft: '18px', fontSize: '13px', color: '#475569', marginBottom: '8px', lineHeight: 1.6 }}>
                        {exp.points.map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {exp.tags.map((tag, tIdx) => (
                          <span key={tIdx} style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            background: '#eff6ff',
                            color: '#1e40af',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ia-card">
                  <div className="ia-card-header">
                    <h3 className="ia-card-title">
                      <Code size={18} color="#2563eb" />
                      Key Technical Projects
                    </h3>
                  </div>
                  {projectsList.map((proj, idx) => (
                    <div key={idx} className="ia-project-card">
                      <div className="ia-project-top">
                        <div>
                          <div className="ia-project-name">{proj.title}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>{proj.category} • {proj.period}</div>
                        </div>
                        <div className="ia-project-links">
                          {proj.demoLink && (
                            <a href={proj.demoLink} target="_blank" rel="noreferrer" className="ia-project-link-btn">
                              Live Demo
                              <ExternalLink size={11} />
                            </a>
                          )}
                          {proj.githubLink && (
                            <a href={proj.githubLink} target="_blank" rel="noreferrer" className="ia-project-link-btn">
                              <Github size={11} />
                              Code
                            </a>
                          )}
                        </div>
                      </div>
                      <p style={{ fontSize: '13px', color: '#475569', marginBottom: '10px' }}>
                        {proj.description}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {proj.tags.map((tag, tIdx) => (
                          <span key={tIdx} style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            background: '#f1f5f9',
                            color: '#071c46',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* TAB 4: SKILLS */}
            {activeTab === 'skills' && (
              <div className="ia-card">
                <div className="ia-card-header">
                  <h3 className="ia-card-title">
                    <Code size={18} color="#2563eb" />
                    Verified Skills & Technologies
                  </h3>
                  <button className="ia-card-action-btn" onClick={openEditModal}>
                    Manage Skills
                  </button>
                </div>
                <div className="ia-skills-wrap">
                  {profile.skills.map((skill, idx) => (
                    <div key={idx} className="ia-skill-pill">
                      {skill.verified && <CheckCircle2 size={13} className="ia-skill-verified" />}
                      <span>{skill.name}</span>
                      <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>
                        • {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: APPLICATIONS TRACKER */}
            {activeTab === 'applications' && (
              <div className="ia-card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '20px 22px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 className="ia-card-title">
                    <Clock size={18} color="#2563eb" />
                    Live Application Tracker
                  </h3>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Updated in real time
                  </span>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="ia-app-table">
                    <thead>
                      <tr>
                        <th>Role & Company</th>
                        <th>Applied On</th>
                        <th>Type & Stipend</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applicationsList.map((app, idx) => (
                        <tr key={idx}>
                          <td>
                            <div style={{ fontWeight: 700, color: '#071c46' }}>{app.title}</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>{app.company}</div>
                          </td>
                          <td style={{ fontSize: '12.5px' }}>{app.appliedDate}</td>
                          <td>
                            <div style={{ fontSize: '12px', fontWeight: 600 }}>{app.stipend}</div>
                            <div style={{ fontSize: '11.5px', color: '#64748b' }}>{app.type}</div>
                          </td>
                          <td>
                            <span className={`ia-status-badge ${app.statusClass}`}>
                              {app.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 6: RESUME VAULT */}
            {activeTab === 'resume' && (
              <div className="ia-card">
                <div className="ia-card-header">
                  <h3 className="ia-card-title">
                    <FileText size={18} color="#2563eb" />
                    Resume & Documents
                  </h3>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: '#fee2e2',
                      color: '#dc2626',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '12px'
                    }}>
                      PDF
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#071c46' }}>
                        Kashish_Khichi_Resume_2026.pdf
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        142 KB • Updated 2 days ago • Verified
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="ia-btn-secondary" onClick={handleDownloadResume}>
                      <Download size={13} />
                      Download
                    </button>
                    <button className="ia-btn-primary" onClick={() => showToast('Opening file selector to replace resume 📁')}>
                      <Upload size={13} />
                      Replace
                    </button>
                  </div>
                </div>

                <div className="ia-resume-box">
                  <Upload size={28} color="#2563eb" style={{ marginBottom: '8px' }} />
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#071c46', marginBottom: '4px' }}>
                    Upload an updated resume
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    Supported formats: PDF, DOCX (Max size: 5MB)
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Column */}
          <div>
            {/* Quick Contact Card */}
            <div className="ia-card">
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#071c46', marginBottom: '14px' }}>
                Contact & Verification
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                <div>
                  <div style={{ color: '#64748b', fontSize: '11px', fontWeight: 700 }}>INSTITUTE EMAIL</div>
                  <div style={{ fontWeight: 600, color: '#071c46' }}>{profile.email}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '11px', fontWeight: 700 }}>PHONE NUMBER</div>
                  <div style={{ fontWeight: 600, color: '#071c46' }}>{profile.phone}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '11px', fontWeight: 700 }}>COLLEGE ROLL / ID</div>
                  <div style={{ fontWeight: 600, color: '#071c46' }}>22/CS/104 (DTU Verified)</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '11px', fontWeight: 700 }}>CURRENT CGPA</div>
                  <div style={{ fontWeight: 700, color: '#16a34a' }}>{profile.cgpa} / 10.0</div>
                </div>
              </div>
            </div>

            {/* Application Tips Card */}
            <div className="ia-card" style={{ background: 'linear-gradient(135deg, #eff6ff, #f8fafc)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Sparkles size={16} color="#2563eb" />
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1e40af' }}>InternAtlas Tip</h4>
              </div>
              <p style={{ fontSize: '12.5px', color: '#334155', lineHeight: '1.6', marginBottom: '12px' }}>
                Students with verified GitHub and project links receive <strong>4x more interview shortlists</strong> from recruiters on InternAtlas.
              </p>
              <button
                onClick={openEditModal}
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#2563eb',
                  background: '#ffffff',
                  border: '1px solid #bfdbfe',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Update Profile Links →
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="ia-modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="ia-modal-container" onClick={e => e.stopPropagation()}>
            <div className="ia-modal-header">
              <h3>Edit Student Profile</h3>
              <button className="ia-modal-close-btn" onClick={() => setIsEditModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile}>
              <div className="ia-modal-body">
                <div className="ia-form-group">
                  <label className="ia-form-label">Full Name</label>
                  <input
                    type="text"
                    className="ia-form-input"
                    value={editFormData.fullName}
                    onChange={e => setEditFormData({ ...editFormData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="ia-form-group">
                  <label className="ia-form-label">Professional Headline</label>
                  <input
                    type="text"
                    className="ia-form-input"
                    value={editFormData.headline}
                    onChange={e => setEditFormData({ ...editFormData, headline: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="ia-form-group">
                    <label className="ia-form-label">College / University</label>
                    <input
                      type="text"
                      className="ia-form-input"
                      value={editFormData.college}
                      onChange={e => setEditFormData({ ...editFormData, college: e.target.value })}
                      required
                    />
                  </div>

                  <div className="ia-form-group">
                    <label className="ia-form-label">Graduation Year & CGPA</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <input
                        type="text"
                        className="ia-form-input"
                        value={editFormData.graduationYear}
                        onChange={e => setEditFormData({ ...editFormData, graduationYear: e.target.value })}
                        placeholder="Year (e.g. 2026)"
                      />
                      <input
                        type="text"
                        className="ia-form-input"
                        value={editFormData.cgpa}
                        onChange={e => setEditFormData({ ...editFormData, cgpa: e.target.value })}
                        placeholder="CGPA (8.8)"
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="ia-form-group">
                    <label className="ia-form-label">Email Address</label>
                    <input
                      type="email"
                      className="ia-form-input"
                      value={editFormData.email}
                      onChange={e => setEditFormData({ ...editFormData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="ia-form-group">
                    <label className="ia-form-label">Phone Number</label>
                    <input
                      type="text"
                      className="ia-form-input"
                      value={editFormData.phone}
                      onChange={e => setEditFormData({ ...editFormData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="ia-form-group">
                  <label className="ia-form-label">About Me (Bio)</label>
                  <textarea
                    rows={4}
                    className="ia-form-textarea"
                    value={editFormData.bio}
                    onChange={e => setEditFormData({ ...editFormData, bio: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="ia-form-group">
                    <label className="ia-form-label">GitHub URL</label>
                    <input
                      type="url"
                      className="ia-form-input"
                      value={editFormData.github}
                      onChange={e => setEditFormData({ ...editFormData, github: e.target.value })}
                    />
                  </div>
                  <div className="ia-form-group">
                    <label className="ia-form-label">LinkedIn URL</label>
                    <input
                      type="url"
                      className="ia-form-input"
                      value={editFormData.linkedin}
                      onChange={e => setEditFormData({ ...editFormData, linkedin: e.target.value })}
                    />
                  </div>
                </div>

                {/* Manage Skills */}
                <div className="ia-form-group">
                  <label className="ia-form-label">Skills & Tech Stack</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <input
                      type="text"
                      className="ia-form-input"
                      placeholder="Add a new skill (e.g. Next.js, Redux, Docker)"
                      value={newSkillInput}
                      onChange={e => setNewSkillInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="ia-btn-primary"
                      onClick={handleAddSkill}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {editFormData.skills.map((s, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '12px',
                          background: '#f1f5f9',
                          color: '#071c46',
                          border: '1px solid #cbd5e1',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        {s.name}
                        <Trash2
                          size={12}
                          color="#ef4444"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleRemoveSkill(s.name)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="ia-modal-footer">
                <button
                  type="button"
                  className="ia-btn-secondary"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="ia-btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
