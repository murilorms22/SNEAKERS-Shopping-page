// produto.js
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get("id"));
const categoria = urlParams.get("categoria");

let jsonPath;
if (categoria === "casual") jsonPath = "../data/casual.json";
else if (categoria === "esporte") jsonPath = "../data/esporte.json";
else if (categoria === "social") jsonPath = "../data/social.json";

fetch(jsonPath)
  .then(res => res.json())
  .then(data => {
    const produto = categoria === "casual" ? data[id] : data.produtos[id];

    document.getElementById("imgPrincipal").src = produto.imagem;
    document.getElementById("categoriaTexto").textContent = `Tênis > ${categoria}`;
    document.getElementById("tituloProduto").textContent = produto.nome;
    document.getElementById("precoProduto").textContent = produto.preco || `R$ ${produto.preco}`;
    document.getElementById("descProduto").textContent = produto.descricao || "Tênis estiloso e confortável";

    // Gerar miniaturas
    const fotosLaterais = document.getElementById("fotosLaterais");
    fotosLaterais.innerHTML = "";
    for (let i = 0; i < 4; i++) {
      const mini = document.createElement("img");
      mini.src = produto.imagem;
      fotosLaterais.appendChild(mini);
    }
  })
  .catch(error => console.error("Erro ao carregar produto:", error));
