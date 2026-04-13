function renderWishlist() {
    const container = document.getElementById("wishlist-list");
    if (!container) return;

    if (!isUserLoggedIn()) {
        alert("Please log in first to view your wishlist.");
        window.location.href = "login.html";
        return;
    }

    const products = getWishlistProductsForCurrentUser();

    if (!products.length) {
        container.innerHTML = `
            <div class="wishlist-empty">
                <h3>Your wishlist is empty</h3>
                <p>Save your favorite Tawhay Wellness products here.</p>
                <a href="shop.html" class="primary-btn">Browse Products</a>
            </div>
        `;
        return;
    }

    container.innerHTML = products.map((product) => `
        <article class="wishlist-card">
            <div class="wishlist-image-wrap" onclick="goToProduct('${product.id}')">
                <img src="${product.image}" alt="${product.name}" class="wishlist-image">
            </div>

            <div class="wishlist-card-body">
                <h3>${product.name}</h3>
                <p class="wishlist-category">${product.category}</p>
                <p class="wishlist-price">${formatPricePHP(product.price)}</p>

                <div class="wishlist-actions">
                    <a href="product.html?id=${encodeURIComponent(product.id)}" class="primary-btn">
                        View Product
                    </a>
                    <button type="button" class="primary-btn" onclick="handleWishlistRemove('${product.id}')">
                        Remove
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

function handleWishlistRemove(productId) {
    removeFromWishlist(productId);
    renderWishlist();
}

document.addEventListener("DOMContentLoaded", renderWishlist);