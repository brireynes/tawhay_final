const CATEGORY_MAP = {
    "mindful-essentials": [
        "aroma-inhaler",
        "lip-balm",
        "car-diffuser",
        "essential-oil"
    ],
    "relax-and-restore": [
        "roller-blends-adult",
        "roller-blends-kiddie",
        "muscle-balm"
    ],
    "aromatherapy-collection": [
        "bugtaw-soy-candle",
        "kalipay-soy-candle",
        "car-diffuser",
        "essential-oil"
    ]
};

const CATEGORY_LABELS = {
    "mindful-essentials": "Mindful Essentials",
    "relax-and-restore": "Relax & Restore",
    "aromatherapy-collection": "Aromatherapy Collection"
};

function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category");
}

function getFilteredProducts() {
    const category = getCategoryFromURL();

    if (!category || !CATEGORY_MAP[category]) {
        return PRODUCT_CATALOG;
    }

    return PRODUCT_CATALOG.filter(product =>
        CATEGORY_MAP[category].includes(product.id)
    );
}

function renderShopProducts() {
    const grid = document.getElementById("shopGrid");
    const resultsText = document.getElementById("shopResultsText");
    const pageLabel = document.getElementById("shopPageLabel");
    const pagination = document.getElementById("shopPagination");

    if (!grid) return;

    const category = getCategoryFromURL();
    const products = getFilteredProducts();

    if (category && CATEGORY_LABELS[category]) {
        pageLabel.textContent = CATEGORY_LABELS[category];
    } else {
        pageLabel.textContent = "Shop";
    }

    resultsText.textContent = `Showing 1–${products.length} of ${products.length} results`;

    if (products.length === 0) {
        grid.innerHTML = `<div class="center-text" style="grid-column: 1 / -1; padding: 80px 0;">No products found.</div>`;
        if (pagination) pagination.innerHTML = "";
        return;
    }

    grid.innerHTML = products.map(product => `
        <article class="shop-product-card" onclick="goToProduct('${product.id}')">
            <div class="shop-product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<span class="sale-badge">${product.badge}</span>` : ""}
            </div>
            <div class="shop-product-info">
                <h3 class="shop-product-title">${product.name}</h3>
                <div class="shop-product-price">
                    ${formatPricePHP(product.price)}
                    ${product.oldPrice ? `<span class="shop-old-price">${formatPricePHP(product.oldPrice)}</span>` : ""}
                </div>
            </div>
        </article>
    `).join("");

    if (pagination) {
        pagination.innerHTML = `
            <a href="shop.html">View All</a>
        `;
    }
}

document.addEventListener("DOMContentLoaded", renderShopProducts);