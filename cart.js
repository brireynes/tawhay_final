document.addEventListener("DOMContentLoaded", () => {
    if (!isUserLoggedIn()) {
        alert("Please log in first to view your cart.");
        window.location.href = "login.html";
        return;
    }

    renderCart();
});

function renderCart() {
    const cart = normalizeCartItems(getCart());
    const cartItemsContainer = document.getElementById("cart-items");
    const emptyCart = document.getElementById("empty-cart");
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        emptyCart.classList.remove("hidden");
        cartSubtotal.textContent = formatPrice(0);
        cartTotal.textContent = formatPrice(0);
        if (checkoutBtn) checkoutBtn.classList.add("disabled-btn");
        return;
    }

    emptyCart.classList.add("hidden");
    if (checkoutBtn) checkoutBtn.classList.remove("disabled-btn");

    let subtotal = 0;

    cart.forEach((item) => {
        const itemSubtotal = Number(item.price) * Number(item.quantity);
        subtotal += itemSubtotal;

        const row = document.createElement("div");
        row.className = "cart-row";

        row.innerHTML = `
            <div class="cart-product-info">
                <img src="${item.image}" alt="${item.name}" class="cart-product-image">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.variation || ""}</p>
                </div>
            </div>

            <div>${formatPrice(Number(item.price))}</div>

            <div>
                <input type="number" min="1" value="${item.quantity}" class="qty-input" data-cart-item-id="${item.cartItemId}">
            </div>

            <div>${formatPrice(itemSubtotal)}</div>

            <div>
                <button class="delete-btn" data-cart-item-id="${item.cartItemId}" aria-label="Remove item">✕</button>
            </div>
        `;

        cartItemsContainer.appendChild(row);
    });

    cartSubtotal.textContent = formatPrice(subtotal);
    cartTotal.textContent = formatPrice(subtotal);

    attachCartEvents();
}

function attachCartEvents() {
    document.querySelectorAll(".qty-input").forEach((input) => {
        input.addEventListener("change", (e) => {
            const cartItemId = e.target.dataset.cartItemId;
            let newQty = parseInt(e.target.value, 10);

            if (isNaN(newQty) || newQty < 1) newQty = 1;

            const cart = normalizeCartItems(getCart()).map((item) =>
                item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
            );

            saveCart(cart);
            renderCart();
        });
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const cartItemId = button.dataset.cartItemId;
            const filteredCart = normalizeCartItems(getCart()).filter((item) => item.cartItemId !== cartItemId);
            saveCart(filteredCart);
            renderCart();
        });
    });
}