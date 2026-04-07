function renderCheckoutSummary() {
    const cart = normalizeCartItems(getCart());
    const checkoutItems = document.getElementById("checkout-items");
    const checkoutSubtotal = document.getElementById("checkout-subtotal");
    const checkoutTotal = document.getElementById("checkout-total");

    if (!checkoutItems) return;

    checkoutItems.innerHTML = "";

    let subtotal = 0;

    cart.forEach((item) => {
        const itemSubtotal = Number(item.price) * Number(item.quantity);
        subtotal += itemSubtotal;

        const row = document.createElement("div");
        row.className = "checkout-item-row";
        row.innerHTML = `
            <div class="checkout-item-name">
                ${item.name}${item.variation ? ` (${item.variation})` : ""} <span>x ${item.quantity}</span>
            </div>
            <div class="checkout-item-subtotal">${formatPrice(itemSubtotal)}</div>
        `;

        checkoutItems.appendChild(row);
    });

    checkoutSubtotal.textContent = formatPrice(subtotal);
    checkoutTotal.textContent = formatPrice(subtotal);
}

function getSelectedPaymentMethod() {
    const selected = document.querySelector('input[name="payment"]:checked');
    return selected ? selected.value : "Card";
}

function togglePaymentFields() {
    const method = getSelectedPaymentMethod();

    const cardBox = document.getElementById("payment-card-fields");
    const gcashBox = document.getElementById("payment-gcash-fields");
    const codBox = document.getElementById("payment-cod-fields");

    if (!cardBox || !gcashBox || !codBox) return;

    cardBox.classList.add("hidden");
    gcashBox.classList.add("hidden");
    codBox.classList.add("hidden");

    if (method === "Card") {
        cardBox.classList.remove("hidden");
    } else if (method === "GCash") {
        gcashBox.classList.remove("hidden");
    } else {
        codBox.classList.remove("hidden");
    }
}

function attachPaymentMethodEvents() {
    const paymentInputs = document.querySelectorAll('input[name="payment"]');
    paymentInputs.forEach((input) => {
        input.addEventListener("change", togglePaymentFields);
    });

    togglePaymentFields();
}

function getBillingDetails() {
    return {
        firstName: document.getElementById("firstName")?.value.trim() || "",
        lastName: document.getElementById("lastName")?.value.trim() || "",
        company: document.getElementById("company")?.value.trim() || "",
        country: document.getElementById("country")?.value.trim() || "",
        street: document.getElementById("street")?.value.trim() || "",
        city: document.getElementById("city")?.value.trim() || "",
        province: document.getElementById("province")?.value.trim() || "",
        zip: document.getElementById("zip")?.value.trim() || "",
        phone: document.getElementById("phone")?.value.trim() || "",
        email: document.getElementById("email")?.value.trim() || "",
        notes: document.getElementById("notes")?.value.trim() || ""
    };
}

function getPaymentDetails(method) {
    if (method === "Card") {
        return {
            cardName: document.getElementById("cardName")?.value.trim() || "",
            cardNumber: document.getElementById("cardNumber")?.value.trim() || "",
            cardExpiry: document.getElementById("cardExpiry")?.value.trim() || "",
            cardCvv: document.getElementById("cardCvv")?.value.trim() || ""
        };
    }

    if (method === "GCash") {
        return {
            gcashName: document.getElementById("gcashName")?.value.trim() || "",
            gcashNumber: document.getElementById("gcashNumber")?.value.trim() || "",
            gcashReference: document.getElementById("gcashReference")?.value.trim() || ""
        };
    }

    return {
        note: "Cash on Delivery"
    };
}

function validateBillingDetails(details) {
    const requiredFields = [
        details.firstName,
        details.lastName,
        details.country,
        details.street,
        details.city,
        details.province,
        details.zip,
        details.phone,
        details.email
    ];

    return requiredFields.every((value) => value);
}

function validatePaymentDetails(method, details) {
    if (method === "Card") {
        return details.cardName && details.cardNumber && details.cardExpiry && details.cardCvv;
    }

    if (method === "GCash") {
        return details.gcashName && details.gcashNumber && details.gcashReference;
    }

    return true;
}

function getCartSubtotal(cart) {
    return cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
}

function handleCheckoutForm() {
    const form = document.getElementById("checkout-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const cart = normalizeCartItems(getCart());

        if (!cart.length) {
            alert("Your cart is empty.");
            return;
        }

        const billingDetails = getBillingDetails();
        const paymentMethod = getSelectedPaymentMethod();
        const paymentDetails = getPaymentDetails(paymentMethod);

        if (!validateBillingDetails(billingDetails)) {
            alert("Please complete all required billing details.");
            return;
        }

        if (!validatePaymentDetails(paymentMethod, paymentDetails)) {
            alert(`Please complete the required ${paymentMethod} payment details.`);
            return;
        }

        const subtotal = getCartSubtotal(cart);
        const currentUser = getCurrentUserSafe();

        const order = createOrder({
            userEmail: currentUser?.email || billingDetails.email,
            customerName: `${billingDetails.firstName} ${billingDetails.lastName}`.trim(),
            items: cart,
            subtotal: subtotal,
            total: subtotal,
            billingDetails: billingDetails,
            paymentMethod: paymentMethod,
            paymentDetails: paymentDetails
        });

        localStorage.removeItem(CART_KEY);
        window.location.href = `order-confirmation.html?orderId=${encodeURIComponent(order.id)}`;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderCheckoutSummary();
    attachPaymentMethodEvents();
    handleCheckoutForm();
});