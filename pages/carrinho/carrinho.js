let produtosCarrinho = [];
let nomeProduto;
let imagemProduto;
let precoProduto;

function mostrarProdutos(carrinho) {
  const container = document.getElementById("listaCarrinho");
  container.innerHTML = "";

  if(carrinho.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio</p>";
  return;
}

  carrinho.forEach((produto) => {
    const card = document.createElement("div");
    card.className = "produtoCarrinho";
    card.innerHTML = `
                        <a href="../produtos/produto.html?id=${produto.id}"><div class="infoEsquerda">
                            <img src="${produto.imagem}" alt="${produto.nome}" >
                            <div>
                                <h2>${produto.nome}</h2>
                                <p>${produto.descricao}</p>
                                <p>Preço unitário: R$${produto.preco
                                  .toFixed(2)
                                  .replace(".", ",")}</p>
                                <p>Tamanho: ${produto.tamanho}</p>
                            </div>
                        </div></a>
                        <div class="produtoInfo">
                        <p class="btnRemover" data-id="${produto.id}" data-tamanho="${produto.tamanho}">X</p>
                        <h3>Quantidade</h3>
                            <select name="qtd" class="qtdSelect" data-id="${produto.id}" data-tamanho="${produto.tamanho}">
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
        if(confirm("Tem certeza que deseja remover este item do carrinho?")){
                const idRemover = this.getAttribute("data-id");
                const tamanhoRemover = this.getAttribute("data-tamanho");
                removerCarrinho(idRemover, tamanhoRemover);
        }
    });
    
    card.querySelectorAll(".qtdSelect").forEach(select => {
      select.addEventListener("change", function () {
        const novaQuantidade = parseInt(this.value);
        const produtoId = this.getAttribute("data-id");
        const produtoTamanho = this.getAttribute("data-tamanho");

        const item = carrinho.find(p => p.id == produtoId && p.tamanho == produtoTamanho);

        if (!item) {
          console.log("Produto não encontrado no carrinho");
          return;
        }

        if (item) {
          item.quantidade = novaQuantidade;

          localStorage.setItem("carrinho", JSON.stringify(carrinho));
          window.location.reload();
}
  });
});

const tituloMeuCarrinho = document.getElementById("tituloMeuCarrinho");
  if (carrinho.length > 0) {
    tituloMeuCarrinho.textContent = `Meu carrinho (${carrinho.length})`;
  }

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

    nomeProduto = produtosDetalhados.nome;
    imagemProduto = produtosDetalhados.imagem;
    precoProduto = produtosDetalhados.preco;
  })
  
  .catch((erro) => {
    console.error("Erro ao carregar produtos:", erro);
  });

function finalizarCompra() {}

function removerCarrinho(id, tamanho) {
let carrinhoSalvo = localStorage.getItem("carrinho");

let carrinho;

if (carrinhoSalvo) {
  carrinho = JSON.parse(carrinhoSalvo);
} else {
  carrinho = [];
}

  carrinho = carrinho.filter(item => !(item.id == id && item.tamanho == tamanho));

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  location.reload();
}

document.querySelector("#btnFinalizarCompra").addEventListener("click", function () {
    document.getElementById("sobretela").classList.remove("sobretela-hide");

    setTimeout(() => {
      const carrinhoSalvo = localStorage.getItem("carrinho");
      let carrinhoAtual;

      if(carrinhoSalvo) {
        carrinhoAtual = JSON.parse(carrinhoSalvo);
      } else {
        carrinhoAtual = [];
      }
      
      if (carrinhoAtual.length == 0) {
        alert("Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.");
        location.reload();
        return;
      }

      const recentes = localStorage.getItem("comprasRecentes");
      let comprasRecentes;

      if (recentes){
        comprasRecentes = JSON.parse(recentes);
      } else {
        comprasRecentes = [];
      }

      let compraAtual = JSON.parse(localStorage.getItem("carrinhoAtual"));

      comprasRecentes = comprasRecentes.concat(carrinhoAtual)
      compraAtual = carrinhoAtual;

      localStorage.setItem("comprasRecentes", JSON.stringify(comprasRecentes));
      localStorage.setItem("compraAtual", JSON.stringify(compraAtual));
      
        localStorage.removeItem("carrinho");
        location.href = "./checkout.html";
    }, 3000);
    
});

const qtdCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const notificacaoCarrinho = document.getElementById("qtdNotificacoes");

if(qtdCarrinho.length > 0) {
    notificacaoCarrinho.innerHTML = `${qtdCarrinho.length}`
}

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuHamburguer");
  const menuMobile = document.getElementById("menuMobile");

  menuBtn.addEventListener("click", () => {
    menuMobile.classList.toggle("show");
  });
});