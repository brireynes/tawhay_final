export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message, history = [] } = req.body || {};

        if (!message || !message.trim()) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Tawhay knowledge base
        const tawhayContext = `
  You are Tawhay Wellness Assistant.
  
  Brand:
  Tawhay Wellness is a reflective wellness brand focused on peace, clarity, mindfulness, aromatherapy, and intentional self-care.
  
  Tone:
  Warm, calm, supportive, elegant, and concise.
  
  Rules:
  - Answer as Tawhay's website assistant.
  - Prefer answers based on the Tawhay information below.
  - If the user asks about products, recommend from the Tawhay catalog below.
  - If the answer is not in the Tawhay information, say that the user may check the site directly or contact Tawhay for confirmation.
  - Do not invent prices, shipping policies, ingredients, or stock unless they are explicitly provided below.
  - Do not give medical diagnosis or treatment advice.
  - Keep replies helpful and natural.
  
  Sample brand knowledge:
  - Tawhay promotes relaxation, mindfulness, and emotional balance.
  - Tawhay offers wellness-themed products such as candles, essential oils, and calming self-care items.
  - Tawhay's aesthetic is calming, clean, and reflective.
  - The chatbot should help users discover products, explain the brand, and guide them through the site.
  
  Product guidance:
  - For stress relief: recommend calming candles or essential oils.
  - For sleep/relaxation: recommend lavender-inspired or nighttime calming products if relevant.
  - For gifts/self-care: recommend wellness kits, candles, and aromatherapy items.
  - For first-time buyers: suggest best sellers or calming starter products.
  
  Site guidance:
  - Users may browse products in the shop page.
  - Users may use the contact page for direct concerns or custom questions.
  - Users may add items to cart and proceed to checkout if available on the site.
  
  If a user asks something unsupported like exact order tracking or unavailable stock details, say:
  "I can help guide you through Tawhay Wellness, but for exact order or stock confirmation, please check the site directly or contact Tawhay."
  `;

        const messages = [
            { role: "system", content: tawhayContext },
            ...history
                .filter(
                    (m) =>
                        m &&
                        typeof m.role === "string" &&
                        typeof m.content === "string" &&
                        ["user", "assistant", "system"].includes(m.role)
                )
                .slice(-8),
            { role: "user", content: message }
        ];

        const groqRes = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages,
                    temperature: 0.5,
                    max_tokens: 500
                })
            }
        );

        const data = await groqRes.json();

        if (!groqRes.ok) {
            console.error("Groq API error:", data);
            return res.status(groqRes.status).json({
                reply: data?.error?.message || "Groq request failed."
            });
        }

        const reply =
            data?.choices?.[0]?.message?.content?.trim() ||
            "Sorry, I couldn't generate a reply right now.";

        return res.status(200).json({ reply });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({
            reply: error.message || "Server error"
        });
    }
  }