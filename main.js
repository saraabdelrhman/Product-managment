document.getElementById('btn').addEventListener('click', addProduct);

let products = JSON.parse(localStorage.getItem('products')) || [];

function addProduct() {
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productCat = document.getElementById('productCat').value;
    const productDesc = document.getElementById('productDesc').value;

    if (productName && productPrice && productCat && productDesc) {
        const product = {
            name: productName,
            price: productPrice,
            category: productCat,
            description: productDesc
        };

        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        renderTable();
        clearForm();
    } else {
        alert('Please fill out all fields');
    }
}

function renderTable() {
    const tableRow = document.getElementById('tableRow');
    tableRow.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>${product.description}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Delete</button></td>
            <td><button class="btn btn-info btn-sm" onclick="updateProduct(${index})">Update</button></td>
        `;

        tableRow.appendChild(row);
    });
}

function clearForm() {
    document.getElementById('productForm').reset();
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderTable();
}

function updateProduct(index) {
    const product = products[index];

    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCat').value = product.category;
    document.getElementById('productDesc').value = product.description;

    document.getElementById('btn').textContent = 'Update Product';
    document.getElementById('btn').onclick = function() {
        saveProduct(index);
    };
}

function saveProduct(index) {
    products[index].name = document.getElementById('productName').value;
    products[index].price = document.getElementById('productPrice').value;
    products[index].category = document.getElementById('productCat').value;
    products[index].description = document.getElementById('productDesc').value;

    document.getElementById('btn').textContent = 'Add Product';
    document.getElementById('btn').onclick = addProduct;

    localStorage.setItem('products', JSON.stringify(products));
    clearForm();
    renderTable();
}

document.addEventListener('DOMContentLoaded', renderTable);
