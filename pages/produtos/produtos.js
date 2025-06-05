function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 2. Obtenha o ID do produto da URL
const idProduto = getQueryParam("id");

// 3. Carregue o JSON com os produtos
fetch("produtos.JSON")
    .then(response => response.json())
    .then(produtos => {
        const produto = produtos.find(p => p.id == idProduto);

        if (produto) {
            document.getElementById("imagemProduto").src = produto.imagem;
            document.getElementById("titulo").textContent = produto.nome;
            document.getElementById("descricao").textContent = produto.descricao;
            document.getElementById("preco").textContent = "R$ " + produto.preco.toFixed(2).replace('.', ',');
        } else {
            document.body.innerHTML = "<h2>Produto não encontrado</h2>";
        }
    })
    .catch(error => {
        console.error("Erro ao carregar os dados:", error);
        document.body.innerHTML = "<h2>Erro ao carregar o produto</h2>";
    });