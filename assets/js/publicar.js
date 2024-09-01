// JavaScript para manejar el modal y publicación de productos
document.addEventListener("DOMContentLoaded", function () {
    const openModal = document.getElementById("openModal");
    const closeModal = document.getElementById("closeModal");
    const modal = document.getElementById("modal");
    const productForm = document.getElementById("productForm");
    const publicaciones = document.getElementById("publicaciones");
    const imagePreview = document.getElementById("imagePreview");

    // Mostrar el modal al hacer clic en el botón "+"
    openModal.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Cerrar el modal al hacer clic en la "x"
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Función para agregar una nueva publicación
    productForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const productName = document.getElementById("productName").value;
        const productPrice = document.getElementById("productPrice").value;
        const productImage = document.getElementById("productImage").files[0];

        const reader = new FileReader();
        reader.onload = function (e) {
            const productCard = document.createElement("div");
            productCard.className = "tarjeta-publicacion";
            productCard.innerHTML = `
                <img src="${e.target.result}" alt="Imagen del Producto">
                <h3>${productName}</h3>
                <p>Precio: $${productPrice}</p>
            `;
            publicaciones.appendChild(productCard);
        };

        if (productImage) {
            reader.readAsDataURL(productImage);
        }

        modal.style.display = "none";
        productForm.reset();
    });
});