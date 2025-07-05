let produtos = [];

function mostrarProdutos(lista) {
  const container = document.getElementById('produtos');
  container.innerHTML = '';

  lista.forEach(produto => {
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
  })
}

function classificacao() {
  const select = document.getElementById('selectClassificar');

  select.addEventListener('change', () => {
    const valorSelecionado = select.value;
    let novaLista = [...produtos];

    if(valorSelecionado == '2'){
      novaLista.sort((a, b) => b.preco - a.preco);
    } else if (valorSelecionado == '3'){ 
      novaLista.sort((a, b) => a.preco - b.preco);
    }

    mostrarProdutos(novaLista);

  })
}

fetch('./produtos/produtos.json')
  .then(response => response.json())
  .then(categorias => {
    const categoriaEsportivo = categorias.find(cat => cat.categoria === 'esportivo');

    if(categoriaEsportivo && categoriaEsportivo.produtos){
      produtos = categoriaEsportivo.produtos;
      mostrarProdutos(produtos);
      classificacao();
    } else {
      document.getElementById('produtos').innerHTML = '<p>Nenhum produto foi encontrado.</p>'
    }
  })

  .catch(error => {
    console.error("Erro ao carregar os produtos:", error);
  })