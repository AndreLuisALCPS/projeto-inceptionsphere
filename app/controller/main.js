document.addEventListener('DOMContentLoaded', function() {
    // Código para manipulação de produtos
    if (document.getElementById('products-list')) {
        fetch('/product')
            .then(response => response.json())
            .then(data => {
                const productsList = document.getElementById('products-list');
                data.products.forEach(product => {
                    const productItem = document.createElement('li');
                    productItem.innerHTML = `
                        <h2>${product.name}</h2>
                        <img src="${product.image}" alt="${product.name}">
                        <p>${product.description}</p>
                        <p>Preço: R$${product.price}</p>
                        <a href="/product/edit/${product.id}">Editar</a>
                        <form action="/product/delete/${product.id}" method="POST" style="display:inline;">
                            <button type="submit">Excluir</button>
                        </form>
                    `;
                    productsList.appendChild(productItem);
                });
            });
    }
});
