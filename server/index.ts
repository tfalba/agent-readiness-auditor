import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/enrich", async (req, res) => {
  const product = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a product data specialist for AI shopping agent optimization. Return only valid JSON." },
        { role: "user", content: `Enrich this product for AI shopping agents. Return JSON with: betterTitle, improvedBullets (array), missingAttributes (array), structuredDataRecommendations (array).\n\nProduct: ${JSON.stringify(product)}` },
      ],
      response_format: { type: "json_object" },
    });
    res.json(JSON.parse(completion.choices[0].message.content ?? "{}"));
  } catch {
    res.status(500).json({ error: "Enrichment failed" });
  }
});

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => console.log(`Server running on :${PORT}`));
