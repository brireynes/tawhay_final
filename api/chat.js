export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message } = req.body || {};

        if (!message || !message.trim()) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-5.4",
                input: [
                    {
                        role: "system",
                        content:
                            "You are Tawhay Wellness Assistant. Answer warmly and clearly. Help users with products, checkout guidance, store info, and basic wellness-themed product questions. Do not give medical diagnosis or medical treatment advice."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        });

        const data = await response.json();

        const reply =
            data.output_text ||
            "Sorry, I couldn't generate a reply right now.";

        return res.status(200).json({ reply });
    } catch (error) {
        return res.status(500).json({
            error: "Server error",
            details: error.message
        });
    }
  }