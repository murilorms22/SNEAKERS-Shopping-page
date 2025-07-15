const compraAtual = JSON.parse(localStorage.getItem("compraAtual")) || [];

function mostrarProdutosCheckout(compraAtual) {
    const container = document.getElementById('cardProdutoCheckout');
    container.innerHTML = '';

    if (compraAtual.length > 0) {
        compraAtual.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'produtoCheckout';
        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <div class="infoCheckoutNome">
            <h2>${produto.nome}</h2>
            </div>
            <div class="infosCheckoutPequenas">
            <p>Quantidade: ${produto.quantidade}</p>
            <p>Tamanho: ${produto.tamanho}</p>
            </div>
        `;
        container.appendChild(card);
        });
    }
}

mostrarProdutosCheckout(compraAtual)