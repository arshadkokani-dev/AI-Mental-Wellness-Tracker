import groq from "../services/aiReflectionService.js";

export const generateAIReflection = async (req, res) => {
  try {
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "system",
          content:
            "You are a supportive wellness reflection assistant. Provide empathetic, non-judgmental reflections. Do not diagnose mental health conditions or provide medical advice.",
        },
        {
          role: "user",
          content:
            "I felt stressed today because I had a lot of project work to finish. Give me a short supportive reflection.",
        },
      ],

      temperature: 0.7,
      max_tokens: 250,
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