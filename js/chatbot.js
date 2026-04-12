const toggleBtn = document.getElementById("tw-chat-toggle");
const panel = document.getElementById("tw-chat-panel");
const messagesEl = document.getElementById("tw-chat-messages");
const input = document.getElementById("tw-chat-input");
const sendBtn = document.getElementById("tw-chat-send");

const chatHistory = [];
let isSending = false;

function addMessage(role, text) {
    if (!messagesEl) return;

    const div = document.createElement("div");
    div.className = `tw-msg ${role}`;
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

async function sendMessage() {
    if (isSending || !input) return;

    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    chatHistory.push({ role: "user", content: text });
    input.value = "";
    isSending = true;

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text,
                history: chatHistory.slice(-8),
                page: document.body?.dataset?.page || "unknown",
                url: window.location.href
            })
        });

        const data = await res.json();

        if (!res.ok) {
            addMessage("bot", data.reply || data.error || "Something went wrong.");
            return;
        }

        const reply = data.reply || "No reply received.";
        addMessage("bot", reply);
        chatHistory.push({ role: "assistant", content: reply });
    } catch (err) {
        addMessage("bot", "Something went wrong.");
    } finally {
        isSending = false;
    }
}

toggleBtn?.addEventListener("click", () => {
    panel?.classList.toggle("hidden");
});

sendBtn?.addEventListener("click", sendMessage);

input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});