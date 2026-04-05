const CART_KEY = "tawhayCart";

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}

function formatPrice(value) {
    return `Php ${Number(value).toFixed(2)}`;
}

function getCartItemId(item) {
    if (item.cartItemId) return item.cartItemId;
    const productId = item.productId || item.id || "";
    const variationValue = item.variationValue || item.variation || item.variant || "default";
    return `${productId}__${variationValue}`;
}

function normalizeCartItems(cart) {
    return cart.map((item) => ({
        ...item,
        cartItemId: getCartItemId(item),
        productId: item.productId || item.id || "",
        variation: item.variation || item.variant || "Default",
        variationValue: item.variationValue || item.variation || item.variant || "default"
    }));
}

function updateCartCount() {
    const totalQty = normalizeCartItems(getCart()).reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    document.querySelectorAll("#cart-count").forEach((badge) => {
        badge.textContent = totalQty;
    });
}

document.addEventListener("DOMContentLoaded", updateCartCount);