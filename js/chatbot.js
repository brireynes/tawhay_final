const toggleBtn = document.getElementById("tw-chat-toggle");
const panel = document.getElementById("tw-chat-panel");
const messages = document.getElementById("tw-chat-messages");
const input = document.getElementById("tw-chat-input");
const sendBtn = document.getElementById("tw-chat-send");

function addMessage(role, text) {
    const div = document.createElement("div");
    div.className = `tw-msg ${role}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    input.value = "";

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: text })
        });

        const data = await res.json();
        addMessage("bot", data.reply || "No reply received.");
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