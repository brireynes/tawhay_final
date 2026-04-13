function getAllOrders() {
    return JSON.parse(localStorage.getItem("tawhayOrders")) || [];
}

function saveAllOrders(orders) {
    localStorage.setItem("tawhayOrders", JSON.stringify(orders));
}

function checkAdminAccess() {
    const user = JSON.parse(localStorage.getItem("tawhayCurrentUser"));

    if (!user || user.role !== "admin") {
        alert("Access denied. Admins only.");
        window.location.href = "login.html";
    }
}

function updateOrderStatus(orderId, newStatus) {
    const orders = getAllOrders();

    const updatedOrders = orders.map((order) => {
        if (order.id === orderId) {
            return {
                ...order,
                status: newStatus
            };
        }

        return order;
    });

    saveAllOrders(updatedOrders);
    renderAdminOrders();
}

function renderAdminOrders() {
    const container = document.getElementById("adminOrdersContainer");
    if (!container) return;

    const orders = getAllOrders();

    if (!orders.length) {
        container.innerHTML = `
            <div class="admin-order-card">
                <p>No orders found.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = "";

    [...orders].reverse().forEach((order) => {
        const billing = order.billing || order.billingDetails || {};

        const name =
            order.customerName ||
            order.customer?.name ||
            `${billing.firstName || ""} ${billing.lastName || ""}`.trim() ||
            billing.name ||
            "No name";

        const address =
            billing.street ||
            billing.address ||
            order.address ||
            "No address";

        const city =
            billing.city ||
            order.city ||
            "No city";

        const province =
            billing.province ||
            order.province ||
            "No province";

        const status = order.status || "Pending";

        const paymentMethod =
            order.paymentMethod ||
            order.payment?.method ||
            "Not specified";

        const total = Number(order.total || order.subtotal || 0).toFixed(2);

        const card = document.createElement("div");
        card.className = "admin-order-card";
        const itemsHtml = (order.items || []).map(item => {
            return `
                <div class="admin-order-item">
                    <strong>${item.name || "No name"}</strong>
                    <div>Qty: ${item.quantity}</div>
                </div>
            `;
        }).join("");
        card.innerHTML = `
            <div class="admin-order-header">
                <div>
                    <h3>Order #${order.id || "No ID"}</h3>
                </div>
                <span class="admin-order-status">${status}</span>
            </div>

            <div class="admin-order-body">
                <div class="admin-order-box">
                    <p><strong>Customer:</strong> ${name}</p>
                    <p><strong>Address:</strong> ${address}</p>
                    <p><strong>City/Province:</strong> ${city}, ${province}</p>
                </div>
                <div class="admin-order-items">
                    <h4>Items</h4>
                    ${itemsHtml}
                </div>
                <div class="admin-order-box">
                    <p><strong>Total:</strong> ₱${total}</p>
                    <p><strong>Payment:</strong> ${paymentMethod}</p>
                    <p><strong>Status:</strong> ${status}</p>
                </div>
            </div>

            <div class="admin-order-actions">
                <select onchange="updateOrderStatus('${order.id}', this.value)">
                    <option value="Pending" ${status === "Pending" ? "selected" : ""}>Pending</option>
                    <option value="Processing" ${status === "Processing" ? "selected" : ""}>Processing</option>
                    <option value="Shipped" ${status === "Shipped" ? "selected" : ""}>Shipped</option>
                    <option value="Completed" ${status === "Completed" ? "selected" : ""}>Completed</option>
                </select>
            </div>
        `;

        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    checkAdminAccess();
    renderAdminOrders();
});