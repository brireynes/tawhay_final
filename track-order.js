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

        <div class="order-confirmation-actions">
            <a href="dashboard.html" class="primary-btn">My Dashboard</a>
            <a href="shop.html" class="primary-btn">Continue Shopping</a>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", renderTrackOrder);