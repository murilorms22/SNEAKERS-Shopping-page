const botoes = document.querySelectorAll(".botoesAccount button");
const container = document.querySelector(".accountInfos");

botoes.forEach(botao => {
  botao.addEventListener("click", function () {
    botoes.forEach(b => b.classList.remove("btnSelected"));
    this.classList.add("btnSelected");

    const id = this.getAttribute("data-id");

    let conteudo = "";
    switch (id) {
      case "info":
        conteudo = `
          <h1>Minhas Informações</h1>
          <p>Nome: Murilo Silveira</p>
          <p>Email: murilo@email.com</p>
          <p>Telefone: (53) 99999-9999</p>
        `;
        break;

      case "historico":
        conteudo = `
          <h1>Histórico de Compras</h1>
          <ul>
            <li>Compra #001 - Tênis Casual - R$199,00</li>
            <li>Compra #002 - Camiseta Estampa - R$89,90</li>
          </ul>
        `;
        break;

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

document.querySelector('button[data-id="info"]').click();