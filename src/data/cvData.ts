import { CvData, ProjectPortfolio, BlogPost } from "../types";

export const cvData: CvData = {
  name: "FERLIN FIRDAUS TURNIP",
  title: "IT Project Manager / System Analyst / IT Functional",
  contact: {
    phone: "+62813-2289-2789",
    email: "ferlinfturnip@gmail.com",
    location: "South Jakarta, DKI Jakarta",
    linkedin: "https://www.linkedin.com/in/ferlin-firdaus-turnip/",
  },
  profile: "A results-driven IT Professional with 6+ years of hands-on experience delivering end-to-end IT solutions across diverse industries — technology, education, HRIS, retail, and agrotourism and more. Proven track record of leading 20+ projects simultaneously, from requirements elicitation and BRD/FSD/TSD documentation through to UAT and production go-live. Recognized for translating complex business needs into scalable, architecture-aligned solutions. Certified Enterprise Architect (TOGAF 10) with direct engagement on national-scale corporate clients including Pertamina EP. Currently positioned to step into IT Project Manager or IT Lead roles. Actively engaged in various professional courses and training programs and certifications such as Project Management for Project Manager, Enterprise Architect Tools, IT Strategic Planning, IT Service Management (ITSM), and Business Analysis, as a form of commitment to continuous self-improvement.",
  competencies: [
    {
      title: "Business Process Analysis",
      description: "Expertise in analyzing and designing effective and efficient business process flows using BPMN tools.",
    },
    {
      title: "Requirement Gathering",
      description: "Proficient in translating business needs into business, functional, and user requirements documents (BRD, FSD, TSD) for development teams.",
    },
    {
      title: "System Analysis",
      description: "Comprehensive understanding of system architecture and scalability to meet organizational needs, and documenting them on FSD and UML.",
    },
    {
      title: "Stakeholder Management",
      description: "Effective communication and collaboration to align project goals with business objectives, using frameworks like the RACI Matrix.",
    },
    {
      title: "Agile Methodology",
      description: "Extensive experience in implementing Agile practices (Scrum) to improve team productivity, ensure iterative progress, and deliver incremental value.",
    },
    {
      title: "Project Leadership",
      description: "Proven ability to lead cross-functional teams and manage project lifecycles, ensuring timely and cost-effective outcomes.",
    },
    {
      title: "TOGAF Enterprise Architect",
      description: "Ability to align business, application, and technology strategies and create architectures that match the company's long-term vision.",
    },
  ],
  experiences: [
    {
      id: "exp1",
      company: "PT. Imani Prima",
      role: "Enterprise Architect Consultant",
      location: "South Jakarta",
      period: "December 2025 – April 2026",
      description: "Served as a lead Enterprise Architecture (EA) consultant focusing on national-scale corporate digital initiatives.",
      categories: ["Enterprise Architecture", "Project Management"],
      tasks: [
        "Spearheaded enterprise IT architecture design and integration for Pertamina EP (national-scale energy corporation), aligning digital initiatives with the organization's long-term IT Masterplan.",
        "Delivered complete EA artifacts — business, application, data, and technology architecture — using TOGAF 10 Phase A–H, ArchiMate modeling, and Sparx Enterprise Architect.",
        "Facilitated C-level executive workshops and presented architecture roadmaps to senior management, securing strategic buy-in across stakeholder groups.",
        "Coordinated directly with Pertamina EP's business units and project PICs for requirements gathering, architecture governance, and change management.",
        "Established EA governance standards ensuring traceability, standardization, and IT-business strategic alignment enterprise-wide.",
        "Reported EA management progress and architectural decisions to PMO Manager through structured documentation and periodic presentations.",
      ],
      projectsDelivered: ["Enterprise Architecture Pertamina EP", "Enterprise Architecture Planning TOGAF for BAZNAS Kab. Majalengka"],
    },
    {
      id: "exp2",
      company: "Universitas Mpu Tantular",
      role: "Part-Time Lecturer",
      location: "East Jakarta",
      period: "March 2026 – Now",
      description: "Instructed next-generation software professionals under the Informatics Engineering Study Program.",
      categories: ["System Analysis"],
      tasks: [
        "Taught formal evening and regular courses, including: Teori Bahasa Formal dan Automata (Language and Automata Theory - 3 credits) and Sistem Pakar (Expert Systems - 3 credits).",
        "Developed full syllabus, RPS (rencana pembelajaran semester), lecture outline, and evaluation mechanisms for senior computer science courses.",
      ],
    },
    {
      id: "exp3",
      company: "PT. Phintraco Technology",
      role: "Sr. System Analyst & Programmer",
      location: "South Jakarta",
      period: "February 2023 – December 2025",
      description: "Led development cycles and technical documentation across multiple enterprise SaaS & internal modules.",
      categories: ["System Analysis", "Development", "Project Management"],
      tasks: [
        "Led end-to-end system analysis, requirements gathering, and architecture design for 10+ enterprise projects (HRIS, LMS, ERP, POS) across Phintraco Group's holding structure and external clients.",
        "Owned full documentation lifecycle — BRD (Business Requirements Document), FSD (Functional Specification Document), and Project Charter — serving as the primary liaison between business owners, UI/UX designers, and development teams.",
        "Designed and implemented scalable web-based solutions using Laravel/PHP; optimized database schemas and query performance for systems handling hundreds of concurrent users.",
        "Collaborated closely with QA teams to define test plans and UAT scenarios, ensuring 100% business requirement coverage prior to each release.",
        "Championed Agile/Scrum methodologies across all project tracks, facilitating sprint planning, backlog grooming, and retrospectives to achieve on-time alignment.",
      ],
      projectsDelivered: [
        "Lifetime Integrated HRIS as Core HR for Holding Company Phintraco Group",
        "End to End Recruitment System as embedded Module for Phintraco Group",
        "Performance Appraisal System as embedded Module for Phintraco Group",
        "Learning Management System as embedded Module for Phintraco Group",
        "Task Activity Management System for Project Update",
        "Integrated Office Space Reservation System",
        "Learning Management System (SaaS, multitenant) – Mitracomm Business Process Services (MBPS)",
        "Company Profile and Content Management System of Phincon Academy",
        "Company Profile of Natha Jaya Makmur",
        "Integrated Point of Sales and Inventory System of Healthy Fit Pharmacy",
        "Integrated Point of Sales and Inventory System of SORABA Body Care",
      ],
    },
    {
      id: "exp4",
      company: "Universitas Informatika dan Bisnis Indonesia (UNIBI)",
      role: "System Analyst & Programmer",
      location: "Bandung",
      period: "August 2021 – November 2022",
      description: "Built the academic and administrative core information systems of the university.",
      categories: ["System Analysis", "Development"],
      tasks: [
        "Analyzed institutional requirements and architected integrated information systems covering the full academic and administrative lifecycle of the university.",
        "Acted as project lead for 8+ simultaneous systems — Academic Information System, HRIS, Recruitment Portal, QR Presence System, Questionnaire & Graduation Management — coordinating with rector's office and department heads.",
        "Built and optimized RESTful backend APIs for inter-module integration using CodeIgniter/PHP.",
        "Designed and maintained highly normalize relational database schemas for academic integrity.",
      ],
      projectsDelivered: [
        "QR Code Based Presence System UNIBI",
        "Official Website PKKMB UNIBI",
        "Recruitment Portal System Web-Based UNIBI",
        "Questionnaire Management System UNIBI",
        "Final Project and Graduation Information System UNIBI",
        "Lifetime Integrated Academic Information System UNIBI",
        "Letter Archive Information System UNIBI",
        "Assets Information System UNIBI",
        "Human Resource Information System UNIBI",
      ],
    },
    {
      id: "exp5",
      company: "PT. Agrowisata Porlak Parna",
      role: "System Analyst & Web Developer",
      location: "Bandung - Samosir",
      period: "August 2020 – August 2021",
      description: "Concurrently served as IT Manager & Assistant Director at Toba Research Center, managing tech stacks and academic portals.",
      categories: ["System Analysis", "Development", "Project Management"],
      tasks: [
        "Reported directly to the Board of Directors and Commissioners on information system development progress, establishing early C-suite communication capabilities.",
        "Supervised and mentored a team of intern developers, functioning as technical lead and project supervisor for all system builds.",
        "Designed and delivered Conference Management System, Journal Management System, and End-to-End Affiliate Marketing System for Toba Research Center.",
        "Served concurrently as IT Manager & Assistant Director at Toba Research Center: managed cloud-based IT assets and acted as Committee Secretary at 5 international academic conferences on agriculture, culture heritage, and environment.",
      ],
      projectsDelivered: [
        "Conference Management System of Toba Research Center",
        "Journal Management System of Toba Research Center",
        "Internship Reporting Management System of Toba Research Center",
        "Company Profile of Toba Research Center",
        "Seed Sales Management System of PT. Agrowisata Porlak Parna",
        "End to end Affiliate Marketing System of PT. Agrowisata Porlak Parna",
        "Company Profile Agrowisata Porlak Parna",
      ],
    },
  ],
  education: [
    {
      institution: "STMIK LIKMI",
      degree: "Masters of Computer in Information System (M.Kom)",
      period: "August 2021 – May 2023",
      location: "Bandung, West Java",
      focusAreas: [
        "IT Strategic Planning",
        "IT Governance (COBIT)",
        "Enterprise Information System",
        "IS Audit and Control",
        "Cost Benefit Analysis",
        "IT Investment Management",
        "Process Business Improvement",
      ],
    },
    {
      institution: "Universitas Komputer Indonesia (UNIKOM)",
      degree: "Bachelors of Computer in Informatics Engineering (S.Kom)",
      period: "August 2015 – February 2020",
      location: "Bandung, West Java",
      focusAreas: [
        "Software Engineering",
        "Analysis & Design of Information Systems",
        "Advanced Database",
        "Data Mining",
        "Information System Security",
        "Research Methodology",
      ],
    },
  ],
  certifications: [
    { name: "Enterprise Architecture Foundations", issuer: "LinkedIn Learning", year: "2025" },
    { name: "Learning ITIL® 4", issuer: "LinkedIn Learning & CompTIA", year: "2025" },
    { name: "Getting Started as a Project Manager (7 Course)", issuer: "PMI (Project Management Institute) & LinkedIn", courses: [
      "Project Management Foundations",
      "Project Management Foundations: Ethics",
      "Project Management Foundations: Requirements",
      "Project Management Foundations: Schedules",
      "Project Management Foundations: Budgets",
      "Project Management Foundations: Teams",
      "Project Management Foundations: Communication"
    ], year: "2025" },
    { name: "Explore a Career in Business Analysis (5 Course)", issuer: "PMI (Project Management Institute)", year: "2025" },
    { name: "Product Strategy & Analysis Specialization", issuer: "MySkill E-Learning", year: "2025" },
    { name: "Product Management Fundamental", issuer: "MySkill E-Learning", year: "2025" },
    { name: "Project Management and Scrum Framework", issuer: "MySkill E-Learning", year: "2025" },
    { name: "Belajar Dasar Manajemen Proyek", issuer: "Dicoding Course", year: "2025" },
    { name: "Master SQL for Data Science", issuer: "LinkedIn Learning", year: "2025" },
    { name: "Junior Web Programmer", issuer: "BNSP (Badan Nasional Sertifikasi Profesi)", year: "2020" },
  ],
  skillsAndTools: [
    {
      category: "Analysis & Documentation",
      items: ["BRD", "FSD", "TSD", "SRS", "PRD", "BPMN 2.0", "UML (Use Cases, Sequence, Class, Activity, ERD)", "Process Documentation", "RACI Matrix"],
    },
    {
      category: "Technology & Development",
      items: ["PHP", "Laravel", "CodeIgniter", "JavaScript", "NodeJS", ".NET", "SQL (MySQL, SQL Server, Oracle)", "MongoDB", "HTML & Bootstrap CSS", "ReactJS"],
    },
    {
      category: "Enterprise Architecture",
      items: ["TOGAF 10 (Phase A - H)", "ArchiMate", "Sparx Enterprise Architect", "Ward & Peppard Method", "IT Masterplan"],
    },
    {
      category: "Tools & Platforms",
      items: ["JIRA", "Confluence", "Asana", "Trello", "MS Project", "Ms. Office Suite", "Figma", "Lucidchart", "Visio", "Draw.io", "StarUML", "DBeaver", "GitHub", "Git"],
    },
    {
      category: "Management & Methodology",
      items: ["Agile/Scrum", "Waterfall", "ITIL 4", "IT Governance", "Risk Management & Mitigation", "Budgeting", "Stakeholder Management", "SDLC Life Cycles"],
    },
  ],
};

export const portfolios: ProjectPortfolio[] = [
  {
    id: "p1",
    title: "Enterprise Architecture Pertamina EP",
    alias: "EA Pertamina EP",
    client: "Pertamina EP",
    role: "Enterprise Architect Consultant",
    tags: ["EA", "TOGAF 10", "Sparx EA", "ArchiMate", "Energy"],
    description: "Designing corporate-level IT architectures to bridge Pertamina EP's business units with the master digital roadmap.",
    details: [
      "Analyzed and compiled fully unified Business, Application, Data, and Technology architectures using TOGAF 10 Phase A–H.",
      "Conducted extensive stakeholder workshops for C-level alignments.",
      "Ensured strategic traceability of 15+ concurrent software projects mapping back into Pertamina EP's core business initiatives."
    ],
    deliverables: {
      achievement: "https://drive.google.com/file/d/1BEgySRqsp7T6rwIfKrX_8jag7UXtb4WW/view?usp=sharing"
    }
  },
  {
    id: "p2",
    title: "HRIS PHINTER (Phintraco Employment Center)",
    alias: "HRIS PHINTER",
    client: "Phintraco Group (Holding)",
    role: "Sr. System Analyst & Lead Documentation",
    tags: ["HRIS", "Laravel", "Database Optimize", "System Analysis"],
    description: "Enterprise human resources platform acting as the central employee, payroll, and appraisal hub for thousands of concurrent users.",
    details: [
      "Owned full requirements and functional specification documentation (BRD, FSD, Project Charter).",
      "Designed database schema supporting multi-tenant hierarchical structures with modular subcomponents.",
      "Analyzed workflows and UI designs to reduce employee onboarding delays by 35%."
    ],
    deliverables: {
      charter: "https://drive.google.com/file/d/1rTwev1p_FaSZZX89EOTikkIg8xfe1UT2/view?usp=sharing",
      fsd: "https://drive.google.com/file/d/1NtJZCmdYxPVg3puYfsPuRN04W5k-OYNS/view?usp=sharing",
      brd: "https://drive.google.com/file/d/13AgmRMyygeBKBg4zEd9XbvJkEGuyI8Nw/view?usp=sharing",
      uiux: "https://xd.adobe.com/view/e935fa72-9dcc-4361-a782-186e59515596-bc66/"
    }
  },
  {
    id: "p3",
    title: "LMS MBPS (Learning Management System)",
    alias: "LMS MBPS",
    client: "Mitracomm Business Process Services (MBPS)",
    role: "Sr. System Analyst",
    tags: ["LMS", "SaaS", "Multi-Tenant", "PHP Laravel"],
    description: "A secure, multi-tenant B2B Learning Management System (LMS) serving corporate training clients and thousands of trainees dynamically.",
    details: [
      "Constructed a robust modular course creation and assessment system with dynamic test timing safeguards.",
      "Delivered full system design, system component interactions, and entity relations modeled in StarUML.",
      "Integrated secure authentication hooks enabling frictionless training tracking for corporate client dashboards."
    ],
    deliverables: {
      charter: "https://drive.google.com/file/d/19ARpLSvINsvhpc9-V8flEitGulfVavZO/view",
      fsd: "https://drive.google.com/file/d/1YJjfDhgFiTWBK_DYUlMAUL_n5Jx8PJOT/view?usp=sharing",
      brd: "https://drive.google.com/file/d/1U3VHLIkzNteC_qTPNunE2i6UVDe_lutu/view?usp=sharing",
      uiux: "https://www.figma.com/design/ATOJWurJDq8e9MsiKCQOSl/LMS?node-id=112-300"
    }
  },
  {
    id: "p4",
    title: "Enterprise Architecture BAZNAS Majalengka",
    alias: "EA BAZNAS",
    client: "BAZNAS Kab. Majalengka",
    role: "EA Architect Partner",
    tags: ["COBIT", "TOGAF", "Public Sector", "Strategic Planning"],
    description: "Architectural blueprint and strategic alignment document designed for public financial and charity distributions in Majalengka.",
    details: [
      "Engineered full TOGAF-centric schema to increase efficiency of aid tracking and charity distribution.",
      "Directly presented artifacts to the Chair of Baznas Majalengka, secure formal implementation clearance.",
      "Mapped technology assets to ensure high system transparency and security audit standards."
    ],
    deliverables: {
      achievement: "https://drive.google.com/file/d/1x2SJgC3Thve9jHoLi1liTSimpleLinkForBaznas"
    }
  },
  {
    id: "p5",
    title: "SORABA POS & Inventory Event System",
    alias: "Soraba POS",
    client: "SORABA Body Care",
    role: "System Analyst & Programmer",
    tags: ["POS Network", "Inventory Hub", "Laravel", "MySQL"],
    description: "High-concurrency Point of Sale system tailored for dynamic trade events and offline synchronization syncing logs back to base.",
    details: [
      "Programmed event-ready checkout flows with instantaneous local storage failovers.",
      "Engineered inventory validation mechanisms preventing catalog mismatches under high traffic.",
      "Created fully responsive transaction reports used directly on the retail floor."
    ],
    deliverables: {
      achievement: "https://drive.google.com/file/d/1Ta8jpu41lXJDyD_zPAxYV8snDCR2FDPB/view?usp=sharing"
    }
  },
  {
    id: "p6",
    title: "Healthy Fit POS & Pharmacy Solution",
    alias: "Healthy Fit POS",
    client: "Healthy Fit Pharmacy",
    role: "System Analyst",
    tags: ["Healthcare POS", "Batch Tracking", "UML", "Laravel"],
    description: "An integrated point of sales and real-time inventory network that ensures precise batch, expiries, and prescription fulfillment.",
    details: [
      "Architected specialized batch tracking schemas to handle localized medicine inventory constraints.",
      "Documented UML diagrams, including sequence paths for complex transaction handshakes.",
      "Liaised with pharmacists and operations lead to achieve 100% specification alignment."
    ],
    deliverables: {
      achievement: "https://drive.google.com/file/d/1okm0FMiQw0RrjqGKOF8Z2sTHUSiHAYcO/view?usp=sharing"
    }
  }
];

// Initial pre-populated, high-quality blog posts designed with technical SEO in mind
export const initialBlogPosts: BlogPost[] = [
  {
    id: "blog1",
    title: "Menerjemahkan Kompleksitas Bisnis ke Arsitektur IT Menggunakan TOGAF 10",
    slug: "menerjemahkan-kompleksitas-bisnis-togaf-10",
    category: "Enterprise Architecture",
    excerpt: "Bagaimana cara seorang Enterprise Architect merancang strategi IT yang selaras dengan masterplan perusahaan besar layaknya BUMN energi? Simak pembahasannya di sini.",
    readTime: "6 Min Read",
    publishedAt: "2026-05-20",
    content: `Sebagai seorang Enterprise Architect, tantangan terbesar kita bukanlah memilih teknologi paling mutakhir, melainkan memastikan bahwa setiap sen investasi teknologi memiliki jalur nilai yang jelas untuk mencapai visi bisnis organisasi. Di sinilah **TOGAF 10 (The Open Group Architecture Framework)** membuktikan kekuatannya.

### Kenapa Menyelaraskan Bisnis & IT Sangat Sulit?
Seringkali, unit bisnis berbicara dalam bahasa keuntungan, efisiensi operasional, dan kepuasan pelanggan, sementara divisi IT berbicara dalam bahasa microservices, throughput database, dan latensi jaringan. Tanpa adanya jembatan, kedua entitas ini akan berjalan di jalur yang berbeda.

Dalam implementasi arsitektur di **Pertamina EP**, kami memetakan strategi digital dengan memecah arsitektur enterprise ke dalam empat pilar utama:
1. **Business Architecture**: Mendokumentasikan proses bisnis hari ini (As-Is) dan merencanakan target masa depan (To-Be) menggunakan BPMN 2.0.
2. **Data Architecture**: Menjamin keandalan data sebagai aset penting perusahaan—mengatur bagaimana data dari rig minyak, logistik, dan keuangan saling mengalir.
3. **Application Architecture**: Mendefinisikan katalog aplikasi untuk menghindari redundansi sistem, seperti menyatukan berbagai portal sistem internal ke dalam HRIS Phinter.
4. **Technology Architecture**: Menerjemahkan kebutuhan aplikasi ke dalam infrastruktur yang skalabel baik on-premise maupun modern cloud.

### Langkah Praktis Menggunakan ArchiMate & Sparx Enterprise Architect
Menggunakan visualisasi standar seperti ArchiMate sangat membantu dalam merancang tata hubungan yang jelas. Dengan Sparx Enterprise Architect, kami dapat membuat model yang memperlihatkan bagaimana sebuah proses bisnis berkejaran langsung dengan service aplikasi tertentu, hingga ke physical database server di bagian terbawah.

Hasilnya? Manajemen puncak (C-level executives) tidak hanya mendapatkan diagram teknis yang membingungkan, melainkan sebuah **Architecture Roadmap** strategis yang dapat dengan mudah mereka fahami demi keberlanjutan masa depan korporasi.`,
    seoMetadata: {
      title: "Menerjemahkan Kompleksitas Bisnis ke Arsitektur IT - TOGAF 10",
      description: "Panduan praktis menyelaraskan tujuan bisnis dengan infrastruktur IT menggunakan framework TOGAF 10, ArchiMate, dan Sparx Enterprise Architect.",
      focusKeywords: ["TOGAF 10", "Enterprise Architecture", "ArchiMate", "Sparx Enterprise Architect", "Pertamina EP"],
      seoScore: 95,
      suggestions: [
        "Tambahkan tautan sitemap eksternal untuk melengkapi struktur URL.",
        "Gunakan anchor text bertema 'IT Strategic' untuk menambah kekuatan link juice internal."
      ],
      schemaMarkup: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "Menerjemahkan Kompleksitas Bisnis ke Arsitektur IT Menggunakan TOGAF 10",
        "alternativeHeadline": "Panduan Praktis Enterprise Architecture Indonesia",
        "description": "Panduan praktis menyelaraskan tujuan bisnis dengan infrastruktur IT menggunakan framework TOGAF 10, ArchiMate, dan Sparx Enterprise Architect.",
        "author": {
          "@type": "Person",
          "name": "Ferlin Firdaus Turnip",
          "jobTitle": "IT Project Manager & Enterprise Architect"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Ferlin Firdaus Turnip - Professional Branding",
          "logo": {
            "@type": "ImageObject",
            "url": "https://avatars.githubusercontent.com/u/1000"
          }
        },
        "genre": "Enterprise Architecture",
        "keywords": "TOGAF 10, Enterprise Architecture, ArchiMate, Sparx EA, IT Governance"
      }, null, 2)
    }
  },
  {
    id: "blog2",
    title: "Pentingnya FSD, BRD, dan TSD yang Presisi dalam Siklus Projek Agile/Scrum",
    slug: "pentingnya-fsd-brd-tsd-siklus-projek-agile",
    category: "System Analysis",
    excerpt: "Banyak tim startup gagal rilis tepat waktu karena dokumentasi kebutuhan sistem yang timpang. Pelajari bagaimana format modular BRD, FSD, dan UML dapat menyatukan persepsi.",
    readTime: "5 Min Read",
    publishedAt: "2026-05-15",
    content: `Di dalam ekosistem kencang seperti Agile/Scrum, ada mitos keliru bahwa *'Agile berarti tidak butuh dokumentasi.'* Mitos ini seringkali berujung pada pengerjaan berulang yang tidak terukur dan pembengkakan biaya projek (*scope creep*).

Sebagai seorang System Analyst berpengalaman memimpin puluhan projek integrasi, dokumen terstruktur seperti **BRD (Business Requirements Document)**, **FSD (Functional Specification Document)**, dan **TSD (Technical Specification Document)** tetap menjadi fondasi keberhasilan.

### Mengurai Tiga Tingkat Dokumentasi
1. **Business Requirements Document (BRD)**: Ditulis dari sudut pandang stakeholder bisnis. Ini adalah jawaban dari pertanyaan *'Mengapa projek ini dibangun dan apa goals utamanya?'*
2. **Functional Specification Document (FSD)**: Menjembatani bisnis dengan tim engineering. Di sinilah letak visualisasi User Journey, Use Case Diagram, Activity Diagram, dan rancangan UI/UX. Dokumentasi FSD yang matang memastikan QA dapat membuat tes skenario yang 100% melingkupi kebutuhan bisnis sebelum go-live.
3. **Technical Specification Document (TSD)**: Menyajikan detail implementasi yang mendalam, termasuk skema database relasional (ERD yang dinormalisasi), rancangan RESTful API endpoints, alur manipulasi state, serta mekanisme caching server.

### Mengintegrasikan UML dalam Sprint Planning
Dengan memvisualisasikan Sequence Diagram pada dokumentasi FSD untuk fitur-fitur kompleks (seperti integrasi pembayaran di POS KEK atau biometrik absensi di UNIBI), developer memiliki panduan operasional sistem yang jelas bahkan sebelum baris kode pertama ditulis. Ini mereduksi debat teknis yang tidak perlu selama Sprint Planning dan meningkatkan akurasi estimasi pengerjaan.`,
    seoMetadata: {
      title: "Pentingnya BRD, FSD, TSD untuk Projek Agile Terukur",
      description: "Cara menyusun dokumentasi sistem yang matang (BRD, FSD, TSD) dan memetakan UML diagram demi menjamin kecepatan rilis tim Scrum.",
      focusKeywords: ["BRD", "FSD", "UML Diagram", "System Analyst", "Agile Scrum"],
      seoScore: 92,
      suggestions: [
        "Gunakan visualisasi diagram alur UML langsung di dalam artikel.",
        "Pastikan rasio kata kunci 'System Analyst' mengarah ke link profile linkedin Anda."
      ],
      schemaMarkup: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "Pentingnya FSD, BRD, dan TSD yang Presisi dalam Siklus Projek Agile/Scrum",
        "description": "Cara menyusun dokumentasi sistem yang matang (BRD, FSD, TSD) dan memetakan UML diagram demi menjamin kecepatan rilis tim Scrum.",
        "author": {
          "@type": "Person",
          "name": "Ferlin Firdaus Turnip"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Ferlin Firdaus Turnip"
        },
        "genre": "System Analysis & Software Engineering"
      }, null, 2)
    }
  }
];
