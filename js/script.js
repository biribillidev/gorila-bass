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


