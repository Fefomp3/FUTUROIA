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
];