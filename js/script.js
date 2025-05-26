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

function verificarFimDeJogo() {
  if (humanosRestantes === 0) {
    registrarLog("UM EXTERMINIO FOI FEITO, VITÓRIA DO GORILAAA!");
    desativarBotoes();
  } else if (vidaGorila <= 0) {
    registrarLog("OS HUMANOS FORAM SUPERIORES A VOCÊ, O GORILA FOI DERROTADO.");
    desativarBotoes();
  }
}

function salvarJogo() {
  const estado = {
    vidaGorila,
    humanosRestantes,
    humanosStatus: humanos.map(h => h.classList.contains("vivo"))
  };
  localStorage.setItem("estadoGorila", JSON.stringify(estado));
}

function carregarJogo() {
  const estadoSalvo = localStorage.getItem("estadoGorila");
  if (estadoSalvo) {
    const estado = JSON.parse(estadoSalvo);
    vidaGorila = estado.vidaGorila;
    humanosRestantes = estado.humanosRestantes;
    criarHumanos();
    for (let i = 0; i < humanos.length; i++) {
      if (!estado.humanosStatus[i]) {
        humanos[i].classList.remove("vivo");
        humanos[i].classList.add("morto");
      }
    }
    atualizarStatus();
  } else {
    criarHumanos();
    atualizarStatus();
  }
}

document.getElementById("btnAtacar").addEventListener("click", atacar);
document.getElementById("btnDefender").addEventListener("click", defender);
document.getElementById("btnCurar").addEventListener("click", curar);
document.getElementById("btnReiniciar").addEventListener("click", reiniciarJogo);

window.onload = () => {
  carregarJogo();
  registrarLog("🦍 Jogo iniciado. Hora da batalha!");
  setInterval(ataqueDosHumanos, 4000);
};


function reiniciarJogo() {
  localStorage.removeItem("estadoGorila");

  vidaGorila = 100;
  humanosRestantes = 100;

  humanosContainer.innerHTML = "";
  logDiv.innerHTML = "";
  humanos = [];

  document.querySelectorAll("button").forEach(btn => btn.disabled = false);

  criarHumanos();
  atualizarStatus();
  registrarLog("🔁 Jogo reiniciado. Boa sorte!");
}


