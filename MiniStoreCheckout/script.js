// ============================================================
// MINI STORE CHECKOUT SYSTEM
// Laboratory Activity #3: Control-Structure Application
// ============================================================

// ---------- Required top-level calculation functions ----------
// These must NOT touch the DOM or use prompt()/alert() directly.

function calculateItemAmount(price, quantity) {
  return price * quantity;
}

function calculateDiscount(subtotal) {
  let discountRate;

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

function getDeliveryFee(option) {
  let fee;

  switch (option) {
    case 1:
      fee = 0;
      break;
    case 2:
      fee = 80;
      break;
    case 3:
      fee = 150;
      break;
    default:
      fee = 0;
  }

  return fee;
}

// ---------- DOM / input-output handling ----------

const generateBtn = document.getElementById("generateBtn");
const calculateBtn = document.getElementById("calculateBtn");
const productsContainer = document.getElementById("productsContainer");
const validationMessage = document.getElementById("validationMessage");
const orderSummary = document.getElementById("orderSummary");

generateBtn.addEventListener("click", generateProductFields);
calculateBtn.addEventListener("click", handleCalculateOrder);

// Build the product input rows using a for loop.
function generateProductFields() {
  validationMessage.textContent = "";
  orderSummary.textContent = "";
  productsContainer.innerHTML = "";

  const countValue = Number(document.getElementById("productCount").value);

  if (!countValue || countValue <= 0) {
    validationMessage.textContent =
      "Please enter a valid number of products (greater than 0).";
    return;
  }

  for (let i = 0; i < countValue; i++) {
    const block = document.createElement("div");
    block.className = "product-block";

    block.innerHTML = `
      <label for="productName-${i}">Product Name</label>
      <input type="text" id="productName-${i}" placeholder="Enter product name" />

      <label for="productPrice-${i}">Price</label>
      <input type="number" id="productPrice-${i}" placeholder="Enter price" step="0.01" />

      <label for="productQuantity-${i}">Quantity</label>
      <input type="number" id="productQuantity-${i}" placeholder="Enter quantity" step="1" />
    `;

    productsContainer.appendChild(block);
  }
}

// Validate + process everything and display the order summary.
function handleCalculateOrder() {
  validationMessage.textContent = "";
  orderSummary.textContent = "";

  const customerName = document.getElementById("customerName").value.trim();
  const productCount = Number(document.getElementById("productCount").value);
  const deliveryOption = Number(document.getElementById("deliveryOption").value);

  // ---- Validation ----
  if (customerName === "") {
    validationMessage.textContent = "Customer name is required.";
    return;
  }

  if (!productCount || productCount <= 0) {
    validationMessage.textContent =
      "Please generate product fields with a valid product count first.";
    return;
  }

  const products = [];

  for (let i = 0; i < productCount; i++) {
    const nameField = document.getElementById(`productName-${i}`);
    const priceField = document.getElementById(`productPrice-${i}`);
    const quantityField = document.getElementById(`productQuantity-${i}`);

    if (!nameField || !priceField || !quantityField) {
      validationMessage.textContent =
        "Product fields are missing. Please click \"Generate Product Fields\" again.";
      return;
    }

    const name = nameField.value.trim();
    const price = parseFloat(priceField.value);
    const quantity = parseFloat(quantityField.value);

    if (name === "") {
      validationMessage.textContent = `Product ${i + 1}: name is required.`;
      return;
    }

    if (isNaN(price) || price <= 0) {
      validationMessage.textContent = `Product ${i + 1}: price must be a valid positive number.`;
      return;
    }

    if (isNaN(quantity) || quantity <= 0) {
      validationMessage.textContent = `Product ${i + 1}: quantity must be a valid positive number.`;
      return;
    }

    products.push({ name, price, quantity });
  }

  // ---- Calculations ----
  let subtotal = 0; // accumulator
  const productLines = [];

  for (let i = 0; i < products.length; i++) {
    const { name, price, quantity } = products[i];
    const amount = calculateItemAmount(price, quantity);
    subtotal += amount;

    productLines.push(
      `${i + 1}. ${name}\n   Price: ₱${price.toFixed(2)}\n   Quantity: ${quantity}\n   Amount: ₱${amount.toFixed(2)}`
    );
  }

  const discountAmount = calculateDiscount(subtotal);
  const discountRate = subtotal > 0 ? (discountAmount / subtotal) * 100 : 0;

  const deliveryFee = getDeliveryFee(deliveryOption);
  const deliveryLabels = {
    1: "Store Pickup",
    2: "Standard Delivery",
    3: "Express Delivery",
  };
  const deliveryType = deliveryLabels[deliveryOption] || "Unknown";

  const finalAmount = subtotal - discountAmount + deliveryFee;

  // ---- Output ----
  const summaryText =
    `MINI STORE CHECKOUT SYSTEM\n\n` +
    `Customer: ${customerName}\n\n` +
    `${productLines.join("\n\n")}\n\n` +
    `ORDER SUMMARY\n` +
    `Subtotal: ₱${subtotal.toFixed(2)}\n` +
    `Discount Rate: ${discountRate.toFixed(0)}%\n` +
    `Discount Amount: ₱${discountAmount.toFixed(2)}\n` +
    `Delivery Type: ${deliveryType}\n` +
    `Delivery Fee: ₱${deliveryFee.toFixed(2)}\n` +
    `Final Amount: ₱${finalAmount.toFixed(2)}`;

  orderSummary.textContent = summaryText;
}