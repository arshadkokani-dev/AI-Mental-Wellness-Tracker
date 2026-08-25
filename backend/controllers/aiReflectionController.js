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
  "whatIsShowingUp": "A thoughtful, detailed observation explaining the most meaningful patterns or connections in the user's recent data.",
  "whatTheyHandledWell": "A detailed reflection on something the user handled well, including why it matters and what it shows about their current situation.",
  "thoughtToRevisit": "A thoughtful exploration of one pattern, assumption, or tension that may be worth reconsidering.",
  "gentleNextStep": "A specific, realistic, and gentle next step that naturally follows from the user's recent data."
}

Rules:
- Each section MUST contain multiple complete sentences.
- Make the reflection thoughtful, specific, and moderately detailed.
- Do not simply repeat the user's answers.
- Analyze meaningful patterns and connections in the provided data.
- Make the reflection personalized to the user's actual data.
- Avoid generic motivational statements.
- Keep the tone warm, supportive, thoughtful, and non-judgmental.
- Base everything only on the provided data.
- Do not diagnose mental health conditions.
- Do not provide medical advice.
- Do not use emojis.
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
      max_completion_tokens: 3000,
      reasoning_effort: "low",
      response_format: {
        type: "json_object",
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