const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
  {
    enunciado: "IA PODE DESENVOLVER EMOÇÕES??",
    alternativas: ["PODE", "NÃO PODE"],
  },
  {
    enunciado: "UMA IA TE OFEREÇE UM SORVETE. VOCÊ ACEITA??",
    alternativas: ["SIM", "NÃO"],
  },
  {
    enunciado: "pergunta 3",
    alternativas: ["alt1", "alt2"]
  },
];

let atual = 0;
let perguntaAtual;

function mostraPergunta() {
  perguntaAtual = perguntas[atual];
  caixaPerguntas.textContent = perguntaAtual.enunciado;
};
function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa;
        caixaAlternativas.appendChild(botaoAlternativas);
  }
};

mostraPergunta();
mostraAlternativas();