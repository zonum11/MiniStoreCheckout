// Calculates the amount for one product
function calculateItemAmount(price, quantity) {
    return price * quantity;
}

// Calculates the discount amount based on the subtotal
function calculateDiscount(subtotal) {
    let discountRate = 0;

    if (subtotal >= 5000) {
        discountRate = 0.10;
    } else if (subtotal >= 3000) {
        discountRate = 0.07;
    } else if (subtotal >= 1000) {
        discountRate = 0.05;
    } else {
        discountRate = 0;
    }

    return subtotal * discountRate;
}

// Determines the delivery fee using a switch statement
function getDeliveryFee(option) {
    let fee = 0;

    switch (option) {
        case "1":
            fee = 0;
            break;

        case "2":
            fee = 80;
            break;

        case "3":
            fee = 150;
            break;

        default:
            fee = 0;
    }

    return fee;
}


// Generate product input fields
document.getElementById("productCount").addEventListener("input", function () {
    const productCount = Number(this.value);
    const productsContainer = document.getElementById("productsContainer");

    productsContainer.innerHTML = "";

    if (productCount > 0 && Number.isInteger(productCount)) {

        for (let i = 0; i < productCount; i++) {

            const productDiv = document.createElement("div");
            productDiv.className = "product";

            productDiv.innerHTML = `
                <h3>Product ${i + 1}</h3>

                <label for="productName-${i}">Product Name</label>
                <input type="text" id="productName-${i}">

                <label for="productPrice-${i}">Price</label>
                <input type="number" id="productPrice-${i}" min="0" step="0.01">

                <label for="productQuantity-${i}">Quantity</label>
                <input type="number" id="productQuantity-${i}" min="1">
            `;

            productsContainer.appendChild(productDiv);
        }
    }
});


// Calculate the order
document.getElementById("calculateBtn").addEventListener("click", function () {

    const customerNameInput = document.getElementById("customerName");
    const productCountInput = document.getElementById("productCount");
    const validationMessage = document.getElementById("validationMessage");
    const orderSummary = document.getElementById("orderSummary");
    const deliveryOption = document.getElementById("deliveryOption");

    const customerName = customerNameInput.value.trim();
    const productCount = Number(productCountInput.value);

    validationMessage.textContent = "";
    orderSummary.innerHTML = "";

    // Validate customer name
    if (customerName === "") {
        validationMessage.textContent = "Please enter the customer name.";
        return;
    }

    // Validate product count
    if (
        !Number.isInteger(productCount) ||
        productCount <= 0
    ) {
        validationMessage.textContent =
            "Number of products must be a positive whole number.";
        return;
    }

    let subtotal = 0;
    let productDetails = "";
    let hasError = false;

    // Process each product using a for loop
    for (let i = 0; i < productCount; i++) {

        const productName = document
            .getElementById(`productName-${i}`)
            .value
            .trim();

        const price = Number(
            document.getElementById(`productPrice-${i}`).value
        );

        const quantity = Number(
            document.getElementById(`productQuantity-${i}`).value
        );

        // Validate product information
        if (productName === "") {
            validationMessage.textContent =
                `Please enter the name for Product ${i + 1}.`;
            hasError = true;
            break;
        }

        if (
            !Number.isFinite(price) ||
            price <= 0
        ) {
            validationMessage.textContent =
                `Price for Product ${i + 1} must be a positive number.`;
            hasError = true;
            break;
        }

        if (
            !Number.isFinite(quantity) ||
            quantity <= 0 ||
            !Number.isInteger(quantity)
        ) {
            validationMessage.textContent =
                `Quantity for Product ${i + 1} must be a positive whole number.`;
            hasError = true;
            break;
        }

        // Calculate item amount
        const itemAmount = calculateItemAmount(price, quantity);

        // Add to subtotal accumulator
        subtotal += itemAmount;

        // Build product details
        productDetails += `
            <div>
                <p>
                    <strong>${i + 1}. ${productName}</strong><br>
                    Price: ₱${price.toFixed(2)}<br>
                    Quantity: ${quantity}<br>
                    Amount: ₱${itemAmount.toFixed(2)}
                </p>
            </div>
        `;
    }

    // Stop if validation failed
    if (hasError) {
        return;
    }

    // Calculate discount
    const discount = calculateDiscount(subtotal);

    // Determine discount rate for display
    let discountRate = 0;

    if (subtotal >= 5000) {
        discountRate = 10;
    } else if (subtotal >= 3000) {
        discountRate = 7;
    } else if (subtotal >= 1000) {
        discountRate = 5;
    } else {
        discountRate = 0;
    }

    // Get delivery fee
    const selectedOption = deliveryOption.value;
    const deliveryFee = getDeliveryFee(selectedOption);

    // Determine delivery type
    let deliveryType = "";

    switch (selectedOption) {
        case "1":
            deliveryType = "Store Pickup";
            break;

        case "2":
            deliveryType = "Standard Delivery";
            break;

        case "3":
            deliveryType = "Express Delivery";
            break;

        default:
            deliveryType = "Unknown";
    }

    // Calculate final amount
    const finalAmount = subtotal - discount + deliveryFee;

    // Display complete order summary
    orderSummary.innerHTML = `
        <h2>ORDER SUMMARY</h2>

        <p><strong>Customer:</strong> ${customerName}</p>

        ${productDetails}

        <hr>

        <p>
            <strong>Subtotal:</strong>
            ₱${subtotal.toFixed(2)}
        </p>

        <p>
            <strong>Discount Rate:</strong>
            ${discountRate}%
        </p>

        <p>
            <strong>Discount Amount:</strong>
            ₱${discount.toFixed(2)}
        </p>

        <p>
            <strong>Delivery Type:</strong>
            ${deliveryType}
        </p>

        <p>
            <strong>Delivery Fee:</strong>
            ₱${deliveryFee.toFixed(2)}
        </p>

        <h3>
            Final Amount: ₱${finalAmount.toFixed(2)}
        </h3>
    `;
});
