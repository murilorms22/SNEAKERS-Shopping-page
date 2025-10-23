function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const idProduto = getQueryParam("id");
let nomeProduto;
let imagemProduto;
let precoProduto;

fetch("produtos.json")
    .then(response => response.json())
    .then(categorias => {
        let produtoEncontrado = null;

        for(const categoria of categorias) {
            const produto = categoria.produtos.find(p => p.id == idProduto);
            if(produto){
                produtoEncontrado = produto;
                break;
            }
        }

        if (produtoEncontrado) {
            document.getElementById("imagemProduto").src = produtoEncontrado.imagem;
            document.getElementById("titulo").textContent = produtoEncontrado.nome;
            document.getElementById("descricao").textContent = produtoEncontrado.descricaoGrande;
            document.getElementById("preco").textContent = "R$ " + produtoEncontrado.preco.toFixed(2).replace('.', ',');
            
            const imagensLaterais = document.querySelectorAll(".fotosLaterais");

            imagensLaterais.forEach((img) => {
                img.src = produtoEncontrado.imagem;
            });

        } else {
            document.body.innerHTML = "<h2>Produto não encontrado</h2>";
        }

        nomeProduto = produtoEncontrado.nome;
        imagemProduto = produtoEncontrado.imagem;
        precoProduto = produtoEncontrado.preco;
    })
    .catch(error => {
        console.error("Erro:", error);
        document.body.innerHTML = "<h2>Erro ao carregar o produto</h2>";
    });

    function toggleButton(button) {
    document.querySelectorAll('.btnTamanho').forEach(button => {
        button.classList.remove('selected');
    });
    
    button.classList.add('selected');
    }

//logica para carrinho

const botaoComprar = document.getElementById('btnComprar');
botaoComprar.addEventListener("click", () => {
    adicionarAoCarrinho(idProduto);
})

function adicionarAoCarrinho(idProduto) { 
    let carrinhoSalvo = localStorage.getItem("carrinho");
    let carrinho;

    let tamanhoSelecionado = document.querySelector('.btnTamanho.selected');

    if(!tamanhoSelecionado) {
        alert('Por favor, selecione um tamanho para seu tênis.');
        return;
    }

    if(carrinhoSalvo){
        carrinho = JSON.parse(carrinhoSalvo);
    } else {
        carrinho = [];
    }

    const existente = carrinho.find(item => item.id == idProduto && item.tamanho == tamanhoSelecionado.value);

    if(existente){
        if (existente.quantidade == 3) {
            alert("O máximo de produtos por tamanho é 3.");
            return;
        }
        existente.quantidade += 1;
    } else {
        carrinho.push({ id: idProduto, quantidade: 1, tamanho: tamanhoSelecionado.value, nome: nomeProduto, imagem: imagemProduto, preco: precoProduto });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Produto adicionado ao carrinho com sucesso!");

    location.reload();
}

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