const ORDERS_KEY = "tawhayOrders";
const LAST_ORDER_KEY = "tawhayLastOrder";

function getOrders() {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
}

function saveOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function generateOrderId() {
    const now = new Date();
    const year = now.getFullYear();
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    return `TWH-${year}-${randomPart}`;
}

function getCurrentUserSafe() {
    return JSON.parse(localStorage.getItem("tawhayCurrentUser")) || null;
}

function buildOrderEstimate() {
    return "3–5 business days";
}

function createOrder(orderData) {
    const orders = getOrders();
    const newOrder = {
        id: generateOrderId(),
        createdAt: new Date().toISOString(),
        status: "Order Placed",
        estimate: buildOrderEstimate(),
        ...orderData
    };

    orders.unshift(newOrder);
    saveOrders(orders);
    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(newOrder));

    return newOrder;
}

function getLastOrder() {
    return JSON.parse(localStorage.getItem(LAST_ORDER_KEY));
}

function clearLastOrder() {
    localStorage.removeItem(LAST_ORDER_KEY);
}