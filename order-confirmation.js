function getOrderIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("orderId");
}

function renderOrderConfirmation() {
    const container = document.getElementById("order-confirmation-content");
    if (!container) return;

    const orderId = getOrderIdFromURL();
    const order = findOrderById(orderId);

    if (!order) {
        container.innerHTML = `
            <div class="confirmation-state">
                <span class="material-symbols-outlined confirmation-icon">error</span>
                <h2>Order not found</h2>
                <p>We could not find your order details.</p>
                <a href="shop.html" class="primary-btn">Return to Shop</a>
            </div>
        `;
        return;
    }

    const trackBtn = document.getElementById("trackOrderBtn");

    if (trackBtn && order) {
        trackBtn.href = `track-order.html?orderId=${encodeURIComponent(order.id)}`;
    }
}

document.addEventListener("DOMContentLoaded", renderOrderConfirmation);