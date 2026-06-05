var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "5mb" }));
  app.use(import_express.default.urlencoded({ extended: true, limit: "5mb" }));
  let aiClient = null;
  function getAiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("WARNING: GEMINI_API_KEY environment variable is not defined. SEO optimization features will fall back to local heuristics.");
        return null;
      }
      aiClient = new import_genai.GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
    }
    return aiClient;
  }
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app.post("/api/seo/optimize", async (req, res) => {
    try {
      const { title, category, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: "Title and Content are required to run SEO optimization." });
      }
      const client = getAiClient();
      if (!client) {
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
            type: import_genai.Type.OBJECT,
            properties: {
              title: {
                type: import_genai.Type.STRING,
                description: "Meta title tag contents, optimized, max 60 characters."
              },
              description: {
                type: import_genai.Type.STRING,
                description: "Meta description contents, optimized for clicks, max 160 characters."
              },
              focusKeywords: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING },
                description: "3 to 5 primary search terms derived from the article content."
              },
              schemaMarkup: {
                type: import_genai.Type.STRING,
                description: "Entire JSON-LD structured data script contents as a stringified block, strictly valid JSON format."
              },
              seoScore: {
                type: import_genai.Type.INTEGER,
                description: "Heuristic SEO quality score from 1 to 100."
              },
              suggestions: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING },
                description: "3 technical or semantic suggestions to align with Search Generative Experience (SGE) or traditional search crawler standards."
              }
            },
            required: ["title", "description", "focusKeywords", "schemaMarkup", "seoScore", "suggestions"]
          }
        }
      });
      const responseText = response.text || "{}";
      const resultObj = JSON.parse(responseText.trim());
      return res.json(resultObj);
    } catch (error) {
      console.error("SEO Optimization Gemini tool failed:", error);
      return res.status(500).json({ error: "Failed to perform automated SEO analysis.", details: error.message });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    console.log("Using Vite development middleware...");
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("Using production static file delivery...");
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Fullstack Port Host loaded on http://localhost:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Critical server startup failure:", err);
});
//# sourceMappingURL=server.cjs.map
