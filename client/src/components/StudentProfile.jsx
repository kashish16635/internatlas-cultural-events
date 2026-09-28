import React, { useState, useEffect } from "react";
import "./StudentProfile.css";
import {
  User,
  GraduationCap,
  Briefcase,
  Award,
  FileText,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  Edit3,
  Download,
  Sparkles,
  Share2,
  ShieldCheck,
  ChevronRight,
  X,
  Building,
} from "lucide-react";

const initialProfileData = {
  fullName: "Kashish Khichi",
  headline: "B.Tech CSE Student @ DTU '27 | Full-Stack & GenAI Engineer | Ex-Frontend Intern",
  college: "Delhi Technological University (DTU)",
  degree: "B.Tech, Computer Science and Engineering",
  batch: "Class of 2027",
  location: "New Delhi / Ujjain",
  email: "thakur.kashish353@gmail.com",
  phone: "+91 9713424201",
  completeness: 94,
  about: `Computer Science undergraduate with demonstrable expertise in scalable React / Next.js web applications, responsive user interfaces, and AI engineering workflows.

Proven track record of designing production-grade portals, including discovery dashboards, responsive candidate profile suites, and real-time application pipelines. Passionate about performant design systems, clean code architectures, and developer tooling.`,
  github: "https://github.com/kashish16635",
  linkedin: "https://linkedin.com/in/kashish-khichi",
  portfolio: "https://kashishkhichi.dev",
  stats: {
    applications: 14,
    interviews: 3,
    skillsVerified: 12,
  },
  education: [
    {
      id: "edu-1",
      degree: "B.Tech, Computer Science and Engineering",
      institution: "Delhi Technological University (DTU, formerly DCE)",
      location: "New Delhi",
      duration: "2023 - 2027",
      grade: "8.84 / 10 CGPA",
      scoreLabel: "Current CGPA",
      status: "Pursuing",
      description: "Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks.",
    },
    {
      id: "edu-2",
      degree: "Senior Secondary (Class XII), Science CBSE",
      institution: "Delhi Public School (DPS), R.K. Puram",
      location: "New Delhi",
      duration: "2021 - 2023",
      grade: "96.40%",
      scoreLabel: "Board Performance",
      status: "Completed",
      description: "Physics, Chemistry, Mathematics, Computer Science, English.",
    },
    {
      id: "edu-3",
      degree: "Secondary Education (Class X), CBSE",
      institution: "Delhi Public School (DPS), R.K. Puram",
      location: "New Delhi",
      duration: "2019 - 2021",
      grade: "97.20%",
      scoreLabel: "Board Performance",
      status: "Completed",
      description: "All subjects distinction with Certificate of Merit.",
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "InternAtlas Platform — Student Profile & Opportunity Portal",
      role: "Frontend Engineer Intern",
      duration: "Sept 2026 - Present",
      description: "Engineered responsive Student Profile, verified skills suite, and real-time applications pipeline using modern component architecture.",
      tags: ["React 19", "Next.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://internatlas.in",
    },
    {
      id: "proj-2",
      title: "Cultural Events & Fest Finder for Campus Communities",
      role: "Lead Developer",
      duration: "Aug 2026 - Sept 2026",
      description: "Engineered interactive fest exploration engine featuring schedule boards, digital passes with QR codes, and multi-filter discovery.",
      tags: ["React", "Vite", "Node.js", "Express"],
      liveUrl: "https://internatlas-cultural-events.vercel.app",
    },
    {
      id: "proj-3",
      title: "TechSprint: Peer-to-Peer Mock Interview Matcher",
      role: "Full Stack Developer",
      duration: "May 2026 - July 2026",
      description: "WebRTC peer matching system pairing engineering students for DSA mock interviews and collaborative real-time code execution.",
      tags: ["React", "WebRTC", "Socket.io", "PostgreSQL"],
      liveUrl: "https://github.com/kashish16635",
    },
  ],
  skills: [
    { name: "React 19 & Next.js", category: "Frontend", level: "Advanced", endorsements: 28 },
    { name: "TypeScript", category: "Frontend", level: "Advanced", endorsements: 24 },
    { name: "JavaScript (ES6+)", category: "Frontend", level: "Advanced", endorsements: 32 },
    { name: "Tailwind CSS & Modern CSS", category: "Frontend", level: "Advanced", endorsements: 29 },
    { name: "Node.js & Express", category: "Backend", level: "Intermediate", endorsements: 19 },
    { name: "RESTful APIs & Microservices", category: "Backend", level: "Intermediate", endorsements: 17 },
    { name: "PostgreSQL & Prisma", category: "Database", level: "Intermediate", endorsements: 15 },
    { name: "MongoDB", category: "Database", level: "Proficient", endorsements: 12 },
    { name: "Git & GitHub CI/CD", category: "Tools & Cloud", level: "Advanced", endorsements: 26 },
    { name: "Data Structures & Algorithms", category: "Core", level: "Proficient", endorsements: 22 },
  ],
  applications: [
    {
      id: "app-1",
      role: "Frontend Engineering Intern",
      company: "InternAtlas Labs",
      location: "Bengaluru (Hybrid)",
      type: "Internship (6 Months)",
      appliedDate: "18 Sept 2026",
      status: "Shortlisted",
      stipend: "₹25,000 / month",
      timeline: "Final Technical Round on 30 Sept",
    },
    {
      id: "app-2",
      role: "Product Engineering Intern",
      company: "Razorpay",
      location: "Bengaluru",
      type: "Summer Internship",
      appliedDate: "12 Sept 2026",
      status: "In Review",
      stipend: "₹45,000 / month",
      timeline: "Resume Screen Passed",
    },
    {
      id: "app-3",
      role: "React / Next.js Developer",
      company: "Zepto Labs",
      location: "Mumbai / Remote",
      type: "Winter Internship",
      appliedDate: "05 Sept 2026",
      status: "Interview Scheduled",
      stipend: "₹35,000 / month",
      timeline: "Coding Assignment Completed",
    },
    {
      id: "app-4",
      role: "Full Stack Engineering Fellow",
      company: "Cred",
      location: "Bengaluru",
      type: "Fellowship",
      appliedDate: "28 Aug 2026",
      status: "Applied",
      stipend: "₹50,000 / month",
      timeline: "Under Initial Screening",
    },
  ],
  resume: {
    fileName: "Kashish_Khichi_Resume_DTU_2026.pdf",
    uploadedAt: "Updated 2 days ago",
    size: "184 KB",
    atsScore: 94,
  },
};

export default function StudentProfile({ onNavigateToEvents }) {
  const [profile, setProfile] = useState(initialProfileData);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullName: profile.fullName,
    headline: profile.headline,
    college: profile.college,
    location: profile.location,
    email: profile.email,
    phone: profile.phone,
    about: profile.about,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("internatlas_student_profile");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.education)) {
          setProfile((prev) => ({ ...prev, ...parsed }));
          setEditFormData({
            fullName: parsed.fullName || profile.fullName,
            headline: parsed.headline || profile.headline,
            college: parsed.college || profile.college,
            location: parsed.location || profile.location,
            email: parsed.email || profile.email,
            phone: parsed.phone || profile.phone,
            about: parsed.about || profile.about,
          });
        }
      }
    } catch {}
  }, []);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updated = { ...profile, ...editFormData };
    setProfile(updated);
    try {
      localStorage.setItem("internatlas_student_profile", JSON.stringify(updated));
    } catch {}
    setIsEditModalOpen(false);
  };

  const tabs = [
    { id: "overview", label: "Overview & Bio", icon: User, count: null },
    { id: "academics", label: "Academics", icon: GraduationCap, count: profile.education.length },
    { id: "projects", label: "Projects & Internships", icon: Briefcase, count: profile.projects.length },
    { id: "skills", label: "Verified Skills", icon: Award, count: profile.skills.length },
    { id: "applications", label: "Application Tracker", icon: CheckCircle2, count: profile.applications.length },
    { id: "resume", label: "Resume Vault", icon: FileText, count: null },
  ];

  return (
    <div className="iap-wrapper">
      {/* Header */}
      <header className="iap-header">
        <div className="iap-header-container">
          <div className="iap-logo" onClick={onNavigateToEvents}>
            Intern<span>Atlas.</span>
          </div>

          <div className="iap-header-nav">
            <span className="iap-nav-link" onClick={onNavigateToEvents}>
              Cultural Events
            </span>
            <span className="iap-nav-link active">Student Profile</span>
          </div>

          <div className="iap-header-actions">
            <div className="iap-profile-badge" onClick={() => setIsEditModalOpen(true)}>
              <div className="iap-avatar-mini">{profile.fullName.charAt(0)}</div>
              <span className="iap-profile-name">Profile</span>
            </div>
          </div>
        </div>
      </header>

      {/* Top Banner */}
      <div className="iap-banner">
        <div className="iap-banner-grid" />
        <div className="iap-banner-container">
          <div className="iap-verified-pill">
            <span className="iap-pulse-dot" />
            <span>InternAtlas Verified Candidate</span>
          </div>

          <div className="iap-banner-buttons">
            <button
              className="iap-banner-btn-secondary"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert("Profile URL copied to clipboard!");
              }}
            >
              <Share2 size={13} />
              <span>Share</span>
            </button>
            <button className="iap-banner-btn-primary" onClick={() => setIsEditModalOpen(true)}>
              <Edit3 size={13} style={{ color: "#2563eb" }} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="iap-main">
        {/* Profile Card */}
        <div className="iap-profile-card">
          <div className="iap-profile-top">
            <div className="iap-profile-identity">
              <div className="iap-avatar-large">{profile.fullName.charAt(0)}</div>

              <div className="iap-identity-info">
                <div className="iap-name-row">
                  <h1 className="iap-fullname">{profile.fullName}</h1>
                  <span className="iap-candidate-pill">
                    <ShieldCheck size={13} /> Verified
                  </span>
                </div>

                <p className="iap-headline">{profile.headline}</p>

                <div className="iap-meta-row">
                  <span className="iap-meta-item">
                    <Building size={14} /> {profile.college}
                  </span>
                  <span className="iap-meta-item">
                    <MapPin size={14} /> {profile.location}
                  </span>
                  <span className="iap-meta-item">
                    <Mail size={14} /> {profile.email}
                  </span>
                  <span className="iap-meta-item">
                    <Phone size={14} /> {profile.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Score Widget */}
            <div className="iap-completeness-box">
              <div className="iap-comp-header">
                <span className="iap-comp-title">
                  <Sparkles size={14} style={{ color: "#f59e0b" }} /> Profile Strength
                </span>
                <span className="iap-comp-percent">{profile.completeness}%</span>
              </div>
              <div className="iap-progress-track">
                <div className="iap-progress-fill" style={{ width: `${profile.completeness}%` }} />
              </div>
              <p className="iap-comp-desc">All essential milestones verified. Recruiter-ready profile.</p>
            </div>
          </div>

          {/* Social Row */}
          <div className="iap-profile-bottom">
            <div className="iap-social-links">
              <a href={profile.github} target="_blank" rel="noreferrer" className="iap-social-btn">
                <span>GitHub</span>
                <ExternalLink size={11} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="iap-social-btn">
                <span>LinkedIn</span>
                <ExternalLink size={11} />
              </a>
              <a href={profile.portfolio} target="_blank" rel="noreferrer" className="iap-social-btn">
                <span>Portfolio</span>
                <ExternalLink size={11} />
              </a>
            </div>

            <div className="iap-stats-strip">
              <span>
                <strong>{profile.stats.applications}</strong> Applications
              </span>
              <span>
                <strong>{profile.stats.interviews}</strong> Interviews
              </span>
              <span>
                <strong>{profile.stats.skillsVerified}</strong> Skills Verified
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="iap-tabs-bar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`iap-tab-btn ${isActive ? "active" : ""}`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
                {tab.count !== null && <span className="iap-tab-count">{tab.count}</span>}
              </button>
            );
          })}
        </div>

        {/* Tab Panels */}
        <div className="iap-tab-content">
          {/* TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <div>
              <div className="iap-card">
                <h2 className="iap-card-title">
                  <User size={18} style={{ color: "#2563eb" }} /> Professional Summary
                </h2>
                <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#475569", whiteSpace: "pre-line" }}>
                  {profile.about}
                </p>
              </div>

              <div className="iap-card">
                <div className="iap-card-header">
                  <h2 className="iap-card-title">
                    <GraduationCap size={18} style={{ color: "#2563eb" }} /> Current Education
                  </h2>
                  <button
                    onClick={() => setActiveTab("academics")}
                    style={{ background: "none", border: "none", color: "#2563eb", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}
                  >
                    View All &gt;
                  </button>
                </div>
                <div className="iap-edu-item">
                  <div className="iap-edu-top">
                    <div>
                      <div className="iap-edu-degree">{profile.education[0].degree}</div>
                      <div className="iap-edu-inst">{profile.education[0].institution}</div>
                    </div>
                    <span className="iap-grade-badge">{profile.education[0].grade}</span>
                  </div>
                  <div className="iap-edu-meta">
                    {profile.education[0].duration} • {profile.education[0].location}
                  </div>
                </div>
              </div>

              <div className="iap-card">
                <div className="iap-card-header">
                  <h2 className="iap-card-title">
                    <Briefcase size={18} style={{ color: "#2563eb" }} /> Featured Project
                  </h2>
                  <button
                    onClick={() => setActiveTab("projects")}
                    style={{ background: "none", border: "none", color: "#2563eb", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}
                  >
                    View All &gt;
                  </button>
                </div>
                <div className="iap-proj-item">
                  <div className="iap-proj-top">
                    <div>
                      <div className="iap-proj-title">{profile.projects[0].title}</div>
                      <div className="iap-proj-role">{profile.projects[0].role} • {profile.projects[0].duration}</div>
                    </div>
                  </div>
                  <p className="iap-proj-desc">{profile.projects[0].description}</p>
                  <div>
                    {profile.projects[0].tags.map((t) => (
                      <span key={t} className="iap-tag-pill">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ACADEMICS */}
          {activeTab === "academics" && (
            <div className="iap-card">
              <h2 className="iap-card-title">
                <GraduationCap size={18} style={{ color: "#2563eb" }} /> Academic Qualifications & Board Records
              </h2>
              <div style={{ marginTop: "16px" }}>
                {profile.education.map((edu) => (
                  <div key={edu.id} className="iap-edu-item">
                    <div className="iap-edu-top">
                      <div>
                        <div className="iap-edu-degree">{edu.degree}</div>
                        <div className="iap-edu-inst">{edu.institution} • {edu.location}</div>
                      </div>
                      <span className="iap-grade-badge">{edu.grade}</span>
                    </div>
                    <div className="iap-edu-meta">{edu.duration} • {edu.status}</div>
                    <p style={{ fontSize: "12px", color: "#475569", marginTop: "8px" }}>{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PROJECTS */}
          {activeTab === "projects" && (
            <div className="iap-card">
              <h2 className="iap-card-title">
                <Briefcase size={18} style={{ color: "#2563eb" }} /> Projects & Engineering Experience
              </h2>
              <div style={{ marginTop: "16px" }}>
                {profile.projects.map((proj) => (
                  <div key={proj.id} className="iap-proj-item">
                    <div className="iap-proj-top">
                      <div>
                        <div className="iap-proj-title">{proj.title}</div>
                        <div className="iap-proj-role">{proj.role} • {proj.duration}</div>
                      </div>
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="iap-social-btn">
                          <span>Live Link</span>
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                    <p className="iap-proj-desc">{proj.description}</p>
                    <div>
                      {proj.tags.map((t) => (
                        <span key={t} className="iap-tag-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SKILLS */}
          {activeTab === "skills" && (
            <div className="iap-card">
              <h2 className="iap-card-title">
                <Award size={18} style={{ color: "#2563eb" }} /> Verified Technical Skills & Endorsements
              </h2>
              <div className="iap-skills-grid" style={{ marginTop: "16px" }}>
                {profile.skills.map((skill) => (
                  <div key={skill.name} className="iap-skill-card">
                    <div>
                      <div className="iap-skill-name">{skill.name}</div>
                      <div className="iap-skill-cat">{skill.category} • {skill.endorsements} endorsements</div>
                    </div>
                    <span className="iap-skill-level">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: APPLICATION TRACKER */}
          {activeTab === "applications" && (
            <div className="iap-card">
              <h2 className="iap-card-title">
                <CheckCircle2 size={18} style={{ color: "#2563eb" }} /> Application Tracking Board
              </h2>
              <div className="iap-table-container" style={{ marginTop: "16px" }}>
                <table className="iap-table">
                  <thead>
                    <tr>
                      <th>Role & Organization</th>
                      <th>Type</th>
                      <th>Applied Date</th>
                      <th>Status</th>
                      <th>Stipend</th>
                      <th>Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.applications.map((app) => {
                      const statusClass =
                        app.status === "Shortlisted"
                          ? "iap-status-shortlisted"
                          : app.status === "Interview Scheduled"
                          ? "iap-status-interview"
                          : app.status === "In Review"
                          ? "iap-status-review"
                          : "iap-status-applied";

                      return (
                        <tr key={app.id}>
                          <td>
                            <strong>{app.role}</strong>
                            <div style={{ fontSize: "11px", color: "#64748b" }}>{app.company} • {app.location}</div>
                          </td>
                          <td>{app.type}</td>
                          <td>{app.appliedDate}</td>
                          <td>
                            <span className={`iap-status-pill ${statusClass}`}>{app.status}</span>
                          </td>
                          <td style={{ fontWeight: 600 }}>{app.stipend}</td>
                          <td style={{ fontSize: "11px", color: "#475569" }}>{app.timeline}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: RESUME VAULT */}
          {activeTab === "resume" && (
            <div className="iap-card">
              <div className="iap-card-header">
                <div>
                  <h2 className="iap-card-title">
                    <FileText size={18} style={{ color: "#2563eb" }} /> Verified ATS Resume Vault
                  </h2>
                  <p style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                    {profile.resume.fileName} • {profile.resume.size} • {profile.resume.uploadedAt}
                  </p>
                </div>
                <span className="iap-grade-badge">ATS Score: {profile.resume.atsScore}/100</span>
              </div>

              <div className="iap-vault-card">
                <FileText size={44} className="iap-vault-icon" />
                <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#071c46" }}>
                  {profile.fullName} — Software Engineering Resume
                </h3>
                <p style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                  Formatted for automated screening & campus hiring drives.
                </p>
                <div>
                  <button className="iap-download-btn" onClick={() => window.print()}>
                    <Download size={15} /> Download PDF Resume
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="iap-modal-backdrop">
          <div className="iap-modal-box">
            <div className="iap-modal-header">
              <div className="iap-modal-title">Edit Candidate Profile</div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="iap-form-group">
                <label className="iap-form-label">Full Name</label>
                <input
                  type="text"
                  required
                  value={editFormData.fullName}
                  onChange={(e) => setEditFormData({ ...editFormData, fullName: e.target.value })}
                  className="iap-form-input"
                />
              </div>

              <div className="iap-form-group">
                <label className="iap-form-label">Headline</label>
                <input
                  type="text"
                  required
                  value={editFormData.headline}
                  onChange={(e) => setEditFormData({ ...editFormData, headline: e.target.value })}
                  className="iap-form-input"
                />
              </div>

              <div className="iap-form-group">
                <label className="iap-form-label">College / University</label>
                <input
                  type="text"
                  required
                  value={editFormData.college}
                  onChange={(e) => setEditFormData({ ...editFormData, college: e.target.value })}
                  className="iap-form-input"
                />
              </div>

              <div className="iap-form-group">
                <label className="iap-form-label">Location (City, State)</label>
                <input
                  type="text"
                  required
                  value={editFormData.location}
                  onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                  className="iap-form-input"
                />
              </div>

              <div className="iap-form-group">
                <label className="iap-form-label">About / Bio</label>
                <textarea
                  rows={4}
                  value={editFormData.about}
                  onChange={(e) => setEditFormData({ ...editFormData, about: e.target.value })}
                  className="iap-form-textarea"
                />
              </div>

              <div className="iap-modal-footer">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="iap-btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="iap-btn-submit">
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
