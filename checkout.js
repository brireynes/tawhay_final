function renderCheckoutSummary() {
    const cart = normalizeCartItems(getCart());
    const checkoutItems = document.getElementById("checkout-items");
    const checkoutSubtotal = document.getElementById("checkout-subtotal");
    const checkoutTotal = document.getElementById("checkout-total");

    if (!checkoutItems) return;

    checkoutItems.innerHTML = "";

    let subtotal = 0;

    cart.forEach((item) => {
        const itemSubtotal = Number(item.price) * Number(item.quantity);
        subtotal += itemSubtotal;

        const row = document.createElement("div");
        row.className = "checkout-item-row";
        row.innerHTML = `
            <div class="checkout-item-name">${item.name}${item.variation ? ` (${item.variation})` : ""} <span>x ${item.quantity}</span></div>
            <div class="checkout-item-subtotal">${formatPrice(itemSubtotal)}</div>
        `;

        checkoutItems.appendChild(row);
    });

    checkoutSubtotal.textContent = formatPrice(subtotal);
    checkoutTotal.textContent = formatPrice(subtotal);
}

function handleCheckoutForm() {
    const form = document.getElementById("checkout-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const cart = normalizeCartItems(getCart());
        if (!cart.length) {
            alert("Your cart is empty.");
            return;
        }

        const requiredIds = ["firstName", "lastName", "country", "street", "city", "province", "zip", "phone", "email"];
        const isComplete = requiredIds.every((id) => document.getElementById(id).value.trim());

        if (!isComplete) {
            alert("Please complete all required billing details.");
            return;
        }

        alert("Order placed successfully.");
        localStorage.removeItem(CART_KEY);
        window.location.href = "cart.html";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderCheckoutSummary();
    handleCheckoutForm();
});