// Manejo del modal
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');

openModalBtn.onclick = function() {
    modal.style.display = "block";
}

closeModalBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Manejo de la vista previa de la imagen
const productImageInput = document.getElementById('productImage');
const imagePreview = document.getElementById('imagePreview');

productImageInput.onchange = function() {
    const file = productImageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Vista previa de la imagen">`;
        };
        reader.readAsDataURL(file);
    }
};

document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').files[0];

    const reader = new FileReader();
    
    reader.onload = function(e) {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';

        const productImg = document.createElement('img');
        productImg.src = e.target.result;

        const productInfo = document.createElement('div');
        
        const productTitle = document.createElement('h3');
        productTitle.textContent = productName;

        const productPriceTag = document.createElement('p');
        productPriceTag.textContent = `Precio: $${productPrice}`;

        productInfo.appendChild(productTitle);
        productInfo.appendChild(productPriceTag);

        productItem.appendChild(productImg);
        productItem.appendChild(productInfo);

        document.getElementById('profile').appendChild(productItem);

        // Cerrar el modal y limpiar el formulario
        modal.style.display = "none";
        document.getElementById('productForm').reset();
        imagePreview.innerHTML = '';
    };

    reader.readAsDataURL(productImage);
});
async function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const description = document.getElementById('productDescription').value;

    const response = await fetch('/add-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price, description })
    });

    if (response.ok) {
        alert('Producto agregado con éxito');
        loadProducts(); // Cargar la lista de productos actualizada
    } else {
        alert('Hubo un error al agregar el producto');
    }
}

async function loadProducts() {
    const response = await fetch('/get-products');
    const products = await response.json();
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Limpiar la lista antes de cargar los productos

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'tarjeta-publicacion'; // Añadir la clase CSS para el estilo

        const img = document.createElement('img');
        img.src = 'ruta/a/imagen.jpg'; // Ajusta esta ruta a la imagen correspondiente
        img.alt = product.name;

        const title = document.createElement('h3');
        title.textContent = product.name;

        const description = document.createElement('p');
        description.textContent = product.description;

        // Añadir los elementos a la tarjeta
        productCard.appendChild(img);
        productCard.appendChild(title);
        productCard.appendChild(description);

        // Añadir la tarjeta al contenedor
        productList.appendChild(productCard);
    });
}

window.onload = loadProducts; // Cargar productos cuando la página cargue
