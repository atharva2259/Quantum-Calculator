import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini SDK
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


app.use(express.json());

// API: Solve Equation / Math Prompt
app.post("/api/solve", async (req, res) => {
  try {
    const { expression, history = [] } = req.body;

    if (!expression) {
      return res.status(400).json({ error: "Expression is required" });
    }

    const systemInstruction = `You are QuantumCalc's "Expert Analysis" symbolic math engine.
Your purpose is to analyze the user's mathematical expression or question and return a structured step-by-step algebraic solution or insightful explanation.
You MUST respond with a valid JSON object matching this TypeScript interface:

interface MathResponse {
  type: string; // e.g., 'quadratic', 'trigonometric', 'linear', 'calculus', 'physics_constant', 'general'
  explanation: string; // a brief intro paragraph describing the nature of the expression/question
  steps: {
    num: string; // step number padded e.g. "01", "02", "03"
    title: string; // standard concise step title e.g. "IDENTIFY COEFFICIENTS" or "FACTOR THE TRINOMIAL"
    math: string; // direct mathematical statement/expression
    desc: string; // concise explanation sentence or justification
  }[];
  finalResults: string[]; // key outcomes e.g. ["x₁ = 2", "x₂ = 3"]
  suggestion: string; // a friendly, high-end followup AI prompt suggestion
  suggestionOptions: string[]; // list of 2 short options for quick actions e.g. ["Vertex Form", "Discriminant"]
}

Rules:
1. Always parse variables, signs, coefficients, and exponents.
2. Even if the user enters a simple expression or asks a question, wrap your pedagogical logic in cohesive, structured steps (at least 2-3 steps).
3. Ensure the mathematical notations are clean and clear. Do not include markdown code block syntax (like \`\`\`json) inside the JSON string itself. Just return raw JSON.
4. If it's a conversational follow-up, answer appropriately but still frame it as logical steps.
`;

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `Solve and explain this expression step-by-step: ${expression}
Context/previous messages if any: ${JSON.stringify(history)}`,
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["type", "explanation", "steps", "finalResults", "suggestion", "suggestionOptions"],
          properties: {
            type: { type: Type.STRING },
            explanation: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["num", "title", "math", "desc"],
                properties: {
                  num: { type: Type.STRING },
                  title: { type: Type.STRING },
                  math: { type: Type.STRING },
                  desc: { type: Type.STRING },
                },
              },
            },
            finalResults: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            suggestion: { type: Type.STRING },
            suggestionOptions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
        },
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text.trim());
    res.json(data);
  } catch (err: any) {
    console.error("Gemini solving error:", err);
    res.status(500).json({
      error: "Error solving expression",
      details: err.message || err,
    });
  }
});

// Launch Vite dev server if in development, otherwise serve stagnant bundle
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[QuantumCalc Backend] Server running at http://localhost:${PORT}`);
  });
}

setupServer();
