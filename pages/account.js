const botoes = document.querySelectorAll(".botoesAccount button");
const container = document.querySelector(".accountInfos");
const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];



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
  const comprasRecentes = JSON.parse(localStorage.getItem("comprasRecentes")) || [];

  if (comprasRecentes.length > 0) {
    const cards = comprasRecentes.map(prod => `
      <div class="cardHistorico">
        <a href="../pages/produtos/produto.html?id=${prod.id}">
          <div class="infoEsquerda">
            <img src="${prod.imagem}" alt="${prod.nome}">
            <div class="infosHistorico">
              <h2>${prod.nome}</h2>
              <p>Tamanho: ${prod.tamanho}</p>
              <p>Quantidade: ${prod.quantidade}</p>
            </div>
            <div class="precoHistorico">R$${prod.preco.toFixed(2)}</div>
          </div>
        </a>
      </div>
    `).join("");

    conteudo = `
      <h1>Histórico de compras</h1>
      <div class="infoPai">
        ${cards}
      </div>
    `;

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
  }
  break;
    }

    container.innerHTML = conteudo;
  });
});

document.querySelector('button[data-id="info"]').click();

//noficação com quantidade - carrinho

qtdCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
notificacaoCarrinho = document.getElementById("qtdNotificacoes");

if(qtdCarrinho.length > 0) {
    notificacaoCarrinho.innerHTML = `${qtdCarrinho.length}`
}
