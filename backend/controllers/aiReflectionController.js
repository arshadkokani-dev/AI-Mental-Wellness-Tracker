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

Give a concise but personalized reflection.

Focus on:
1. Patterns or connections in the data.
2. Something the user handled well.
3. A thought or pattern worth reconsidering.
4. One gentle, practical next step.

Do not diagnose the user or provide medical advice.
Do not simply repeat the user's answers.
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
    });

    const reflection = response.choices[0].message.content;

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