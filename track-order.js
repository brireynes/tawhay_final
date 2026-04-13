function getOrderIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("orderId");
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("tawhayCurrentUser")) || null;
}

function findOrderByIdForCurrentUser(orderId) {
    const currentUser = getCurrentUser();
    const orders = getOrders();

    if (!currentUser) return null;

    return orders.find((order) => {
        const matchesId = order.id === orderId;
        const matchesUser =
            (order.userEmail && order.userEmail === currentUser.email) ||
            (order.billing?.email && order.billing.email === currentUser.email);

        return matchesId && matchesUser;
    }) || null;
}

function getStatusSteps(status) {
    const steps = [
        { key: "Order Placed", label: "Order Placed" },
        { key: "Processing", label: "Processing" },
        { key: "Shipped", label: "Shipped" },
        { key: "Completed", label: "Delivered" }
    ];

    const activeIndex = steps.findIndex((step) => step.key === status);

    return steps.map((step, index) => ({
        ...step,
        active: activeIndex >= index
    }));
}

function formatTrackingAddress(billing = {}) {
    return [
        `${billing.firstName || ""} ${billing.lastName || ""}`.trim(),
        billing.street || "",
        [billing.city, billing.province].filter(Boolean).join(", "),
        [billing.country, billing.zip].filter(Boolean).join(" "),
        billing.phone ? `Phone: ${billing.phone}` : "",
        billing.email ? `Email: ${billing.email}` : ""
    ].filter(Boolean).join("<br>");
}

function renderTrackOrder() {
    const container = document.getElementById("track-order-content");
    if (!container) return;

    if (!isUserLoggedIn()) {
        alert("Please log in first to track your order.");
        window.location.href = "login.html";
        return;
    }

    const orderId = getOrderIdFromURL();
    const order = findOrderByIdForCurrentUser(orderId);

    if (!order) {
        container.innerHTML = `
            <div class="confirmation-state">
                <h2>Order not found</h2>
                <p>We could not find the order you are trying to track.</p>
                <a href="dashboard.html" class="primary-btn">Go to Dashboard</a>
            </div>
        `;
        return;
    }

    const status = order.status || "Order Placed";
    const steps = getStatusSteps(status);

    const billing = order.billing || {};
    const deliveryEstimate = order.deliveryEstimate || order.estimate || "3–5 business days";

    container.innerHTML = `
        <div class="confirmation-state">
            <span class="material-symbols-outlined confirmation-icon">local_shipping</span>
            <h2>Track Your Order</h2>
            <p>Order ID: <strong>${order.id}</strong></p>
            <p>Current Status: <strong>${status}</strong></p>
        </div>
    
        <div class="track-order-box">
            <div class="track-order-steps">
                ${steps.map((step) => `
                    <div class="track-order-step ${step.active ? "active" : ""}">
                        <div class="track-order-dot"></div>
                        <p>${step.label}</p>
                    </div>
                `).join("")}
            </div>
        </div>
    
        <div class="track-details-grid">
            <div class="track-detail-card">
                <h3>Shipping Information</h3>
                <p>${formatTrackingAddress(billing)}</p>
            </div>
    
            <div class="track-detail-card">
                <h3>Delivery Timeframe</h3>
                <p><strong>Estimated Delivery:</strong> ${deliveryEstimate}</p>
                <p>Your delivery estimate may vary slightly depending on your location and courier handling time.</p>
            </div>
    
            <div class="track-detail-card track-detail-card-wide">
                <h3>Logistics Flow</h3>
                <div class="logistics-flow">
                    <div class="logistics-step ${status === "Order Placed" || status === "Processing" || status === "Shipped" || status === "Completed" ? "active" : ""}">
                        <strong>1. Order Placed</strong>
                        <p>Your order has been received and recorded by Tawhay Wellness.</p>
                    </div>
    
                    <div class="logistics-step ${status === "Processing" || status === "Shipped" || status === "Completed" ? "active" : ""}">
                        <strong>2. Processing</strong>
                        <p>Your items are being checked, packed, and prepared for shipment.</p>
                    </div>
    
                    <div class="logistics-step ${status === "Shipped" || status === "Completed" ? "active" : ""}">
                        <strong>3. Courier Handling</strong>
                        <p>Your parcel is turned over to a courier partner for delivery.</p>
                    </div>
    
                    <div class="logistics-step ${status === "Completed" ? "active" : ""}">
                        <strong>4. Delivered</strong>
                        <p>Your order has reached its destination and has been marked as completed.</p>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="order-confirmation-actions">
            <a href="dashboard.html" class="primary-btn">My Dashboard</a>
            <a href="shop.html" class="primary-btn">Continue Shopping</a>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", renderTrackOrder);