function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loop() {
    
    for(let i=1; i<=3; i++){

        if(i == 1) {
            document.getElementById("imgCarrossel").src = "assets/images/puma.jpg"
            
        }
        
        if(i == 2) {
            document.getElementById("imgCarrossel").src = "assets/images/skate.jpg"
        }
        
        if(i == 3) {
            document.getElementById("imgCarrossel").src = "assets/images/luka.jpg"

        }
        
        await sleep(7000);
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

        progress.style.transition = "width 7s linear";
        progress.style.width = "100%";

        setTimeout(loop, 7000);
    }

    loop();
}

function iniciarTudo() {
    startProgressBar();
    loop();
    headerSome();
}

  let lastScroll = 0;
  const header = document.getElementById("main-header");

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll < lastScroll) {
      header.classList.remove("hide"); // Mostra o header
    } else {
      header.classList.add("hide"); // Esconde o header
    }

    lastScroll = currentScroll;
  });
