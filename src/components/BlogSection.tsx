import React, { useState, useEffect } from "react";
import { BlogPost, SeoMetadata } from "../types";
import { initialBlogPosts } from "../data/cvData";
import { 
  BookOpen, 
  Calendar, 
  BadgeCheck, 
  ChevronRight, 
  PenTool, 
  Cpu, 
  Sparkles, 
  HelpCircle, 
  ShieldCheck, 
  CheckCircle,
  FileCode,
  TrendingUp,
  X,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BlogSectionProps {
  onPostActive: (post: BlogPost | null) => void;
}

export default function BlogSection({ onPostActive }: BlogSectionProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // Writer Sandbox States
  const [isWriting, setIsWriting] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Enterprise Architecture");
  const [newContent, setNewContent] = useState("");
  
  // SEO Optimizer Loading & Results
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<SeoMetadata | null>(null);
  const [optimizationError, setOptimizationError] = useState<string | null>(null);

  // Initialize blogs from localStorage or default values
  useEffect(() => {
    const stored = localStorage.getItem("ferlin_blog_posts");
    if (stored) {
      try {
        setPosts(JSON.parse(stored));
      } catch (e) {
        setPosts(initialBlogPosts);
      }
    } else {
      setPosts(initialBlogPosts);
      localStorage.setItem("ferlin_blog_posts", JSON.stringify(initialBlogPosts));
    }
  }, []);

  // Sync active post back to parent app for dynamic header SEO injects
  useEffect(() => {
    onPostActive(selectedPost);
  }, [selectedPost, onPostActive]);

  // Handle auto SEO optimize call
  async function handleAutoOptimize() {
    if (!newTitle.trim() || !newContent.trim()) {
      setOptimizationError("Harap isi Judul dan Konten Artikel sebelum melakukan optimasi SEO.");
      return;
    }

    setIsOptimizing(true);
    setOptimizationError(null);
    setOptimizationResult(null);

    try {
      const response = await fetch("/api/seo/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: newTitle,
          category: newCategory,
          content: newContent
        })
      });

      if (!response.ok) {
        throw new Error("Gagal terhubung dengan server SEO Optimizer.");
      }

      const result = await response.json();
      setOptimizationResult(result);
    } catch (err: any) {
      console.error(err);
      setOptimizationError(err.message || "Gagal mengoptimasi metadata otomatis.");
    } finally {
      setIsOptimizing(false);
    }
  }

  // Save the sandbox story
  function handlePublish() {
    if (!newTitle.trim() || !newContent.trim()) {
      alert("Harap isi Judul dan Konten Artikel.");
      return;
    }

    // Compose final parameters using SEO suggestions if available
    const finalSeo: SeoMetadata = optimizationResult || {
      title: `${newTitle} | Ferlin Turnip`,
      description: `${newContent.substring(0, 150)}... Sampaikan saran ahli IT oleh Ferlin Firdaus Turnip.`,
      focusKeywords: [newCategory, "Ferlin Turnip", "IT Project Manager"],
      schemaMarkup: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": newTitle,
        "author": {
          "@type": "Person",
          "name": "Ferlin Firdaus Turnip"
        }
      }, null, 2),
      seoScore: 70,
      suggestions: [
        "Sediakan tautan masuk (internal linking) untuk meningkatkan keterbacaan bot crawler.",
        "Minyaki artikel dengan variasi keyword pendukung di tajuk sekunder (H2/H3)."
      ]
    };

    const newPost: BlogPost = {
      id: `blog_${Date.now()}`,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      category: newCategory,
      excerpt: newContent.split(".")[0] + ".",
      readTime: `${Math.max(2, Math.ceil(newContent.split(/\s+/).length / 180))} Min Read`,
      publishedAt: new Date().toISOString().split("T")[0],
      content: newContent,
      seoMetadata: finalSeo,
      isAiGeneratedSeo: !!optimizationResult
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem("ferlin_blog_posts", JSON.stringify(updated));

    // Reset writing desk
    setNewTitle("");
    setNewContent("");
    setOptimizationResult(null);
    setIsWriting(false);
  }

  // Delete an article
  function handleDeletePost(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return;
    const filtered = posts.filter(p => p.id !== id);
    setPosts(filtered);
    localStorage.setItem("ferlin_blog_posts", JSON.stringify(filtered));
    if (selectedPost?.id === id) {
      setSelectedPost(null);
    }
  }

  return (
    <div className="py-6 space-y-8" id="blog-section-root">
      
      {/* Upper desk info & write trigger */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4" id="blog-header-bar">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1 px-3 rounded-full bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold">BLOG</span>
            <h2 className="font-sans font-extrabold text-slate-900 text-2xl tracking-tight">Sudut Pandang Ahli & Tata Kelola IT</h2>
          </div>
          <p className="text-xs text-slate-500 max-w-lg leading-relaxed">
            Artikel profesional berisi pandangan taktis Ferlin Firdaus Turnip sebagai seorang Ahli Sistem dan IT Project Manager dalam tata kelola digital.
          </p>
        </div>

        <button
          onClick={() => setIsWriting(!isWriting)}
          className="flex items-center space-x-1.5 px-4  py-2 bg-indigo-600 cursor-pointer text-white font-semibold rounded-xl text-xs shadow-xs hover:bg-indigo-700 transition-colors"
          id="btn-tulis-artikel"
        >
          {isWriting ? <X className="h-4 w-4" /> : <PenTool className="h-4 w-4" />}
          <span>{isWriting ? "Kembali ke Berita" : "Tulis Artikel Baru"}</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* Case 1: Active Writer Desk (Sandbox) */}
        {isWriting ? (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            id="write-sandbox-layout"
          >
            
            {/* Composers column */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-100 space-y-4" id="editor-left-pane">
              <h3 className="font-sans font-bold text-slate-800 text-sm border-b border-slate-100 pb-2 flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                <span>Editor Artikel Profesional</span>
              </h3>

              <div className="space-y-4 text-xs font-medium">
                <div className="space-y-1">
                  <label className="text-slate-600 block">Kategori Pemikiran</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-800 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Enterprise Architecture">Enterprise Architecture (EA)</option>
                    <option value="System Analysis">System Analysis</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Software Development">Software Development / Laravel</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-600 block">Judul Artikel</label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Contoh: Menguji Skalabilitas Database Multi-Tenant Menggunakan Postgres..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-600 block">Konten / Isi Artikel</label>
                  <textarea
                    rows={12}
                    required
                    placeholder="Ketik pandangan ahli Anda di sini..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white leading-relaxed font-sans"
                  />
                </div>

                {/* Optimasi Action */}
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={handleAutoOptimize}
                    disabled={isOptimizing}
                    type="button"
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold border border-emerald-200 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="h-4 w-4 animate-spin-slow text-emerald-600" />
                    <span>{isOptimizing ? "Menganalisis SEO..." : "Optimasi Metadata Otomatis"}</span>
                  </button>

                  <button
                    onClick={handlePublish}
                    type="button"
                    className="px-4 py-2 bg-indigo-600 cursor-pointer text-white font-bold rounded-lg hover:bg-indigo-700"
                  >
                    Terbitkan Artikel
                  </button>
                </div>
              </div>
            </div>

            {/* SEO Real-time Meta Optimizer results column */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-2xl space-y-6 flex flex-col justify-between" id="editor-right-pane">
              <div className="space-y-5">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                  <Cpu className="h-4 w-4 text-emerald-400" />
                  <span className="font-sans font-bold text-sm">Pratinjau & Optimasi Teknis SEO</span>
                </div>

                {isOptimizing ? (
                  <div className="py-20 flex flex-col items-center justify-center space-y-3" id="seo-spinner">
                    <Sparkles className="h-8 w-8 text-indigo-400 animate-bounce" />
                    <p className="text-xs text-slate-400 font-mono">Arsitek AI memeriksa semantic density & JSON-LD...</p>
                  </div>
                ) : optimizationResult ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-5 text-xs"
                    id="seo-optimization-metrics"
                  >
                    {/* Score Gauge */}
                    <div className="flex items-center justify-between p-3.5 bg-emerald-950/40 border border-emerald-500/20 rounded-xl">
                      <div>
                        <p className="font-bold text-emerald-400 text-base">Skor Optimasi SEO: {optimizationResult.seoScore}%</p>
                        <p className="text-slate-400 text-[10px]">Sesuai dengan kriteria crawler & Generative AI</p>
                      </div>
                      <BadgeCheck className="h-8 w-8 text-emerald-400" />
                    </div>

                    {/* Meta tags preview */}
                    <div className="space-y-3 font-mono">
                      <div className="p-3 bg-slate-800/80 rounded-lg space-y-1.5 border border-slate-800">
                        <span className="text-[10px] text-indigo-300 font-bold block">{`<title> Tag Suggestions (Max 60)`}</span>
                        <p className="text-white text-[11px] leading-tight font-sans">{optimizationResult.title}</p>
                      </div>

                      <div className="p-3 bg-slate-800/80 rounded-lg space-y-1.5 border border-slate-800">
                        <span className="text-[10px] text-indigo-300 font-bold block">{`<meta name="description"> (Max 160)`}</span>
                        <p className="text-slate-300 text-[11px] leading-relaxed font-sans">{optimizationResult.description}</p>
                      </div>

                      <div className="p-3 bg-slate-800/80 rounded-lg space-y-1.5 border border-slate-800">
                        <span className="text-[10px] text-indigo-300 font-bold block">Focus Keywords Derivation</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {optimizationResult.focusKeywords.map((k, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-200 text-[9px]">{k}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Suggestions check */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider font-mono">Masukan Teknis GEO:</p>
                      <div className="space-y-1.5">
                        {optimizationResult.suggestions.map((sug, i) => (
                          <div key={i} className="flex items-start space-x-1.5 text-slate-300 text-[11px] font-sans">
                            <span className="text-indigo-400 font-mono mt-0.5">•</span>
                            <span>{sug}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </motion.div>
                ) : (
                  <div className="text-center py-16 text-slate-400 space-y-3" id="seo-empty-slate">
                    <HelpCircle className="h-10 w-10 text-slate-600 mx-auto" />
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-300">Belum Ada Analisis Metadata</p>
                      <p className="text-[11px] text-slate-500 max-w-[280px] mx-auto">
                        Ketik rancangan artikel Anda dikanan, lalu klik **Optimasi Metadata Otomatis** untuk memicu deep learning crawl review.
                      </p>
                    </div>
                  </div>
                )}

                {optimizationError && (
                  <div className="p-3 bg-rose-950/50 border border-rose-500/20 text-rose-300 rounded-xl text-xs">
                    {optimizationError}
                  </div>
                )}
              </div>

              {/* Technical SEO reassurance badge */}
              <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-400 flex items-center space-x-1.5 font-mono">
                <ShieldCheck className="h-4 w-4 text-emerald-500 animate-pulse" />
                <span>Teknikal Schema Markup XML/JSON otomatis disiapkan oleh AI.</span>
              </div>
            </div>

          </motion.div>
        ) : selectedPost ? (
          
          /* Case 2: Reading Pane Layout */
          <motion.article
            key="reader"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            id={`blog-post-pane-${selectedPost.id}`}
          >
            {/* Reading Column */}
            <div className="lg:col-span-8 bg-white border border-slate-100 p-6 md:p-8 rounded-2xl shadow-xs space-y-6" id="reader-pane">
              
              {/* Back breadcrumbs */}
              <button 
                onClick={() => setSelectedPost(null)}
                className="flex items-center space-x-1 text-xs text-indigo-600 font-semibold hover:underline cursor-pointer"
                id="btn-back-to-blogs"
              >
                <span>← Kembali ke Daftar Artikel</span>
              </button>

              {/* Header Info */}
              <div className="border-b border-sidebar-border border-slate-100 pb-5 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold uppercase">{selectedPost.category}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{selectedPost.publishedAt}</span>
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{selectedPost.readTime}</span>
                </div>

                <h1 className="font-sans font-extrabold text-slate-900 text-xl md:text-2xl leading-tight">
                  {selectedPost.title}
                </h1>

                <div className="flex items-center space-x-2 text-xs text-slate-600 mt-2 font-light">
                  <span>Ditulis oleh:</span>
                  <span className="font-semibold text-slate-900">Ferlin Firdaus Turnip</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[9px] font-bold">EXPERT VIEWS</span>
                </div>
              </div>

              {/* Styled content renderer */}
              <div className="text-slate-700 text-sm md:text-base leading-relaxed space-y-4 font-normal" id="article-body">
                {selectedPost.content.split("\n\n").map((para, i) => {
                  if (para.startsWith("### ")) {
                    return <h3 key={i} className="font-sans font-bold text-slate-900 text-base md:text-lg pt-4 pb-1">{para.replace("### ", "")}</h3>;
                  }
                  if (para.startsWith("## ")) {
                    return <h2 key={i} className="font-sans font-bold text-slate-900 text-lg md:text-xl pt-5 pb-1">{para.replace("## ", "")}</h2>;
                  }
                  if (para.startsWith("1. ") || para.startsWith("* ") || para.startsWith("- ")) {
                    // Render simple lists
                    const lines = para.split("\n");
                    return (
                      <ul key={i} className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-slate-600">
                        {lines.map((line, idx) => (
                          <li key={idx}>
                            {line.replace(/^(\d+\.\s+|\*\s+|-\s+)/, "")}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  
                  // Handle basic inline bold conversions
                  const cleanText = para.split("**").map((chunk, cidx) => {
                    return cidx % 2 === 1 ? <strong key={cidx} className="font-semibold text-indigo-900">{chunk}</strong> : chunk;
                  });

                  return <p key={i} className="text-slate-600 text-xs md:text-sm font-light leading-relaxed">{cleanText}</p>;
                })}
              </div>

              {/* Footer Author check */}
              <div className="border-t border-slate-100 pt-6 mt-6 flex items-center space-x-3 text-xs bg-slate-50 p-4 rounded-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                <p className="text-slate-600">
                  <span className="font-bold text-slate-900">Pasal Hak Cipta & Keaslian Jurnal:</span> Artikel ini merepresentasikan pandangan orisinal dan teknis Ferlin Firdaus Turnip berdasarkan penugasan rekayasa sistem yang sesungguhnya.
                </p>
              </div>

            </div>

            {/* Sidebar metadata viewer for complete transparent technical SEO checks */}
            <div className="lg:col-span-4 space-y-6" id="post-seo-audit-pane">
              
              <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xs space-y-4" id="seo-audit-card">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <div className="flex items-center space-x-1.5">
                    <Cpu className="h-4 w-4 text-emerald-400" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">SEO Technical Meta</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/20 text-[10px] text-emerald-400 font-bold font-mono">
                    Score: {selectedPost.seoMetadata.seoScore}%
                  </span>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase">Title tag in Head:</span>
                    <p className="text-white text-[11px] leading-tight font-sans bg-slate-800 p-2.5 rounded border border-slate-800">
                      {selectedPost.seoMetadata.title}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase">Meta Description:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed font-sans bg-slate-800 p-2.5 rounded border border-slate-800">
                      {selectedPost.seoMetadata.description}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase">Focus Keywords:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedPost.seoMetadata.focusKeywords.map((k, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-indigo-300 text-[9px]">{k}</span>
                      ))}
                    </div>
                  </div>

                  {/* Schema Toggle check */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] text-slate-400 block uppercase flex items-center justify-between">
                      <span>Injected JSON-LD Schema:</span>
                      <span className="text-emerald-400 text-[9px]">✔ Active</span>
                    </span>
                    <pre className="text-[9px] text-slate-400 bg-slate-950 p-2 rounded max-h-32 overflow-y-auto font-mono scrollbar-thin">
                      {selectedPost.seoMetadata.schemaMarkup}
                    </pre>
                  </div>

                </div>
              </div>

              {/* SGE Simulation */}
              <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl space-y-2 text-xs">
                <p className="font-bold text-amber-900 flex items-center space-x-1">
                  <Sparkles className="h-4 w-4 text-amber-600 animate-pulse" />
                  <span>Generative Engine (GEO) Readiness</span>
                </p>
                <p className="text-amber-800 leading-relaxed font-light">
                  Struktur artikel ini memanfaatkan format Q&A implisit (Heading-Body coupling) yang sangat disukai oleh Google Search Generative Experience (SGE) saat mengenali entitas kepakaran (*Experience, Expertise, Authoritativeness, Trustworthiness - E-E-A-T*).
                </p>
              </div>

            </div>

          </motion.article>
        ) : (
          
          /* Case 3: Initial Catalog view of and search entries */
          <motion.div
            key="catalog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            id="blog-posts-catalog-grid"
          >
            {posts.map((post) => (
              <div 
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden hover:shadow-md hover:border-indigo-100 cursor-pointer flex flex-col justify-between transition-all duration-300"
                id={`blog-card-${post.id}`}
              >
                {/* Visual Category ribbon */}
                <div className="p-6 pb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold uppercase">
                      {post.category}
                    </span>
                    
                    <span className="text-[10px] font-mono text-slate-400">
                      {post.readTime}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-sans font-bold text-slate-900 text-sm md:text-base leading-snug group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center space-x-1 font-mono">
                      <span>{post.publishedAt}</span>
                      <span>•</span>
                      <span className="font-semibold text-slate-700">Oleh Ferlin</span>
                    </p>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 font-light">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer specs details link */}
                <div className="border-t border-slate-50 px-6 py-3.5 bg-slate-50/60 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-[10px] text-emerald-700 font-mono">
                    <CodeCheck className="h-3.5 w-3.5" />
                    <span>SEO Score: {post.seoMetadata.seoScore}%</span>
                  </div>

                  <div className="flex items-center space-x-1 text-slate-400 group-hover:text-indigo-600 transition-colors text-xs font-semibold">
                    <span>Baca</span>
                    <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}

            {/* Empty Desk Add Prompt */}
            {posts.length === 0 && (
              <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl p-6" id="empty-posts-catalogs">
                <FileCode className="h-10 w-10 text-slate-300 mx-auto" />
                <h4 className="font-sans font-bold text-slate-700 text-sm mt-3">Belum Ada Artikel</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">Gunakan tombol **Tulis Artikel Baru** di atas untuk merilis gagasan ahli yang pertama.</p>
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}

// Minimal icons wrapper for code checks
export function CodeCheck({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m10 10-2 2 2 2"/><path d="m14 14 2-2-2-2"/><rect width="20" height="20" x="2" y="2" rx="2"/></svg>
  );
}
