function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loop() {
    const imgCarrossel = document.getElementById("imgCarrossel");
    const linkCarrossel = document.getElementById("linkCarrossel");

    for(let i=1; i<=3; i++){

        if(i == 1) {
            imgCarrossel.src = "assets/images/puma.jpg";
            linkCarrossel.href = "/pages/produtos/produto.html?id=36";
        }
        
        if(i == 2) {
            imgCarrossel.src = "assets/images/skate.jpg";
            linkCarrossel.href = "/pages/produtos/produto.html?id=35";
        }
        
        if(i == 3) {
            imgCarrossel.src = "assets/images/luka.jpg";
            linkCarrossel.href = "/pages/produtos/produto.html?id=37";
        }
        
        await sleep(3000);
        if(i==3) {
            i = 0;
        }
    }
}

function startProgressBar() {
    const progress = document.getElementById("progress");

    function loop() {
        progress.style.transition = "none";
        progress.style.width = "0%";

        void progress.offsetWidth;

        progress.style.transition = "width 3s linear";
        progress.style.width = "100%";

        setTimeout(loop, 3000);
    }

    loop();
}

function iniciarTudo() {
    startProgressBar();
    loop();
}

function toggleButton(button) {
    document.querySelectorAll('#btnTamanho').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    button.classList.add('selected');
}

    let qtdCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let notificacaoCarrinho = document.getElementById("qtdNotificacoes");

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