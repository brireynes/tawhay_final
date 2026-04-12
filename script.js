const PRODUCT_CATALOG = [
    {
        id: "bugtaw-soy-candle",
        name: "Bugtaw Soy Candle",
        price: 450,
        oldPrice: null,
        badge: null,
        stock: 12,
        sku: "SKU-12345",
        category: "Home Fragrance",
        tags: ["aromatherapy", "soy candle"],
        image: "assets/ChatGPT Image Mar 22, 2026, 05_21_17 PM.png",
        gallery: ["assets/bugtawsoycandle2.png", "assets/bugtawsoycandle1.png"],
        description: "The Bugtaw Soy Candle by Tawhay Wellness is a thoughtfully crafted home fragrance designed to elevate everyday moments with calm and comfort.",
        variations: [
            { name: "180 MG", value: "180mg", price: 450 },
            { name: "90 MG", value: "90mg", price: 250 },
            { name: "60 MG", value: "60mg", price: 200 }
        ]
    },
    {
        id: "kalipay-soy-candle",
        name: "Kalipay Soy Candle",
        price: 450,
        oldPrice: null,
        badge: null,
        stock: 10,
        sku: "KAL-SOY-001",
        category: "Home Fragrance",
        tags: ["soy candle", "candle"],
        image: "assets/ChatGPT Image Mar 22, 2026, 05_28_19 PM.png",
        gallery: ["assets/kalipaysoycandle2.png", "assets/kalipaysoycandle1.png"],
        description: "The Kalipay Soy Candle by Tawhay Wellness is a calming blend of elegance and functionality, designed to bring warmth and tranquility into any space.",
        variations: [
            { name: "180 MG", value: "180mg", price: 450 },
            { name: "90 MG", value: "90mg", price: 250 },
            { name: "60 MG", value: "60mg", price: 200 }
        ]
    },
    {
        id: "aroma-inhaler",
        name: "Aroma Inhaler",
        price: 150,
        oldPrice: 349,
        badge: "-57%",
        stock: 15,
        sku: "TWH-AI-FCS-01",
        category: "Wellness",
        tags: ["stress relief", "aroma inhaler"],
        image: "assets/ChatGPT Image Mar 22, 2026, 05_48_09 PM.png",
        gallery: ["assets/aromainhaler2.png", "assets/aromainhaler1.png"],
        description: "The Aroma Inhalers by Tawhay Wellness are a convenient and portable way to experience the benefits of aromatherapy anytime, anywhere.",
        variations: [
            { name: "Focus", value: "focus", price: 150 },
            { name: "Relax", value: "relax", price: 150 },
            { name: "Sleep", value: "sleep", price: 150 },
            { name: "Happy", value: "happy", price: 150 },
            { name: "Breathe", value: "breathe", price: 150 },
            { name: "Calm", value: "calm", price: 150 }
        ]
    },
    {
        id: "lip-balm",
        name: "Lip Balm",
        price: 180,
        oldPrice: null,
        badge: null,
        stock: 13,
        sku: "TWH-LB-01",
        category: "Body & Face Care",
        tags: ["lip care", "balm"],
        image: "assets/ChatGPT Image Mar 22, 2026, 05_57_22 PM.png",
        gallery: ["assets/halok2.png", "assets/halok1.png"],
        description: "The Lip Balm by Tawhay Wellness is a nourishing everyday essential designed to keep your lips soft, smooth, and hydrated throughout the day.",
        variations: [
            { name: "20 G", value: "20g", price: 180 },
            { name: "40 G", value: "40g", price: 350 }
        ]
    },
    {
        id: "car-diffuser",
        name: "Car Diffuser",
        price: 120,
        oldPrice: 300,
        badge: "-60%",
        stock: 16,
        sku: "TWH-CD-001RR",
        category: "Car Essentials",
        tags: ["interior scent", "car diffuser"],
        image: "assets/ChatGPT Image Mar 22, 2026, 06_03_34 PM.png",
        gallery: ["assets/cardiffuser2.png", "assets/cardiffuser1.png"],
        description: "Elevate your driving experience with the Tawhay Wellness Car Diffuser — a stylish and natural way to keep your space fresh and calming wherever you go.",
        variations: [
            { name: "Tawhay", value: "tawhay", price: 120 },
            { name: "Hardin", value: "hardin", price: 120 },
            { name: "Amihan", value: "amihan", price: 120 }
        ]
    },
    {
        id: "essential-oil",
        name: "Essential Oil",
        price: 350,
        oldPrice: null,
        badge: null,
        stock: 18,
        sku: "TW-EO-350-PH",
        category: "Aromatherapy / Essential Oils",
        tags: ["organic blend", "essential oil"],
        image: "assets/ChatGPT Image Mar 22, 2026, 06_10_52 PM.png",
        gallery: ["assets/essentialoil2.png", "assets/essentialoil1.png"],
        description: "Experience calm, clarity, and natural wellness with Tawhay Wellness Essential Oil.",
        variations: [
            { name: "Lavender", value: "lavender", price: 650 },
            { name: "Peppermint", value: "peppermint", price: 450 },
            { name: "Eucalyptus", value: "eucalyptus", price: 450 },
            { name: "Citronella", value: "citronella", price: 350 }
        ]
    },
    {
        id: "roller-blends-adult",
        name: "Roller Blends Adult",
        price: 250,
        oldPrice: 350,
        badge: "-29%",
        stock: 12,
        sku: "RBA-001",
        category: "Adult Wellness",
        tags: ["roller blend", "adult", "wellness"],
        image: "assets/ChatGPT Image Mar 22, 2026, 06_20_55 PM.png",
        gallery: ["assets/RBKiddie2.png", "assets/RBKiddie1.png"],
        description: "Tawhay Wellness Roller Blends Adult are made for everyday calm, focus, and natural relief.",
        variations: [
            { name: "Relax", value: "relax", price: 250 },
            { name: "Focus", value: "focus", price: 250 },
            { name: "Sleep", value: "sleep", price: 250 }
        ]
    },
    {
        id: "roller-blends-kiddie",
        name: "Roller Blends Kiddie",
        price: 200,
        oldPrice: null,
        badge: null,
        stock: 10,
        sku: "SS001",
        category: "Kids Wellness",
        tags: ["roller blend", "kids", "wellness"],
        image: "assets/ChatGPT Image Mar 22, 2026, 06_24_10 PM.png",
        gallery: ["assets/RBKiddie2.png", "assets/RBKiddie1.png"],
        description: "Support your child's wellness naturally with Tawhay Wellness Roller Blends Kiddie.",
        variations: [
            { name: "barkin' no more", value: "barkin-no-more", price: 200 },
            { name: "bye, bye bites", value: "bye-bye-bites", price: 200 },
            { name: "fever, go away", value: "fever-go-away", price: 200 },
            { name: "hocus focus", value: "hocus-focus", price: 200 },
            { name: "to immunity & beyond", value: "to-immunity-beyond", price: 200 },
            { name: "sleep tight", value: "sleep-tight", price: 200 },
            { name: "sniffle helper", value: "sniffle-helper", price: 200 }
        ]
    },
    {
        id: "muscle-balm",
        name: "Muscle Balm",
        price: 180,
        oldPrice: null,
        badge: null,
        stock: 14,
        sku: "TWH-MB-001",
        category: "Relax & Restore",
        tags: ["Muscle Balm"],
        image: "assets/ChatGPT Image Mar 22, 2026, 06_30_12 PM.png",
        gallery: ["assets/05A264B2-27B4-4195-B7CB-FB8EBB644AC3.png", "assets/6BD133CA-B4A6-4B6A-ACDF-BC67D46BC428.png"],
        description: "Experience fast, soothing relief with Tawhay Wellness Muscle Balm, specially formulated to ease muscle tension, body aches, and everyday fatigue. Infused with a blend of natural essential oils, this balm delivers a cooling and calming sensation that helps relax sore muscles after long days, workouts, or physical strain. Its smooth, non-greasy formula absorbs easily into the skin, making it perfect for on-the-go relief anytime you need it. Gentle yet effective, it’s your daily companion for comfort and recovery.",
        variations: [
            { name: "Default", value: "default", price: 180 }
        ]
    },
    {
        id: "linen-spray",
        name: "Whiff Away Scented Spray",
        price: 150,
        oldPrice: null,
        badge: null,
        stock: 17,
        sku: "TWH-SS-WHIFF",
        category: "Aromatherapy Collection",
        tags: ["Scent Spray"],
        image: "assets/27692E61-E848-4CB1-AA8E-27E922F11035.png",
        gallery: ["assets/819A5A4E-89BD-4CC8-BF61-A90FAE83009F.png", "assets/606C266A-2C11-4ED2-9522-4E10EBCAE2E9.png"],
        description: "Whiff Away Scent Spray is a refreshing fabric and room mist designed to keep your space smelling clean, calm, and cozy. Perfect for linens, pillows, curtains, sofas, and other fabric surfaces, it leaves a soft and comforting scent that helps create a more relaxing atmosphere at home.",
        variations: [
            { name: "Default", value: "default", price: 150 }
        ]
    },
    {
        id: "hand-sanitizer",
        name: "Hand Sanitizer",
        price: 150,
        oldPrice: null,
        badge: null,
        stock: 23,
        sku: "TWH-HS-CALM",
        category: "Mindful Essentials",
        tags: ["Hand Sanitizer"],
        image: "assets/43A08F4E-C171-41C8-AC3F-FA7E58EAA938.png",
        gallery: ["assets/52B7E908-C297-4EA2-8EFB-26D21DB2CAC1.png", "assets/6EEDA1A9-9471-4509-981D-44D9398035AC.png"],
        description: "A refreshing hand sanitizer spray made to keep your hands clean while adding a soft, uplifting aromatherapy-inspired scent. Designed for everyday convenience, it offers a quick and easy way to maintain hand hygiene wherever you are whether at home, in school, at work, or on the go.",
        variations: [
            { name: "Calm", value: "calm", price: 150 },
            { name: "Fresh", value: "fresh", price: 150 },
            { name: "Happy", value: "happy", price: 150 }
        ]
    }
];

function getProductById(id) {
    return PRODUCT_CATALOG.find((product) => product.id === id);
}

function formatPricePHP(value) {
    return `Php ${Number(value).toFixed(2)}`;
}

function goToProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

function goToCategory(category) {
    window.location.href = `category.html?category=${encodeURIComponent(category)}`;
}

function getSuggestions(keyword) {
    const q = keyword.trim().toLowerCase();
    if (!q) return [];
    return PRODUCT_CATALOG.filter((product) => product.name.toLowerCase().includes(q)).slice(0, 6);
}

function showSuggestions(items, activeIndex = -1) {
    const box = document.getElementById("searchSuggestions");
    if (!box) return;

    if (!items.length) {
        box.innerHTML = `<div class="search-no-results">No matching products</div>`;
        box.classList.add("show");
        return;
    }

    box.innerHTML = items.map((item, index) => `
        <button type="button" class="search-suggestion-item ${index === activeIndex ? "active" : ""}" data-id="${item.id}">
            ${item.name}
        </button>
    `).join("");

    box.classList.add("show");
}

function hideSuggestions() {
    const box = document.getElementById("searchSuggestions");
    if (!box) return;
    box.classList.remove("show");
    box.innerHTML = "";
}

function initializeSearchUI() {
    const shell = document.getElementById("searchShell");
    const toggle = document.getElementById("searchToggle");
    const input = document.getElementById("searchInput");
    const box = document.getElementById("searchSuggestions");

    if (!shell || !toggle || !input || !box) return;

    let currentSuggestions = [];
    let activeIndex = -1;

    function openSearch() {
        shell.classList.add("active");
        setTimeout(() => input.focus(), 100);
    }

    function closeSearch() {
        if (input.value.trim() !== "") return;
        shell.classList.remove("active");
        hideSuggestions();
    }

    toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        if (!shell.classList.contains("active")) {
            openSearch();
            return;
        }
        closeSearch();
    });

    input.addEventListener("input", function () {
        const value = this.value.trim();
        activeIndex = -1;

        if (!value) {
            hideSuggestions();
            return;
        }

        currentSuggestions = getSuggestions(value);
        showSuggestions(currentSuggestions, activeIndex);
    });

    input.addEventListener("keydown", function (event) {
        if (!currentSuggestions.length) return;

        if (event.key === "ArrowDown") {
            event.preventDefault();
            activeIndex = (activeIndex + 1) % currentSuggestions.length;
            showSuggestions(currentSuggestions, activeIndex);
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            activeIndex = activeIndex <= 0 ? currentSuggestions.length - 1 : activeIndex - 1;
            showSuggestions(currentSuggestions, activeIndex);
        }

        if (event.key === "Enter") {
            event.preventDefault();
            const selected = currentSuggestions[activeIndex] || currentSuggestions[0];
            if (selected) {
                goToProduct(selected.id);
            }
        }

        if (event.key === "Escape") {
            hideSuggestions();
            closeSearch();
        }
    });

    box.addEventListener("click", (event) => {
        const button = event.target.closest(".search-suggestion-item");
        if (!button) return;
        goToProduct(button.dataset.id);
    });

    document.addEventListener("click", (event) => {
        if (!shell.contains(event.target)) {
            hideSuggestions();
            closeSearch();
        }
    });
}

function getUsers() {
    return JSON.parse(localStorage.getItem("tawhayUsers")) || [];
}

function saveUsers(users) {
    localStorage.setItem("tawhayUsers", JSON.stringify(users));
}

function registerUser() {
    const name = document.getElementById("regName")?.value.trim();
    const email = document.getElementById("regEmail")?.value.trim();
    const password = document.getElementById("regPassword")?.value.trim();

    if (!name || !email || !password) {
        alert("Please fill all fields.");
        return;
    }

    const users = getUsers();

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        alert("Email already registered.");
        return;
    }

    const newUser = {
        name,
        email,
        password,
        role: email === "admin@tawhay.com" ? "admin" : "user"
    };

    users.push(newUser);
    saveUsers(users);

    alert("Registered successfully!");
    window.location.href = "login.html";
}

function loginUser() {
    const email = document.getElementById("loginEmail")?.value.trim();
    const password = document.getElementById("loginPassword")?.value.trim();

    const users = getUsers();

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        alert("Invalid credentials.");
        return;
    }

    localStorage.setItem("tawhayCurrentUser", JSON.stringify(user));

    alert("Login successful!");

    // 🔥 ADMIN REDIRECT
    if (user.role === "admin") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "dashboard.html";
    }
}

function logoutUser() {
    localStorage.removeItem("tawhayCurrentUser");
    window.location.href = "index.html";
}

function checkUserState() {
    const accountBtn = document.getElementById("accountBtn");
    const user = JSON.parse(localStorage.getItem("tawhayCurrentUser"));

    if (!accountBtn) return;

    // NOT LOGGED IN
    if (!user) {
        accountBtn.innerHTML = `
            <a href="login.html" class="tw-icon-link" title="Login">
                <span class="material-symbols-outlined">person</span>
            </a>
        `;
        return;
    }

    // ADMIN (logout only)
    if (user.role === "admin") {
        accountBtn.innerHTML = `
            <button class="tw-icon-btn" onclick="logoutUser()" title="Logout">
                <span class="material-symbols-outlined">logout</span>
            </button>
        `;
        return;
    }

    // ✅ USER (KEEP user icon + ADD logout icon)
    accountBtn.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px;">
            
            <!-- USER ICON -->
            <a href="dashboard.html" class="tw-icon-link" title="Dashboard">
                <span class="material-symbols-outlined">person</span>
            </a>

            <!-- LOGOUT ICON -->
            <button class="tw-icon-btn" onclick="logoutUser()" title="Logout">
                <span class="material-symbols-outlined">logout</span>
            </button>

        </div>
    `;
}

function isUserLoggedIn() {
    return localStorage.getItem("tawhayCurrentUser") !== null;
}

function addToCart(productId) {
    if (!isUserLoggedIn()) {
        alert("Please log in first before adding items to your cart.");
        window.location.href = "login.html";
        return;
    }

    const cart = getCart();
    const product = getProductById(productId);

    if (!product) {
        alert("Product not found.");
        return;
    }

    cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        variation: "Default"
    });

    saveCart(cart);
    alert("Added to cart!");
}