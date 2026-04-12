export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message, history = [], page = "unknown", url = "" } = req.body || {};

        if (!message || !message.trim()) {
            return res.status(400).json({ error: "Message is required" });
        }

        const PRODUCT_CATALOG = [
            {
                id: "bugtaw-soy-candle",
                name: "Bugtaw Soy Candle",
                category: "Home Fragrance",
                description:
                    "A thoughtfully crafted home fragrance designed to elevate everyday moments with calm and comfort.",
                variations: ["180 MG", "90 MG", "60 MG"],
                tags: ["aromatherapy", "soy candle"]
            },
            {
                id: "kalipay-soy-candle",
                name: "Kalipay Soy Candle",
                category: "Home Fragrance",
                description:
                    "A calming blend of elegance and functionality, designed to bring warmth and tranquility into any space.",
                variations: ["180 MG", "90 MG", "60 MG"],
                tags: ["soy candle", "candle"]
            },
            {
                id: "aroma-inhaler",
                name: "Aroma Inhaler",
                category: "Wellness",
                description:
                    "A convenient and portable way to experience the benefits of aromatherapy anytime, anywhere.",
                variations: ["Focus", "Relax", "Sleep", "Happy", "Breathe", "Calm"],
                tags: ["stress relief", "aroma inhaler"]
            },
            {
                id: "lip-balm",
                name: "Lip Balm",
                category: "Body & Face Care",
                description:
                    "A nourishing everyday essential designed to keep lips soft, smooth, and hydrated.",
                variations: ["20 G", "40 G"],
                tags: ["lip care", "balm"]
            },
            {
                id: "car-diffuser",
                name: "Car Diffuser",
                category: "Car Essentials",
                description:
                    "A stylish and natural way to keep your car space fresh and calming.",
                variations: ["Tawhay", "Hardin", "Amihan"],
                tags: ["interior scent", "car diffuser"]
            },
            {
                id: "essential-oil",
                name: "Essential Oil",
                category: "Aromatherapy / Essential Oils",
                description:
                    "Designed to support calm, clarity, and natural wellness.",
                variations: ["Lavender", "Peppermint", "Eucalyptus", "Citronella"],
                tags: ["organic blend", "essential oil"]
            },
            {
                id: "roller-blends-adult",
                name: "Roller Blends Adult",
                category: "Adult Wellness",
                description:
                    "Made for everyday calm, focus, and natural relief.",
                variations: ["Relax", "Focus", "Sleep"],
                tags: ["roller blend", "adult", "wellness"]
            },
            {
                id: "roller-blends-kiddie",
                name: "Roller Blends Kiddie",
                category: "Kids Wellness",
                description:
                    "Supports children’s wellness naturally.",
                variations: [
                    "barkin' no more",
                    "bye, bye bites",
                    "fever, go away",
                    "hocus focus",
                    "to immunity & beyond",
                    "sleep tight",
                    "sniffle helper"
                ],
                tags: ["roller blend", "kids", "wellness"]
            },
            {
                id: "muscle-balm",
                name: "Muscle Balm",
                category: "Relax & Restore",
                description:
                    "A soothing balm designed to help ease muscle tension, body aches, and fatigue.",
                variations: ["Default"],
                tags: ["muscle balm"]
            },
            {
                id: "linen-spray",
                name: "Whiff Away Scented Spray",
                category: "Aromatherapy Collection",
                description:
                    "A fabric and room mist designed to keep spaces smelling clean, calm, and cozy.",
                variations: ["Default"],
                tags: ["scent spray"]
            },
            {
                id: "hand-sanitizer",
                name: "Hand Sanitizer",
                category: "Mindful Essentials",
                description:
                    "A hand sanitizer spray that keeps hands clean while adding an uplifting scent.",
                variations: ["Calm", "Fresh", "Happy"],
                tags: ["hand sanitizer"]
            }
        ];

        function getRecommendedProducts(userMessage = "", currentPage = "", currentUrl = "") {
            const q = `${userMessage} ${currentPage} ${currentUrl}`.toLowerCase().trim();
            const matches = [];

            function addById(id) {
                const found = PRODUCT_CATALOG.find((product) => product.id === id);
                if (found && !matches.some((item) => item.id === found.id)) {
                    matches.push(found);
                }
            }

            PRODUCT_CATALOG.forEach((product) => {
                const searchableText = `
                    ${product.name}
                    ${product.category}
                    ${product.tags.join(" ")}
                    ${product.description}
                    ${product.variations.join(" ")}
                `.toLowerCase();

                if (
                    q.includes(product.name.toLowerCase()) ||
                    product.tags.some((tag) => q.includes(tag.toLowerCase())) ||
                    q.includes(product.category.toLowerCase()) ||
                    product.variations.some((variation) => q.includes(variation.toLowerCase())) ||
                    searchableText.includes(q)
                ) {
                    addById(product.id);
                }
            });

            if (q.includes("stress") || q.includes("calm") || q.includes("relax")) {
                addById("aroma-inhaler");
                addById("essential-oil");
                addById("roller-blends-adult");
                addById("bugtaw-soy-candle");
            }

            if (q.includes("sleep") || q.includes("night")) {
                addById("essential-oil");
                addById("aroma-inhaler");
                addById("roller-blends-adult");
                addById("kalipay-soy-candle");
            }

            if (q.includes("focus")) {
                addById("aroma-inhaler");
                addById("roller-blends-adult");
                addById("roller-blends-kiddie");
            }

            if (q.includes("kid") || q.includes("child") || q.includes("children")) {
                addById("roller-blends-kiddie");
            }

            if (q.includes("gift") || q.includes("self-care")) {
                addById("bugtaw-soy-candle");
                addById("kalipay-soy-candle");
                addById("essential-oil");
                addById("linen-spray");
            }

            if (q.includes("car")) {
                addById("car-diffuser");
            }

            if (q.includes("lip")) {
                addById("lip-balm");
            }

            if (q.includes("muscle") || q.includes("ache") || q.includes("pain")) {
                addById("muscle-balm");
            }

            if (q.includes("spray")) {
                addById("linen-spray");
                addById("hand-sanitizer");
            }

            if (q.includes("candle")) {
                addById("bugtaw-soy-candle");
                addById("kalipay-soy-candle");
            }

            if (q.includes("oil")) {
                addById("essential-oil");
            }

            if (q.includes("best seller") || q.includes("best-selling") || q.includes("popular")) {
                addById("hand-sanitizer");
                addById("roller-blends-kiddie");
                addById("essential-oil");
                addById("aroma-inhaler");
            }

            const urlMatch = currentUrl.match(/product\.html\?id=([^&]+)/);
            if (urlMatch && urlMatch[1]) {
                addById(urlMatch[1]);
            }

            if (!matches.length) {
                addById("essential-oil");
                addById("aroma-inhaler");
                addById("bugtaw-soy-candle");
            }

            return matches.slice(0, 4);
        }

        function buildRecommendationText(products = []) {
            if (!products.length) {
                return "No specific product recommendations found.";
            }

            return products
                .map((product) => {
                    return `- ${product.name} (${product.category}): ${product.description} Variations: ${product.variations.join(", ")}.`;
                })
                .join("\n");
        }

        const recommendedProducts = getRecommendedProducts(message, page, url);
        const recommendationText = buildRecommendationText(recommendedProducts);

        const tawhayContext = `
You are the official Tawhay Wellness Assistant.

BRAND:
Tawhay Wellness is a reflective wellness brand focused on peace, clarity, mindfulness, aromatherapy, and intentional self-care.

TONE:
Warm, calm, supportive, elegant, and concise.

WEBSITE KNOWLEDGE:
- Users can browse products on the Shop page.
- Users can open product pages to see product details, variations, and stock.
- Users can add items to cart and proceed to checkout.
- Users can register, log in, and view their orders in the dashboard.
- Admin manages all customer orders and updates order statuses.
- Payment methods available: Card, GCash, Cash on Delivery.
- Delivery estimate: 3–5 business days.
- Contact page includes phone and location details.
- Privacy Policy, Terms & Conditions, and FAQ pages exist.

REAL PRODUCT CATALOG:
${PRODUCT_CATALOG.map((product) => `
- ${product.name}
  Category: ${product.category}
  Description: ${product.description}
  Variations: ${product.variations.join(", ")}
  Tags: ${product.tags.join(", ")}
`).join("\n")}

CURRENT PAGE CONTEXT:
- Page: ${page}
- URL: ${url}

RECOMMENDED PRODUCTS FOR THIS USER MESSAGE:
${recommendationText}

RULES:
- Answer based on Tawhay Wellness website information.
- Recommend only from the real Tawhay product catalog above.
- When appropriate, mention 1 to 3 specific products by name.
- When recommending products, briefly explain why they fit the user's need.
- Guide the user to the correct page when helpful.
- Do not invent exact stock numbers, order tracking details, ingredients, or unavailable services.
- Do not provide medical diagnosis or treatment advice.
- If information is not confirmed by the site, say the user may check the website directly or contact Tawhay for confirmation.

GOAL:
Help users discover products, navigate the site, understand the brand, and complete purchases naturally.
`;

        const messages = [
            {
                role: "system",
                content: tawhayContext
            },
            ...history
                .filter(
                    (m) =>
                        m &&
                        typeof m.role === "string" &&
                        typeof m.content === "string" &&
                        ["user", "assistant", "system"].includes(m.role)
                )
                .slice(-8),
            {
                role: "user",
                content: message
            }
        ];

        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages,
                temperature: 0.5,
                max_tokens: 500
            })
        });

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