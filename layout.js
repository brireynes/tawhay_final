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
        faq: "",
        policy: "",
        auth: "",
        dashboard: "",
        admin: "admin"
    };

    const activeKey = activeMap[page];

    document.querySelectorAll("#globalNav [data-nav]").forEach((link) => {
        link.classList.remove("active");
        if (link.dataset.nav === activeKey) {
            link.classList.add("active");
        }
    });
}

function configureAdminChrome() {
    const page = document.body?.dataset?.page || "";
    if (page !== "admin") return;

    const nav = document.getElementById("globalNav");
    if (nav) {
        nav.innerHTML = `
            <a href="admin.html" data-nav="admin">Orders</a>
            <a href="dashboard.html" data-nav="dashboard">Customer View</a>
        `;
    }

    const footer = document.querySelector(".tw-footer");
    if (footer) {
        footer.classList.add("tw-footer--admin");
    }

    const footerBrandHeading = document.querySelector(".tw-footer-brand h3");
    if (footerBrandHeading) {
        footerBrandHeading.textContent = "Tawhay Wellness Admin";
    }

    const footerMain = document.querySelector(".tw-footer-main");
    if (footerMain) {
        footerMain.innerHTML = `
            <div class="tw-footer-brand">
                <img src="assets/ChatGPT_Image_Mar_21__2026__10_10_56_PM-removebg-preview.png"
                    alt="Tawhay Wellness Logo"
                    class="tw-footer-logo">
                <div>
                    <h3>Tawhay Wellness Admin</h3>
                    <p>Manage orders, customer activity, and store operations.</p>
                </div>
            </div>

            <div class="tw-footer-column">
                <h4>ADMIN NAVIGATION</h4>
                <a href="admin.html">Orders</a>
                <a href="dashboard.html">Customer View</a>
            </div>

            <div class="tw-footer-column">
                <h4>ADMIN ACCESS</h4>
                <p>Logged in as Administrator</p>
                <p>Secure admin session active</p>
            </div>

            <div class="tw-footer-column">
                <h4>SYSTEM NOTE</h4>
                <p>This dashboard is intended for managing Tawhay Wellness order activity and operations.</p>
            </div>
        `;
    }
}

function initializeSharedUI() {
    if (typeof updateCartCount === "function") updateCartCount();
    if (typeof checkUserState === "function") checkUserState();
    if (typeof initializeSearchUI === "function") initializeSearchUI();

    configureAdminChrome();
    setActiveNav();
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadPartial("site-header", "partials/header.html");
    await loadPartial("site-footer", "partials/footer.html");
    initializeSharedUI();
});

document.addEventListener("DOMContentLoaded", () => {
    checkUserState();
});