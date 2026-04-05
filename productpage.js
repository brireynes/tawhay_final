function getProductById(id) {
    return products.find((product) => product.id === id);
}

function getDiscountPercent(oldPrice, newPrice) {
    if (!oldPrice || !newPrice) return null;
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

function renderStars(count = 5) {
    let html = "";
    for (let i = 0; i < count; i++) {
        html += `<i class="fa-solid fa-star"></i>`;
    }
    return html;
}

document.addEventListener("click", function (e) {
    const card = e.target.closest("[data-product-id]");
    if (!card) return;

    const productId = card.dataset.productId;
    if (productId) {
        window.location.href = `product.html?id=${productId}`;
    }
});

function renderProductPage() {
    const container = document.getElementById("product-content");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) {
        container.innerHTML = `
            <div class="not-found">
                No product ID found in the URL.
            </div>
        `;
        return;
    }

    const product = getProductById(productId);

    if (!product) {
        container.innerHTML = `
            <div class="not-found">
                Product not found: <strong>${productId}</strong>
            </div>
        `;
        return;
    }

    const firstVariation = product.variations?.[0] || null;
    const currentPrice = firstVariation ? firstVariation.price : product.price;
    const discountPercent = getDiscountPercent(product.oldPrice, currentPrice);

    container.innerHTML = `
        <div class="product-top">
            <div class="product-left">
                <div class="product-main-image-wrap">
                    ${discountPercent ? `<span class="discount-badge">-${discountPercent}%</span>` : ""}
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="product-main-image"
                        id="productMainImage"
                    />
                </div>
            </div>

            <div class="product-right">
                <h2 class="product-title">${product.name}</h2>

                <div class="product-price-row">
                    <span class="current-price" id="currentPrice">${formatPrice(currentPrice)}</span>
                    ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ""}
                </div>

                <div class="product-review-row">
                    <div class="stars">${renderStars(5)}</div>
                    <span class="review-divider">|</span>
                    <span class="review-text">${product.reviewCount} Customer Review</span>
                </div>

                ${product.variations?.length
                    ? `
                    <div class="variation-label">${product.name.includes("Candle") ? "Size:" : "Variation:"}</div>
                    <div class="variation-grid" id="variationGrid">
                        ${product.variations
                            .map(
                                (variation, index) => `
                            <button
                                class="variation-card ${index === 0 ? "active" : ""}"
                                type="button"
                                data-variation-name="${variation.name}"
                                data-variation-value="${variation.value}"
                                data-variation-price="${variation.price}"
                            >
                                <span class="variation-name">${variation.name}</span>
                                <span class="variation-price">${formatPrice(variation.price).replace(".00", "")}</span>
                            </button>
                        `
                            )
                            .join("")}
                    </div>
                `
                    : ""
                }

                <div class="quantity-label">Quantity</div>

                <div class="purchase-row">
                    <div class="quantity-box">
                        <button type="button" id="decreaseQty">-</button>
                        <span id="quantityValue">1</span>
                        <button type="button" id="increaseQty">+</button>
                    </div>

                    <button type="button" class="add-to-cart-btn" id="addToCartBtn">
                        Add To Cart
                    </button>
                </div>

                <div class="product-meta">
                    <div class="meta-row"><span>SKU</span><span>:</span><span>${product.sku}</span></div>
                    <div class="meta-row"><span>Category</span><span>:</span><span>${product.category}</span></div>
                    <div class="meta-row"><span>Tags</span><span>:</span><span>${product.tags.join(", ")}</span></div>
                    <div class="meta-row">
                        <span>Share</span><span>:</span>
                        <span class="share-icons">
                            <a href="#"><i class="fa-brands fa-facebook"></i></a>
                            <a href="#"><i class="fa-brands fa-linkedin"></i></a>
                            <a href="#"><i class="fa-brands fa-twitter"></i></a>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <section class="product-description-section">
            <h3>Description</h3>
            <p>${product.description}</p>

            <div class="product-gallery-row">
                <div class="gallery-image-box">
                    <img src="${product.gallery?.[0] || product.image}" alt="${product.name} gallery 1" />
                </div>
                <div class="gallery-image-box">
                    <img src="${product.gallery?.[1] || product.image}" alt="${product.name} gallery 2" />
                </div>
            </div>
        </section>
    `;

    setupProductInteractions(product);
}

function setupProductInteractions(product) {
    let selectedVariation = product.variations?.[0] || null;
    let quantity = 1;

    const quantityValue = document.getElementById("quantityValue");
    const currentPrice = document.getElementById("currentPrice");
    const increaseBtn = document.getElementById("increaseQty");
    const decreaseBtn = document.getElementById("decreaseQty");
    const addToCartBtn = document.getElementById("addToCartBtn");
    const variationCards = document.querySelectorAll(".variation-card");

    function updatePriceDisplay() {
        const price = selectedVariation ? selectedVariation.price : product.price;
        currentPrice.textContent = formatPrice(price);
    }

    function updateQuantityDisplay() {
        quantityValue.textContent = quantity;
    }

    variationCards.forEach((card) => {
        card.addEventListener("click", () => {
            variationCards.forEach((item) => item.classList.remove("active"));
            card.classList.add("active");

            selectedVariation = {
                name: card.dataset.variationName,
                value: card.dataset.variationValue,
                price: Number(card.dataset.variationPrice)
            };

            updatePriceDisplay();
        });
    });

    increaseBtn?.addEventListener("click", () => {
        quantity += 1;
        updateQuantityDisplay();
    });

    decreaseBtn?.addEventListener("click", () => {
        if (quantity > 1) {
            quantity -= 1;
            updateQuantityDisplay();
        }
    });

    addToCartBtn?.addEventListener("click", () => {
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

document.addEventListener("DOMContentLoaded", renderProductPage);