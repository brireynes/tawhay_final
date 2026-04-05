const SHOP_PRODUCTS_PER_PAGE = 8;

function getShopPageNumber() {
    const page = document.body?.dataset?.page || "";
    return page === "shop2" ? 2 : 1;
}

function getShopProductsForPage(pageNumber) {
    const start = (pageNumber - 1) * SHOP_PRODUCTS_PER_PAGE;
    const end = start + SHOP_PRODUCTS_PER_PAGE;
    return PRODUCT_CATALOG.slice(start, end);
}

function renderShopPagination(currentPage, totalPages) {
    const pagination = document.getElementById("shopPagination");
    if (!pagination) return;

    let html = "";

    if (currentPage > 1) {
        html += `<a href="shop.html">Previous</a>`;
    }

    html += currentPage === 1
        ? `<span class="active">1</span>`
        : `<a href="shop.html">1</a>`;

    if (totalPages >= 2) {
        html += currentPage === 2
            ? `<span class="active">2</span>`
            : `<a href="2ndshop.html">2</a>`;
    }

    if (currentPage < totalPages) {
        html += `<a href="2ndshop.html">Next</a>`;
    }

    pagination.innerHTML = html;
}

function renderShopPage() {
    const grid = document.getElementById("shopGrid");
    const resultsText = document.getElementById("shopResultsText");
    const pageLabel = document.getElementById("shopPageLabel");

    if (!grid) return;

    const currentPage = getShopPageNumber();
    const totalProducts = PRODUCT_CATALOG.length;
    const totalPages = Math.ceil(totalProducts / SHOP_PRODUCTS_PER_PAGE);
    const products = getShopProductsForPage(currentPage);

    const start = (currentPage - 1) * SHOP_PRODUCTS_PER_PAGE + 1;
    const end = Math.min(currentPage * SHOP_PRODUCTS_PER_PAGE, totalProducts);

    if (resultsText) {
        resultsText.textContent = `Showing ${start}–${end} of ${totalProducts} results`;
    }

    if (pageLabel) {
        pageLabel.textContent = `Page ${currentPage}`;
    }

    if (!products.length) {
        grid.innerHTML = `
            <div class="center-text" style="grid-column: 1 / -1; padding: 80px 0;">
                No products found.
            </div>
        `;
        renderShopPagination(currentPage, totalPages);
        return;
    }

    grid.innerHTML = products.map((product) => `
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

    renderShopPagination(currentPage, totalPages);
}

document.addEventListener("DOMContentLoaded", renderShopPage);