let inventory = [];

const form = document.getElementById("product-form");
const inventoryList = document.getElementById("inventory-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addProduct();
});

function addProduct() {
  const productName = document.getElementById("product-name").value;
  const productQuantity = parseInt(
    document.getElementById("product-quantity").value
  );
  const productPrice = document.getElementById("product-price").value;

  if (!productName || !productQuantity || !productPrice) {
    alert("Please fill in all fields");
    return;
  }

  const product = {
    name: productName,
    quantity: productQuantity,
    price: productPrice,
  };

  inventory.push(product);
  displayInventory();
  form.reset();
}

function displayInventory() {
    const inventoryList = document.getElementById("inventory-list");
    inventoryList.innerHTML = "";

    const titleRow = inventoryList.insertRow();
    titleRow.id = "tableHead"; 
    const titleCells = ["No", "Nama", "Quantity", "Total Harga"];

    titleCells.forEach((title) => {
        const th = document.createElement("th");
        th.textContent = title;
        titleRow.appendChild(th);
    });

    for (let i = 0; i < inventory.length; i++) {
        const product = inventory[i];
        const newRow = inventoryList.insertRow();

        const cellNo = newRow.insertCell();
        cellNo.textContent = i + 1;
        const cellName = newRow.insertCell();
        cellName.textContent = product.name;
        const cellQuantity = newRow.insertCell();
        cellQuantity.textContent = product.quantity;
        const cellPrice = newRow.insertCell();
        cellPrice.textContent = `Rp ${product.price},-`;
    }
}

