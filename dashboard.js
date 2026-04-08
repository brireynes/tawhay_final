const ORDERS_KEY = "tawhayOrders";

function getOrders() {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("tawhayCurrentUser")) || null;
}

function formatOrderDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("en-PH", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });
}

function getOrdersForCurrentUser() {
    const currentUser = getCurrentUser();
    const allOrders = getOrders();

    if (!currentUser) return [];

    const currentEmail = (currentUser.email || "").trim().toLowerCase();

    return allOrders.filter((order) => {
        const customerEmail = (order.customer?.email || "").trim().toLowerCase();
        const billingEmail = (order.billing?.email || "").trim().toLowerCase();
        const userEmail = (order.userEmail || "").trim().toLowerCase();
        const email = (order.email || "").trim().toLowerCase();

        return (
            customerEmail === currentEmail ||
            billingEmail === currentEmail ||
            userEmail === currentEmail ||
            email === currentEmail
        );
    });
}

function renderDashboardUser() {
    const user = getCurrentUser();

    if (!user) {
        alert("Please log in first to access your dashboard.");
        window.location.href = "login.html";
        return false;
    }

    const nameEl = document.getElementById("dashboardUserName");
    const emailEl = document.getElementById("dashboardUserEmail");

    if (nameEl) nameEl.textContent = user.name || "Tawhay User";
    if (emailEl) emailEl.textContent = user.email || "No email found";

    return true;
}

function renderDashboardOrders() {
    const container = document.getElementById("dashboardOrdersList");
    if (!container) return;

    const userOrders = getOrdersForCurrentUser();

    if (!userOrders.length) {
        container.innerHTML = `
            <div class="dashboard-empty-state">
                <h3>No orders yet</h3>
                <p>You have not placed any orders yet.</p>
                <a href="shop.html" class="primary-btn">Start Shopping</a>
            </div>
        `;
        return;
    }

    container.innerHTML = userOrders.map((order) => {
        const items = Array.isArray(order.items) ? order.items : [];
        const paymentMethod =
            order.payment?.method ||
            order.paymentMethod ||
            "Not specified";

        const total =
            typeof order.total !== "undefined"
                ? order.total
                : typeof order.subtotal !== "undefined"
                    ? order.subtotal
                    : 0;

        const deliveryEstimate =
            order.deliveryEstimate ||
            order.estimatedDelivery ||
            "3–5 business days";

        const status = order.status || "Order Placed";

        const billing = order.billing || {};
        const fullName =
            `${billing.firstName || ""} ${billing.lastName || ""}`.trim() ||
            order.customer?.name ||
            "No customer name";

        const addressLine1 =
            billing.street ||
            order.address ||
            "No address provided";

        const addressLine2 =
            [billing.city, billing.province].filter(Boolean).join(", ") ||
            "No city/province provided";

        const addressLine3 =
            [billing.country, billing.zip].filter(Boolean).join(", ") ||
            "";

        const itemsHtml = items.length
            ? items.map((item) => {
                const itemSubtotal = Number(item.price || 0) * Number(item.quantity || 0);

                return `
                    <div class="dashboard-order-item">
                        <div>
                            <strong>${item.name || "Unnamed Item"}</strong>
                            <div class="dashboard-order-item-meta">
                                ${item.variation ? `${item.variation} · ` : ""}Qty: ${item.quantity || 0}
                            </div>
                        </div>
                        <div>${formatPrice(itemSubtotal)}</div>
                    </div>
                `;
            }).join("")
            : `<p>No item details available for this order.</p>`;

        return `
            <article class="dashboard-order-card">
                <div class="dashboard-order-top">
                    <div>
                        <h3>${order.id || "No Order ID"}</h3>
                        <p class="dashboard-order-date">${order.createdAt ? formatOrderDate(order.createdAt) : "No date available"}</p>
                    </div>
                    <span class="dashboard-order-status">${status}</span>
                </div>

                <div class="dashboard-order-meta-grid">
                    <div class="dashboard-order-meta-box">
                        <h4>Order Details</h4>
                        <p><strong>Payment:</strong> ${paymentMethod}</p>
                        <p><strong>Total:</strong> ${formatPrice(total)}</p>
                        <p><strong>Delivery Estimate:</strong> ${deliveryEstimate}</p>
                    </div>

                    <div class="dashboard-order-meta-box">
                        <h4>Shipping Information</h4>
                        <p>${fullName}</p>
                        <p>${addressLine1}</p>
                        <p>${addressLine2}</p>
                        ${addressLine3 ? `<p>${addressLine3}</p>` : ""}
                    </div>
                </div>

                <div class="dashboard-order-items-box">
                    <h4>Items Ordered</h4>
                    ${itemsHtml}
                </div>
            </article>
        `;
    }).join("");
}

function attachDashboardEvents() {
    const logoutBtn = document.getElementById("dashboardLogoutBtn");
    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", () => {
        logoutUser();
        window.location.href = "login.html";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const allowed = renderDashboardUser();
    if (!allowed) return;

    renderDashboardOrders();
    attachDashboardEvents();
});