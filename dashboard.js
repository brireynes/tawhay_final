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
        const itemsHtml = order.items.map((item) => {
            const itemSubtotal = Number(item.price) * Number(item.quantity);

            return `
                <div class="dashboard-order-item">
                    <div>
                        <strong>${item.name}</strong>
                        <div class="dashboard-order-item-meta">
                            ${item.variation ? `${item.variation} · ` : ""}Qty: ${item.quantity}
                        </div>
                    </div>
                    <div>${formatPrice(itemSubtotal)}</div>
                </div>
            `;
        }).join("");

        return `
            <article class="dashboard-order-card">
                <div class="dashboard-order-top">
                    <div>
                        <h3>${order.id}</h3>
                        <p class="dashboard-order-date">${formatOrderDate(order.createdAt)}</p>
                    </div>
                    <span class="dashboard-order-status">${order.status}</span>
                </div>

                <div class="dashboard-order-meta-grid">
                    <div class="dashboard-order-meta-box">
                        <h4>Order Details</h4>
                        <p><strong>Payment:</strong> ${order.payment.method}</p>
                        <p><strong>Total:</strong> ${formatPrice(order.total)}</p>
                        <p><strong>Delivery Estimate:</strong> ${order.deliveryEstimate}</p>
                    </div>

                    <div class="dashboard-order-meta-box">
                        <h4>Shipping Information</h4>
                        <p>${order.billing.firstName} ${order.billing.lastName}</p>
                        <p>${order.billing.street}</p>
                        <p>${order.billing.city}, ${order.billing.province}</p>
                        <p>${order.billing.country}, ${order.billing.zip}</p>
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