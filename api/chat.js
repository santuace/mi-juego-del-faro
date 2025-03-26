import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { userMessage, playerName, playerGender } = req.body;

  if (!userMessage) {
    return res.status(400).json({ message: "Mensaje vacío" });
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Sos un narrador misterioso en Cabo Polonio. Guiás al jugador ${playerName || "desconocido"} en una historia de intriga. Adaptá tu estilo literario y breve.`,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.85,
    });

    const reply = completion.data.choices?.[0]?.message?.content || "El narrador no respondió.";
    res.status(200).json({ reply });

  } catch (error) {
    console.error("ERROR en la función:", error.message);
    res.status(500).json({ reply: "El narrador fue interrumpido por una fuerza desconocida..." });
  }
}
