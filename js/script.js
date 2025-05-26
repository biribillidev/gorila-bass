let vidaGorila = 100;
let humanosRestantes = 100;
let humanos = [];
const logDiv = document.getElementById("log");
const humanosContainer = document.getElementById("humanos");
const somAtaque = new Audio("assets/som-ataque.mp3");

function criarHumanos() {
  for (let i = 0; i < 100; i++) {
    const h = document.createElement("img");
    h.src = "assets/humano.png";
    h.classList.add("humano", "vivo");
    humanos.push(h);
    humanosContainer.appendChild(h);
  }
}

function atualizarStatus() {
  document.getElementById("vidaGorila").textContent = vidaGorila;
  document.getElementById("humanosRestantes").textContent = humanosRestantes;
}

function atacar() {
  if (humanosRestantes > 0) {
    let mortos = Math.floor(Math.random() * 10) + 1;
    mortos = Math.min(mortos, humanosRestantes);

    let mortosAgora = 0;
    for (let i = 0; i < humanos.length && mortosAgora < mortos; i++) {
      if (humanos[i].classList.contains("vivo")) {
        humanos[i].classList.remove("vivo");
        humanos[i].classList.add("morto");
        mortosAgora++;
        somAtaque.currentTime = 0;
        somAtaque.play();
      }
    }

    humanosRestantes -= mortosAgora;
    registrarLog(`Gorila atacou e derrotou ${mortosAgora} humanos.`);
    animarGorila();
    verificarFimDeJogo();
    salvarJogo();
    atualizarStatus();
  }
}

function ataqueDosHumanos() { 
  if (humanosRestantes > 0 && vidaGorila > 0) {
    const dano = Math.floor(Math.random() * 8) + 3;
    vidaGorila = Math.max(vidaGorila - dano, 0);
    registrarLog(`💥 Humanos atacaram e causaram ${dano} de dano ao gorila!`);
    atualizarStatus();
    verificarFimDeJogo();
    salvarJogo();
  }
}

function defender() {
  registrarLog("Gorila entrou em postura defensiva.");
}

function curar() {
  if (vidaGorila < 100) {
    const cura = Math.floor(Math.random() * 20) + 10;
    vidaGorila = Math.min(vidaGorila + cura, 100);
    registrarLog(`Gorila se curou em ${cura} pontos de vida.`);
    salvarJogo();
    atualizarStatus();
  } else {
    registrarLog("Gorila já está com vida cheia.");
  }
}

function registrarLog(mensagem) {
  const p = document.createElement("p");
  p.textContent = mensagem;
  logDiv.prepend(p);
}

function animarGorila() {
  const gorila = document.getElementById("gorila");
  gorila.classList.add("golpe");
  setTimeout(() => gorila.classList.remove("golpe"), 200);
}



