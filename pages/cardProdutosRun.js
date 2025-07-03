fetch('./produtos/produtos.json')
  .then(response => response.json())
  .then(categorias => {
    const container = document.getElementById('produtos');

    const categoriaCorrida = categorias.find(cat => cat.categoria === 'corrida');

    if (categoriaCorrida && categoriaCorrida.produtos) {
      categoriaCorrida.produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'cardProduto';

        card.innerHTML = `
          <img src="${produto.imagem}" alt="${produto.nome}">
          <div class="titulos">
            <h1>${produto.nome}</h1>
            <h3>${produto.descricao}</h3>
            <h3>${produto.cores} cor(es)</h3>
          </div>
          <div class="row infos">
            <h2>R$${produto.preco.toFixed(2).replace('.', ',')}</h2>
          </div>
          <a href="../pages/produtos/produto.html?id=${produto.id}">
            <button>Ver mais</button>
          </a>
        `;

        container.appendChild(card);
      });
    } else {
      container.innerHTML = '<p>Nenhum produto encontrado.</p>';
    }
  })
  .catch(error => {
    console.error("Erro ao carregar os produtos:", error);
  });
