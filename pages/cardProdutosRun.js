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

  if (lista.length === 0) {
    container.innerHTML = '<p>Nenhum produto encontrado.</p>';
  }
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

function aplicarFiltros() {
  const filtroEstilo = document.getElementById('filtroEstilo').value;
  const filtroGenero = document.getElementById('filtroModelo').value;

  let listaFiltrada = [...produtos];

  if (filtroEstilo === '2') {
    listaFiltrada = listaFiltrada.filter(p => p.terreno?.toLowerCase() === 'pista');
  } else if (filtroEstilo === '3') {
    listaFiltrada = listaFiltrada.filter(p => p.terreno?.toLowerCase() === 'trilha');
  }

  if (filtroGenero === '2') {
    listaFiltrada = listaFiltrada.filter(p => p.genero?.toLowerCase() === 'masculino');
  } else if (filtroGenero === '3') {
    listaFiltrada = listaFiltrada.filter(p => p.genero?.toLowerCase() === 'feminino');
  }

  mostrarProdutos(listaFiltrada);
}

document.getElementById('filtroEstilo').addEventListener('change', aplicarFiltros);
document.getElementById('filtroModelo').addEventListener('change', aplicarFiltros);

function ativarBusca() {
  const campoBusca = document.getElementById('campoBusca');

  campoBusca.addEventListener('input', () => {
    const termo = campoBusca.value.toLowerCase();

    const filtrados = produtos.filter(produto =>
      produto.nome.toLowerCase().includes(termo)
    );

    mostrarProdutos(filtrados);
  });
}

fetch('./produtos/produtos.json')
  .then(response => response.json())
  .then(categorias => {
    const categoriaCorrida = categorias.find(cat => cat.categoria === 'corrida');

    if(categoriaCorrida && categoriaCorrida.produtos){
      produtos = categoriaCorrida.produtos;
      mostrarProdutos(produtos);
      classificacao();
      ativarBusca();
    } else {
      document.getElementById('produtos').innerHTML = '<p>Nenhum produto foi encontrado.</p>'
    }
  })

  .catch(error => {
    console.error("Erro ao carregar os produtos:", error);
  })

    qtdCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    notificacaoCarrinho = document.getElementById("qtdNotificacoes");

if(qtdCarrinho.length > 0) {
    notificacaoCarrinho.innerHTML = `${qtdCarrinho.length}`
}
