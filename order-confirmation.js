function getOrderIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("orderId");
}

function findOrderById(orderId) {
    const orders = getOrders();
    return orders.find((order) => order.id === orderId) || getLastOrder();
}

function formatAddress(details) {
    if (!details) return "No shipping address found.";

    return [
        details.street,
        `${details.city}, ${details.province}`,
        `${details.country} ${details.zip}`,
        `Phone: ${details.phone}`,
        `Email: ${details.email}`
    ].filter(Boolean).join("<br>");
}

function renderOrderItems(items) {
    if (!items || !items.length) {
        return `<p>No ordered items found.</p>`;
    }

    return items.map((item) => {
        const subtotal = Number(item.price) * Number(item.quantity);
        return `
            <div class="confirmation-item-row">
                <div>
                    <strong>${item.name}</strong>
                    <div class="confirmation-item-meta">
                        ${item.variation ? `Variation: ${item.variation}<br>` : ""}
                        Quantity: ${item.quantity}
                    </div>
                </div>
                <div>${formatPrice(subtotal)}</div>
            </div>
        `;
    }).join("");
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

    container.innerHTML = `
        <div class="confirmation-state">
            <span class="material-symbols-outlined confirmation-icon success">check_circle</span>
            <h2>Thank you! Your order has been placed.</h2>
            <p>Your order has been successfully recorded in Tawhay Wellness.</p>
        </div>

        <div class="confirmation-grid">
            <div class="confirmation-box">
                <h3>Order Details</h3>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Status:</strong> ${order.status}</p>
                <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                <p><strong>Estimated Delivery:</strong> ${order.estimate}</p>
                <p><strong>Total:</strong> ${formatPrice(order.total)}</p>
            </div>

            <div class="confirmation-box">
                <h3>Shipping Information</h3>
                <p>${formatAddress(order.billingDetails)}</p>
            </div>
        </div>

        <div class="confirmation-box confirmation-items-box">
            <h3>Items Ordered</h3>
            <div class="confirmation-items-list">
                ${renderOrderItems(order.items)}
            </div>
        </div>

        <div class="confirmation-actions">
            <a href="shop.html" class="primary-btn">Continue Shopping</a>
            <a href="cart.html" class="primary-btn secondary-btn">View Cart</a>
            <a href="track-order.html?orderId=${encodeURIComponent(order.id)}" class="primary-btn">
                Track Order
            </a>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", renderOrderConfirmation);