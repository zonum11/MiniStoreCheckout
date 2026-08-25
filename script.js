// ============================================================
// MINI STORE CHECKOUT SYSTEM
// Laboratory Activity #3: Control-Structure Application
// ============================================================


// ============================================================
// REQUIRED CALCULATION FUNCTIONS
// ============================================================

// Calculates the amount of one product.
function calculateItemAmount(price, quantity) {
  return price * quantity;
}


// Calculates the discount amount based on the subtotal.
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


// Determines the delivery fee.
function getDeliveryFee(option) {
  let fee;

  // Allows both numbers and string values.
  option = Number(option);

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
      break;
  }

  return fee;
}


// ============================================================
// DOM ELEMENTS
// ============================================================

const customerNameInput = document.getElementById("customerName");
const productCountInput = document.getElementById("productCount");

const generateBtn = document.getElementById("generateBtn");
const calculateBtn = document.getElementById("calculateBtn");

const productsContainer = document.getElementById("productsContainer");
const deliveryOption = document.getElementById("deliveryOption");

const validationMessage = document.getElementById("validationMessage");
const orderSummary = document.getElementById("orderSummary");


// ============================================================
// EVENT HANDLERS
// ============================================================

generateBtn.addEventListener("click", generateProductFields);

calculateBtn.addEventListener("click", handleCalculateOrder);


// ============================================================
// GENERATE PRODUCT INPUT FIELDS
// ============================================================

function generateProductFields() {

  validationMessage.textContent = "";
  orderSummary.textContent = "";
  productsContainer.innerHTML = "";

  const productCount = Number(productCountInput.value);

  // Validate product count.
  if (!Number.isInteger(productCount) || productCount <= 0) {

    validationMessage.textContent =
      "Please enter a valid number of products greater than 0.";

    return;
  }


  // Required for loop.
  for (let i = 0; i < productCount; i++) {

    const productBlock = document.createElement("div");

    productBlock.className = "product-block";

    productBlock.innerHTML = `
      <label for="productName-${i}">Product Name</label>
      <input
        type="text"
        id="productName-${i}"
        placeholder="Enter product name"
      >

      <label for="productPrice-${i}">Price</label>
      <input
        type="number"
        id="productPrice-${i}"
        min="0"
        step="0.01"
        placeholder="Enter price"
      >

      <label for="productQuantity-${i}">Quantity</label>
      <input
        type="number"
        id="productQuantity-${i}"
        min="1"
        step="1"
        placeholder="Enter quantity"
      >
    `;

    productsContainer.appendChild(productBlock);
  }
}


// ============================================================
// HANDLE CALCULATE ORDER
// ============================================================

function handleCalculateOrder() {

  validationMessage.textContent = "";
  orderSummary.textContent = "";


  // Get customer name.
  const customerName = customerNameInput.value.trim();


  // Convert product count to a number.
  const productCount = Number(productCountInput.value);


  // Convert delivery option to a number.
  const selectedDeliveryOption = Number(deliveryOption.value);


  // ==========================================================
  // INPUT VALIDATION
  // ==========================================================

  if (customerName === "") {

    validationMessage.textContent =
      "Customer name is required.";

    return;
  }


  if (!Number.isInteger(productCount) || productCount <= 0) {

    validationMessage.textContent =
      "Please enter a valid number of products.";

    return;
  }


  // ==========================================================
  // PROCESS PRODUCTS
  // ==========================================================

  let subtotal = 0;

  const productLines = [];


  // Required for loop for product processing.
  for (let i = 0; i < productCount; i++) {

    const nameField =
      document.getElementById(`productName-${i}`);

    const priceField =
      document.getElementById(`productPrice-${i}`);

    const quantityField =
      document.getElementById(`productQuantity-${i}`);


    // Make sure the required fields exist.
    if (!nameField || !priceField || !quantityField) {

      validationMessage.textContent =
        "Please click Generate Product Fields first.";

      return;
    }


    const productName = nameField.value.trim();

    const price = parseFloat(priceField.value);

    const quantity = parseFloat(quantityField.value);


    // Validate product name.
    if (productName === "") {

      validationMessage.textContent =
        `Product ${i + 1}: Product Name is required.`;

      return;
    }


    // Validate price.
    if (isNaN(price) || price <= 0) {

      validationMessage.textContent =
        `Product ${i + 1}: Price must be a valid positive number.`;

      return;
    }


    // Validate quantity.
    if (
      isNaN(quantity) ||
      quantity <= 0 ||
      !Number.isInteger(quantity)
    ) {

      validationMessage.textContent =
        `Product ${i + 1}: Quantity must be a valid positive whole number.`;

      return;
    }


    // Calculate product amount using the required function.
    const amount =
      calculateItemAmount(price, quantity);


    // Accumulator.
    subtotal += amount;


    // Build product output.
    productLines.push(
      `${i + 1}. ${productName}
   Price: ₱${price.toFixed(2)}
   Quantity: ${quantity}
   Amount: ₱${amount.toFixed(2)}`
    );
  }


  // ==========================================================
  // DISCOUNT
  // ==========================================================

  const discountAmount =
    calculateDiscount(subtotal);


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


  // ==========================================================
  // DELIVERY
  // ==========================================================

  const deliveryFee =
    getDeliveryFee(selectedDeliveryOption);


  let deliveryType;

  switch (selectedDeliveryOption) {

    case 1:
      deliveryType = "Store Pickup";
      break;

    case 2:
      deliveryType = "Standard Delivery";
      break;

    case 3:
      deliveryType = "Express Delivery";
      break;

    default:
      deliveryType = "Unknown";
      break;
  }


  // ==========================================================
  // FINAL AMOUNT
  // ==========================================================

  const finalAmount =
    subtotal - discountAmount + deliveryFee;


  // ==========================================================
  // ORDER SUMMARY
  // ==========================================================

  const summaryText =

    `MINI STORE CHECKOUT SYSTEM

Customer: ${customerName}

${productLines.join("\n\n")}

ORDER SUMMARY
Subtotal: ₱${subtotal.toFixed(2)}
Discount Rate: ${discountRate}%
Discount Amount: ₱${discountAmount.toFixed(2)}
Delivery Type: ${deliveryType}
Delivery Fee: ₱${deliveryFee.toFixed(2)}
Final Amount: ₱${finalAmount.toFixed(2)}`;


  orderSummary.textContent = summaryText;
}