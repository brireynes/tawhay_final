const ORDERS_KEY = "tawhayOrders";

function getOrders() {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
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

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("tawhayCurrentUser")) || null;
}

function getOrdersForCurrentUser() {
    const currentUser = getCurrentUser();
    const allOrders = getOrders();

    if (!currentUser) return [];

    const currentEmail = (currentUser.email || "").toLowerCase();

    return allOrders.filter((order) => {
        const userEmail = (order.userEmail || "").toLowerCase();
        const billingEmail = (order.billing?.email || "").toLowerCase();

        return userEmail === currentEmail || billingEmail === currentEmail;
    });
}

function renderOrders() {
    const ordersList = document.getElementById("my-orders-list");
    if (!ordersList) return;

    if (!isUserLoggedIn()) {
        alert("Please log in first to view your order history.");
        window.location.href = "login.html";
        return;
    }

    const userOrders = getOrdersForCurrentUser();

    if (!userOrders.length) {
        ordersList.innerHTML = `
            <div class="my-orders-empty">
                <h3>No orders yet</h3>
                <p>You have not placed any orders yet.</p>
                <a href="shop.html" class="primary-btn">Start Shopping</a>
            </div>
        `;
        return;
    }

    ordersList.innerHTML = userOrders.map((order) => {
        const itemsHtml = order.items.map((item) => {
            const itemSubtotal = Number(item.price) * Number(item.quantity);
            return `
                <div class="my-order-item">
                    <div>
                        <strong>${item.name}</strong>
                        <div class="my-order-item-meta">
                            ${item.variation ? `${item.variation} · ` : ""}Qty: ${item.quantity}
                        </div>
                    </div>
                    <div>${formatPrice(itemSubtotal)}</div>
                </div>
            `;
        }).join("");

        return `
            <article class="my-order-card">
                <div class="my-order-top">
                    <div>
                        <h3>Order ${order.id}</h3>
                        <p class="my-order-date">${formatOrderDate(order.createdAt)}</p>
                    </div>
                    <span class="my-order-status">${order.status}</span>
                </div>

                <div class="my-order-meta-grid">
                    <div class="my-order-meta-box">
                        <h4>Order Details</h4>
                        <p><strong>Payment:</strong> ${order.paymentMethod || "N/A"}</p>
                        <p><strong>Total:</strong> ${formatPrice(order.total)}</p>
                        <p><strong>Delivery Estimate:</strong> ${order.deliveryEstimate || order.estimate || "3–5 business days"}</p>
                        <p><strong>Delivery Estimate:</strong> ${order.deliveryEstimate}</p>
                    </div>

                    <div class="my-order-meta-box">
                        <h4>Shipping Information</h4>
                        <p>${order.billing.firstName} ${order.billing.lastName}</p>
                        <p>${order.billing.street}</p>
                        <p>${order.billing.city}, ${order.billing.province}</p>
                        <p>${order.billing.country}, ${order.billing.zip}</p>
                    </div>
                </div>

                <div class="my-order-items-box">
                    <h4>Items Ordered</h4>
                    ${itemsHtml}
                </div>
                <div class="my-order-actions">
                    <a href="track-order.html?orderId=${encodeURIComponent(order.id)}" class="primary-btn">
                        Track Order
                    </a>
                </div>
            </article>
        `;
    }).join("");
}

document.addEventListener("DOMContentLoaded", renderOrders);