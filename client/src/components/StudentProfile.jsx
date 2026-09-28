import React, { useState, useEffect } from 'react';
import './StudentProfile.css';
import {
  Edit2,
  Trash2,
  Plus,
  Download,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Bookmark,
  Sliders,
  ChevronRight,
  X,
  MapPin,
  Calendar,
  Eye,
  Check,
  User,
  Share2
} from 'lucide-react';

const initialProfileData = {
  fullName: "Kashish Khichi",
  headline: "Computer Science Undergraduate | Full-Stack Developer",
  college: "Delhi Technological University (DTU)",
  degree: "B.Tech in Computer Science and Engineering",
  batch: "2023 - 2027",
  location: "New Delhi",
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
    } catch (e) {
      // ignore
    }
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
    <div className="min-h-screen bg-[#F4F6F9] font-sans text-slate-800 antialiased pb-20">
      {/* Top Banner & Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-xl font-black tracking-tight text-[#071C46]">
              Intern<span className="text-[#1DA1F2]">Atlas.</span>
            </span>
            <div className="hidden md:flex items-center gap-5 text-xs font-semibold text-slate-600">
              <span className="cursor-pointer hover:text-[#1DA1F2]" onClick={onNavigateToEvents}>Cultural Events</span>
              <span className="cursor-pointer text-[#1DA1F2] border-b-2 border-[#1DA1F2] py-4">Student Profile & Resume</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToEvents}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-md px-3 py-1.5"
            >
              Switch to Events Finder
            </button>
            <div className="size-8 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center font-bold text-xs">
              K
            </div>
          </div>
        </div>
      </header>

      {/* Internshala Style Sub-Navigation */}
      <div className="border-b border-slate-200 bg-white shadow-xs sticky top-14 z-30">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex gap-4 sm:gap-8 overflow-x-auto scrollbar-none py-1">
            <button
              onClick={() => setActiveTab("resume")}
              className={`flex items-center gap-2 border-b-2 py-3.5 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                activeTab === "resume"
                  ? "border-[#1DA1F2] text-[#1DA1F2]"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText size={16} />
              <span>Resume</span>
            </button>

            <button
              onClick={() => setActiveTab("applications")}
              className={`flex items-center gap-2 border-b-2 py-3.5 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                activeTab === "applications"
                  ? "border-[#1DA1F2] text-[#1DA1F2]"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Briefcase size={16} />
              <span>My Applications</span>
              <span className="rounded-full bg-blue-100 px-2 py-0.2 text-[11px] font-bold text-blue-700">
                {(profile?.applications || []).length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("bookmarks")}
              className={`flex items-center gap-2 border-b-2 py-3.5 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                activeTab === "bookmarks"
                  ? "border-[#1DA1F2] text-[#1DA1F2]"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Bookmark size={16} />
              <span>My Bookmarks</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.2 text-[11px] font-bold text-slate-600">
                {bookmarks.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("preferences")}
              className={`flex items-center gap-2 border-b-2 py-3.5 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                activeTab === "preferences"
                  ? "border-[#1DA1F2] text-[#1DA1F2]"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sliders size={16} />
              <span>Edit Preferences</span>
            </button>
          </div>

          {activeTab === "resume" && (
            <button
              onClick={handlePrintResume}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-[#1DA1F2] px-3.5 py-1.5 text-xs font-semibold text-[#1DA1F2] hover:bg-blue-50 transition"
            >
              <Download size={13} />
              <span>Download Resume</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 py-8 sm:px-6">
        {/* RESUME TAB */}
        {activeTab === "resume" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Resume</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Keep your resume up to date. Employers download this resume when you apply.
                </p>
              </div>

              <button
                onClick={handlePrintResume}
                className="sm:hidden inline-flex items-center gap-1 rounded-md border border-[#1DA1F2] px-3 py-1.5 text-xs font-semibold text-[#1DA1F2]"
              >
                <Download size={13} /> PDF
              </button>
            </div>

            {/* Resume Sheet */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-10 shadow-sm print:border-none print:shadow-none">
              {/* 1. PERSONAL DETAILS HEADER */}
              <div className="flex items-start justify-between border-b border-slate-200 pb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    {profile.fullName}
                  </h2>
                  <div className="mt-2 space-y-0.5 text-xs text-slate-600 sm:text-sm">
                    <p>{profile.email}</p>
                    <p>{profile.phone}</p>
                    <p>{profile.location}</p>
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
                  className="flex size-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  title="Edit Personal Details"
                >
                  <Edit2 size={16} />
                </button>
              </div>

              {/* 2. EDUCATION SECTION */}
              <div className="border-b border-slate-200 py-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Education
                  </h3>
                  <button
                    onClick={() => alert("Add Education form")}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1DA1F2] hover:underline"
                  >
                    <Plus size={13} />
                    <span>Add education</span>
                  </button>
                </div>

                <div className="space-y-5">
                  {profile.education.map((edu) => (
                    <div key={edu.id} className="group flex items-start justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-slate-900">{edu.degree}</h4>
                        <p className="text-xs text-slate-700 font-medium">{edu.institution}</p>
                        <p className="text-xs text-slate-500">{edu.duration}</p>
                        <p className="text-xs font-semibold text-slate-700 mt-1">
                          {edu.scoreLabel}: <span className="text-emerald-700 font-bold">{edu.grade}</span>
                        </p>
                      </div>

                      <button className="text-slate-400 hover:text-slate-700" title="Edit">
                        <Edit2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. JOBS SECTION */}
              <div className="border-b border-slate-200 py-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Jobs
                  </h3>
                  <button
                    onClick={() => alert("Add Full-Time Job details")}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1DA1F2] hover:underline"
                  >
                    <Plus size={13} />
                    <span>Add job</span>
                  </button>
                </div>
                <p className="text-xs text-slate-400 italic">
                  No full-time jobs added yet. Click &quot;Add job&quot; if you have worked in a full-time or part-time role.
                </p>
              </div>

              {/* 4. INTERNSHIPS SECTION */}
              <div className="border-b border-slate-200 py-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Internships
                  </h3>
                  <button
                    onClick={() => alert("Add internship")}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1DA1F2] hover:underline"
                  >
                    <Plus size={13} />
                    <span>Add internship</span>
                  </button>
                </div>

                <div className="space-y-5">
                  <div className="group flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">
                        Frontend Engineering Intern
                      </h4>
                      <p className="text-xs font-semibold text-slate-700">InternAtlas Labs</p>
                      <p className="text-xs text-slate-500">Bengaluru (Work from Home) • Sep 2026 - Present</p>
                      <ul className="mt-2 list-disc pl-4 space-y-1 text-xs text-slate-600">
                        <li>Engineered the responsive Student Profile & Opportunity Modules using Next.js 16, TypeScript, and Tailwind CSS.</li>
                        <li>Implemented local persistence and dynamic resume paper generator benchmarked against industry standards.</li>
                      </ul>
                    </div>

                    <button className="text-slate-400 hover:text-slate-700" title="Edit">
                      <Edit2 size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 5. POSITIONS OF RESPONSIBILITY */}
              <div className="border-b border-slate-200 py-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Positions of Responsibility
                  </h3>
                  <button
                    onClick={() => alert("Add position of responsibility")}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1DA1F2] hover:underline"
                  >
                    <Plus size={13} />
                    <span>Add position of responsibility</span>
                  </button>
                </div>

                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">
                    Core Technical Council Member — DTU Student Developer Club
                  </p>
                  <p className="text-slate-500 text-[11px]">Aug 2024 - Present</p>
                  <p className="text-slate-600">
                    Organized annual technical hackathons, conducted developer orientation sessions for 300+ students, and contributed to departmental web portals.
                  </p>
                </div>
              </div>

              {/* 6. TRAININGS / COURSES */}
              <div className="border-b border-slate-200 py-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Trainings / Courses
                  </h3>
                  <button
                    onClick={() => alert("Add training or online course")}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1DA1F2] hover:underline"
                  >
                    <Plus size={13} />
                    <span>Add training/ course</span>
                  </button>
                </div>

                <div className="text-xs text-slate-700 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900">
                      Full Stack Web Development Specialization
                    </p>
                    <span className="text-[11px] text-slate-500">Jun 2024 - Aug 2024</span>
                  </div>
                  <p className="text-slate-600 text-xs">Meta & Coursera • Online</p>
                  <p className="text-slate-500 text-xs">
                    Comprehensive training covering React, modern asynchronous JavaScript, REST APIs, and database fundamentals.
                  </p>
                </div>
              </div>

              {/* 7. ACADEMICS / PERSONAL PROJECTS */}
              <div className="border-b border-slate-200 py-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Academics / Personal Projects
                  </h3>
                  <button
                    onClick={() => alert("Add project")}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1DA1F2] hover:underline"
                  >
                    <Plus size={13} />
                    <span>Add academic/ personal project</span>
                  </button>
                </div>

                <div className="space-y-5">
                  {profile.projects.map((proj) => (
                    <div key={proj.id} className="group flex items-start justify-between">
                      <div className="space-y-1 max-w-xl">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{proj.title}</h4>
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-semibold text-[#1DA1F2] hover:underline inline-flex items-center gap-0.5"
                            >
                              <span>Project link</span>
                              <ExternalLink size={11} />
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">{proj.duration}</p>
                        <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                      </div>

                      <button className="text-slate-400 hover:text-slate-700" title="Edit">
                        <Edit2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. SKILLS SECTION */}
              <div className="border-b border-slate-200 py-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Skills
                  </h3>
                  <button
                    onClick={() => alert("Add skill")}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1DA1F2] hover:underline"
                  >
                    <Plus size={13} />
                    <span>Add skill</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {profile.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs"
                    >
                      <div>
                        <p className="font-semibold text-slate-800">{skill.name}</p>
                        <p className="text-[11px] text-slate-500">{skill.level}</p>
                      </div>
                      <button className="text-slate-300 hover:text-slate-600">
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 9. PORTFOLIO / WORK SAMPLES */}
              <div className="border-b border-slate-200 py-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Portfolio / Work Samples
                  </h3>
                  <button
                    onClick={() => alert("Add portfolio link")}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1DA1F2] hover:underline"
                  >
                    <Plus size={13} />
                    <span>Add portfolio/ work sample</span>
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-700">GitHub profile: </span>
                      <a href={profile.github} target="_blank" rel="noreferrer" className="text-[#1DA1F2] hover:underline">
                        {profile.github}
                      </a>
                    </div>
                    <Edit2 size={13} className="text-slate-400 hover:text-slate-700 cursor-pointer" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-700">Developer portfolio: </span>
                      <a href={profile.portfolio} target="_blank" rel="noreferrer" className="text-[#1DA1F2] hover:underline">
                        {profile.portfolio}
                      </a>
                    </div>
                    <Edit2 size={13} className="text-slate-400 hover:text-slate-700 cursor-pointer" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-700">LinkedIn profile: </span>
                      <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-[#1DA1F2] hover:underline">
                        {profile.linkedin}
                      </a>
                    </div>
                    <Edit2 size={13} className="text-slate-400 hover:text-slate-700 cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* 10. ACCOMPLISHMENTS */}
              <div className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Accomplishments / Additional Details
                  </h3>
                  <button
                    onClick={() => alert("Add accomplishment")}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1DA1F2] hover:underline"
                  >
                    <Plus size={13} />
                    <span>Add accomplishment/ additional detail</span>
                  </button>
                </div>

                <ul className="list-disc pl-4 space-y-1.5 text-xs text-slate-700">
                  <li>School Scholar Badge recipient for consecutive academic distinction at DPS R.K. Puram.</li>
                  <li>State-level Junior Science Olympiad Qualifier with Merit Distinction in Mathematics.</li>
                  <li>Ranked top 10% in DTU departmental algorithmic coding and data structures assessments.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* APPLICATIONS TAB */}
        {activeTab === "applications" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">My Applications</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Track status of all your internship and job applications
              </p>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    <th className="py-3 px-4">Company</th>
                    <th className="py-3 px-4">Profile</th>
                    <th className="py-3 px-4">Applied On</th>
                    <th className="py-3 px-4">Number of Applicants</th>
                    <th className="py-3 px-4">Application Status</th>
                    <th className="py-3 px-4 text-center">Review Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(profile?.applications || []).map((app) => {
                    const statusClass =
                      app.status === "Shortlisted"
                        ? "bg-emerald-100 text-emerald-800"
                        : app.status === "In-touch"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-slate-100 text-slate-700";

                    return (
                      <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{app.company}</td>
                        <td className="py-3.5 px-4 font-medium text-slate-700">{app.role}</td>
                        <td className="py-3.5 px-4 text-slate-500">{app.appliedDate}</td>
                        <td className="py-3.5 px-4 text-slate-500">{app.applicants}</td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${statusClass}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => alert(`Reviewing application for ${app.role} at ${app.company}`)}
                            className="inline-flex items-center gap-1 text-[#1DA1F2] hover:underline font-semibold text-xs"
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

        {/* BOOKMARKS TAB */}
        {activeTab === "bookmarks" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">My Bookmarks</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Internships and opportunities you have saved for later
              </p>
            </div>

            <div className="space-y-4">
              {bookmarks.map((bm) => (
                <div key={bm.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{bm.title}</h3>
                      <p className="text-xs font-semibold text-slate-600 mt-0.5">{bm.company}</p>
                      <div className="mt-2 text-xs text-slate-500">
                        {bm.location} • {bm.duration} • <span className="font-bold text-slate-800">{bm.stipend}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Applied to ${bm.title}!`)}
                      className="rounded-md bg-[#1DA1F2] px-4 py-1.5 text-xs font-bold text-white hover:bg-blue-600 self-end sm:self-center"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREFERENCES TAB */}
        {activeTab === "preferences" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Career Preferences</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Tell us what kind of internships and opportunities you are looking for
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
              {prefSaved && (
                <div className="rounded-md bg-emerald-50 p-3 text-xs font-bold text-emerald-800 border border-emerald-200 flex items-center gap-2">
                  <Check size={16} /> Preferences saved successfully!
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPrefSaved(true);
                  setTimeout(() => setPrefSaved(false), 2000);
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Fields of interest
                  </label>
                  <input
                    type="text"
                    value={preferences.fields.join(", ")}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        fields: e.target.value.split(",").map((s) => s.trim())
                      })
                    }
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-xs focus:border-[#1DA1F2] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Preferred work mode
                  </label>
                  <select
                    value={preferences.workMode}
                    onChange={(e) => setPreferences({ ...preferences, workMode: e.target.value })}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-xs focus:border-[#1DA1F2] focus:outline-none"
                  >
                    <option value="Work from home (WFH) & Hybrid">Work from home (WFH) & Hybrid</option>
                    <option value="Only Work from home (WFH)">Only Work from home (WFH)</option>
                    <option value="Only In-office">Only In-office</option>
                  </select>
                </div>

                <div>
                  <button
                    type="submit"
                    className="rounded-md bg-[#1DA1F2] px-5 py-2 font-bold text-white hover:bg-blue-600 transition"
                  >
                    Save Preferences
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* EDIT PERSONAL DETAILS MODAL */}
      {activeModal === "personal" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <h3 className="text-sm font-bold text-slate-900">Personal Details</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-700">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handlePersonalSave} className="space-y-3.5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={personalForm.fullName}
                  onChange={(e) => setPersonalForm({ ...personalForm, fullName: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-xs focus:border-[#1DA1F2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={personalForm.email}
                  onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-xs focus:border-[#1DA1F2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Number</label>
                <input
                  type="tel"
                  required
                  value={personalForm.phone}
                  onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-xs focus:border-[#1DA1F2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Current City</label>
                <input
                  type="text"
                  required
                  value={personalForm.location}
                  onChange={(e) => setPersonalForm({ ...personalForm, location: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-xs focus:border-[#1DA1F2] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="rounded-md border border-slate-200 px-4 py-1.5 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-[#1DA1F2] px-5 py-1.5 font-bold text-white hover:bg-blue-600"
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
