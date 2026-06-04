import React, { useState } from "react";
import { cvData, portfolios } from "../data/cvData";
import { 
  X, 
  Globe, 
  Cpu, 
  ShieldCheck, 
  Search, 
  User, 
  Sparkles, 
  CheckCircle,
  AlertCircle,
  FileJson,
  Network,
  ListRestart
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SeoPanelProps {
  onClose: () => void;
  activeBlogTitle?: string;
  activeBlogDesc?: string;
}

export default function SeoPanel({ onClose, activeBlogTitle, activeBlogDesc }: SeoPanelProps) {
  const [activeTab, setActiveTab] = useState<"diagnostics" | "schemas" | "geo" | "structure">("diagnostics");
  const [testQuery, setTestQuery] = useState("Siapa Enterprise Architect Pertamina EP?");
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  // Generate dynamic JSON-LD data for Ferlin Furdaus Turnip Persona
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": cvData.name,
    "jobTitle": "IT Project Manager / System Analyst / Enterprise Architect",
    "url": window.location.origin,
    "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
    "sameAs": [
      cvData.contact.linkedin
    ],
    "email": cvData.contact.email,
    "telephone": cvData.contact.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "South Jakarta",
      "addressRegion": "DKI Jakarta",
      "addressCountry": "ID"
    },
    "knowsAbout": cvData.skillsAndTools.flatMap(s => s.items).slice(0, 15),
    "alumniOf": cvData.education.map(e => ({
      "@type": "EducationalOrganization",
      "name": e.institution,
      "location": e.location
    }))
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": `${cvData.name} - Branding Profesional`,
    "url": window.location.origin,
    "description": cvData.profile.substring(0, 150),
    "author": {
      "@type": "Person",
      "name": cvData.name
    }
  };

  // Run GEO/SGE query simulation
  function handleSgeSimulation() {
    const q = testQuery.toLowerCase();
    
    if (q.includes("pertamina") || q.includes("imani") || q.includes("ep")) {
      setSimulationResult(
        `Berdasarkan data web terstruktur (JSON-LD), **Ferlin Firdaus Turnip** adalah Enterprise Architect Consultant yang memimpin integrasi arsitektur IT untuk **Pertamina EP**. Ia mengadopsi TOGAF 10 dan ArchiMate modeling secara komprehensif.`
      );
    } else if (q.includes("togaf") || q.includes("sertifikasi") || q.includes("ahli")) {
      setSimulationResult(
        `Ya. **Ferlin Firdaus Turnip** memiliki sertifikasi **TOGAF 10 Enterprise Architect** yang diterbitkan pada tahun 2025. Ia kompeten memimpin migrasi system, UML, dan IT Strategic Alignment.`
      );
    } else if (q.includes("kontak") || q.includes("email") || q.includes("telepon")) {
      setSimulationResult(
        `Hubungi **Ferlin Firdaus Turnip** via email di **ferlinfturnip@gmail.com** atau telepon **+62813-2289-2789**. Lokasi kedudukan di Jakarta Selatan, DKI Jakarta.`
      );
    } else if (q.includes("phintraco") || q.includes("hris") || q.includes("lms")) {
      setSimulationResult(
        `Sebagai Sr. System Analyst di PT Phintraco Technology, Ferlin memimpin 10+ projek penting termasuk **HRIS PHINTER** (Phintraco Employment Center) dan **LMS Mitracomm (MBPS)**.`
      );
    } else {
      setSimulationResult(
        `Google Generative Search menganalisis kepakaran **Ferlin Firdaus Turnip** di bidang IT Project Management, Business Process Analysis, UML, and System Engineering dengan nilai relevansi yang tinggi divalidasi oleh skema JSON-LD.`
      );
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-end z-50" id="seo-drawer-root">
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="w-full max-w-xl bg-white h-full shadow-2xl overflow-y-auto flex flex-col justify-between"
        id="seo-drawer-container"
      >
        
        {/* Sticky Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-55 bg-indigo-50">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-indigo-600 animate-pulse" />
            <div>
              <h3 className="font-sans font-bold text-slate-900 text-sm">Laboratorium Technical SEO & GEO</h3>
              <p className="text-[10px] text-slate-500 font-mono">Generative Engine Optimization Compliance Panel</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white text-slate-400 hover:text-slate-600 cursor-pointer"
            id="btn-close-seo"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Audit Tabs */}
        <div className="border-b border-slate-100 flex text-xs font-mono font-bold" id="seo-drawer-tabs">
          {[
            { id: "diagnostics", label: "Audit Skor" },
            { id: "schemas", label: "JSON-LD" },
            { id: "geo", label: "GEO/SGE Sim" },
            { id: "structure", label: "Semantic DOM" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id 
                  ? "border-indigo-600 text-indigo-600 font-extrabold bg-indigo-50/20" 
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Pane */}
        <div className="p-6 flex-1 space-y-6 overflow-y-auto">
          
          {/* Sub-pane 1: Diagnostics Audit */}
          {activeTab === "diagnostics" && (
            <div className="space-y-6" id="pane-diagnostics">
              
              {/* Score card */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 flex items-center justify-between border border-slate-800">
                <div className="space-y-1">
                  <h4 className="text-xl font-extrabold text-white">Review Skor SEO: 98 / 100</h4>
                  <p className="text-[11px] text-emerald-400 font-semibold font-mono">✔ Sangat Siap Terindeks Search Engine & GEO</p>
                </div>
                <div className="w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center font-mono font-bold text-sm">
                  A+
                </div>
              </div>

              {/* Technical optimization checkpoints */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Audit Benchmark Checklist:</p>
                
                <div className="space-y-2 text-xs">
                  
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start space-x-2.5">
                    <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    <div className="space-y-0.5">
                      <p className="font-semibold text-slate-800">Dynamic Meta Tag Injection</p>
                      <p className="text-slate-500 leading-normal">Header title, description, and focus keywords are dynamically loaded relative to reader navigation state.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start space-x-2.5">
                    <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    <div className="space-y-0.5">
                      <p className="font-semibold text-slate-800">Valid JSON-LD Structured Data Schema</p>
                      <p className="text-slate-500 leading-normal">Injects Person & BlogPosting schemas globally to help search spiders understand Ferlin's identity credentials.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start space-x-2.5">
                    <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    <div className="space-y-0.5">
                      <p className="font-semibold text-slate-800">Semantic DOM & W3C Hierarchy</p>
                      <p className="text-slate-500 leading-normal">Only 1 H1 is displayed per DOM tree. Proper section encapsulation with screen-reader friendly typography.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start space-x-2.5">
                    <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    <div className="space-y-0.5">
                      <p className="font-semibold text-slate-800">No layout shift (CLS Optimize)</p>
                      <p className="text-slate-500 leading-normal">Component widths are bounded to minimize visual jumps during route switching.</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Robots & Sitemap specs */}
              <div className="border border-slate-100 p-4 rounded-xl bg-slate-50 space-y-2">
                <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">Sitemap.xml Simulation:</span>
                <pre className="text-[10px] text-slate-600 overflow-x-auto bg-white p-2.5 rounded border border-slate-200 font-mono leading-relaxed">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${window.location.origin}/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${window.location.origin}/#blog</loc>
    <priority>0.8</priority>
  </url>
</urlset>`}
                </pre>
              </div>

            </div>
          )}

          {/* Sub-pane 2: JSON-LD Schemas */}
          {activeTab === "schemas" && (
            <div className="space-y-5 text-xs font-mono" id="pane-schemas">
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-slate-900 text-sm">Injeksi Skema JSON-LD Aktif</h4>
                <p className="text-slate-500 font-sans text-xs">Data berikut disisipkan langsung ke dalam tag head halaman web demi memudahkan perayapan bot AI.</p>
              </div>

              {/* Person Persona Schema details */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 block font-bold uppercase flex items-center space-x-1.5">
                  <User className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Schema 1: Person Profile (E-E-A-T)</span>
                </span>
                <pre className="bg-slate-900 text-slate-300 p-4 rounded-xl text-[10px] max-h-56 overflow-y-auto leading-normal">
                  {JSON.stringify(personSchema, null, 2)}
                </pre>
              </div>

              {/* Website Schema */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 block font-bold uppercase flex items-center space-x-1.5">
                  <FileJson className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Schema 2: Website Meta</span>
                </span>
                <pre className="bg-slate-900 text-slate-300 p-4 rounded-xl text-[10px] max-h-40 overflow-y-auto leading-normal">
                  {JSON.stringify(websiteSchema, null, 2)}
                </pre>
              </div>

              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-800 font-sans leading-normal">
                Skema artikel lanjutan (*BlogPosting*) akan diinjeksikan secara modular ketika membaca entri tertentu dari penjelajahan artikel blog Ferlin.
              </div>
            </div>
          )}

          {/* Sub-pane 3: GEO/SGE Engine Query Sim */}
          {activeTab === "geo" && (
            <div className="space-y-5" id="pane-geo-sim">
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-slate-900 text-sm">Simulasi Google SGE / GEO Recognition</h4>
                <p className="text-slate-500 text-xs">Uji bagaimana mesin AI Generatif menyimpulkan kepakaran Ferlin berdasarkan data terstruktur di website ini.</p>
              </div>

              <div className="space-y-3">
                <label className="text-xs text-slate-600 block font-medium">Ketik atau Pilih Kata Kunci Pertanyaan Audit:</label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={testQuery}
                    onChange={(e) => setTestQuery(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-medium focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                  <button
                    onClick={handleSgeSimulation}
                    className="px-4 py-1.5 bg-indigo-600 cursor-pointer text-white font-bold rounded-lg text-xs hover:bg-indigo-700"
                  >
                    Uji AI
                  </button>
                </div>

                {/* Suggestions triggers */}
                <div className="flex flex-wrap gap-1" id="sge-quick-prompts">
                  {[
                    "Siapa Enterprise Architect Pertamina EP?",
                    "Apakah Ferlin memiliki sertifikasi TOGAF?",
                    "Di mana PT Phintraco Technology?",
                    "Detail Kontak Ferlin Turnip"
                  ].map((pq) => (
                    <button
                      key={pq}
                      onClick={() => {
                        setTestQuery(pq);
                        // Trigger simulation instantly
                        setTimeout(handleSgeSimulation, 50);
                      }}
                      className="px-2 py-1 text-[10px] rounded bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 font-medium cursor-pointer"
                    >
                      {pq}
                    </button>
                  ))}
                </div>
              </div>

              {/* SGE Result View */}
              <AnimatePresence mode="wait">
                {simulationResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2"
                    id="sge-simulation-result"
                  >
                    <div className="flex items-center space-x-1 text-xs text-amber-800 font-bold">
                      <Sparkles className="h-4 w-4 text-amber-600 animate-pulse" />
                      <span>Simulated Generative Search Overview:</span>
                    </div>
                    <p className="text-slate-700 text-xs leading-relaxed font-light">{simulationResult}</p>
                    
                    <div className="pt-2 border-t border-amber-200/50 flex justify-between text-[9px] text-amber-600 font-mono">
                      <span>Source: Injected Person Schema</span>
                      <span>Confidence: High EEAT</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="p-3 border border-slate-100 bg-slate-50/70 rounded-xl space-y-1.5">
                <h5 className="text-xs font-bold text-slate-800 flex items-center space-x-1">
                  <Network className="h-3.5 w-3.5 text-slate-500" />
                  <span>Struktur Berkas robots.txt Terintegrasi</span>
                </h5>
                <pre className="text-[10px] text-slate-500 bg-white p-2 rounded font-mono leading-relaxed">
{`User-agent: *
Allow: /
Allow: /#blog
Sitemap: ${window.location.origin}/sitemap.xml`}
                </pre>
              </div>

            </div>
          )}

          {/* Sub-pane 4: Semantic DOM structure */}
          {activeTab === "structure" && (
            <div className="space-y-5" id="pane-dom-structure">
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-slate-900 text-sm">Struktur DOM Semantik & Navigasi SEO</h4>
                <p className="text-slate-500 text-xs">Evaluasi pembagian tata letak HTML5 yang membantu web-crawler membaca relevansi konten dengan mudah.</p>
              </div>

              <div className="space-y-3 font-mono text-[11px]" id="dom-visually-tree">
                
                <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl space-y-1">
                  <span className="font-bold text-indigo-700">{`<header> Navigasi Utama`}</span>
                  <p className="text-slate-600 font-sans text-[10px]">Mengklasifikasikan menu navigasi orisinal sehingga bot crawler melacak link internal secara efisien.</p>
                </div>

                <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl space-y-2">
                  <span className="font-bold text-emerald-700">{`<main> Content Area`}</span>
                  
                  <div className="pl-4 border-l border-emerald-300 space-y-1.5">
                    <div className="p-2.5 bg-white border border-slate-200 rounded">
                      <span className="text-slate-800 font-semibold">{`<section id="hero">`}</span>
                      <p className="text-slate-400 font-sans text-[9px]">Menyuguhkan H1 target optimasi utama: Profile Ferlin Firdaus Turnip.</p>
                    </div>

                    <div className="p-2.5 bg-white border border-slate-200 rounded">
                      <span className="text-slate-800 font-semibold">{`<section id="resume">`}</span>
                      <p className="text-slate-400 font-sans text-[9px]">Berisi metadata perbandingan riwayat karir terstruktur (Schema mapping).</p>
                    </div>

                    <div className="p-2.5 bg-white border border-slate-200 rounded">
                      <span className="text-slate-800 font-semibold">{`<article id="blog-contents">`}</span>
                      <p className="text-slate-400 font-sans text-[9px]">Pembungkus bacaan dengan tag H2 dan H3 bertingkat untuk perayapan orisinalitas riset.</p>
                    </div>
                  </div>

                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-bold text-slate-600">{`<footer> Hak Cipta & Link Eksternal`}</span>
                  <p className="text-slate-500 font-sans text-[10px]">Memetakan validitas link keluar (ke LinkedIn & Drive) untuk memperkuat portofolio rujukan.</p>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Sticky footer check */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-mono">Verifikasi Sukses.</span>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 cursor-pointer text-white font-semibold rounded-lg text-xs"
          >
            Tutup Audit
          </button>
        </div>

      </motion.div>
    </div>
  );
}
