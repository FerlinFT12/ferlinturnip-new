import React, { useState } from "react";
import { portfolios } from "../data/cvData";
import { ProjectPortfolio } from "../types";
import { 
  FolderGit, 
  ExternalLink, 
  FileCheck2, 
  Figma, 
  Files, 
  ArrowRight, 
  Check, 
  UserPlus, 
  Layout, 
  Activity, 
  FileText,
  X,
  Target
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function PortfolioSection() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<ProjectPortfolio | null>(null);

  // Group tags logically
  const filterTags = ["All", "EA", "HRIS", "LMS", "Laravel", "POS Network"];

  const filteredPortfolios = selectedTag === "All" 
    ? portfolios 
    : portfolios.filter(p => p.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase() || p.description.toLowerCase().includes(selectedTag.toLowerCase())));

  return (
    <section className="py-8 space-y-8" id="portfolio-section-root">
      
      {/* Intro with filter tools */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6" id="portfolio-intro">
        <div className="space-y-1">
          <span className="p-1 px-3 rounded-full bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold tracking-wider uppercase">PORTFOLIO</span>
          <h2 className="font-sans font-extrabold text-slate-900 text-2xl tracking-tight">Katalog Projek & Dokumen Specs</h2>
          <p className="text-xs text-slate-500 max-w-lg leading-relaxed">
            Berikut adalah daftar sistem berskala enterprise yang dirancang dan diselesaikan oleh Ferlin. Lengkap dengan rancangan fungsionalitas (FSD/BRD) resmi yang dapat Anda periksa.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-1.5" id="portfolio-tags-filters">
          {filterTags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedTag === t 
                  ? "bg-slate-900 text-white" 
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {t === "All" ? "Semua Projek" : t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="portfolio-projects-grid">
        <AnimatePresence mode="popLayout">
          {filteredPortfolios.map((proj, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={proj.id}
              onClick={() => setActiveProject(proj)}
              className="group bg-white border border-slate-100 p-6 rounded-2xl shadow-xs hover:border-indigo-100 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
              id={`portfolio-card-${proj.id}`}
            >
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                    Client: {proj.client || "SaaS Network"}
                  </span>
                  <FolderGit className="h-4 w-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-medium font-mono">
                    Role: {proj.role}
                  </p>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 font-light">
                    {proj.description}
                  </p>
                </div>
              </div>

              {/* Tags & Action Row */}
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {proj.tags.slice(0, 2).map((tag, ti) => (
                    <span 
                      key={ti} 
                      className="px-1.5 py-0.5 text-[9px] font-mono font-medium rounded bg-slate-50 text-slate-600 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                  {proj.tags.length > 2 && (
                    <span className="text-[9px] font-mono text-slate-400">+{proj.tags.length - 2}</span>
                  )}
                </div>
                
                <span className="text-indigo-600 text-[11px] font-bold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Lihat Detil</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Embedded Document Folder Callout & Info */}
      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex flex-col lg:flex-row items-center justify-between gap-6" id="gdrive-callout">
        <div className="space-y-2 text-center lg:text-left">
          <h3 className="font-sans font-extrabold text-indigo-900 text-lg flex items-center justify-center lg:justify-start space-x-2">
            <Files className="h-5 w-5 text-indigo-600" />
            <span>Folder Dokumentasi Lengkap di Google Drive</span>
          </h3>
          <p className="text-xs text-indigo-700 max-w-xl leading-relaxed">
            Ferlin menyediakan folder Google Drive terbuka yang berisi contoh berkas **Project Charter**, **FSD (Functional Specification)**, **BRD (Business Requirements)**, **UI/UX Design**, dan **Bukti Capaian** resmi untuk audit kualifikasi Anda.
          </p>
        </div>

        <a 
          href="https://drive.google.com/drive/folders/1hh9W7PtH6am4G6aD7K4dKvIt1PUhAOKq?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-xs shrink-0 cursor-pointer"
          id="btn-gdrive-external"
        >
          <span>Akses Folder G-Drive</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Project Detail Modal Overlay */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto" id="portfolio-detail-modal">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col"
              id="portfolio-modal-container"
            >
              
              {/* Modal Header */}
              <div className="border-b border-slate-100 p-6 flex items-start justify-between bg-slate-50 rounded-t-2xl">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {activeProject.client || "SaaS Portal"}
                  </span>
                  <h3 className="font-sans font-extrabold text-slate-900 text-lg md:text-xl leading-tight mt-1">
                    {activeProject.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium font-mono">
                    Peran: {activeProject.role}
                  </p>
                </div>
                <button 
                  onClick={() => setActiveProject(null)}
                  className="p-1 px-2 text-xs rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center cursor-pointer"
                  id="btn-close-modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Bodies */}
              <div className="p-6 space-y-6">
                
                {/* Info block */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Garis Besar Projek:</p>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    {activeProject.description}
                  </p>
                </div>

                {/* Scope Details Checklists */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center space-x-1.5">
                    <Target className="h-3.5 w-3.5 text-indigo-500" />
                    <span>Ruang Lingkup & Pencapaian Teknis:</span>
                  </p>
                  <div className="space-y-2.5">
                    {activeProject.details.map((detail, di) => (
                      <div key={di} className="flex items-start space-x-2 text-xs text-slate-600">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Spec Deliverables / Artifacts */}
                <div className="space-y-3 bg-slate-50 border border-slate-100 p-4 rounded-xl">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                    Verifikasi Dokumen Specs (Artifacts):
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="artifacts-grid">
                    
                    {activeProject.deliverables?.charter && (
                      <a 
                        href={activeProject.deliverables.charter} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 border border-slate-200 bg-white hover:border-indigo-400 rounded-lg text-xs font-medium text-slate-600 flex items-center space-x-2 hover:text-indigo-600"
                      >
                        <FileCheck2 className="h-4 w-4 text-indigo-500 shrink-0" />
                        <span className="truncate">Project Charter Document</span>
                      </a>
                    )}

                    {activeProject.deliverables?.brd && (
                      <a 
                        href={activeProject.deliverables.brd} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 border border-slate-200 bg-white hover:border-indigo-400 rounded-lg text-xs font-medium text-slate-600 flex items-center space-x-2 hover:text-indigo-600"
                      >
                        <Files className="h-4 w-4 text-blue-500 shrink-0" />
                        <span className="truncate">Business Specs (BRD)</span>
                      </a>
                    )}

                    {activeProject.deliverables?.fsd && (
                      <a 
                        href={activeProject.deliverables.fsd} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 border border-slate-200 bg-white hover:border-indigo-400 rounded-lg text-xs font-medium text-slate-600 flex items-center space-x-2 hover:text-indigo-600"
                      >
                        <FileCheck2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="truncate">Functional Specs (FSD)</span>
                      </a>
                    )}

                    {activeProject.deliverables?.uiux && (
                      <a 
                        href={activeProject.deliverables.uiux} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 border border-slate-200 bg-white hover:border-indigo-400 rounded-lg text-xs font-medium text-slate-600 flex items-center space-x-2 hover:text-indigo-600"
                      >
                        <Figma className="h-4 w-4 text-orange-500 shrink-0" />
                        <span className="truncate">Interactive UI/UX Mockup</span>
                      </a>
                    )}

                    {activeProject.deliverables?.achievement && (
                      <a 
                        href={activeProject.deliverables.achievement} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 border border-slate-200 bg-white hover:border-indigo-400 rounded-lg text-xs font-medium text-slate-600 flex items-center space-x-2 hover:text-indigo-600 col-span-1 sm:col-span-2"
                      >
                        <ExternalLink className="h-4 w-4 text-amber-500 shrink-0" />
                        <span className="truncate">Dokumen Capaian / Sertifikasi Terlampir</span>
                      </a>
                    )}

                    {!activeProject.deliverables || Object.keys(activeProject.deliverables).length === 0 ? (
                      <div className="text-slate-400 text-xs py-2 col-span-2 text-center italic">
                        Dokumen diintegrasikan dalam folder master G-Drive (Klik link di luar modal).
                      </div>
                    ) : null}

                  </div>
                </div>

                {/* Footer close */}
                <div className="pt-2 flex justify-between items-center text-xs text-slate-400 font-mono">
                  <span>ID: {activeProject.id}</span>
                  <button 
                    onClick={() => setActiveProject(null)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white font-semibold rounded-lg hover:text-white"
                  >
                    Tutup Detail
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
