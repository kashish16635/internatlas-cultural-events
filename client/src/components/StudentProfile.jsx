import React, { useState, useEffect, useRef } from 'react';
import './StudentProfile.css';
import {
  Edit2,
  Trash2,
  Plus,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  X,
  Lightbulb,
  Star,
  Check
} from 'lucide-react';

const initialProfileData = {
  fullName: "Kashish Khichi",
  location: "Ujjain",
  email: "thakur.kashish353@gmail.com",
  phone: "+91 9713424201",
  careerObjective: "B.Tech CSE student skilled in React.js, Python scripting, and GenAI. Experienced in building responsive dashboards, Gemini API integrations, and location-based telemetry systems. Seeking an engineering role to contribute full-stack development skills to scalable real-world projects.",
  github: "https://github.com/kashish16635",
  linkedin: "https://linkedin.com/in/kashish-khichi",
  portfolio: "https://kashishkhichi.dev",
  education: [
    {
      id: "edu-1",
      degree: "B.Tech, Computer Science and Engineering",
      institution: "Delhi Technological University (DTU, formerly DCE)",
      duration: "2023 - 2027",
      grade: "8.84 / 10",
      scoreLabel: "Current CGPA"
    },
    {
      id: "edu-2",
      degree: "Senior Secondary (XII), Science (CBSE)",
      institution: "Delhi Public School, R.K. Puram",
      duration: "2021 - 2023",
      grade: "96.40%",
      scoreLabel: "Board Performance"
    },
    {
      id: "edu-3",
      degree: "Secondary (X), CBSE",
      institution: "Delhi Public School, R.K. Puram",
      duration: "2019 - 2021",
      grade: "97.20%",
      scoreLabel: "Board Performance"
    }
  ],
  internships: [
    {
      id: "int-1",
      title: "Frontend Engineering Intern",
      company: "InternAtlas Labs",
      location: "Work from Home / Bengaluru",
      duration: "Sep 2026 - Present",
      bullets: [
        "Engineered the responsive Student Profile & Opportunity Modules using Next.js 16, TypeScript, and Tailwind CSS.",
        "Implemented continuous paper resume generator and real-time application tracking dashboard."
      ]
    }
  ],
  responsibilities: [
    {
      id: "por-1",
      title: "Core Technical Council Member — DTU Student Developer Club",
      duration: "Aug 2024 - Present",
      description: "Organized annual technical hackathons, conducted developer orientation sessions for 300+ students, and contributed to departmental web portals."
    }
  ],
  trainings: [
    {
      id: "trn-1",
      title: "Full Stack Web Development Specialization",
      institution: "Meta & Coursera",
      duration: "Jun 2024 - Aug 2024",
      description: "Comprehensive training covering React, modern asynchronous JavaScript, REST APIs, and database fundamentals."
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Cultural Events & Fest Finder for Campus Communities",
      duration: "Aug 2026 - Sep 2026",
      liveUrl: "https://internatlas-cultural-events.vercel.app",
      description: "Engineered campus discovery dashboard with event schedules, category filters, live booking passes and QR ticketing using React and Node.js."
    },
    {
      id: "proj-2",
      title: "TechSprint - Peer-to-Peer Mock Interview Matcher",
      duration: "May 2026 - Jul 2026",
      liveUrl: "https://techsprint.dev",
      description: "WebRTC powered collaborative code editor and peer interview room pairing college engineering students for peer code reviews."
    }
  ],
  skills: [
    { name: "React.js", level: "Advanced" },
    { name: "Next.js", level: "Advanced" },
    { name: "TypeScript", level: "Advanced" },
    { name: "JavaScript", level: "Advanced" },
    { name: "Tailwind CSS", level: "Advanced" },
    { name: "Python", level: "Intermediate" },
    { name: "Node.js", level: "Intermediate" },
    { name: "PostgreSQL", level: "Intermediate" },
    { name: "Git & GitHub", level: "Advanced" }
  ],
  applications: [
    {
      id: "app-1",
      company: "InternAtlas Labs",
      role: "Frontend Engineering Intern",
      appliedDate: "18 Sep 2026",
      status: "Shortlisted",
      applicants: 142
    },
    {
      id: "app-2",
      company: "Razorpay",
      role: "Product Engineering Intern",
      appliedDate: "12 Sep 2026",
      status: "In-touch",
      applicants: 320
    },
    {
      id: "app-3",
      company: "Zepto Labs",
      role: "React / Next.js Developer",
      appliedDate: "05 Sep 2026",
      status: "Applied",
      applicants: 215
    },
    {
      id: "app-4",
      company: "Cred",
      role: "Full Stack Engineering Fellow",
      appliedDate: "28 Aug 2026",
      status: "Applied",
      applicants: 450
    }
  ]
};

export default function StudentProfile({ onNavigateToEvents }) {
  const [profile, setProfile] = useState(initialProfileData);
  const [activeView, setActiveView] = useState("resume"); // 'resume', 'applications', 'bookmarks', 'preferences'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [editModal, setEditModal] = useState(null); // 'personal', 'objective'

  const dropdownRef = useRef(null);

  const [personalForm, setPersonalForm] = useState({
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    location: profile.location
  });

  const [objectiveText, setObjectiveText] = useState(profile.careerObjective);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("internatlas_student_profile");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.education) && Array.isArray(parsed.applications)) {
          const merged = {
            ...parsed,
            phone: "+91 9713424201",
            location: "Ujjain",
            careerObjective: parsed.careerObjective || initialProfileData.careerObjective
          };
          setProfile(merged);
          setPersonalForm({
            fullName: merged.fullName,
            email: merged.email,
            phone: merged.phone,
            location: merged.location
          });
          setObjectiveText(merged.careerObjective);
          localStorage.setItem("internatlas_student_profile", JSON.stringify(merged));
        } else {
          setProfile(initialProfileData);
          localStorage.setItem("internatlas_student_profile", JSON.stringify(initialProfileData));
        }
      } else {
        localStorage.setItem("internatlas_student_profile", JSON.stringify(initialProfileData));
      }
    } catch (e) {}
  }, []);

  const handlePersonalSave = (e) => {
    e.preventDefault();
    const updated = { ...profile, ...personalForm };
    setProfile(updated);
    try {
      localStorage.setItem("internatlas_student_profile", JSON.stringify(updated));
    } catch (err) {}
    setEditModal(null);
  };

  const handleObjectiveSave = (e) => {
    e.preventDefault();
    const updated = { ...profile, careerObjective: objectiveText };
    setProfile(updated);
    try {
      localStorage.setItem("internatlas_student_profile", JSON.stringify(updated));
    } catch (err) {}
    setEditModal(null);
  };

  const handlePrintResume = () => {
    window.print();
  };

  return (
    <div className="ish-wrapper">
      {/* Top Navbar */}
      <header className="ish-header">
        <div className="ish-header-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <span className="ish-logo">
              <span className="ish-logo-main">InternAtlas</span>
            </span>
          </div>

          <div className="ish-header-right">
            <span className="ish-nav-link" onClick={() => setActiveView("resume")}>
              Internships
            </span>
            <span className="ish-nav-link">
              Courses <span className="ish-offer-pill">OFFER</span>
            </span>
            <span className="ish-nav-link" onClick={() => setActiveView("resume")}>
              Jobs
            </span>

            {/* Avatar Pill Button with HOVER */}
            <div
              className="ish-avatar-wrapper"
              ref={dropdownRef}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div
                className="ish-avatar-btn"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                title="Hover or click to view profile menu"
              >
                <span>K</span>
                <ChevronDown size={12} style={{ marginLeft: '2px' }} />
              </div>

              {/* USER POPUP DROPDOWN (Exact Internshala Layout) */}
              {isDropdownOpen && (
                <div className="ish-dropdown-menu">
                <div className="ish-dropdown-header">
                  <p className="ish-dropdown-name">{profile.fullName}</p>
                  <p className="ish-dropdown-email">{profile.email}</p>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="ish-rating-badge">
                      <Star size={13} className="ish-rating-star" fill="#eab308" />
                      <span>4.5</span>
                    </div>
                    <span className="ish-rating-link">Know More &gt;</span>
                  </div>
                </div>

                <ul className="ish-dropdown-list">
                  <li>
                    <span
                      className="ish-dropdown-item"
                      onClick={() => {
                        setActiveView("resume");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Home
                    </span>
                  </li>
                  <li>
                    <span
                      className="ish-dropdown-item"
                      onClick={() => {
                        setActiveView("applications");
                        setIsDropdownOpen(false);
                      }}
                    >
                      My Applications
                    </span>
                  </li>
                  <li>
                    <span
                      className="ish-dropdown-item"
                      onClick={() => {
                        setActiveView("bookmarks");
                        setIsDropdownOpen(false);
                      }}
                    >
                      My Bookmarks
                    </span>
                  </li>
                  <li>
                    <span
                      className="ish-dropdown-item"
                      style={{ fontWeight: 700, color: '#008bdc' }}
                      onClick={() => {
                        setActiveView("resume");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Edit Resume
                    </span>
                  </li>
                  <li>
                    <span
                      className="ish-dropdown-item"
                      onClick={() => {
                        setActiveView("preferences");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Edit Preferences
                    </span>
                  </li>
                  <li>
                    <span className="ish-dropdown-item">Safety Tips</span>
                  </li>
                  <li>
                    <span className="ish-dropdown-item">Help Center</span>
                  </li>
                  <li>
                    <span className="ish-dropdown-item" onClick={onNavigateToEvents} style={{ color: '#008bdc' }}>
                      Switch to Cultural Events
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="ish-main-container">
        {/* ======================================================== */}
        {/* VIEW 1: RESUME BUILDER (Exact Internshala 2-Column Sheet) */}
        {/* ======================================================== */}
        {activeView === "resume" && (
          <div>
            <div className="ish-back-link" onClick={onNavigateToEvents}>
              <ChevronLeft size={16} />
              <span>Back</span>
            </div>

            <h1 className="ish-page-title-center">InternAtlas Resume</h1>

            {/* 4 Sections Need Attention Banner */}
            <div className="ish-attention-banner">
              <div className="ish-banner-left">
                <Lightbulb size={18} color="#0284c7" />
                <span>4 sections in your InternAtlas resume need attention</span>
              </div>
              <button
                className="ish-review-btn"
                onClick={() => alert("Profile Review: Add 1 more verified internship and project link to achieve 100% profile score!")}
              >
                Review Now
              </button>
            </div>

            {/* Resume Sheet */}
            <div className="ish-paper-sheet">
              <div className="ish-sheet-top-caption">
                This is the resume companies will see when you apply
              </div>

              <div className="ish-sheet-body">
                {/* Personal Info Header */}
                <div className="ish-sheet-header">
                  <div>
                    <h2 className="ish-person-name">
                      {profile.fullName}
                      <Edit2
                        size={16}
                        className="ish-edit-icon"
                        onClick={() => {
                          setPersonalForm({
                            fullName: profile.fullName,
                            email: profile.email,
                            phone: profile.phone,
                            location: profile.location
                          });
                          setEditModal("personal");
                        }}
                      />
                    </h2>
                    <div className="ish-person-info">
                      <div>{profile.email}</div>
                      <div>{profile.phone}</div>
                      <div>{profile.location}</div>
                    </div>
                  </div>

                  <span className="ish-download-link" onClick={handlePrintResume}>
                    <Download size={14} />
                    <span>Download Resume</span>
                  </span>
                </div>

                {/* 1. CAREER OBJECTIVE */}
                <div className="ish-section-row">
                  <div className="ish-col-left">Career Objective</div>
                  <div className="ish-col-right">
                    <div className="ish-content-card">
                      <div className="ish-card-actions">
                        <Edit2
                          size={14}
                          className="ish-action-icon"
                          onClick={() => setEditModal("objective")}
                        />
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, color: '#334155' }}>
                        {profile.careerObjective || initialProfileData.careerObjective}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. EDUCATION */}
                <div className="ish-section-row">
                  <div className="ish-col-left">Education</div>
                  <div className="ish-col-right">
                    {(profile?.education || []).map((edu) => (
                      <div key={edu.id} className="ish-content-card">
                        <div className="ish-card-actions">
                          <Edit2 size={14} className="ish-action-icon" onClick={() => alert("Edit Education")} />
                        </div>
                        <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                          {edu.degree}
                        </h4>
                        <p style={{ margin: '0 0 2px 0', fontSize: '13px', color: '#475569' }}>
                          {edu.institution}
                        </p>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#64748b' }}>
                          {edu.duration}
                        </p>
                        <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>
                          {edu.scoreLabel}: <strong style={{ color: '#047857' }}>{edu.grade}</strong>
                        </p>
                      </div>
                    ))}
                    <span className="ish-add-section-link" onClick={() => alert("Add education form")}>
                      <Plus size={12} /> Add education
                    </span>
                  </div>
                </div>

                {/* 3. JOBS */}
                <div className="ish-section-row">
                  <div className="ish-col-left">Jobs</div>
                  <div className="ish-col-right">
                    <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>
                      No full-time jobs added yet.
                    </p>
                    <span className="ish-add-section-link" onClick={() => alert("Add job form")}>
                      <Plus size={12} /> Add job
                    </span>
                  </div>
                </div>

                {/* 4. INTERNSHIPS */}
                <div className="ish-section-row">
                  <div className="ish-col-left">Internships</div>
                  <div className="ish-col-right">
                    {(profile?.internships || []).map((int) => (
                      <div key={int.id} className="ish-content-card">
                        <div className="ish-card-actions">
                          <Edit2 size={14} className="ish-action-icon" onClick={() => alert("Edit Internship")} />
                        </div>
                        <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                          {int.title}
                        </h4>
                        <p style={{ margin: '0 0 2px 0', fontSize: '13px', color: '#475569' }}>
                          {int.company}
                        </p>
                        <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#64748b' }}>
                          {int.location} • {int.duration}
                        </p>
                        <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: '#475569', lineHeight: 1.6 }}>
                          {int.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <span className="ish-add-section-link" onClick={() => alert("Add internship form")}>
                      <Plus size={12} /> Add internship
                    </span>
                  </div>
                </div>

                {/* 5. POSITIONS OF RESPONSIBILITY */}
                <div className="ish-section-row">
                  <div className="ish-col-left">Positions of Responsibility</div>
                  <div className="ish-col-right">
                    {(profile?.responsibilities || []).map((por) => (
                      <div key={por.id} className="ish-content-card">
                        <div className="ish-card-actions">
                          <Edit2 size={14} className="ish-action-icon" onClick={() => alert("Edit POR")} />
                        </div>
                        <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                          {por.title}
                        </h4>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#64748b' }}>
                          {por.duration}
                        </p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#475569', lineHeight: 1.6 }}>
                          {por.description}
                        </p>
                      </div>
                    ))}
                    <span className="ish-add-section-link" onClick={() => alert("Add position form")}>
                      <Plus size={12} /> Add position of responsibility
                    </span>
                  </div>
                </div>

                {/* 6. TRAININGS / COURSES */}
                <div className="ish-section-row">
                  <div className="ish-col-left">Trainings / Courses</div>
                  <div className="ish-col-right">
                    {(profile?.trainings || []).map((trn) => (
                      <div key={trn.id} className="ish-content-card">
                        <div className="ish-card-actions">
                          <Edit2 size={14} className="ish-action-icon" onClick={() => alert("Edit training")} />
                        </div>
                        <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                          {trn.title}
                        </h4>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#64748b' }}>
                          {trn.institution} • {trn.duration}
                        </p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#475569', lineHeight: 1.6 }}>
                          {trn.description}
                        </p>
                      </div>
                    ))}
                    <span className="ish-add-section-link" onClick={() => alert("Add training form")}>
                      <Plus size={12} /> Add training/ course
                    </span>
                  </div>
                </div>

                {/* 7. ACADEMICS / PERSONAL PROJECTS */}
                <div className="ish-section-row">
                  <div className="ish-col-left">Academics / Personal Projects</div>
                  <div className="ish-col-right">
                    {(profile?.projects || []).map((proj) => (
                      <div key={proj.id} className="ish-content-card">
                        <div className="ish-card-actions">
                          <Edit2 size={14} className="ish-action-icon" onClick={() => alert("Edit project")} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                            {proj.title}
                          </h4>
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', color: '#008bdc', fontSize: '12px', textDecoration: 'none', fontWeight: 600 }}
                            >
                              <span>Project link</span>
                              <ExternalLink size={11} />
                            </a>
                          )}
                        </div>
                        <p style={{ margin: '2px 0 6px 0', fontSize: '12px', color: '#64748b' }}>
                          {proj.duration}
                        </p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#475569', lineHeight: 1.6 }}>
                          {proj.description}
                        </p>
                      </div>
                    ))}
                    <span className="ish-add-section-link" onClick={() => alert("Add project form")}>
                      <Plus size={12} /> Add academic/ personal project
                    </span>
                  </div>
                </div>

                {/* 8. SKILLS */}
                <div className="ish-section-row">
                  <div className="ish-col-left">Skills</div>
                  <div className="ish-col-right">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                      {(profile?.skills || []).map((skill) => (
                        <div
                          key={skill.name}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#f1f5f9',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#334155'
                          }}
                        >
                          <span>{skill.name}</span>
                          <span style={{ fontSize: '10px', color: '#64748b' }}>({skill.level})</span>
                        </div>
                      ))}
                    </div>
                    <span className="ish-add-section-link" onClick={() => alert("Add skill form")}>
                      <Plus size={12} /> Add skill
                    </span>
                  </div>
                </div>

                {/* 9. PORTFOLIO / WORK SAMPLES */}
                <div className="ish-section-row">
                  <div className="ish-col-left">Portfolio / Work Samples</div>
                  <div className="ish-col-right">
                    <div style={{ fontSize: '13px', lineHeight: 2 }}>
                      <div>
                        <strong>GitHub profile: </strong>
                        <a href={profile.github} target="_blank" rel="noreferrer" style={{ color: '#008bdc' }}>
                          {profile.github}
                        </a>
                      </div>
                      <div>
                        <strong>Developer portfolio: </strong>
                        <a href={profile.portfolio} target="_blank" rel="noreferrer" style={{ color: '#008bdc' }}>
                          {profile.portfolio}
                        </a>
                      </div>
                      <div>
                        <strong>LinkedIn profile: </strong>
                        <a href={profile.linkedin} target="_blank" rel="noreferrer" style={{ color: '#008bdc' }}>
                          {profile.linkedin}
                        </a>
                      </div>
                    </div>
                    <span className="ish-add-section-link" onClick={() => alert("Add portfolio sample")}>
                      <Plus size={12} /> Add portfolio/ work sample
                    </span>
                  </div>
                </div>

                {/* 10. ACCOMPLISHMENTS */}
                <div className="ish-section-row">
                  <div className="ish-col-left">Accomplishments</div>
                  <div className="ish-col-right">
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: '#475569', lineHeight: 1.8 }}>
                      <li>School Scholar Badge recipient for consecutive academic distinction at DPS R.K. Puram.</li>
                      <li>State-level Junior Science Olympiad Qualifier with Merit Distinction in Mathematics.</li>
                      <li>Ranked top 10% in DTU departmental algorithmic coding and data structures assessments.</li>
                    </ul>
                    <span className="ish-add-section-link" onClick={() => alert("Add accomplishment form")}>
                      <Plus size={12} /> Add accomplishment/ additional detail
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: MY APPLICATIONS TABLE */}
        {/* ======================================================== */}
        {activeView === "applications" && (
          <div className="ish-apps-container">
            <div className="ish-back-link" onClick={() => setActiveView("resume")}>
              <ChevronLeft size={16} />
              <span>Back to Resume</span>
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0' }}>
              My Applications
            </h1>

            <div className="ish-apps-table-card">
              <table className="ish-apps-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Profile</th>
                    <th>Applied On</th>
                    <th>Number of Applicants</th>
                    <th>Application Status</th>
                    <th style={{ textAlign: 'center' }}>Review Application</th>
                  </tr>
                </thead>
                <tbody>
                  {(profile?.applications || []).map((app) => (
                    <tr key={app.id}>
                      <td style={{ fontWeight: 700, color: '#0f172a' }}>{app.company}</td>
                      <td style={{ fontWeight: 600 }}>{app.role}</td>
                      <td style={{ color: '#64748b' }}>{app.appliedDate}</td>
                      <td style={{ color: '#64748b' }}>{app.applicants}</td>
                      <td>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            borderRadius: '999px',
                            fontSize: '11px',
                            fontWeight: 700,
                            background: app.status === 'Shortlisted' ? '#dcfce7' : app.status === 'In-touch' ? '#dbeafe' : '#f1f5f9',
                            color: app.status === 'Shortlisted' ? '#166534' : app.status === 'In-touch' ? '#1e40af' : '#475569'
                          }}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span
                          style={{ color: '#008bdc', fontWeight: 600, cursor: 'pointer' }}
                          onClick={() => alert(`Review application for ${app.role} at ${app.company}`)}
                        >
                          View
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* EDIT MODAL: PERSONAL DETAILS */}
      {editModal === "personal" && (
        <div className="ish-modal-overlay">
          <div className="ish-modal-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Personal Details</h3>
              <X size={16} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setEditModal(null)} />
            </div>

            <form onSubmit={handlePersonalSave} style={{ fontSize: '12px' }}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px' }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={personalForm.fullName}
                  onChange={(e) => setPersonalForm({ ...personalForm, fullName: e.target.value })}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px' }}>Email</label>
                <input
                  type="email"
                  required
                  value={personalForm.email}
                  onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px' }}>Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={personalForm.phone}
                  onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px' }}>Current City</label>
                <input
                  type="text"
                  required
                  value={personalForm.location}
                  onChange={(e) => setPersonalForm({ ...personalForm, location: e.target.value })}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setEditModal(null)}
                  style={{ padding: '6px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '6px 16px', background: '#008bdc', color: '#ffffff', border: 'none', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', fontSize: '12px' }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL: CAREER OBJECTIVE */}
      {editModal === "objective" && (
        <div className="ish-modal-overlay">
          <div className="ish-modal-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Career Objective</h3>
              <X size={16} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setEditModal(null)} />
            </div>

            <form onSubmit={handleObjectiveSave} style={{ fontSize: '12px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px' }}>
                  Write a brief summary of your skills and career interests
                </label>
                <textarea
                  rows={5}
                  value={objectiveText}
                  onChange={(e) => setObjectiveText(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', lineHeight: 1.6 }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setEditModal(null)}
                  style={{ padding: '6px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '6px 16px', background: '#008bdc', color: '#ffffff', border: 'none', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', fontSize: '12px' }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
