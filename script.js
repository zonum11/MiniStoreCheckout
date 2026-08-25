// ============================================================
// MINI STORE CHECKOUT SYSTEM
// Laboratory Activity #3: Control-Structure Application
// ============================================================


// ============================================================
// REQUIRED TOP-LEVEL FUNCTIONS
// ============================================================

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

const customerName = document.getElementById("customerName");
const productCount = document.getElementById("productCount");
const productsContainer = document.getElementById("productsContainer");
const deliveryOption = document.getElementById("deliveryOption");

const generateBtn = document.getElementById("generateBtn");
const calculateBtn = document.getElementById("calculateBtn");

const validationMessage = document.getElementById("validationMessage");
const orderSummary = document.getElementById("orderSummary");


// ============================================================
// GENERATE PRODUCT FIELDS
// ============================================================

function generateProductFields() {

  validationMessage.textContent = "";
  orderSummary.textContent = "";
  productsContainer.innerHTML = "";

  const count = Number(productCount.value);

  if (!Number.isInteger(count) || count <= 0) {
    validationMessage.textContent =
      "Please enter a valid number of products greater than 0.";
    return false;
  }


  // Required FOR LOOP
  for (let i = 0; i < count; i++) {

    const productBlock = document.createElement("div");

    productBlock.className = "product-block";


    // Product Name
    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", `productName-${i}`);
    nameLabel.textContent = "Product Name";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = `productName-${i}`;
    nameInput.placeholder = "Enter product name";


    // Price
    const priceLabel = document.createElement("label");
    priceLabel.setAttribute("for", `productPrice-${i}`);
    priceLabel.textContent = "Price";

    const priceInput = document.createElement("input");
    priceInput.type = "number";
    priceInput.id = `productPrice-${i}`;
    priceInput.step = "0.01";
    priceInput.placeholder = "Enter price";


    // Quantity
    const quantityLabel = document.createElement("label");
    quantityLabel.setAttribute("for", `productQuantity-${i}`);
    quantityLabel.textContent = "Quantity";

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.id = `productQuantity-${i}`;
    quantityInput.step = "1";
    quantityInput.placeholder = "Enter quantity";


    productBlock.appendChild(nameLabel);
    productBlock.appendChild(nameInput);

    productBlock.appendChild(priceLabel);
    productBlock.appendChild(priceInput);

    productBlock.appendChild(quantityLabel);
    productBlock.appendChild(quantityInput);

    productsContainer.appendChild(productBlock);
  }

  return true;
}


// ============================================================
// CALCULATE ORDER
// ============================================================

function handleCalculateOrder() {

  validationMessage.textContent = "";
  orderSummary.textContent = "";


  // Customer name
  const name = customerName.value.trim();


  // Number of products
  const count = Number(productCount.value);


  // Validate customer name
  if (name === "") {

    validationMessage.textContent =
      "Customer name is required.";

    return;
  }


  // Validate product count
  if (!Number.isInteger(count) || count <= 0) {

    validationMessage.textContent =
      "Please enter a valid number of products greater than 0.";

    return;
  }


  // ==========================================================
  // MAKE SURE PRODUCT FIELDS EXIST
  // ==========================================================

  for (let i = 0; i < count; i++) {

    const nameField =
      document.getElementById(`productName-${i}`);

    const priceField =
      document.getElementById(`productPrice-${i}`);

    const quantityField =
      document.getElementById(`productQuantity-${i}`);


    if (!nameField || !priceField || !quantityField) {

      generateProductFields();

      validationMessage.textContent =
        "Please enter the product details.";

      return;
    }
  }


  // ==========================================================
  // PROCESS PRODUCTS
  // ==========================================================

  let subtotal = 0;

  let productDetails = "";


  // Required FOR LOOP
  for (let i = 0; i < count; i++) {

    const nameField =
      document.getElementById(`productName-${i}`);

    const priceField =
      document.getElementById(`productPrice-${i}`);

    const quantityField =
      document.getElementById(`productQuantity-${i}`);


    const productName =
      nameField.value.trim();

    const price =
      Number(priceField.value);

    const quantity =
      Number(quantityField.value);


    // Validate product name
    if (productName === "") {

      validationMessage.textContent =
        `Product ${i + 1}: Product Name is required.`;

      return;
    }


    // Validate price
    if (!Number.isFinite(price) || price <= 0) {

      validationMessage.textContent =
        `Product ${i + 1}: Price must be a valid positive number.`;

      return;
    }


    // Validate quantity
    if (!Number.isFinite(quantity) || quantity <= 0) {

      validationMessage.textContent =
        `Product ${i + 1}: Quantity must be a valid positive number.`;

      return;
    }


    // Calculate item amount
    const amount =
      calculateItemAmount(price, quantity);


    // Accumulator
    subtotal += amount;


    // Product details
    productDetails +=
      `${i + 1}. ${productName}\n` +
      `   Price: ₱${price.toFixed(2)}\n` +
      `   Quantity: ${quantity}\n` +
      `   Amount: ₱${amount.toFixed(2)}\n\n`;
  }


  // ==========================================================
  // DISCOUNT
  // ==========================================================

  const discountAmount =
    calculateDiscount(subtotal);


  let discountRate;


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

  const selectedOption =
    Number(deliveryOption.value);


  const deliveryFee =
    getDeliveryFee(selectedOption);


  let deliveryType;


  switch (selectedOption) {

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
      deliveryType = "Store Pickup";
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

  const summary =

    `MINI STORE CHECKOUT SYSTEM\n\n` +

    `Customer: ${name}\n\n` +

    productDetails +

    `ORDER SUMMARY\n` +

    `Subtotal: ₱${subtotal.toFixed(2)}\n` +

    `Discount Rate: ${discountRate}%\n` +

    `Discount Amount: ₱${discountAmount.toFixed(2)}\n` +

    `Delivery Type: ${deliveryType}\n` +

    `Delivery Fee: ₱${deliveryFee.toFixed(2)}\n` +

    `Final Amount: ₱${finalAmount.toFixed(2)}`;


  orderSummary.textContent = summary;
}


// ============================================================
// EVENT LISTENERS
// ============================================================

generateBtn.addEventListener(
  "click",
  generateProductFields
);


calculateBtn.addEventListener(
  "click",
  handleCalculateOrder
);