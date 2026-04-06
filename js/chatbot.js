const toggleBtn = document.getElementById("tw-chat-toggle");
const panel = document.getElementById("tw-chat-panel");
const messagesEl = document.getElementById("tw-chat-messages");
const input = document.getElementById("tw-chat-input");
const sendBtn = document.getElementById("tw-chat-send");

const chatHistory = [];

function addMessage(role, text) {
    const div = document.createElement("div");
    div.className = `tw-msg ${role}`;
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    chatHistory.push({ role: "user", content: text });
    input.value = "";

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text,
                history: chatHistory
            })
        });

        const data = await res.json();
        const reply = data.reply || "No reply received.";

        addMessage("bot", reply);
        chatHistory.push({ role: "assistant", content: reply });
    } catch (err) {
        addMessage("bot", "Something went wrong.");
    }
}

toggleBtn?.addEventListener("click", () => {
    panel.classList.toggle("hidden");
});

sendBtn?.addEventListener("click", sendMessage);

input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});