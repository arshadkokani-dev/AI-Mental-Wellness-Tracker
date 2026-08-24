import groq from "../services/aiReflectionService.js";
import WellnessEntry from "../models/WellnessEntry.js";
import CBTJournal from "../models/CBTJournal.js";

export const generateAIReflection = async (req, res) => {
  try {
    const wellnessEntry = await WellnessEntry.findOne({
      user: req.userId,
    }).sort({ date: -1 });

    const cbtEntry = await CBTJournal.findOne({
      user: req.userId,
    }).sort({ date: -1 });

    if (!wellnessEntry && !cbtEntry) {
      return res.status(404).json({
        message: "No wellness or CBT data found",
      });
    }

    const prompt = `
Create a thoughtful personal wellness reflection based on the user's recent data.

Wellness check-in:
Mood: ${wellnessEntry?.mood ?? "Not provided"}/10
Energy: ${wellnessEntry?.energy ?? "Not provided"}/10
Sleep: ${wellnessEntry?.sleep ?? "Not provided"}/10
Stress: ${wellnessEntry?.stress ?? "Not provided"}/10
Anxiety: ${wellnessEntry?.anxiety ?? "Not provided"}/10
Emotion: ${wellnessEntry?.emotion || "Not provided"}
Journal: ${wellnessEntry?.journal || "Not provided"}

CBT reflection:
Situation: ${cbtEntry?.situation || "Not provided"}
Thought: ${cbtEntry?.thought || "Not provided"}
Emotion: ${cbtEntry?.emotion || "Not provided"}
Evidence: ${cbtEntry?.evidence || "Not provided"}
Alternative perspective: ${cbtEntry?.alternative || "Not provided"}
What they would tell a friend: ${cbtEntry?.reflection || "Not provided"}

Return the reflection in exactly this JSON format:

{
  "whatIsShowingUp": "A concise observation about patterns or connections in the user's data.",
  "whatTheyHandledWell": "Something the user handled well.",
  "thoughtToRevisit": "One thought or pattern worth reconsidering.",
  "gentleNextStep": "One small, practical next step."
}

Rules:
- Keep each section concise but personalized.
- Base everything only on the provided data.
- Do not simply repeat the user's answers.
- Do not diagnose mental health conditions.
- Do not provide medical advice.
- Return ONLY valid JSON. No markdown, no code fences, and no extra text.
`;

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "system",
          content:
            "You are a supportive wellness reflection assistant. Be empathetic, specific, non-judgmental, and grounded in the user's provided data. Do not diagnose mental health conditions or provide medical advice.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
      max_tokens: 500,
      response_format: {
  type: "json_schema",
  json_schema: {
    name: "wellness_reflection",
    strict: true,
    schema: {
      type: "object",
      properties: {
        whatIsShowingUp: {
          type: "string",
        },
        whatTheyHandledWell: {
          type: "string",
        },
        thoughtToRevisit: {
          type: "string",
        },
        gentleNextStep: {
          type: "string",
        },
      },
      required: [
        "whatIsShowingUp",
        "whatTheyHandledWell",
        "thoughtToRevisit",
        "gentleNextStep",
      ],
      additionalProperties: false,
    },
  },
},
    });

    const reflectionText = response.choices[0].message.content;

    const reflection = JSON.parse(reflectionText);

    res.status(200).json({
      reflection,
    });
  } catch (error) {
    console.error("AI reflection error:", error.message);

    res.status(500).json({
      message: "Failed to generate AI reflection",
    });
  }
};