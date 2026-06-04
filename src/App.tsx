import React, { useState, useEffect } from "react";
import { cvData } from "./data/cvData";
import { BlogPost } from "./types";
import Navigation from "./components/Navigation";
import ResumeSection from "./components/ResumeSection";
import PortfolioSection from "./components/PortfolioSection";
import BlogSection from "./components/BlogSection";
import SeoPanel from "./components/SeoPanel";

// Lucide icon imports
import { 
  Briefcase, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  FileDown, 
  Printer, 
  ChevronRight, 
  Sparkles, 
  Award, 
  Database, 
  Users, 
  Files, 
  Terminal,
  ArrowRight,
  BookmarkCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("hero");
  const [activeBlogPost, setActiveBlogPost] = useState<BlogPost | null>(null);
  const [isSeoOpen, setIsSeoOpen] = useState<boolean>(false);

  // Print function hook
  const handlePrint = () => {
    window.print();
  };

  // Dynamic Metadata Optimizer Hook inside head tag
  useEffect(() => {
    // 1. Initial default strings
    let title = "Ferlin Firdaus Turnip | IT Project Manager & Enterprise Architect Portfolio";
    let description = "Personal branding, professional portfolio, and SEO-optimized expert blog for Ferlin Firdaus Turnip, IT Project Manager and Enterprise Architect Jakarta.";
    let keywords = "Ferlin Firdaus Turnip, IT Project Manager, System Analyst, TOGAF 10, Jakarta, Enterprise Architect, Laravel PHP, Phintraco, Imani Prima";
    let schemaObj = {};

    // 2. Override based on current view
    if (activeBlogPost) {
      title = `${activeBlogPost.seoMetadata.title} | Ferlin Turnip`;
      description = activeBlogPost.seoMetadata.description;
      keywords = activeBlogPost.seoMetadata.focusKeywords.join(", ");
      try {
        schemaObj = JSON.parse(activeBlogPost.seoMetadata.schemaMarkup);
      } catch (e) {
        schemaObj = { 
          "@context": "https://schema.org", 
          "@type": "BlogPosting", 
          "headline": activeBlogPost.title,
          "description": activeBlogPost.excerpt
        };
      }
    } else {
      switch (currentTab) {
        case "resume":
          title = "Pengalaman Terstruktur & Keahlian Teknis | Ferlin Firdaus Turnip";
          description = "Sertifikasi TOGAF 10, ITIL 4, dan rekam jejak sistem analisis 10+ projek di PT Phintraco Technology serta Pertamina EP oleh Ferlin Turnip.";
          keywords = "Riwayat Karir, CV Ferlin Turnip, IT Governance, TOGAF 10 certified, System Analyst Jakarta, M.Kom";
          break;
        case "portfolio":
          title = "Portofolio Projek & Dokumen Specs (FSD/BRD) | Ferlin Firdaus Turnip Catalog";
          description = "Akses modul HRIS PHINTER, LMS MBPS, dan EA Pertamina EP lengkap dengan dokumen desain fungsionalitas pendukung.";
          keywords = "Portofolio IT, Dokumen FSD, Contoh BRD, Desain Figma LMS, Projek Pertamina EP, Soraba POS";
          break;
        case "blog":
          title = "Blog & Tinjauan Ahli IT | Ferlin Firdaus Turnip SGE-Compliant";
          description = "Tinjauan mendalam arsitektur data, rekayasa perangkat lunak, dan tata kelola tangkas berbasis standar TOGAF 10.";
          keywords = "Blog IT, Tulisan Enterprise, Opini Arsitektur, Agile scrum tips, Belajar TOGAF";
          break;
        default:
          // Default Home
          break;
      }
    }

    // Apply variables directly to document head
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    let metaKey = document.querySelector('meta[name="keywords"]');
    if (!metaKey) {
      metaKey = document.createElement("meta");
      metaKey.setAttribute("name", "keywords");
      document.head.appendChild(metaKey);
    }
    metaKey.setAttribute("content", keywords);

    // Canonical link setup
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${window.location.origin}/#${currentTab}${activeBlogPost ? `/${activeBlogPost.slug}` : ""}`);

    // Inject JSON-LD Rich Schema into Head
    let schemaScript = document.getElementById("structured-data-jsonld") as HTMLScriptElement;
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = "structured-data-jsonld";
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = Object.keys(schemaObj).length > 0 
      ? JSON.stringify(schemaObj, null, 2) 
      : JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": cvData.name,
          "jobTitle": "IT Project Manager & Enterprise Architect",
          "url": window.location.origin,
          "email": cvData.contact.email,
          "telephone": cvData.contact.phone
        }, null, 2);

  }, [currentTab, activeBlogPost]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col justify-between" id="app-root-layout">
      
      {/* Dynamic Navigation */}
      <Navigation 
        currentTab={currentTab} 
        onChangeTab={(tab) => {
          setCurrentTab(tab);
          setActiveBlogPost(null); // Reset reading active post when switching menus
        }}
        onOpenSeoOverlay={() => setIsSeoOpen(true)}
      />

      {/* Main Container - Wrap inside <main> for W3C SEO Compliance */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8" id="main-content-area">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: HERO / LANDING PAGE */}
          {currentTab === "hero" && (
            <motion.div 
              key="hero-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
              id="hero-view-container"
            >
              
              {/* Introduction & Persona Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4" id="intro-grid">
                
                {/* Left: Text Briefing */}
                <div className="lg:col-span-8 space-y-6" id="intro-text">
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-mono text-xs font-semibold animate-pulse">
                    <Sparkles className="h-4 w-4" />
                    <span>Tersedia untuk Peran IT PM, Lead PMO, / Sr. System Analyst</span>
                  </div>

                  <div className="space-y-2">
                    <h1 className="font-sans font-extrabold text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
                      Hi, Saya <span className="text-indigo-600 font-extrabold">{cvData.name}</span>
                    </h1>
                    <p className="font-sans font-bold text-slate-800 text-lg sm:text-xl lg:text-2xl mt-1 tracking-tight">
                      {cvData.title}
                    </p>
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl font-light">
                    Lebih dari 6 tahun berkontribusi dalam menerjemahkan rancangan sistem kompleks menjadi solusi digital berdaya guna tinggi. Ahli dalam merestrukturisasi masterplan IT korporasi menggunakan framework **TOGAF 10**, mengatur alur Agile/Scrum, serta menyusun dokumentasi teknis (FSD/BRD) yang presisi.
                  </p>

                  {/* Immediate Action buttons */}
                  <div className="flex flex-wrap gap-3 items-center" id="intro-actions">
                    <button
                      onClick={() => setCurrentTab("portfolio")}
                      className="px-5 py-3 rounded-xl cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center space-x-2 transition-all shadow-xs"
                      id="btn-action-portfolio"
                    >
                      <span>Jelajahi Portofolio</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => setCurrentTab("resume")}
                      className="px-5 py-3 rounded-xl cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center space-x-2 transition-all"
                      id="btn-action-resume"
                    >
                      <span>Lihat Riwayat Kerja</span>
                    </button>

                    <button 
                      onClick={handlePrint}
                      className="p-3 border border-slate-200 bg-white text-slate-500 rounded-xl hover:text-indigo-600 hover:border-indigo-100 transition-all cursor-pointer"
                      title="Cetak CV Lengkap (PDF friendly)"
                      id="btn-action-print"
                    >
                      <Printer className="h-4 w-4" />
                    </button>
                  </div>

                </div>

                {/* Right: Personal Photo Card & Technical Badges */}
                <div className="lg:col-span-4 lg:pl-4" id="photo-card-wrapper">
                  <div className="border border-slate-100 p-6 rounded-2xl bg-white shadow-xs space-y-6 relative" id="photo-card">
                    
                    {/* Visual Photo (Placeholder styled beautifully to serve as branding) */}
                    <div className="w-full h-56 rounded-xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-indigo-900 border border-slate-800 flex flex-col justify-between p-5 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
                      
                      <div className="flex justify-between items-start">
                        <Terminal className="h-5 w-5 text-indigo-400" />
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/20">M.Kom</span>
                      </div>

                      <div className="space-y-1">
                        <p className="font-mono text-[10px] tracking-widest text-indigo-300">SYSTEM ARCHITECT</p>
                        <p className="font-sans font-bold text-base leading-tight">Ferlin F. Turnip</p>
                        <p className="text-[11px] text-slate-400">Jakarta, ID • TOGAF 10</p>
                      </div>
                    </div>

                    {/* Quick Contacts */}
                    <div className="space-y-3.5 text-xs text-slate-600 font-mono" id="quick-contact-nodes">
                      <div className="flex items-center space-x-2 border-b border-slate-50 pb-2">
                        <Mail className="h-4 w-4 text-indigo-500 shrink-0" />
                        <span className="truncate">{cvData.contact.email}</span>
                      </div>

                      <div className="flex items-center space-x-2 border-b border-slate-50 pb-2">
                        <Phone className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>{cvData.contact.phone}</span>
                      </div>

                      <div className="flex items-center space-x-2 pb-1">
                        <MapPin className="h-4 w-4 text-rose-500 shrink-0" />
                        <span>{cvData.contact.location}</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Core Pillars / Expertise highlights (Bento Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4" id="bento-expertise">
                
                {/* Pillar 1 */}
                <div className="p-6 bg-white border border-slate-100 rounded-2xl space-y-3 shadow-xs hover:border-indigo-100 transition-colors">
                  <span className="p-1 px-2 text-[10px] bg-indigo-50 text-indigo-700 font-mono font-bold rounded">Pilar 1</span>
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600"><Users className="h-4 w-4" /></div>
                    <h3 className="font-sans font-bold text-slate-900 text-sm">IT Project Management</h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    Siklus pengerjaan Agile/Scrum termonitor secara presisi (facilitating sprint planning, retrospectives, and requirements validation) bersertifikat PMI.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="p-6 bg-white border border-slate-100 rounded-2xl space-y-3 shadow-xs hover:border-indigo-100 transition-colors">
                  <span className="p-1 px-2 text-[10px] bg-emerald-50 text-emerald-700 font-mono font-bold rounded">Pilar 2</span>
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600"><Files className="h-4 w-4" /></div>
                    <h3 className="font-sans font-bold text-slate-900 text-sm">System Analysis & Specs</h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    Penyusun dokumentasi teringkas dan termapan (BRD, FSD, Project Charter), pemodelan UML, normalisasi database MySQL/SQL Server serta rest API.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="p-6 bg-white border border-slate-100 rounded-2xl space-y-3 shadow-xs hover:border-indigo-100 transition-colors">
                  <span className="p-1 px-2 text-[10px] bg-amber-50 text-amber-700 font-mono font-bold rounded">Pilar 3</span>
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600"><Award className="h-4 w-4" /></div>
                    <h3 className="font-sans font-bold text-slate-900 text-sm">Enterprise Architecture</h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    Penjaga standar tata kelola BUMN bersertifikat **TOGAF 10** dalam merancang Arsitektur Bisnis, Aplikasi, Data, dan Teknologi (dengan ArchiMate).
                  </p>
                </div>

              </div>

              {/* Major Career Highlights Timeline */}
              <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6" id="career-highlights">
                <div className="space-y-1">
                  <h3 className="font-sans font-bold text-slate-900 text-lg">Peta Karir & Pencapaian Penting</h3>
                  <p className="text-xs text-slate-500">Milestone perjalanan profesional Ferlin merintis sistem integrasi nasional.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="timeline-years">
                  
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                    <span className="font-mono text-[11px] font-bold text-indigo-600">DES 2025 - APR 2026</span>
                    <h4 className="font-sans font-bold text-slate-800 text-xs">Pertamina EP</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-light">Merancang arsitektur terpadu TOGAF 10 untuk divisi BUMN energi nasional.</p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                    <span className="font-mono text-[11px] font-bold text-indigo-600">2023 - 2025</span>
                    <h4 className="font-sans font-bold text-slate-800 text-xs">Sr. System Analyst</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-light">Dispatched 10+ modul HRIS & core ERP nasional di Phintraco Group.</p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                    <span className="font-mono text-[11px] font-bold text-indigo-600">2021 - 2022</span>
                    <h4 className="font-sans font-bold text-slate-800 text-xs">System Lead UNIBI</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-light">Mengarsiteki 8+ simpul modul akademik dan HRIS internal universitas.</p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                    <span className="font-mono text-[11px] font-bold text-indigo-600">2021 - MEI 2023</span>
                    <h4 className="font-sans font-bold text-slate-800 text-xs">Masters of Computer (M.Kom)</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-light">Menamatkan Magister Sistem Informasi di STMIK LIKMI dengan IPK memuaskan.</p>
                  </div>

                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 2: RESUME SECTION */}
          {currentTab === "resume" && (
            <motion.div
              key="resume-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              id="resume-view-container"
            >
              <ResumeSection />
            </motion.div>
          )}

          {/* TAB 3: PORTFOLIO */}
          {currentTab === "portfolio" && (
            <motion.div
              key="portfolio-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              id="portfolio-view-container"
            >
              <PortfolioSection />
            </motion.div>
          )}

          {/* TAB 4: BLOG & ARTIKEL MENU */}
          {currentTab === "blog" && (
            <motion.div
              key="blog-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              id="blog-view-container"
            >
              <BlogSection onPostActive={setActiveBlogPost} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer Block for semantic layout W3C verification */}
      <footer className="border-t border-slate-100 bg-white py-8 text-center" id="main-footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center space-x-6">
            <a 
              href={cvData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-indigo-600 transition-colors"
              id="footer-linkedin-link"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href={`mailto:${cvData.contact.email}`}
              className="text-slate-400 hover:text-indigo-600 transition-colors"
              id="footer-email-link"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-slate-500 font-mono">
              © {new Date().getFullYear()} {cvData.name}. All Rights Reserved.
            </p>
            <p className="text-[11px] text-slate-400 leading-normal max-w-lg mx-auto font-light">
              Website pribadi ini memenuhi standar **Technical SEO** & **GEO (Generative Engine Optimization)** dengan injeksi schema JSON-LD terstruktur secara dinamis.
            </p>
          </div>
        </div>
      </footer>

      {/* Technical SEO Audit Control Center Sidebar Panel */}
      <AnimatePresence>
        {isSeoOpen && (
          <SeoPanel 
            onClose={() => setIsSeoOpen(false)} 
            activeBlogTitle={activeBlogPost?.seoMetadata.title}
            activeBlogDesc={activeBlogPost?.seoMetadata.description}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
