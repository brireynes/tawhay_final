async function loadPartial(targetId, partialPath) {
    const target = document.getElementById(targetId);
    if (!target) return;

    try {
        const response = await fetch(partialPath, { cache: "no-cache" });
        if (!response.ok) throw new Error(`Failed to load ${partialPath}`);
        target.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
    }
}

function setActiveNav() {
    const page = document.body?.dataset?.page || "";
    const activeMap = {
        home: "home",
        shop: "shop",
        shop2: "shop",
        product: "shop",
        cart: "shop",
        checkout: "shop",
        about: "about",
        contact: "contact",
        auth: ""
    };

    const activeKey = activeMap[page];
    document.querySelectorAll("#globalNav [data-nav]").forEach((link) => {
        link.classList.remove("active");
        if (link.dataset.nav === activeKey) {
            link.classList.add("active");
        }
    });
}

function initializeSharedUI() {
    if (typeof updateCartCount === "function") updateCartCount();
    if (typeof checkUserState === "function") checkUserState();
    if (typeof initializeSearchUI === "function") initializeSearchUI();
    setActiveNav();
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadPartial("site-header", "partials/header.html");
    await loadPartial("site-footer", "partials/footer.html");
    initializeSharedUI();
});