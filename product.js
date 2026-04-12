function getSelectedVariation(product, variationValue) {
    return product.variations.find((item) => item.value === variationValue) || product.variations[0];
}

function renderProductPage() {
    const container = document.getElementById("product-content");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const product = getProductById(productId);

    if (!product) {
        container.innerHTML = `<div class="center-text" style="padding:80px 0;">Product not found.</div>`;
        return;
    }

    let selectedVariation = product.variations[0];
    let quantity = 1;

    function render() {
        container.innerHTML = `
            <div class="product-top">
                <div class="product-gallery-main">
                    <img src="${product.image}" alt="${product.name}">
                </div>

                <div>
                    <h1 class="product-title">${product.name}</h1>

                    <div class="product-price-row">
                    ${formatPricePHP(selectedVariation.price)}
                    ${product.oldPrice ? `<span class="old">${formatPricePHP(product.oldPrice)}</span>` : ""}
                    </div>

                    <p class="product-stock ${product.stock <= 0 ? 'out' : 'in'}">
                        ${product.stock <= 0 ? 'Out of Stock' : `Stock: ${product.stock}`}
                    </p>
                    <p class="product-description">${product.description}</p>

                    <div class="variation-label">Variation</div>
                    <div class="variation-grid">
                        ${product.variations.map((variation) => `
                            <button type="button" class="variation-card ${variation.value === selectedVariation.value ? "active" : ""}" data-variation="${variation.value}">
                                <span class="variation-name">${variation.name}</span>
                                <span class="variation-price">${formatPricePHP(variation.price)}</span>
                            </button>
                        `).join("")}
                    </div>

                    <div class="quantity-label">Quantity</div>
                    <div class="purchase-row">
                        <div class="quantity-box">
                            <button type="button" id="decreaseQty">-</button>
                            <span id="qtyValue">${quantity}</span>
                            <button type="button" id="increaseQty">+</button>
                        </div>

                    <button
                        type="button"
                        class="add-to-cart-btn ${product.stock <= 0 ? 'disabled-btn' : ''}"
                        id="addToCartBtn"
                        ${product.stock <= 0 ? 'disabled' : ''}
                    >
                        ${product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                    </div>

                    <div class="product-meta">
                        <p>SKU: ${product.sku}</p>
                        <p>Category: ${product.category}</p>
                        <p>Tags: ${product.tags.join(", ")}</p>
                    </div>
                </div>
            </div>

            <div class="product-description-section">
                <h3>Description</h3>
                <p>${product.description}</p>

                <div class="product-gallery-row">
                    <div class="gallery-image-box">
                        <img src="${product.gallery[0]}" alt="${product.name} gallery 1">
                    </div>
                    <div class="gallery-image-box">
                        <img src="${product.gallery[1]}" alt="${product.name} gallery 2">
                    </div>
                </div>
            </div>
        `;

        container.querySelectorAll(".variation-card").forEach((button) => {
            button.addEventListener("click", () => {
                selectedVariation = getSelectedVariation(product, button.dataset.variation);
                render();
            });
        });

        document.getElementById("decreaseQty").addEventListener("click", () => {
            quantity = Math.max(1, quantity - 1);
            render();
        });

        document.getElementById("increaseQty").addEventListener("click", () => {
            quantity += 1;
            render();
        });

        const addToCartBtn = document.getElementById("addToCartBtn");

        addToCartBtn?.addEventListener("click", () => {
            if (product.stock <= 0) return;

            if (!isUserLoggedIn()) {
                alert("Please log in first before adding items to your cart.");
                window.location.href = "login.html";
                return;
            }

            const cart = normalizeCartItems(getCart());

            const itemToAdd = {
                cartItemId: `${product.id}__${selectedVariation ? selectedVariation.value : "default"}`,
                productId: product.id,
                name: product.name,
                image: product.image,
                variation: selectedVariation ? selectedVariation.name : "Default",
                variationValue: selectedVariation ? selectedVariation.value : "default",
                price: selectedVariation ? selectedVariation.price : product.price,
                quantity: quantity,
                sku: product.sku
            };

            const existingIndex = cart.findIndex(
                (item) => item.cartItemId === itemToAdd.cartItemId
            );

            if (existingIndex > -1) {
                cart[existingIndex].quantity += quantity;
            } else {
                cart.push(itemToAdd);
            }

            saveCart(cart);
            alert("Product added to cart.");
        });
    }

    render();
}

document.addEventListener("DOMContentLoaded", renderProductPage);