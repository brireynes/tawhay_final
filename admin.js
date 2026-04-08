const ADMIN_EMAIL = "admin@tawhay.com";

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

    const updated = orders.map((order) => {
        if (order.id === orderId) {
            return { ...order, status: newStatus };
        }
        return order;
    });

    saveAllOrders(updated);
    renderAdminOrders();
}

function renderAdminOrders() {
    const container = document.getElementById("adminOrdersContainer");
    if (!container) return;

    const orders = getAllOrders();

    if (!orders.length) {
        container.innerHTML = "<p>No orders found.</p>";
        return;
    }

    container.innerHTML = "";

    orders.reverse().forEach((order) => {
        const billing = order.billing || {};
        const name =
            order.customerName ||
            `${billing.firstName || ""} ${billing.lastName || ""}`.trim() ||
            "No name";

        const address =
            billing.street ||
            billing.address ||
            "No address";

        const city =
            billing.city || "No city";

        const province =
            billing.province || "No province";

        const status = order.status || "Pending";

        const card = document.createElement("div");
        card.className = "admin-order-card";

        card.innerHTML = `
            <div class="admin-order-header">
                <h3>Order #${order.id}</h3>
                <span class="admin-order-status">${status}</span>
            </div>

            <div class="admin-order-body">
                <p><strong>Customer:</strong> ${name}</p>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>City/Province:</strong> ${city}, ${province}</p>
                <p><strong>Total:</strong> ₱${order.total}</p>
                <p><strong>Payment:</strong> ${order.paymentMethod}</p>
            </div>

            <div class="admin-order-actions">
                <select onchange="updateOrderStatus('${order.id}', this.value)">
                    <option ${status === "Pending" ? "selected" : ""}>Pending</option>
                    <option ${status === "Processing" ? "selected" : ""}>Processing</option>
                    <option ${status === "Shipped" ? "selected" : ""}>Shipped</option>
                    <option ${status === "Completed" ? "selected" : ""}>Completed</option>
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