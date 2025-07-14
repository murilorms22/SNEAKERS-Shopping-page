const botoes = document.querySelectorAll(".botoesAccount button");
const container = document.querySelector(".accountInfos");
const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

fetch("./produtos/produtos.json")
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

    botoes.forEach(botao => {
  botao.addEventListener("click", function () {
    botoes.forEach(b => b.classList.remove("btnSelected"));
    this.classList.add("btnSelected");

    const id = this.getAttribute("data-id");

    let conteudo = "";
    switch (id) {
      case "info":
        conteudo = `
          <h1>Minha conta</h1>
          <div class="infoPai">
            <div class="info">
              <h5>Endereço de e-mail</h5>
              <span>murilosilveira@ifsul.com</span>
              <p class="mudar">Mudar e-mail</p>
            </div>
            <div class="info">
              <h5>Senha</h5>
              <span>********</span>
              <p class="mudar">Mudar a senha</p>
            </div>
            <div class="info">
              <h5>Telefone</h5>
              <span>(51) 99999-9999</span>
              <p class="mudar">Mudar o telefone</p>
            </div>
            <div class="info">
              <h5>Endereço</h5>
              <span>Rua Exemplo, 123, Bairro, Cidade, Estado, 12345-678</span>
              <p class="mudar">Mudar o endereço</p>
            </div>
            <div class="info">
              <h5>Data de nascimento</h5>
              <span>01/01/2000</span>
            </div>
            <div class="info">
              <h5>Data de criação da conta</h5>
              <span>01/01/2023</span>
            </div>
          </div>
          <div class="info">
            <button class="excluir">Excluir conta</button>
          </div>
        </div>
        `;
        break;

      case "historico":
        const comprasRecentes = localStorage.getItem("comprasRecentes");
        if(comprasRecentes) {
          conteudo = `
      <h1>Histórico de compras</h1>
      <div class="infoPai">
        ${produtosDetalhados
          .map(
            (produto) => `
              <div class="info">
                <a href="../produtos/produto.html?id=${produto.id}">
                  <div class="infoEsquerda">
                    <img src="${produto.imagem}" alt="${produto.nome}" >
                    <div>
                      <h2>${produto.nome}</h2>
                      <p>${produto.descricao}</p>
                      <p>Preço unitário: R$${produto.preco
                        .toFixed(2)
                        .replace(".", ",")}</p>
                      <p>Tamanho: ${produto.tamanho}</p>
                      <p>Quantidade: ${produto.quantidade}</p>
                    </div>
                  </div>
                </a>
              </div>
            `
          )
          .join("")}
      </div>
    `; break;
        } else {
          conteudo = `
          <h1>Histórico de compras</h1>
              <div class="infoPai">
                  <div class="info">
                  <p>Você ainda não possui compras registradas.</p>
                  <button class="voltarLoja">Voltar para loja</button>
                  </div>
              </div>
          `;
          break;
        }

      case "aparencia":
        conteudo = `
          <h1>Personalizar Aparência</h1>
          <p>Escolha o tema do seu perfil:</p>
          <button>Claro</button>
          <button>Escuro</button>
        `;
        break;
    }

    container.innerHTML = conteudo;
  });
});
  })

  document.querySelector('button[data-id="info"]').click();