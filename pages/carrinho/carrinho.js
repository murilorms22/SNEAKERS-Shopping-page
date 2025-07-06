let produtosCarrinho = [];

function mostrarProdutos(carrinho) {
  const container = document.getElementById('listaCarrinho');
  container.innerHTML = '';

  carrinho.forEach(produto => {
    const card = document.createElement('div');
    card.className = 'produtoCarrinho';
    card.innerHTML = `
                        <div class="infoEsquerda">
                            <img src="${produto.imagem}" alt="${produto.nome}" >
                            <div>
                                <h2>${produto.nome}</h2>
                                <p>${produto.descricao}</p>
                                <p>Preço unitário: R$${produto.preco.toFixed(2).replace('.', ',')}</p>
                                <p>Tamanho: 40</p>
                            </div>
                        </div>
                        <div class="produtoInfo">
                            <h3>Quantidade</h3>
                            <select name="qtd" id="qtdSelect">
                                <option value="1" ${produto.quantidade == 1 ? selected : ""}>1</option>
                                <option value="2" ${produto.quantidade == 2 ? selected : ""}>2</option>
                                <option value="3" ${produto.quantidade == 3 ? selected : ""}>3</option>
                            </select>
                        </div>
        `;
        container.appendChild(card);
  })
}

let carrinhoSalvo = localStorage.getItem("carrinho");
let carrinho;

if(carrinhoSalvo){
        carrinho = JSON.parse(carrinhoSalvo);
    } else {
        carrinho = [];
    }

