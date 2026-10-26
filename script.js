const caixaPrincipal = document.querySelector(".caixa-principal");
const progresso = document.querySelector(".progresso");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoReiniciar = document.querySelector(".botao-reiniciar");

const fluxo = {
  inicio: {
    enunciado: "A feira de ciências da escola é amanhã. Seu grupo vai apresentar um projeto sobre inteligência artificial, mas vocês ainda precisam organizar as ideias. Como você começa?",
    alternativas: [
      {
        texto: "Peço à IA um roteiro para entender o tema e planejar o projeto",
        narrativa: "Com o prazo apertado, você pede a uma ferramenta de IA um roteiro para organizar a pesquisa. O grupo decide usar a sugestão como ponto de partida, não como resposta final.",
        proximo: "estudo"
      },
      {
        texto: "Reúno livros, anotações e converso com a professora",
        narrativa: "Você abre os livros da biblioteca, separa as anotações da aula e conversa com a professora. Enquanto isso, seus colegas contam que também estão pesquisando com ferramentas de IA.",
        proximo: "semIA"
      }
    ]
  },
  estudo: {
    enunciado: "Com o plano pronto, o grupo começa a pesquisar para os cartazes. A professora lembra que cada integrante precisa saber explicar o que apresentar. Como você usa a IA?",
    alternativas: [
      {
        texto: "Peço explicações, confiro o conteúdo e escrevo com minhas palavras",
        narrativa: "Você pede explicações sobre o tema, compara as respostas com o material da aula e anota as ideias principais para explicar sua parte na feira.",
        proximo: "pesquisa"
      },
      {
        texto: "Peço que a IA escreva minha parte e não leio o resultado",
        narrativa: "Para terminar depressa, você copia uma resposta pronta para o cartaz. Naquela noite, o grupo ensaia a apresentação, mas você ainda não sabe explicar sua parte.",
        proximo: "dependencia"
      }
    ]
  },
  dependencia: {
    enunciado: "Durante o ensaio, a professora aponta uma frase do seu cartaz e pergunta o que ela significa. Você não sabe responder. O que faz?",
    alternativas: [
      {
        texto: "Admito que não entendi e peço ajuda para estudar e refazer minha parte",
        narrativa: "Você conta ao grupo que ainda não entendeu o texto. Com a ajuda da professora, transforma a resposta copiada em perguntas de pesquisa e começa a conferir cada informação.",
        proximo: "pesquisa"
      },
      {
        texto: "Finjo que entendi e tento decorar a resposta pronta",
        narrativa: "Com vergonha de atrasar o grupo, você finge que entendeu. No dia seguinte, chega à feira ainda inseguro sobre aquilo que está apresentando.",
        proximo: "finalRuim"
      }
    ]
  },
  pesquisa: {
    enunciado: "Enquanto prepara os cartazes, a IA sugere alguns dados e referências para o projeto. O que você faz antes de incluí-los?",
    alternativas: [
      {
        texto: "Confiro as referências em fontes confiáveis antes de usar",
        narrativa: "Você e seus colegas procuram as referências em fontes confiáveis. A pesquisa fica mais sólida, e o grupo passa a pensar também em como proteger os dados usados nas ferramentas.",
        proximo: "privacidade"
      },
      {
        texto: "Uso tudo porque a resposta parece convincente",
        narrativa: "O grupo coloca as respostas no cartaz sem conferir as referências. Pouco depois, uma colega encontra um dado que parece estranho e avisa que talvez a informação esteja errada.",
        proximo: "boato"
      }
    ]
  },
  privacidade: {
    enunciado: "Para ajudar a escrever as explicações dos cartazes, uma ferramenta oferece sugestões personalizadas se você informar alguns dados. O que você compartilha?",
    alternativas: [
      {
        texto: "Informo apenas o necessário e não envio dados pessoais",
        narrativa: "Você usa apenas o tema do projeto, sem enviar dados pessoais. Assim, o grupo continua trabalhando sem expor informações que não são necessárias.",
        proximo: "autoria"
      },
      {
        texto: "Envio meu nome completo, endereço e rotina",
        narrativa: "Para receber sugestões mais específicas, você envia seu nome completo, endereço e rotina. Depois, percebe que nenhum desses dados era necessário para preparar os cartazes.",
        proximo: "exposicao"
      }
    ]
  },
  exposicao: {
    enunciado: "Na manhã da feira, você percebe que a ferramenta não precisava dos dados pessoais que enviou. Como reage?",
    alternativas: [
      {
        texto: "Apago os dados, reviso as permissões e peço orientação à professora",
        narrativa: "Você apaga os dados, revisa as permissões e conversa com a professora. Com mais cuidado, volta ao grupo para revisar a versão final do cartaz.",
        proximo: "autoria"
      },
      {
        texto: "Continuo enviando dados sempre que a ferramenta pedir",
        narrativa: "Mesmo sem saber como os dados serão usados, você continua compartilhando informações pessoais. O grupo perde a oportunidade de conversar sobre como proteger a privacidade de todos.",
        proximo: "finalRuim"
      }
    ]
  },
  autoria: {
    enunciado: "Os cartazes estão quase prontos. Você aproveitou sugestões da IA para revisar um texto. Como apresenta essa parte do projeto?",
    alternativas: [
      {
        texto: "Reviso tudo, acrescento minhas ideias e explico que usei a ferramenta",
        narrativa: "Você confere o texto, acrescenta exemplos da aula e conta ao grupo quais sugestões vieram da IA. Juntos, vocês deixam essa informação clara no cartaz.",
        proximo: "impacto"
      },
      {
        texto: "Entrego o texto da IA como se tivesse feito tudo sozinho",
        narrativa: "Você entrega o texto sem revisar e diz que escreveu tudo sozinho. Quando o grupo começa a preparar as perguntas da feira, percebe que não consegue explicar o conteúdo.",
        proximo: "finalRuim"
      }
    ]
  },
  impacto: {
    enunciado: "Na montagem do estande, um colega traz uma notícia e uma imagem criadas por IA para chamar a atenção dos visitantes. O que o grupo faz?",
    alternativas: [
      {
        texto: "Conferimos a notícia, identificamos a imagem e explicamos como foi criada",
        narrativa: "Antes da abertura da feira, vocês conferem a notícia e identificam a imagem como conteúdo criado por IA. O estande fica pronto, e o grupo está preparado para explicar suas escolhas aos visitantes.",
        proximo: "finalExcelente"
      },
      {
        texto: "Colocamos a notícia no estande sem conferir para terminar logo",
        narrativa: "Com os visitantes prestes a chegar, o grupo coloca a notícia no estande sem conferir. Durante a primeira apresentação, uma visitante aponta que o dado principal pode estar errado.",
        proximo: "boato"
      }
    ]
  },
  boato: {
    enunciado: "O grupo descobre que uma informação do projeto está errada, mas os visitantes já começaram a chegar. O que vocês fazem?",
    alternativas: [
      {
        texto: "Corrigimos o cartaz e avisamos quem já ouviu a informação",
        narrativa: "Vocês corrigem o cartaz e explicam o erro aos visitantes que já tinham ouvido a informação. A apresentação continua, agora com mais cuidado e transparência.",
        proximo: "finalBom"
      },
      {
        texto: "Deixamos como está para não admitir o erro",
        narrativa: "Para evitar constrangimento, vocês deixam a informação no cartaz. Mais visitantes passam pelo estande sem saber que o dado está incorreto.",
        proximo: "finalRuim"
      }
    ]
  },
  semIA: {
    enunciado: "Na reunião do projeto, dois colegas sugerem usar IA para criar parte do material. Como você participa da decisão?",
    alternativas: [
      {
        texto: "Ajudo a dividir as tarefas e proponho conferir tudo em fontes confiáveis",
        narrativa: "Você combina com o grupo quem fará cada parte e sugere conferir as informações, usando ou não IA. Os colegas também separam uma imagem e uma notícia para mostrar como esse conteúdo é criado.",
        proximo: "impacto"
      },
      {
        texto: "Prefiro não conversar sobre isso e deixo o grupo decidir sozinho",
        narrativa: "Você se afasta da conversa, e o grupo continua preparando o estande. Um colega decide criar uma imagem divertida com a foto de outra pessoa da turma.",
        proximo: "equipe"
      }
    ]
  },
  equipe: {
    enunciado: "O colega quer colocar a imagem no estande da feira. O que você recomenda ao grupo?",
    alternativas: [
      {
        texto: "Pedimos autorização e só usamos a foto se a pessoa concordar",
        narrativa: "Você lembra ao grupo que é preciso pedir autorização. A pessoa prefere não usar a foto, e vocês escolhem outra ilustração para terminar o estande respeitando a decisão dela.",
        proximo: "finalBom2"
      },
      {
        texto: "Usamos a foto sem perguntar, porque é só uma brincadeira",
        narrativa: "O grupo usa a foto sem pedir autorização. Quando a pessoa descobre, fica chateada por ver sua imagem transformada e exposta no estande.",
        proximo: "finalRuim"
      }
    ]
  },
  finalRuim: {
    tipo: "final",
    status: "ruim",
    texto: "FIM DE JOGO: suas escolhas deixaram de lado o aprendizado, a privacidade ou o cuidado com outras pessoas. A IA pode ajudar, mas decisões importantes ainda precisam de responsabilidade e pensamento crítico."
  },
  finalBom: {
    tipo: "final",
    status: "bom",
    texto: "FINAL BOM: você reconheceu seus erros, conferiu informações e fez escolhas mais responsáveis. Aprender e corrigir o caminho também fazem parte de usar tecnologia com consciência."
  },
  finalBom2: {
    tipo: "final",
    status: "bom",
    texto: "FINAL BOM: você respeitou o consentimento e a privacidade e ajudou a definir limites para o uso da tecnologia. Fazer escolhas responsáveis é tão importante quanto decidir se vai usar IA."
  },
  finalExcelente: {
    tipo: "final",
    status: "excelente",
    texto: "FINAL EXCELENTE: você usou a tecnologia com equilíbrio, verificou informações e respeitou outras pessoas. A IA foi uma aliada, enquanto o pensamento humano continuou no comando."
  },
};

let estadoAtual = "inicio";
let situacoesRespondidas = 0;
const escolhas = [];
const inicioHistoria = "A feira de ciências da escola acontece amanhã. Você e seu grupo estão preparando um estande sobre inteligência artificial: querem mostrar como ela pode ajudar, mas também quais cuidados são importantes.";

function mostraPergunta() {
  const etapaAtual = fluxo[estadoAtual];

  if (!etapaAtual || etapaAtual.tipo === "final") {
    caixaPerguntas.textContent = "Você decidiu o futuro da IA!";
    progresso.textContent = `${situacoesRespondidas} situações concluídas`;
    caixaAlternativas.innerHTML = "";
    caixaResultado.style.display = "block";
    botaoReiniciar.style.display = "inline-block";

    textoResultado.textContent = [
      inicioHistoria,
      ...escolhas,
      etapaAtual?.texto || "Sua decisão foi registrada."
    ].join("\n\n");

    if (etapaAtual?.status === "ruim") {
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

  progresso.textContent = `Situação ${situacoesRespondidas + 1}`;
  caixaPerguntas.textContent = etapaAtual.enunciado;
  caixaAlternativas.innerHTML = "";
  caixaResultado.style.display = "none";
  botaoReiniciar.style.display = "none";

  etapaAtual.alternativas.forEach((alternativa) => {
    const botaoAlternativas = document.createElement("button");
    botaoAlternativas.type = "button";
    botaoAlternativas.textContent = alternativa.texto;
    botaoAlternativas.className = "botao-alternativa";

    botaoAlternativas.addEventListener("click", () => {
      escolhas.push(alternativa.narrativa);
      situacoesRespondidas += 1;
      estadoAtual = alternativa.proximo;
      mostraPergunta();
    });
 
    caixaAlternativas.appendChild(botaoAlternativas);
  });
}

caixaResultado.style.display = "none";
textoResultado.style.color = "#deffd7";
caixaResultado.style.border = "1px solid transparent";
botaoReiniciar.style.display = "none";

botaoReiniciar.addEventListener("click", () => {
  estadoAtual = "inicio";
  escolhas.length = 0;
  situacoesRespondidas = 0;
  textoResultado.textContent = "";
  textoResultado.style.color = "#deffd7";
  caixaResultado.style.border = "1px solid transparent";
  mostraPergunta();
});

mostraPergunta();