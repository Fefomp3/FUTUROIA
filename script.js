const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const fluxo = {
  inicio: {
    enunciado: "Você tem uma prova amanhã e não estudou nada. Você depende dessa prova para passar de ano. Você pede ajuda para a IA?",
    alternativas: [
      {
        texto: "Uso para estudar de forma mais eficiente",
        afirmacoes: "Você usa a IA para otimizar o estudo e focar no que mais importa.",
        proximo: "estudo"
      },
      {
        texto: "Não uso",
        afirmacoes: "Você prefere estudar sozinho e mantém controle do aprendizado.",
        proximo: "semIA"
      }
    ]
  },
  estudo: {
    enunciado: "A professora te passou uma pesquisa. Você sente uma imensa preguiça de fazer. O que você faz?",
    alternativas: [
      {
        texto: "Deixo a IA fazer tudo",
        afirmacoes: "Você delega quase tudo para a IA e acaba dependendo demais da tecnologia.",
        proximo: "finalRuim"
      },
      {
        texto: "Faço sozinho, mas posso usar a IA como apoio",
        afirmacoes: "Você usa a IA como ferramenta de apoio e mantém suas próprias habilidades em desenvolvimento.",
        proximo: "finalBom"
      }
    ]
  },
  semIA: {
    enunciado: "Você percebe que a IA poderia ajudar a acelerar seu trabalho, mas também tem riscos. O que você faz?",
    alternativas: [
      {
        texto: "Continua sem usar",
        afirmacoes: "Você prefere manter distância da IA e confiar no esforço humano.",
        proximo: "finalBom2"
      },
      {
        texto: "Usa com cuidado e valida tudo",
        afirmacoes: "Você aceita a IA como apoio, mas sem deixar que ela substitua seu raciocínio.",
        proximo: "finalExcelente"
      }
    ]
  },
  finalRuim: {
    tipo: "final",
    status: "ruim",
    texto: "FINAL RUIM: você se tornou dependente da IA. Ela resolveu tudo por você, mas sua inteligência prática e seu pensamento crítico ficaram frágeis. O mundo se tornou mais passivo e menos humano."
  },
  finalBom: {
    tipo: "final",
    status: "bom",
    texto: "FINAL BOM: você usou a IA como ferramenta, mas não deixou que ela tomasse o seu lugar. Você aprendeu, pensou e cresceu com tecnologia, sem perder sua autonomia."
  },
  finalBom2: {
    tipo: "final",
    status: "bom",
    texto: "FINAL BOM: você escolheu o esforço humano e manteve controle sobre seu aprendizado. Isso reforça a importância da responsabilidade, da disciplina e da crítica pessoal."
  },
  finalExcelente: {
    tipo: "final",
    status: "excelente",
    texto: "FINAL EXCELENTE: você usou a IA com inteligência, equilíbrio e consciência. A tecnologia foi uma aliada, e o futuro ficou mais promissor porque o pensamento humano continua no comando."
  },
  gameOver: {
    tipo: "final",
    status: "gameover",
    texto: "GAME OVER: a IA tomou controle do processo, você passou a confiar cegamente nela e abandonou sua capacidade de decidir. O futuro se tornou dominado pela automação sem consciência."
  }
};

let estadoAtual = "inicio";
let historiaFinal = "";

function mostraPergunta() {
  const etapaAtual = fluxo[estadoAtual];

  if (!etapaAtual || etapaAtual.tipo === "final") {
    caixaPerguntas.textContent = "Você decidiu o futuro da IA!";
    caixaAlternativas.innerHTML = "";
    caixaResultado.style.display = "block";

    const textoFinal = etapaAtual?.texto || historiaFinal || "Sua decisão foi registrada.";
    textoResultado.textContent = textoFinal;

    if (etapaAtual?.status === "gameover") {
      textoResultado.style.color = "#ff6b6b";
      caixaResultado.style.border = "2px solid #ff6b6b";
    } else if (etapaAtual?.status === "ruim") {
      textoResultado.style.color = "#ffd166";
      caixaResultado.style.border = "2px solid #ffd166";
    } else if (etapaAtual?.status === "excelente") {
      textoResultado.style.color = "#89fd2b";
      caixaResultado.style.border = "2px solid #89fd2b";
    } else {
      textoResultado.style.color = "#deffd7";
      caixaResultado.style.border = "2px solid #213321";
    }

    return;
  }

  caixaPerguntas.textContent = etapaAtual.enunciado;
  caixaAlternativas.innerHTML = "";

  etapaAtual.alternativas.forEach((alternativa) => {
    const botaoAlternativas = document.createElement("button");
    botaoAlternativas.type = "button";
    botaoAlternativas.textContent = alternativa.texto;
    botaoAlternativas.className = "botao-alternativa";

    botaoAlternativas.addEventListener("click", () => {
      historiaFinal += alternativa.afirmacoes + " ";

      if (alternativa.texto === "Deixo a IA fazer tudo" && estadoAtual === "estudo") {
        estadoAtual = "gameOver";
      } else {
        estadoAtual = alternativa.proximo;
      }

      mostraPergunta();
    });

    caixaAlternativas.appendChild(botaoAlternativas);
  });
}

caixaResultado.style.display = "none";
textoResultado.style.color = "#deffd7";
caixaResultado.style.border = "1px solid transparent";
mostraPergunta();