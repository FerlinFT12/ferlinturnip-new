import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

// Create Express application
async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsers
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: true, limit: "5mb" }));

  // Initialize Gemini client (Lazy loaded check)
  let aiClient: GoogleGenAI | null = null;
  
  function getAiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("WARNING: GEMINI_API_KEY environment variable is not defined. SEO optimization features will fall back to local heuristics.");
        return null;
      }
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API 1: Healthcheck
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // API 2: Automated SEO Metadata Generation API (Uses server-side Gemini 3.5 Flash)
  app.post("/api/seo/optimize", async (req, res) => {
    try {
      const { title, category, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: "Title and Content are required to run SEO optimization." });
      }

      const client = getAiClient();
      
      if (!client) {
        // Fallback to local heuristic recommendations if GEMINI_API_KEY is missing (e.g., initial startup without key)
        const localKeywords = [
          category || "IT Professional",
          "System Analyst",
          "Project Manager",
          "Ferlin Firdaus Turnip"
        ];
        const localDesc = `${title.substring(0, 120)}... Sampaikan pandangan ahli dan profesional dari Ferlin Firdaus Turnip.`;
        
        return res.json({
          title: `${title} | Ferlin Firdaus Turnip`,
          description: localDesc,
          focusKeywords: localKeywords,
          schemaMarkup: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": title,
            "description": localDesc,
            "author": {
              "@type": "Person",
              "name": "Ferlin Firdaus Turnip"
            }
          }, null, 2),
          seoScore: 78,
          suggestions: [
            "Lengkapi API Key di panel Secrets untuk mengaktifkan AI Deep SEO Analysis.",
            "Gunakan sub-heading H3 untuk memecah paragraf panjang.",
            "Sisipkan kata kunci target di paragraf pembuka tulisan."
          ]
        });
      }

      const systemPrompt = `You are a professional Generative Engine Optimization (GEO) and Technical SEO consultant. 
Your task is to analyze an expert article written by "Ferlin Firdaus Turnip" (IT Project Manager & Enterprise Architect) and generate perfectly optimized SEO metadata structures:
- An optimized Meta Title (under 60 characters, containing main keyword and branding suffix e.g. " | Ferlin Turnip").
- A compelling Meta Description (under 160 characters, with a brief punchy summary and a dynamic call-to-action to read).
- 3 to 5 targeted SEO focus keywords or key phrases.
- A highly accurate, valid JSON-LD Rich Snippet of type "BlogPosting" that describes this article. Include Ferlin's info: Name: "Ferlin Firdaus Turnip", Job Title: "IT Project Manager / Enterprise Architect".
- An SEO score (0-100) calculated by assessing heading spacing, readability, and title relevance.
- 3 actionable, technical suggestions to improve search ranking or search visibility (specifically detailing structural improvements, keyword positioning, or heading additions).

Do not output any introductory or conversational text, return only the structured JSON output adhering to the schema.`;

      const userPrompt = `Analyze this article and generate the metadata:
Title: "${title}"
Category: "${category || "IT Professional"}"
Content:
"""
${content}
"""`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "Meta title tag contents, optimized, max 60 characters.",
              },
              description: {
                type: Type.STRING,
                description: "Meta description contents, optimized for clicks, max 160 characters.",
              },
              focusKeywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3 to 5 primary search terms derived from the article content.",
              },
              schemaMarkup: {
                type: Type.STRING,
                description: "Entire JSON-LD structured data script contents as a stringified block, strictly valid JSON format.",
              },
              seoScore: {
                type: Type.INTEGER,
                description: "Heuristic SEO quality score from 1 to 100.",
              },
              suggestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3 technical or semantic suggestions to align with Search Generative Experience (SGE) or traditional search crawler standards.",
              },
            },
            required: ["title", "description", "focusKeywords", "schemaMarkup", "seoScore", "suggestions"],
          },
        },
      });

      const responseText = response.text || "{}";
      const resultObj = JSON.parse(responseText.trim());
      
      return res.json(resultObj);

    } catch (error: any) {
      console.error("SEO Optimization Gemini tool failed:", error);
      return res.status(500).json({ error: "Failed to perform automated SEO analysis.", details: error.message });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    console.log("Using Vite development middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Using production static file delivery...");
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static files from the build directory
    app.use(express.static(distPath));
    
    // Fallback everything to index.html for Single Page Application handling
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Bind and listen
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Fullstack Port Host loaded on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical server startup failure:", err);
});
