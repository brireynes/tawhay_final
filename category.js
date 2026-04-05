const CATEGORY_MAP = {
    "aromatherapy-collection": [
        "bugtaw-soy-candle",
        "kalipay-soy-candle",
        "car-diffuser",
        "essential-oil",
        "linen-spray"
    ],
    "relax-and-restore": [
        "roller-blends-kiddie",
        "roller-blends-adult",
        "muscle-balm"
    ],
    "mindful-essentials": [
        "aroma-inhaler",
        "lip-balm",
        "hand-sanitizer"
    ]
};

const CATEGORY_LABELS = {
    "mindful-essentials": "Mindful Essentials",
    "relax-and-restore": "Relax & Restore",
    "aromatherapy-collection": "Aromatherapy Collection"
};

function getCategoryParam() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category");
}

function getCategoryProducts(categoryKey) {
    const allowedIds = CATEGORY_MAP[categoryKey] || [];
    return PRODUCT_CATALOG.filter(product => allowedIds.includes(product.id));
}

function renderCategoryPage() {
    const categoryKey = getCategoryParam();
    const grid = document.getElementById("categoryGrid");
    const title = document.getElementById("categoryTitle");
    const breadcrumb = document.getElementById("categoryBreadcrumb");
    const resultsText = document.getElementById("categoryResultsText");
    const pageLabel = document.getElementById("categoryPageLabel");

    if (!grid) return;

    if (!categoryKey || !CATEGORY_MAP[categoryKey]) {
        title.textContent = "Category";
        breadcrumb.textContent = "Home › Category";
        resultsText.textContent = "No category selected";
        pageLabel.textContent = "Category View";
        grid.innerHTML = `
            <div class="center-text" style="grid-column: 1 / -1; padding: 80px 0;">
                No category found.
            </div>
        `;
        return;
    }

    const categoryName = CATEGORY_LABELS[categoryKey];
    const products = getCategoryProducts(categoryKey);

    title.textContent = categoryName;
    breadcrumb.textContent = `Home › ${categoryName}`;
    resultsText.textContent = `Showing 1–${products.length} of ${products.length} results`;
    pageLabel.textContent = categoryName;

    if (products.length === 0) {
        grid.innerHTML = `
            <div class="center-text" style="grid-column: 1 / -1; padding: 80px 0;">
                No products found in this category.
            </div>
        `;
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
}

document.addEventListener("DOMContentLoaded", renderCategoryPage);