const form = document.getElementById("product-form");
const inventoryList = document.getElementById("inventory-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addProduct();
});

let productNames = [];
let quantity = [];
let price = [];
let nomor = [];
let n = 0;

function addProduct() {
  const productName = document.getElementById("product-name").value;
  const productQuantity = parseInt(
    document.getElementById("product-quantity").value
  );
  const productPrice = parseInt(document.getElementById("product-price").value);

  if (!productName || !productQuantity || !productPrice) {
    alert("Masukkan semua data sebelum menambah menu!");
    return;
  }

  productNames[n] = productName;
  quantity[n] = productQuantity;
  price[n] = productPrice;
  nomor[n] = n + 1;
  n++;

  displayInventory();
  form.reset();
}

function displayInventory() {
  const inventoryList = document.getElementById("inventory-list");
  inventoryList.innerHTML = "";

  const titleRow = inventoryList.insertRow();
  titleRow.id = "tableHead";
  const titleCells = ["No", "Product Name", "Quantity", "Price", "Action"];

  titleCells.forEach((title) => {
    const th = document.createElement("th");
    th.textContent = title;
    titleRow.appendChild(th);
  });

  for (let i = 0; i < n; i++) {
    const newRow = inventoryList.insertRow();

    const cellNo = newRow.insertCell();
    cellNo.textContent = nomor[i];
    const cellName = newRow.insertCell();
    cellName.textContent = productNames[i];
    const cellQuantity = newRow.insertCell();
    cellQuantity.textContent = quantity[i];
    const cellPrice = newRow.insertCell();
    cellPrice.textContent = `Rp.${price[i]}`;
    const cellAction = newRow.insertCell();
    cellAction.innerHTML = `<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
    <button type="button" class="btn btn-danger" onclick="deleteData(${i})">Delete</button>`;

    cellAction
      .querySelector(".btn-primary")
      .addEventListener("click", function () {
        $("#exampleModal").modal("show");
      });
  }
}

function deleteData(index) {
  if (confirm("Apakah anda yakin ingin menghapus data ini?")) {
    productNames.splice(index, 1);
    quantity.splice(index, 1);
    price.splice(index, 1);
    nomor.splice(index, 1);
    n--;

    const table = document.getElementById("inventory-list");

    table.deleteRow(index + 1);

    for (let i = index; i < n; i++) {
      nomor[i] = i + 1;
      table.rows[i + 1].cells[0].textContent = nomor[i];
    }

    displayInventory();
  } else {
    return false;
  }
}

function sequentialSearch(x) {
  for (let i = 0; i < n; i++) {
    if (productNames[i].toLowerCase() === x.toLowerCase()) {
      return i;
    }
  }
  return -1;
}

function displaySearchResultInTable(index) {
  const inventoryList = document.getElementById("inventory-list");
  inventoryList.innerHTML = ""; 

  const titleRow = inventoryList.insertRow();
  titleRow.id = "tableHead";
  const titleCells = ["No", "Product Name", "Quantity", "Price", "Action"];

  titleCells.forEach((title) => {
    const th = document.createElement("th");
    th.textContent = title;
    titleRow.appendChild(th);
  });

  if (index !== -1) {
    const newRow = inventoryList.insertRow();

    const cellNo = newRow.insertCell();
    cellNo.textContent = nomor[index];
    const cellName = newRow.insertCell();
    cellName.textContent = productNames[index];
    const cellQuantity = newRow.insertCell();
    cellQuantity.textContent = quantity[index];
    const cellPrice = newRow.insertCell();
    cellPrice.textContent = `Rp.${price[index]}`;
    const cellAction = newRow.insertCell();
    cellAction.innerHTML = `<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
    <button type="button" class="btn btn-danger" onclick="deleteData(${index})">Delete</button>`;

    cellAction
      .querySelector(".btn-primary")
      .addEventListener("click", function () {
        $("#exampleModal").modal("show");
      });
  } else {
    const noResultRow = inventoryList.insertRow();
    const noResultCell = noResultRow.insertCell();
    noResultCell.textContent = "Product not found";
    noResultCell.colSpan = 5; 
    noResultCell.style.textAlign = "center"; 
  }
}

// Event listener untuk button pencarian
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function () {
  const searchInput = document.getElementById("searchInput").value.trim();

  if (searchInput !== "") {
    const resultIndex = sequentialSearch(searchInput);
    displaySearchResultInTable(resultIndex);
  } else {
    displayInventory();
  }
});


const dropdownItems = document.querySelectorAll(".dropdown-menu .sort-by");
const dropdownAscDesc = document.querySelectorAll(".dropdown-menu .asc-desc");

dropdownItems.forEach((item) => {
  item.addEventListener("click", function () {
    dropdownItems.forEach((dropdownItem) => {
      dropdownItem.classList.remove("active");
    });

    item.classList.add("active");

    const isAscending =
      document.querySelector(".dropdown-item.asc-desc.active").textContent ===
      "Ascending";

    if (item.textContent === "No") {
      if (isAscending) {
        sortByNo();
      } else {
        sortByNoDesc();
      }
    } else if (item.textContent === "Product Name") {
      if (isAscending) {
        sortByProductName();
      } else {
        sortByProductNameDesc();
      }
    } else if (item.textContent === "Quantity") {
      if (isAscending) {
        sortByQuantity();
      } else {
        sortByQuantityDesc();
      }
    } else if (item.textContent === "Price") {
      if (isAscending) {
        sortByPrice();
      } else {
        sortByPriceDesc();
      }
    }
  });
});

dropdownAscDesc.forEach((item) => {
  item.addEventListener("click", function () {
    dropdownAscDesc.forEach((dropdownAscDesc) => {
      dropdownAscDesc.classList.remove("active");
    });

    item.classList.add("active");
  });
});

function sortByNo() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (nomor[j] > nomor[j + 1]) {
        let tempProductName = productNames[j];
        productNames[j] = productNames[j + 1];
        productNames[j + 1] = tempProductName;

        let tempQuantity = quantity[j];
        quantity[j] = quantity[j + 1];
        quantity[j + 1] = tempQuantity;

        let tempPrice = price[j];
        price[j] = price[j + 1];
        price[j + 1] = tempPrice;

        let tempNomor = nomor[j];
        nomor[j] = nomor[j + 1];
        nomor[j + 1] = tempNomor;
      }
    }
  }

  displayInventory();
}

function sortByNoDesc() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (nomor[j] < nomor[j + 1]) {
        let tempProductName = productNames[j];
        productNames[j] = productNames[j + 1];
        productNames[j + 1] = tempProductName;

        let tempQuantity = quantity[j];
        quantity[j] = quantity[j + 1];
        quantity[j + 1] = tempQuantity;

        let tempPrice = price[j];
        price[j] = price[j + 1];
        price[j + 1] = tempPrice;

        let tempNomor = nomor[j];
        nomor[j] = nomor[j + 1];
        nomor[j + 1] = tempNomor;
      }
    }
  }

  displayInventory();
}

function sortByProductName() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (productNames[j] > productNames[j + 1]) {
        let tempProductName = productNames[j];
        productNames[j] = productNames[j + 1];
        productNames[j + 1] = tempProductName;

        let tempQuantity = quantity[j];
        quantity[j] = quantity[j + 1];
        quantity[j + 1] = tempQuantity;

        let tempPrice = price[j];
        price[j] = price[j + 1];
        price[j + 1] = tempPrice;

        let tempNomor = nomor[j];
        nomor[j] = nomor[j + 1];
        nomor[j + 1] = tempNomor;
      }
    }
  }

  displayInventory();
}

function sortByProductNameDesc() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (productNames[j] < productNames[j + 1]) {
        let tempProductName = productNames[j];
        productNames[j] = productNames[j + 1];
        productNames[j + 1] = tempProductName;

        let tempQuantity = quantity[j];
        quantity[j] = quantity[j + 1];
        quantity[j + 1] = tempQuantity;

        let tempPrice = price[j];
        price[j] = price[j + 1];
        price[j + 1] = tempPrice;

        let tempNomor = nomor[j];
        nomor[j] = nomor[j + 1];
        nomor[j + 1] = tempNomor;
      }
    }
  }

  displayInventory();
}

function sortByQuantity() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (quantity[j] > quantity[j + 1]) {
        let tempProductName = productNames[j];
        productNames[j] = productNames[j + 1];
        productNames[j + 1] = tempProductName;

        let tempQuantity = quantity[j];
        quantity[j] = quantity[j + 1];
        quantity[j + 1] = tempQuantity;

        let tempPrice = price[j];
        price[j] = price[j + 1];
        price[j + 1] = tempPrice;

        let tempNomor = nomor[j];
        nomor[j] = nomor[j + 1];
        nomor[j + 1] = tempNomor;
      }
    }
  }

  displayInventory();
}

function sortByQuantityDesc() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (quantity[j] < quantity[j + 1]) {
        let tempProductName = productNames[j];
        productNames[j] = productNames[j + 1];
        productNames[j + 1] = tempProductName;

        let tempQuantity = quantity[j];
        quantity[j] = quantity[j + 1];
        quantity[j + 1] = tempQuantity;

        let tempPrice = price[j];
        price[j] = price[j + 1];
        price[j + 1] = tempPrice;

        let tempNomor = nomor[j];
        nomor[j] = nomor[j + 1];
        nomor[j + 1] = tempNomor;
      }
    }
  }

  displayInventory();
}

function sortByPrice() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (price[j] > price[j + 1]) {
        let tempProductName = productNames[j];
        productNames[j] = productNames[j + 1];
        productNames[j + 1] = tempProductName;

        let tempQuantity = quantity[j];
        quantity[j] = quantity[j + 1];
        quantity[j + 1] = tempQuantity;

        let tempPrice = price[j];
        price[j] = price[j + 1];
        price[j + 1] = tempPrice;

        let tempNomor = nomor[j];
        nomor[j] = nomor[j + 1];
        nomor[j + 1] = tempNomor;
      }
    }
  }

  displayInventory();
}

function sortByPriceDesc() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (price[j] < price[j + 1]) {
        let tempProductName = productNames[j];
        productNames[j] = productNames[j + 1];
        productNames[j + 1] = tempProductName;

        let tempQuantity = quantity[j];
        quantity[j] = quantity[j + 1];
        quantity[j + 1] = tempQuantity;

        let tempPrice = price[j];
        price[j] = price[j + 1];
        price[j + 1] = tempPrice;

        let tempNomor = nomor[j];
        nomor[j] = nomor[j + 1];
        nomor[j + 1] = tempNomor;
      }
    }
  }

  displayInventory();
}
