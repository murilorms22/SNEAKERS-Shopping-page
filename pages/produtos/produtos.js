function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const idProduto = getQueryParam("id");

fetch("produtos.JSON")
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

            imagensLaterais.forEach((img, index) => {
                img.src = produtoEncontrado.fotosLaterais[index] || produtoEncontrado.imagem;
            });

        } else {
            document.body.innerHTML = "<h2>Produto não encontrado</h2>";
        }
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