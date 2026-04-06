export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message } = req.body || {};

        if (!message || !message.trim()) {
            return res.status(400).json({ error: "Message is required" });
        }

        const openaiRes = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                instructions:
                    "You are Tawhay Assistant. Reply warmly and briefly. Help with products, orders, and store questions. Do not give medical advice.",
                input: message,
            }),
        });

        const data = await openaiRes.json();

        if (!openaiRes.ok) {
            console.error("OpenAI API error:", data);
            return res.status(openaiRes.status).json({
                reply: data?.error?.message || "OpenAI request failed.",
                debug: data,
            });
        }

        if (data.status && data.status !== "completed") {
            console.error("OpenAI incomplete response:", data);
            return res.status(500).json({
                reply: `Response status: ${data.status}`,
                debug: data,
            });
        }

        let reply = "";

        if (Array.isArray(data.output)) {
            for (const item of data.output) {
                if (item.type === "message" && Array.isArray(item.content)) {
                    for (const part of item.content) {
                        if (part.type === "output_text" && part.text) {
                            reply += part.text;
                        }
                    }
                }
            }
        }

        if (!reply.trim()) {
            console.error("No text found in output:", data);
            return res.status(500).json({
                reply: "No text returned by the model.",
                debug: data,
            });
        }

        return res.status(200).json({ reply });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({
            reply: error.message || "Server error",
        });
    }
  }