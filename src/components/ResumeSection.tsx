import React, { useState } from "react";
import { cvData } from "../data/cvData";
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Search, 
  Layers, 
  BookOpen, 
  FileText,
  Workflow,
  ClipboardList,
  Filter,
  FlameKindling
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ResumeSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [skillQuery, setSkillQuery] = useState<string>("");

  // Categories of roles
  const roleCategories = ["All", "Project Management", "System Analysis", "Enterprise Architecture", "Development"];

  // Filter experiences based on button category click
  const filteredExperiences = selectedCategory === "All" 
    ? cvData.experiences 
    : cvData.experiences.filter(exp => exp.categories.some(cat => cat === selectedCategory));

  // Search skills
  const filteredSkills = cvData.skillsAndTools.map(cat => ({
    ...cat,
    items: cat.items.filter(item => item.toLowerCase().includes(skillQuery.toLowerCase()))
  })).filter(cat => cat.items.length > 0);

  return (
    <section className="py-8 space-y-12" id="resume-section-root">
      
      {/* Competency & Bio Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="bio-competency-grid">
        <div className="lg:col-span-1 bg-white border border-slate-100 p-6 rounded-2xl shadow-xs space-y-6" id="competency-card">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Workflow className="h-5 w-5" />
            </span>
            <h3 className="font-sans font-bold text-slate-900 text-lg">Kompetensi Utama</h3>
          </div>
          
          <div className="space-y-4 text-sm" id="competency-list">
            {cvData.competencies.map((comp, idx) => (
              <div key={idx} className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl space-y-1 hover:border-indigo-100 transition-colors">
                <h4 className="font-semibold text-slate-800 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  <span>{comp.title}</span>
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">{comp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Career Bio & Core Profile */}
        <div className="lg:col-span-2 bg-slate-900 text-white p-8 rounded-2xl shadow-md space-y-6 relative overflow-hidden flex flex-col justify-between" id="profile-card">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs border border-indigo-400/20">
              <Award className="h-3.5 w-3.5" />
              <span>TOGAF 10 Certified Enterprise Architect</span>
            </div>
            
            <h3 className="font-sans font-extrabold text-2xl lg:text-3xl text-white tracking-tight leading-tight">
              Menghubungkan Target Bisnis dengan Arsitektur IT Modern secara Fleksibel
            </h3>
            
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              {cvData.profile}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-slate-800 pt-6 mt-6" id="profile-stats">
            <div>
              <p className="font-mono text-2xl font-bold text-indigo-400">6+ Tahun</p>
              <p className="text-xs text-slate-400">Pengalaman Industri IT</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-indigo-400">20+ Projek</p>
              <p className="text-xs text-slate-400">Dipimpin & Dirilis Secara Simultan</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="font-mono text-2xl font-bold text-indigo-400">TOGAF 10</p>
              <p className="text-xs text-slate-400">Kerangka Tata Kelola Enterprise</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Matrix with Live Search */}
      <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-2xl shadow-xs space-y-6" id="skills-matrix">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-sans font-bold text-slate-900 text-xl tracking-tight">Keahlian & Toolkit Profesional</h3>
            <p className="text-xs text-slate-500">Gunakan filter pencarian di samping untuk menemukan runtime, instrumen, atau tata kelola tertentu.</p>
          </div>
          
          {/* Quick Skill Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari keahlian (misal. 'Laravel')..."
              value={skillQuery}
              onChange={(e) => setSkillQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-9 pr-4 text-xs font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
              id="skill-search-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="skills-grid-layout">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((category, idx) => (
              <motion.div 
                key={category.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-3 flex flex-col justify-between"
                id={`skill-cat-${idx}`}
              >
                <div>
                  <h4 className="font-sans font-semibold text-slate-800 text-xs uppercase tracking-wider font-mono">
                    {category.category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {category.items.map((item, idy) => (
                      <span 
                        key={idy}
                        className="px-2.5 py-1 text-xs rounded-md bg-white border border-slate-200 font-medium text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Work Experiences Timeline with Interactive Role Filter */}
      <div className="space-y-6" id="work-history-section">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="p-1 px-2.5 rounded-full bg-indigo-50 text-indigo-700 font-mono text-xs font-semibold">KARIR</span>
              <h3 className="font-sans font-bold text-slate-900 text-xl tracking-tight">Riwayat Pengalaman Kerja</h3>
            </div>
            <p className="text-xs text-slate-500">Filter rekam jejak Ferlin berdasarkan peran penugasan yang dibutuhkan untuk portofolio Anda.</p>
          </div>

          {/* Filter Pill List */}
          <div className="flex flex-wrap gap-1.5" id="career-category-filters">
            {roleCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat 
                    ? "bg-indigo-600 text-white" 
                    : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
                id={`btn-filter-role-${cat.replace(/\s+/g, "-").toLowerCase()}`}
              >
                {cat === "All" ? "Semua Pengalaman" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        <div className="relative pl-6 border-l-2 border-slate-100 space-y-12 ml-3 pt-4" id="experience-timeline">
          {filteredExperiences.map((exp, index) => (
            <div key={exp.id} className="relative group space-y-3" id={`exp-node-${exp.id}`}>
              
              {/* Custom Bullet Indicator */}
              <div className="absolute -left-[31px] top-1 h-5 w-5 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center group-hover:bg-indigo-500 group-hover:scale-110 transition-all">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 group-hover:bg-white" />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5 pl-2">
                <div>
                  <h4 className="font-sans font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">
                    {exp.role}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-slate-500">
                    <span className="font-semibold text-slate-700">{exp.company}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 items-center md:text-right">
                  <span className="flex items-center space-x-1 bg-slate-100 border border-slate-200 rounded-md px-2.5 py-1 text-xs text-slate-700 font-mono font-medium">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>{exp.period}</span>
                  </span>
                  
                  {/* Category Tags */}
                  <div className="flex gap-1">
                    {exp.categories.map((cat, ci) => (
                      <span 
                        key={ci} 
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-100"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description & Task Details */}
              <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-xs space-y-4 pl-4 ml-2">
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  {exp.description}
                </p>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">Tugas Utama & Tanggung Jawab:</p>
                  <ul className="text-xs text-slate-600 space-y-2 list-none pl-1">
                    {exp.tasks.map((task, ti) => (
                      <li key={ti} className="flex items-start space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Delivered Projects Sub-Section */}
                {exp.projectsDelivered && exp.projectsDelivered.length > 0 && (
                  <div className="pt-3 border-t border-slate-50">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono block mb-2">
                      Projek yang Diantarkan (Project Artifacts):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.projectsDelivered.map((proj, pi) => (
                        <span 
                          key={pi}
                          className="px-2.5 py-1 text-[11px] rounded bg-white text-slate-700 font-medium border border-slate-200 flex items-center space-x-1"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>{proj}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Education & Certifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="education-certs-grid">
        
        {/* Education History Card */}
        <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-2xl shadow-xs space-y-6 flex flex-col justify-between" id="education-column">
          <div className="space-y-6">
            <h3 className="font-sans font-bold text-slate-900 text-xl tracking-tight flex items-center space-x-2">
              <span className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span>Pendidikan Akademik</span>
            </h3>

            <div className="space-y-6 relative border-l border-slate-100 pl-4 py-1" id="education-timeline-items">
              {cvData.education.map((edu, idx) => (
                <div key={idx} className="space-y-2 relative" id={`edu-${idx}`}>
                  <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-indigo-600"></span>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 text-sm">{edu.degree}</h4>
                      <p className="text-xs text-indigo-600 font-semibold">{edu.institution}</p>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 shrink-0">
                      {edu.period}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{edu.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {edu.focusAreas.map((area, ai) => (
                      <span key={ai} className="px-1.5 py-0.5 text-[10px] rounded bg-slate-100 border border-slate-200 text-slate-600">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-1 text-xs text-indigo-800 mt-4 leading-relaxed font-medium">
            Tesis dan bidang fokus di STMIK LIKMI mendalami tata kelola IT strategis (COBIT, ITIL) yang langsung dikoordinasikan untuk mendukung efisiensi korporasi BUMN.
          </div>
        </div>

        {/* Certifications Card */}
        <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-2xl shadow-xs space-y-6" id="certifications-column">
          <h3 className="font-sans font-bold text-slate-900 text-xl tracking-tight flex items-center space-x-2">
            <span className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Award className="h-5 w-5" />
            </span>
            <span>Sertifikasi Kompetensi</span>
          </h3>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2" id="cert-scrollable-container">
            {cvData.certifications.map((cert, idx) => (
              <div 
                key={idx} 
                className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl hover:border-indigo-100 transition-colors flex flex-col gap-1.5"
                id={`cert-${idx}`}
              >
                <div className="flex items-start justify-between gap-1.5">
                  <h4 className="font-sans font-semibold text-slate-800 text-xs leading-snug">
                    {cert.name}
                  </h4>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 shrink-0 uppercase tracking-widest font-bold">
                    {cert.year || "2025"}
                  </span>
                </div>
                
                <p className="text-[11px] text-slate-500 font-medium font-mono flex items-center space-x-1">
                  <span>Diterbitkan oleh:</span>
                  <span className="text-slate-700 font-semibold">{cert.issuer}</span>
                </p>

                {cert.courses && cert.courses.length > 0 && (
                  <div className="mt-2 pt-1.5 border-t border-slate-100/50">
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider font-mono">Modul Pelatihan:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-0.5 mt-1">
                      {cert.courses.map((course, ci) => (
                        <div key={ci} className="text-[10px] text-slate-500 flex items-center space-x-1">
                          <span className="w-1 h-1 rounded-full bg-slate-400 shrink-0"></span>
                          <span className="truncate" title={course}>{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
