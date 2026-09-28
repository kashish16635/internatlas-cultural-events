import React, { useState, useEffect } from 'react';
import './StudentProfile.css';
import {
  Edit2,
  Trash2,
  Plus,
  Download,
  ExternalLink,
  Briefcase,
  FileText,
  Bookmark,
  Sliders,
  X,
  Eye,
  Check
} from 'lucide-react';

const initialProfileData = {
  fullName: "Kashish Khichi",
  location: "New Delhi, India",
  email: "thakur.kashish353@gmail.com",
  phone: "+91 98765 43210",
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
    { name: "Node.js", level: "Intermediate" },
    { name: "PostgreSQL", level: "Intermediate" },
    { name: "Git & GitHub", level: "Advanced" },
    { name: "Data Structures & Algorithms", level: "Proficient" }
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
  const [activeTab, setActiveTab] = useState("resume"); // resume, applications, bookmarks, preferences
  const [activeModal, setActiveModal] = useState(null);

  const [personalForm, setPersonalForm] = useState({
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    location: profile.location
  });

  const [bookmarks, setBookmarks] = useState([
    {
      id: "bm-1",
      title: "Full Stack Web Developer Intern",
      company: "Swiggy",
      location: "Bengaluru / Work from Home",
      stipend: "₹35,000 /month",
      duration: "6 Months",
      posted: "2 days ago",
      applyBy: "10 Oct 2026"
    },
    {
      id: "bm-2",
      title: "Frontend Engineering Intern",
      company: "PhonePe",
      location: "Bengaluru",
      stipend: "₹40,000 /month",
      duration: "3 Months",
      posted: "1 day ago",
      applyBy: "15 Oct 2026"
    }
  ]);

  const [preferences, setPreferences] = useState({
    fields: ["Web Development", "Frontend Development", "Software Engineering"],
    workMode: "Work from home (WFH) & Hybrid",
    locations: ["Delhi NCR", "Bengaluru", "Remote"],
    minStipend: "₹20,000 /month",
    availability: "Immediate (within 7 days)"
  });
  const [prefSaved, setPrefSaved] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("internatlas_student_profile");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.education) && Array.isArray(parsed.applications)) {
          setProfile(parsed);
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
    const updated = {
      ...profile,
      ...personalForm
    };
    setProfile(updated);
    try {
      localStorage.setItem("internatlas_student_profile", JSON.stringify(updated));
    } catch (err) {}
    setActiveModal(null);
  };

  const handlePrintResume = () => {
    window.print();
  };

  return (
    <div className="ish-wrapper">
      {/* Top Header */}
      <header className="ish-header">
        <div className="ish-header-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span className="ish-logo">
              Intern<span className="ish-logo-accent">Atlas.</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={onNavigateToEvents} className="ish-switch-btn">
              Switch to Events Finder
            </button>
            <div className="ish-user-avatar">K</div>
          </div>
        </div>
      </header>

      {/* Internshala Style Sub-Navigation */}
      <div className="ish-subnav">
        <div className="ish-subnav-container">
          <div className="ish-nav-tabs">
            <button
              onClick={() => setActiveTab("resume")}
              className={`ish-tab-btn ${activeTab === "resume" ? "active" : ""}`}
            >
              <FileText size={16} />
              <span>Resume</span>
            </button>

            <button
              onClick={() => setActiveTab("applications")}
              className={`ish-tab-btn ${activeTab === "applications" ? "active" : ""}`}
            >
              <Briefcase size={16} />
              <span>My Applications</span>
              <span className="ish-badge-count">{(profile?.applications || []).length}</span>
            </button>

            <button
              onClick={() => setActiveTab("bookmarks")}
              className={`ish-tab-btn ${activeTab === "bookmarks" ? "active" : ""}`}
            >
              <Bookmark size={16} />
              <span>My Bookmarks</span>
              <span className="ish-badge-count">{bookmarks.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("preferences")}
              className={`ish-tab-btn ${activeTab === "preferences" ? "active" : ""}`}
            >
              <Sliders size={16} />
              <span>Edit Preferences</span>
            </button>
          </div>

          {activeTab === "resume" && (
            <button onClick={handlePrintResume} className="ish-download-btn">
              <Download size={13} />
              <span>Download Resume</span>
            </button>
          )}
        </div>
      </div>

      <div className="ish-main-container">
        {/* ======================================================== */}
        {/* RESUME TAB (INTERNSHALA RESUME PAPER) */}
        {/* ======================================================== */}
        {activeTab === "resume" && (
          <div>
            <div className="ish-page-header">
              <div>
                <h1 className="ish-page-title">Resume</h1>
                <p className="ish-page-subtitle">
                  Keep your resume up to date. Employers download this resume when you apply.
                </p>
              </div>
            </div>

            <div className="ish-resume-sheet">
              {/* 1. PERSONAL DETAILS */}
              <div className="ish-resume-header">
                <div>
                  <h2 className="ish-user-name">{profile.fullName}</h2>
                  <div className="ish-user-meta">
                    <div>{profile.email}</div>
                    <div>{profile.phone}</div>
                    <div>{profile.location}</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setPersonalForm({
                      fullName: profile.fullName,
                      email: profile.email,
                      phone: profile.phone,
                      location: profile.location,
                    });
                    setActiveModal("personal");
                  }}
                  className="ish-icon-btn"
                  title="Edit Personal Details"
                >
                  <Edit2 size={16} />
                </button>
              </div>

              {/* 2. EDUCATION */}
              <div className="ish-resume-section">
                <div className="ish-section-top">
                  <h3 className="ish-section-title">Education</h3>
                  <button onClick={() => alert("Add education")} className="ish-add-btn">
                    <Plus size={13} />
                    <span>Add education</span>
                  </button>
                </div>

                <div>
                  {(profile?.education || []).map((edu) => (
                    <div key={edu.id} className="ish-item">
                      <div>
                        <h4 className="ish-item-title">{edu.degree}</h4>
                        <p className="ish-item-subtitle">{edu.institution}</p>
                        <p className="ish-item-date">{edu.duration}</p>
                        <p className="ish-item-score">
                          {edu.scoreLabel}: <span className="ish-score-badge">{edu.grade}</span>
                        </p>
                      </div>

                      <button className="ish-icon-btn" title="Edit">
                        <Edit2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. JOBS */}
              <div className="ish-resume-section">
                <div className="ish-section-top">
                  <h3 className="ish-section-title">Jobs</h3>
                  <button onClick={() => alert("Add job")} className="ish-add-btn">
                    <Plus size={13} />
                    <span>Add job</span>
                  </button>
                </div>
                <p style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic', margin: 0 }}>
                  No full-time jobs added yet. Click &quot;Add job&quot; if you have worked in a full-time or part-time role.
                </p>
              </div>

              {/* 4. INTERNSHIPS */}
              <div className="ish-resume-section">
                <div className="ish-section-top">
                  <h3 className="ish-section-title">Internships</h3>
                  <button onClick={() => alert("Add internship")} className="ish-add-btn">
                    <Plus size={13} />
                    <span>Add internship</span>
                  </button>
                </div>

                <div className="ish-item">
                  <div>
                    <h4 className="ish-item-title">Frontend Engineering Intern</h4>
                    <p className="ish-item-subtitle">InternAtlas Labs</p>
                    <p className="ish-item-date">Bengaluru (Work from Home) • Sep 2026 - Present</p>
                    <ul className="ish-desc-bullets">
                      <li>Engineered the responsive Student Profile & Opportunity Modules using Next.js 16, TypeScript, and Tailwind CSS.</li>
                      <li>Implemented local persistence and dynamic resume paper generator benchmarked against industry standards.</li>
                    </ul>
                  </div>

                  <button className="ish-icon-btn" title="Edit">
                    <Edit2 size={14} />
                  </button>
                </div>
              </div>

              {/* 5. POSITIONS OF RESPONSIBILITY */}
              <div className="ish-resume-section">
                <div className="ish-section-top">
                  <h3 className="ish-section-title">Positions of Responsibility</h3>
                  <button onClick={() => alert("Add position")} className="ish-add-btn">
                    <Plus size={13} />
                    <span>Add position of responsibility</span>
                  </button>
                </div>

                <div>
                  <h4 className="ish-item-title">
                    Core Technical Council Member — DTU Student Developer Club
                  </h4>
                  <p className="ish-item-date">Aug 2024 - Present</p>
                  <p style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>
                    Organized annual technical hackathons, conducted developer orientation sessions for 300+ students, and contributed to departmental web portals.
                  </p>
                </div>
              </div>

              {/* 6. TRAININGS / COURSES */}
              <div className="ish-resume-section">
                <div className="ish-section-top">
                  <h3 className="ish-section-title">Trainings / Courses</h3>
                  <button onClick={() => alert("Add training")} className="ish-add-btn">
                    <Plus size={13} />
                    <span>Add training/ course</span>
                  </button>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 className="ish-item-title">Full Stack Web Development Specialization</h4>
                    <span className="ish-item-date">Jun 2024 - Aug 2024</span>
                  </div>
                  <p className="ish-item-subtitle">Meta & Coursera • Online</p>
                  <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                    Comprehensive training covering React, modern asynchronous JavaScript, REST APIs, and database fundamentals.
                  </p>
                </div>
              </div>

              {/* 7. ACADEMICS / PERSONAL PROJECTS */}
              <div className="ish-resume-section">
                <div className="ish-section-top">
                  <h3 className="ish-section-title">Academics / Personal Projects</h3>
                  <button onClick={() => alert("Add project")} className="ish-add-btn">
                    <Plus size={13} />
                    <span>Add academic/ personal project</span>
                  </button>
                </div>

                <div>
                  {(profile?.projects || []).map((proj) => (
                    <div key={proj.id} className="ish-item">
                      <div style={{ maxWidth: '650px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h4 className="ish-item-title">{proj.title}</h4>
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="ish-portfolio-link"
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}
                            >
                              <span>Project link</span>
                              <ExternalLink size={11} />
                            </a>
                          )}
                        </div>
                        <p className="ish-item-date">{proj.duration}</p>
                        <p style={{ fontSize: '12px', color: '#475569', marginTop: '4px', lineHeight: 1.6 }}>
                          {proj.description}
                        </p>
                      </div>

                      <button className="ish-icon-btn" title="Edit">
                        <Edit2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. SKILLS */}
              <div className="ish-resume-section">
                <div className="ish-section-top">
                  <h3 className="ish-section-title">Skills</h3>
                  <button onClick={() => alert("Add skill")} className="ish-add-btn">
                    <Plus size={13} />
                    <span>Add skill</span>
                  </button>
                </div>

                <div className="ish-skills-grid">
                  {(profile?.skills || []).map((skill) => (
                    <div key={skill.name} className="ish-skill-card">
                      <div>
                        <p className="ish-skill-name">{skill.name}</p>
                        <p className="ish-skill-level">{skill.level}</p>
                      </div>
                      <X size={13} color="#94a3b8" style={{ cursor: 'pointer' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* 9. PORTFOLIO / WORK SAMPLES */}
              <div className="ish-resume-section">
                <div className="ish-section-top">
                  <h3 className="ish-section-title">Portfolio / Work Samples</h3>
                  <button onClick={() => alert("Add portfolio link")} className="ish-add-btn">
                    <Plus size={13} />
                    <span>Add portfolio/ work sample</span>
                  </button>
                </div>

                <div>
                  <div className="ish-portfolio-row">
                    <div>
                      <strong style={{ color: '#475569' }}>GitHub profile: </strong>
                      <a href={profile.github} target="_blank" rel="noreferrer" className="ish-portfolio-link">
                        {profile.github}
                      </a>
                    </div>
                    <Edit2 size={13} color="#94a3b8" style={{ cursor: 'pointer' }} />
                  </div>

                  <div className="ish-portfolio-row">
                    <div>
                      <strong style={{ color: '#475569' }}>Developer portfolio: </strong>
                      <a href={profile.portfolio} target="_blank" rel="noreferrer" className="ish-portfolio-link">
                        {profile.portfolio}
                      </a>
                    </div>
                    <Edit2 size={13} color="#94a3b8" style={{ cursor: 'pointer' }} />
                  </div>

                  <div className="ish-portfolio-row">
                    <div>
                      <strong style={{ color: '#475569' }}>LinkedIn profile: </strong>
                      <a href={profile.linkedin} target="_blank" rel="noreferrer" className="ish-portfolio-link">
                        {profile.linkedin}
                      </a>
                    </div>
                    <Edit2 size={13} color="#94a3b8" style={{ cursor: 'pointer' }} />
                  </div>
                </div>
              </div>

              {/* 10. ACCOMPLISHMENTS */}
              <div className="ish-resume-section">
                <div className="ish-section-top">
                  <h3 className="ish-section-title">Accomplishments / Additional Details</h3>
                  <button onClick={() => alert("Add accomplishment")} className="ish-add-btn">
                    <Plus size={13} />
                    <span>Add accomplishment/ additional detail</span>
                  </button>
                </div>

                <ul className="ish-desc-bullets">
                  <li>School Scholar Badge recipient for consecutive academic distinction at DPS R.K. Puram.</li>
                  <li>State-level Junior Science Olympiad Qualifier with Merit Distinction in Mathematics.</li>
                  <li>Ranked top 10% in DTU departmental algorithmic coding and data structures assessments.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MY APPLICATIONS TAB */}
        {/* ======================================================== */}
        {activeTab === "applications" && (
          <div>
            <div className="ish-page-header">
              <div>
                <h1 className="ish-page-title">My Applications</h1>
                <p className="ish-page-subtitle">
                  Track status of all your internship and job applications
                </p>
              </div>
            </div>

            <div className="ish-table-card">
              <table className="ish-table">
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
                  {(profile?.applications || []).map((app) => {
                    const statusClass =
                      app.status === "Shortlisted"
                        ? "ish-status-shortlisted"
                        : app.status === "In-touch"
                        ? "ish-status-intouch"
                        : "ish-status-applied";

                    return (
                      <tr key={app.id}>
                        <td style={{ fontWeight: 700, color: '#0f172a' }}>{app.company}</td>
                        <td style={{ fontWeight: 600 }}>{app.role}</td>
                        <td style={{ color: '#64748b' }}>{app.appliedDate}</td>
                        <td style={{ color: '#64748b' }}>{app.applicants}</td>
                        <td>
                          <span className={`ish-status-pill ${statusClass}`}>{app.status}</span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            onClick={() => alert(`Review application for ${app.role} at ${app.company}`)}
                            className="ish-portfolio-link"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Eye size={12} />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* BOOKMARKS TAB */}
        {/* ======================================================== */}
        {activeTab === "bookmarks" && (
          <div>
            <div className="ish-page-header">
              <div>
                <h1 className="ish-page-title">My Bookmarks</h1>
                <p className="ish-page-subtitle">
                  Internships and opportunities you have saved for later
                </p>
              </div>
            </div>

            <div>
              {bookmarks.map((bm) => (
                <div key={bm.id} className="ish-bookmark-card">
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      {bm.title}
                    </h3>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#475569', margin: '3px 0 0 0' }}>
                      {bm.company}
                    </p>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '6px 0 0 0' }}>
                      {bm.location} • {bm.duration} • <strong style={{ color: '#0f172a' }}>{bm.stipend}</strong>
                    </p>
                  </div>

                  <button
                    onClick={() => alert(`Applied to ${bm.title}!`)}
                    className="ish-primary-btn"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* PREFERENCES TAB */}
        {/* ======================================================== */}
        {activeTab === "preferences" && (
          <div>
            <div className="ish-page-header">
              <div>
                <h1 className="ish-page-title">Career Preferences</h1>
                <p className="ish-page-subtitle">
                  Tell us what kind of internships and opportunities you are looking for
                </p>
              </div>
            </div>

            <div className="ish-resume-sheet">
              {prefSaved && (
                <div style={{ background: '#dcfce7', color: '#166534', padding: '10px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={16} /> Preferences saved successfully!
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPrefSaved(true);
                  setTimeout(() => setPrefSaved(false), 2000);
                }}
              >
                <div className="ish-form-group">
                  <label className="ish-form-label">Fields of interest</label>
                  <input
                    type="text"
                    value={preferences.fields.join(", ")}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        fields: e.target.value.split(",").map((s) => s.trim())
                      })
                    }
                    className="ish-form-input"
                  />
                </div>

                <div className="ish-form-group">
                  <label className="ish-form-label">Preferred work mode</label>
                  <select
                    value={preferences.workMode}
                    onChange={(e) => setPreferences({ ...preferences, workMode: e.target.value })}
                    className="ish-form-input"
                  >
                    <option value="Work from home (WFH) & Hybrid">Work from home (WFH) & Hybrid</option>
                    <option value="Only Work from home (WFH)">Only Work from home (WFH)</option>
                    <option value="Only In-office">Only In-office</option>
                  </select>
                </div>

                <button type="submit" className="ish-primary-btn">
                  Save Preferences
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* EDIT PERSONAL DETAILS MODAL */}
      {activeModal === "personal" && (
        <div className="ish-modal-backdrop">
          <div className="ish-modal">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                Personal Details
              </h3>
              <button onClick={() => setActiveModal(null)} className="ish-icon-btn">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handlePersonalSave}>
              <div className="ish-form-group">
                <label className="ish-form-label">Full Name</label>
                <input
                  type="text"
                  required
                  value={personalForm.fullName}
                  onChange={(e) => setPersonalForm({ ...personalForm, fullName: e.target.value })}
                  className="ish-form-input"
                />
              </div>

              <div className="ish-form-group">
                <label className="ish-form-label">Email</label>
                <input
                  type="email"
                  required
                  value={personalForm.email}
                  onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                  className="ish-form-input"
                />
              </div>

              <div className="ish-form-group">
                <label className="ish-form-label">Contact Number</label>
                <input
                  type="tel"
                  required
                  value={personalForm.phone}
                  onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                  className="ish-form-input"
                />
              </div>

              <div className="ish-form-group">
                <label className="ish-form-label">Current City</label>
                <input
                  type="text"
                  required
                  value={personalForm.location}
                  onChange={(e) => setPersonalForm({ ...personalForm, location: e.target.value })}
                  className="ish-form-input"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="ish-switch-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="ish-primary-btn">
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
