let inventory = [];

const form = document.getElementById('product-form');
const inventoryList = document.getElementById('inventory-list');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    addProduct();
});

function addProduct() {
    const productName = document.getElementById('product-name').value;
    const productQuantity = parseInt(document.getElementById('product-quantity').value);
    const productPrice = document.getElementById('product-price').value;

    if (!productName || !productQuantity || !productLocation) {
        alert('Please fill in all fields');
        return;
    }

    const product = {
        name: productName,
        quantity: productQuantity,
        location: productLocation
    };

    inventory.push(product);
    displayInventory();
    form.reset();
}

function displayInventory() {
    inventoryList.innerHTML = '';

    for (let i = 0; i < inventory.length; i++) {
        const product = inventory[i];
        const productElement = document.createElement('div');
        productElement.textContent = `Name: ${product.name}, Quantity: ${product.quantity}, Location: ${product.location}`;
        inventoryList.appendChild(productElement);
    }
}

function updateTotal() {
    var quantity = document.getElementById("quantity").value;
    var total = quantity * 10;
    document.getElementById("total").innerHTML = "Rp " + total.toLocaleString() + ",-";
}