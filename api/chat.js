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
                model: "gpt-4.1-mini", // 🔥 stable + cheaper
                input: message
            })
        });

        const data = await response.json();

        // 🔥 SAFE extraction
        let reply = "";

        if (data.output && data.output.length > 0) {
            const content = data.output[0].content;
            if (content && content.length > 0) {
                reply = content[0].text;
            }
        }

        if (!reply) {
            reply = "Sorry, I couldn't generate a reply.";
        }

        return res.status(200).json({ reply });

    } catch (error) {
        return res.status(500).json({
            error: "Server error",
            details: error.message
        });
    }
  }