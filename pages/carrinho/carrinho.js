let produtosCarrinho = [];

function mostrarProdutos(carrinho) {
  const container = document.getElementById("listaCarrinho");
  container.innerHTML = "";

  carrinho.forEach((produto) => {
    const card = document.createElement("div");
    card.className = "produtoCarrinho";
    card.innerHTML = `
                        <div class="infoEsquerda">
                            <img src="${produto.imagem}" alt="${produto.nome}" >
                            <div>
                                <h2>${produto.nome}</h2>
                                <p>${produto.descricao}</p>
                                <p>Preço unitário: R$${produto.preco
                                  .toFixed(2)
                                  .replace(".", ",")}</p>
                                <p>Tamanho: ${produto.tamanho}</p>
                            </div>
                        </div>
                        <div class="produtoInfo">
                            <p class="btnRemover" data-id="${produto.id}">X</p>
                            <h3>Quantidade</h3>
                            <select name="qtd" id="qtdSelect">
                                <option value="1" ${
                                  produto.quantidade == 1 ? "selected" : ""
                                }>1</option>
                                <option value="2" ${
                                  produto.quantidade == 2 ? "selected" : ""
                                }>2</option>
                                <option value="3" ${
                                  produto.quantidade == 3 ? "selected" : ""
                                }>3</option>
                            </select>
                        </div>
        `;
    container.appendChild(card);

    card.querySelector(".btnRemover").addEventListener("click", function () {
      const idRemover = this.getAttribute("data-id");
      removerCarrinho(idRemover);
    });
  });
}

let carrinhoSalvo = localStorage.getItem("carrinho");
let carrinho;

if (carrinhoSalvo) {
  carrinho = JSON.parse(carrinhoSalvo);
} else {
  carrinho = [];
}

fetch("../produtos/produtos.json")
  .then((res) => res.json())
  .then((categorias) => {
    let produtosDetalhados = [];

    for (const item of carrinho) {
      for (const categoria of categorias) {
        const prod = categoria.produtos.find((p) => p.id == item.id);
        if (prod) {
          produtosDetalhados.push({
            id: prod.id,
            nome: prod.nome,
            descricao: prod.descricao,
            imagem: prod.imagem,
            preco: prod.preco,
            quantidade: item.quantidade,
            tamanho: item.tamanho || "-",
          });
          break;
        }
      }
    }

    produtosCarrinho = produtosDetalhados;
    mostrarProdutos(produtosCarrinho);

    let quantidadeTotal = 0;
    let precoTotal = 0;

    produtosCarrinho.forEach((prod) => {
      quantidadeTotal += prod.quantidade;
      precoTotal += prod.quantidade * prod.preco;
    });

    let taxaEntrega = 0;
    let descontos = 0;
    let totalFinal = precoTotal + taxaEntrega - descontos;

    document.getElementById("qtdProdutos").textContent = quantidadeTotal;
    document.getElementById("precoOriginal").textContent = "R$" + precoTotal.toFixed(2).replace(".", ",");
    document.getElementById("taxaEntrega").textContent = taxaEntrega.toFixed(2).replace(".", ",");
    document.getElementById("descontos").textContent = descontos.toFixed(2).replace(".", ",");
    document.getElementById("precoFinal").textContent = "R$" + totalFinal.toFixed(2).replace(".", ",");
  })
  
  .catch((err) => {
    console.error("Erro ao carregar produtos:", err);
  });

function finalizarCompra() {}

function removerDoCarrinho(id) {
  let carrinho;

  if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo);
  } else {
    carrinho = [];
  }
  carrinho = carrinho.filter((item) => item.id != id);

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  location.reload();
}
