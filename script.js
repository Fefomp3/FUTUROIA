const caixaPrincipal = document.querySelector(".caixa-principal");
const progresso = document.querySelector(".progresso");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const tituloFinal = document.querySelector(".titulo-final");
const botaoVerMais = document.querySelector(".botao-ver-mais");
const textoResultado = document.querySelector(".texto-resultado");
const botaoReiniciar = document.querySelector(".botao-reiniciar");
const botaoTentarNovamente = document.querySelector(".botao-tentar-novamente");
const telaInicial = document.querySelector(".tela-inicial");
const formularioInicial = document.querySelector(".formulario-inicial");
const campoNickname = document.querySelector("#nickname");
const conteudoJogo = document.querySelector(".conteudo-jogo");
const telaCreditos = document.querySelector(".tela-creditos");
const botaoVoltarCreditos = document.querySelector(".botao-voltar-creditos");
const botoesCreditos = document.querySelectorAll(".botao-creditos");
const botaoCreditosFinal = document.querySelector(".botao-creditos-final");
const botaoTema = document.querySelector(".botao-tema");
const tituloCreditos = document.querySelector("#titulo-creditos");

let telaAnteriorCreditos = telaInicial;
let botaoAnteriorCreditos;

function abreTelaCreditos(evento) {
  botaoAnteriorCreditos = evento.currentTarget;
  telaAnteriorCreditos = botaoAnteriorCreditos.classList.contains("botao-creditos-final")
    ? conteudoJogo
    : telaInicial;
  telaInicial.hidden = true;
  conteudoJogo.hidden = true;
  telaCreditos.hidden = false;
  tituloCreditos.focus();
}

function defineTema(tema) {
  const temaEscuro = tema === "escuro";
  document.body.dataset.tema = temaEscuro ? "escuro" : "claro";
  botaoTema.textContent = `Tema: ${temaEscuro ? "escuro" : "claro"}`;
  botaoTema.setAttribute("aria-pressed", String(temaEscuro));
}

botaoTema.addEventListener("click", () => {
  defineTema(document.body.dataset.tema === "escuro" ? "claro" : "escuro");
});

const fluxo = {
  inicio: {
    enunciado: "Faltam dois dias para a feira de ciências. Seu grupo vai montar um estande sobre inteligência artificial: quer mostrar usos úteis, mas também riscos e limites. A equipe tem ideias demais e pouco tempo. Qual é o primeiro passo?",
    alternativas: [
      {
        texto: "Peço à IA um roteiro e uso a resposta para organizar perguntas de pesquisa",
        narrativa: "Você pede um roteiro à IA, mas transforma cada tópico em uma pergunta para investigar. O grupo divide as tarefas e combina que nenhuma sugestão entrará no estande sem ser compreendida e conferida.",
        proximo: "estudo"
      },
      {
        texto: "Começo pelas anotações e converso com a professora e a equipe",
        narrativa: "Você reúne anotações, livros e dúvidas para conversar com a professora. Na reunião, descobre que alguns colegas querem testar ferramentas de IA e outros preferem não usá-las.",
        proximo: "semIA"
      }
    ]
  },
  estudo: {
    enunciado: "O grupo já tem perguntas para investigar. Você precisa preparar uma explicação sobre como a IA aprende com exemplos. Como vai estudar o assunto?",
    alternativas: [
      {
        texto: "Peço uma explicação, comparo com o material da aula e faço minhas próprias anotações",
        narrativa: "Você pede uma explicação em linguagem simples, compara cada ideia com o material da aula e anota o que ainda precisa confirmar. Aos poucos, consegue explicar o tema sem depender da resposta da ferramenta.",
        proximo: "pesquisa"
      },
      {
        texto: "Peço um parágrafo pronto e colo no cartaz sem estudar",
        narrativa: "Com pressa, você cola um parágrafo pronto no cartaz. No ensaio, uma colega pergunta o que uma frase significa e você percebe que não conseguiria explicar sua própria parte.",
        proximo: "dependencia"
      }
    ]
  },
  dependencia: {
    enunciado: "A equipe está esperando para ensaiar, e você não entende o texto que entregou. Como reage?",
    alternativas: [
      {
        texto: "Conto a verdade e volto ao material para aprender antes de escrever",
        narrativa: "Você admite que não entendeu e pede ajuda, mesmo sabendo que isso atrasa o grupo. A equipe decide voltar às perguntas de pesquisa e reconstruir a explicação com você.",
        proximo: "estudo"
      },
      {
        texto: "Finjo que entendi e tento decorar o texto para o ensaio",
        narrativa: "Com vergonha de atrasar a equipe, você finge que entendeu. Durante o ensaio, as perguntas mudam e a resposta decorada não ajuda; agora o grupo precisa decidir se refaz o material ou esconde o problema.",
        proximo: "ensaio"
      }
    ]
  },
  ensaio: {
    enunciado: "No ensaio, você se perde quando uma colega faz uma pergunta diferente da resposta decorada. Ainda dá tempo de mudar a apresentação. O que faz?",
    alternativas: [
      {
        texto: "Peço uma pausa e volto a estudar a ideia desde o começo",
        narrativa: "Você interrompe o ensaio e explica o que ainda não entendeu. A equipe reorganiza o tempo e volta ao estudo antes de seguir com o cartaz.",
        proximo: "estudo"
      },
      {
        texto: "Reescrevo a parte com ajuda, assumo o erro e confiro o que vou dizer",
        narrativa: "Você pede ajuda para reconstruir a explicação e decide contar ao grupo que o primeiro texto não era seu. A professora recomenda revisar também as fontes e a autoria antes de apresentar.",
        proximo: "revisaoAutor"
      }
    ]
  },
  pesquisa: {
    enunciado: "A IA sugeriu números e referências para o cartaz. Um endereço parece não abrir, mas o dado combina com o que vocês esperavam. Como a equipe verifica a informação?",
    alternativas: [
      {
        texto: "Procuro as fontes originais e só uso o que consigo confirmar",
        narrativa: "Vocês procuram as fontes originais, comparam datas e registram de onde veio cada dado. Uma referência não existe, mas as outras informações são confirmadas; a equipe aprende que uma resposta convincente ainda pode conter erros.",
        proximo: "privacidade"
      },
      {
        texto: "Uso os números porque parecem plausíveis e o prazo está acabando",
        narrativa: "O grupo coloca os números no cartaz sem confirmar as referências. Na feira, um visitante tenta abrir uma das fontes e percebe que ela não existe; a equipe precisa decidir se interrompe a apresentação para corrigir o erro.",
        proximo: "boato"
      }
    ]
  },
  privacidade: {
    enunciado: "Uma ferramenta oferece sugestões mais personalizadas se vocês enviarem exemplos de trabalhos da turma. Entre eles há textos com nomes e comentários de colegas. O que você compartilha?",
    alternativas: [
      {
        texto: "Retiro nomes e detalhes pessoais e envio apenas um exemplo autorizado",
        narrativa: "Você remove os dados pessoais e confirma com a colega se o exemplo pode ser usado. A equipe compartilha apenas o trecho necessário e conversa sobre quem poderá ver o material enviado.",
        proximo: "autoria"
      },
      {
        texto: "Envio os arquivos completos porque a ferramenta promete boas sugestões",
        narrativa: "Você envia os arquivos sem retirar nomes nem pedir autorização. Depois, percebe que os dados não eram necessários e não sabe quem poderá acessar os exemplos compartilhados.",
        proximo: "exposicao"
      }
    ]
  },
  exposicao: {
    enunciado: "A professora percebe que os arquivos enviados incluem nomes e comentários privados. Ainda é possível limitar o compartilhamento. Qual é o próximo passo?",
    alternativas: [
      {
        texto: "Peço ajuda para apagar os arquivos e volto a revisar o que é necessário",
        narrativa: "Com a professora, você apaga os arquivos e confere as permissões da ferramenta. O grupo retorna à decisão sobre quais dados pode compartilhar e escolhe um exemplo sem informações pessoais.",
        proximo: "privacidade"
      },
      {
        texto: "Não conto a ninguém e mantenho os arquivos compartilhados",
        narrativa: "Você evita conversar sobre o envio e deixa os arquivos disponíveis. A equipe perde a chance de proteger os colegas e de pedir orientação sobre o incidente.",
        proximo: "finalPrivacidade"
      }
    ]
  },
  autoria: {
    enunciado: "O texto está quase pronto. A IA sugeriu exemplos e reformulou alguns trechos. Como a equipe vai apresentar essa colaboração?",
    alternativas: [
      {
        texto: "Confiro cada trecho, acrescento ideias do grupo e identifico o uso da IA",
        narrativa: "A equipe revisa as sugestões, substitui exemplos que não representam a turma e registra como a ferramenta foi usada. Vocês combinam que uma pessoa vai conferir se as recomendações funcionam para colegas diferentes.",
        proximo: "vies"
      },
      {
        texto: "Apresento o texto da IA como se tivesse sido escrito pela equipe",
        narrativa: "Você apaga a indicação de uso da ferramenta e entrega o texto sem revisão. No ensaio, uma colega encontra um exemplo injusto sobre um grupo de pessoas e pergunta quem conferiu aquilo.",
        proximo: "ensaio"
      }
    ]
  },
  vies: {
    enunciado: "Ao testar o material, vocês notam que a ferramenta sempre associa certas profissões a um único perfil de pessoa. O que fazem com essa descoberta?",
    alternativas: [
      {
        texto: "Comparamos exemplos, ouvimos colegas e corrigimos as generalizações",
        narrativa: "A equipe compara os exemplos com outras fontes e conversa com colegas sem pedir que ninguém fale por todo um grupo. Vocês substituem generalizações por exemplos variados e verificáveis.",
        proximo: "acessibilidade"
      },
      {
        texto: "Mantemos os exemplos porque vieram de uma ferramenta conhecida",
        narrativa: "O grupo mantém os exemplos sem investigar de onde vieram. Uma colega aponta o problema e pergunta se vocês vão assumir a responsabilidade ou esconder a origem do texto.",
        proximo: "revisaoAutor"
      }
    ]
  },
  revisaoAutor: {
    enunciado: "O grupo identificou trechos que não foram verificados ou que escondem a participação da IA. Como vocês resolvem isso antes de abrir o estande?",
    alternativas: [
      {
        texto: "Refazemos os trechos, verificamos as fontes e deixamos a colaboração clara",
        narrativa: "Vocês retiram os trechos problemáticos, conferem as informações e registram o que foi criado, revisado e aprendido pelo grupo. A equipe volta à etapa de autoria para preparar uma versão transparente.",
        proximo: "autoria"
      },
      {
        texto: "Escondemos a origem e esperamos que ninguém pergunte",
        narrativa: "O grupo mantém as informações sem revisão e esconde como o material foi produzido. Sem conseguir explicar as escolhas, vocês não estão prontos para apresentar o projeto com responsabilidade.",
        proximo: "finalAutoria"
      }
    ]
  },
  acessibilidade: {
    enunciado: "Na montagem, um colega com baixa visão diz que as letras claras somem no fundo do cartaz. O grupo também percebe que há muito texto. O que muda?",
    alternativas: [
      {
        texto: "Aumentamos o contraste, resumimos o texto e testamos com visitantes",
        narrativa: "Vocês aumentam o contraste, reorganizam as informações e oferecem uma descrição das imagens. Depois, pedem a pessoas diferentes que testem o material antes da abertura.",
        proximo: "impacto"
      },
      {
        texto: "Deixamos como está para não atrasar a abertura",
        narrativa: "O cartaz fica difícil de ler para alguns visitantes. A equipe consegue abrir o estande, mas nem todos podem acompanhar a explicação nas mesmas condições.",
        proximo: "finalLimitado"
      }
    ]
  },
  impacto: {
    enunciado: "Pouco antes da abertura, um colega traz uma notícia alarmante e uma imagem realista, ambas criadas por IA. Ele quer usá-las para atrair visitantes. Qual é a decisão do grupo?",
    alternativas: [
      {
        texto: "Investigamos a notícia, identificamos a imagem e explicamos os limites do material",
        narrativa: "Vocês procuram a origem da notícia, não encontram confirmação e decidem não apresentá-la como verdadeira. A imagem é identificada como sintética, e a equipe prepara uma explicação sobre como verificar conteúdos.",
        proximo: "apresentacao"
      },
      {
        texto: "Publicamos a notícia e a imagem; parecem reais e a feira vai começar",
        narrativa: "A equipe publica o material sem verificar. Uma visitante reconhece a notícia como falsa e pergunta por que o estande a apresenta como fato; o grupo precisa interromper a atividade e rever a checagem.",
        proximo: "boato"
      }
    ]
  },
  apresentacao: {
    enunciado: "O estande abriu, e os visitantes perguntam como vocês decidiram o que era confiável. Como encerram a apresentação?",
    alternativas: [
      {
        texto: "Mostramos as fontes, contamos o que não conseguimos confirmar e ouvimos perguntas",
        narrativa: "Vocês mostram as fontes consultadas, explicam o que foi descartado e reconhecem o que ainda não sabem. Os visitantes participam da conversa, e o grupo apresenta tanto os resultados quanto os limites da investigação.",
        proximo: "finalExcelente"
      },
      {
        texto: "Mostramos apenas a conclusão para parecer que temos todas as respostas",
        narrativa: "O grupo apresenta as fontes, mas omite dúvidas e limites para parecer mais seguro. A pesquisa está correta, embora a conversa pudesse ter sido mais transparente sobre as incertezas.",
        proximo: "finalBom"
      }
    ]
  },
  boato: {
    enunciado: "O estande está aberto e vocês descobriram que um dado divulgado não tem fonte confiável. Como lidam com o erro?",
    alternativas: [
      {
        texto: "Retiramos o dado, avisamos os visitantes e voltamos à checagem",
        narrativa: "Vocês cobrem o dado, explicam o erro às pessoas que já o viram e pausam a apresentação. Para reabrir o estande, a equipe volta à pesquisa e confirma as fontes desde o início.",
        proximo: "pesquisa"
      },
      {
        texto: "Deixamos o material no estande para evitar constrangimento",
        narrativa: "Para não admitir o erro, vocês deixam a informação exposta. Mais visitantes saem com uma afirmação sem fonte como se fosse verdadeira.",
        proximo: "finalDesinformacao"
      }
    ]
  },
  semIA: {
    enunciado: "Na reunião, algumas pessoas querem usar IA e outras preferem trabalhar sem ela. Como você participa da decisão?",
    alternativas: [
      {
        texto: "Ajudo a combinar as tarefas e critérios que todos vão seguir",
        narrativa: "Você ajuda a equipe a definir tarefas, fontes aceitáveis e regras para identificar conteúdos feitos com IA. O grupo começa a pesquisa com critérios em comum.",
        proximo: "reuniao"
      },
      {
        texto: "Saio da conversa e deixo as decisões para os outros",
        narrativa: "Você se afasta da conversa. Sem combinar limites, um colega decide usar a foto de outra pessoa para criar uma imagem engraçada para o estande.",
        proximo: "equipe"
      }
    ]
  },
  reuniao: {
    enunciado: "Com as tarefas divididas, a equipe discorda sobre uma estatística que encontrou. Como decide o que fazer?",
    alternativas: [
      {
        texto: "Comparamos a fonte original com outras referências antes de publicar",
        narrativa: "A equipe compara a estatística com fontes independentes e anota por que escolheu manter ou descartar cada dado. A pesquisa fica mais lenta, mas todos entendem o que será apresentado.",
        proximo: "pesquisa"
      },
      {
        texto: "Escolhemos o número mais chamativo e seguimos para montar o estande",
        narrativa: "O grupo escolhe a estatística mais impressionante sem resolver a divergência. Durante a montagem, alguém sugere acrescentar uma notícia viral para chamar atenção.",
        proximo: "impacto"
      }
    ]
  },
  equipe: {
    enunciado: "A pessoa da foto descobre a imagem e não autorizou o uso. O que você propõe ao grupo?",
    alternativas: [
      {
        texto: "Retiramos a imagem, pedimos desculpas e usamos uma ilustração sem dados pessoais",
        narrativa: "Vocês retiram a imagem, pedem desculpas e perguntam como reparar a situação. A pessoa prefere não aparecer; o grupo escolhe uma ilustração neutra e revisa o material antes de expô-lo.",
        proximo: "reparacaoImagem"
      },
      {
        texto: "Dizemos que era uma brincadeira e mantemos a imagem",
        narrativa: "O grupo minimiza o ocorrido e mantém a imagem. A pessoa fica chateada ao ver sua foto transformada e exposta sem consentimento.",
        proximo: "finalConsentimento"
      }
    ]
  },
  reparacaoImagem: {
    enunciado: "A imagem foi retirada. Antes da abertura, como vocês garantem que a substituição respeita a pessoa e o restante da turma?",
    alternativas: [
      {
        texto: "Usamos uma ilustração neutra e perguntamos se a pessoa quer conversar sobre a reparação",
        narrativa: "A equipe escolhe uma ilustração neutra, respeita a decisão da pessoa e confere se o restante do material está acessível. Vocês também combinam de pedir autorização antes de usar imagens no futuro.",
        proximo: "finalBom2"
      },
      {
        texto: "Trocamos por outra foto da turma sem perguntar para ganhar tempo",
        narrativa: "A equipe troca uma imagem sem autorização por outra imagem sem autorização. O problema continua, mesmo que a primeira foto tenha sido removida.",
        proximo: "finalConsentimento"
      }
    ]
  },
  finalPrivacidade: {
    tipo: "final",
    status: "ruim",
    texto: "FIM RUIM: nomes e trabalhos de colegas ficaram expostos, e a equipe não tomou medidas para limitar o compartilhamento. Proteger dados exige pedir consentimento, compartilhar só o necessário e agir quando algo dá errado."
  },
  finalAutoria: {
    tipo: "final",
    status: "ruim",
    texto: "FIM RUIM: o grupo manteve conteúdo sem verificar ou escondeu como foi produzido. Sem transparência e domínio do assunto, a apresentação perdeu a confiança dos visitantes."
  },
  finalDesinformacao: {
    tipo: "final",
    status: "ruim",
    texto: "FIM RUIM: a informação sem fonte permaneceu no estande e continuou sendo repetida. Corrigir um erro publicamente é melhor do que permitir que ele se espalhe."
  },
  finalConsentimento: {
    tipo: "final",
    status: "ruim",
    texto: "FIM RUIM: a equipe usou imagens de colegas sem autorização, mesmo após ser avisada. Uma brincadeira não substitui consentimento; a exposição pode magoar e quebrar a confiança."
  },
  finalBom: {
    tipo: "final",
    status: "bom",
    texto: "FINAL BOM: a equipe pesquisou e corrigiu o material, embora pudesse ter compartilhado melhor suas dúvidas. Reconhecer limites e continuar aprendendo também são sinais de responsabilidade."
  },
  finalBom2: {
    tipo: "final",
    status: "bom",
    texto: "FINAL BOM: vocês respeitaram o consentimento e revisaram o material depois de um erro. Reparar danos e combinar limites para o futuro também fazem parte de usar tecnologia com responsabilidade."
  },
  finalExcelente: {
    tipo: "final",
    status: "excelente",
    texto: "FINAL EXCELENTE: a equipe verificou informações, reconheceu os limites da IA, ouviu pessoas diferentes e respeitou privacidade e autoria. A tecnologia ajudou, mas o pensamento crítico e o cuidado coletivo guiaram as decisões."
  },
  finalLimitado: {
    tipo: "final",
    status: "limitado",
    texto: "FINAL COM UM ALERTA: o estande ficou pronto, mas algumas pessoas tiveram dificuldade para participar. Acessibilidade não é um detalhe; ouvir quem usa o material pode revelar mudanças importantes."
  },
};

const caminhosEspecificos = {
  inicio: {
    voltar: {
      texto: "Reunir a equipe outra vez para listar o que já sabemos",
      narrativa: "Você pausa o planejamento e volta à primeira conversa da equipe para separar fatos, dúvidas e tarefas antes de escolher uma estratégia.",
      proximo: "inicio"
    },
    gameover: {
      texto: "Montar o estande agora com o conteúdo que parecer mais chamativo",
      narrativa: "Sem verificar o conteúdo nem combinar responsabilidades, vocês produzem um estande apressado e pronto para divulgar informações incorretas.",
      proximo: "finalDesinformacao"
    }
  },
  estudo: {
    voltar: {
      texto: "Revisar o roteiro da equipe antes de escolher o que estudar",
      narrativa: "Você volta ao planejamento inicial e percebe que o grupo começou a explicar um tema antes de definir quais perguntas precisavam responder.",
      proximo: "inicio"
    },
    gameover: {
      texto: "Copiar o parágrafo mais completo que encontrar e decorar",
      narrativa: "A pressa vence o cuidado: você mantém um texto que não entende e tenta apresentá-lo como próprio.",
      proximo: "finalAutoria"
    }
  },
  dependencia: {
    voltar: {
      texto: "Abrir novamente as anotações usadas no início do estudo",
      narrativa: "Você volta ao material original e reconstrói a explicação com a ajuda da equipe, em vez de depender do texto pronto.",
      proximo: "estudo"
    },
    gameover: {
      texto: "Esconder que você não entende e continuar no ensaio",
      narrativa: "Para evitar atrasar o grupo, você tenta parecer seguro e esconde que não domina o assunto.",
      proximo: "finalAutoria"
    }
  },
  ensaio: {
    voltar: {
      texto: "Pausar o ensaio e perguntar qual parte não ficou clara",
      narrativa: "Você volta ao trecho que falhou e pede à equipe que retome a explicação desde o ponto que vocês já dominavam.",
      proximo: "dependencia"
    },
    gameover: {
      texto: "Improvisar uma resposta que não aparece nas fontes",
      narrativa: "Durante a pergunta, você inventa uma explicação para não admitir o erro.",
      proximo: "finalDesinformacao"
    }
  },
  pesquisa: {
    voltar: {
      texto: "Revisar o assunto com as explicações estudadas pela equipe",
      narrativa: "Diante das referências difíceis de confirmar, você volta ao que a equipe já compreendeu e separa esse conhecimento das afirmações novas.",
      proximo: "estudo"
    },
    gameover: {
      texto: "Publicar os números chamativos sem encontrar as fontes",
      narrativa: "O prazo parece mais urgente do que a precisão, e o grupo mantém dados que ninguém conseguiu conferir.",
      proximo: "finalDesinformacao"
    }
  },
  privacidade: {
    voltar: {
      texto: "Excluir os exemplos pessoais e reabrir a checagem das fontes",
      narrativa: "Você percebe que privacidade e pesquisa precisam ser resolvidas juntas e volta à conferência das referências sem dados da turma.",
      proximo: "pesquisa"
    },
    gameover: {
      texto: "Enviar todos os trabalhos apenas porque a ferramenta foi autorizada",
      narrativa: "Você ignora nomes e comentários privados e entrega os arquivos completos à ferramenta.",
      proximo: "finalPrivacidade"
    }
  },
  exposicao: {
    voltar: {
      texto: "Voltar à escolha anterior e retirar informações pessoais",
      narrativa: "Você conversa com a professora e reconsidera qual exemplo poderia ser compartilhado sem expor nomes ou comentários.",
      proximo: "privacidade"
    },
    gameover: {
      texto: "Ocultar o envio da professora e dos colegas",
      narrativa: "Você decide não contar sobre os arquivos enviados e deixa a exposição pessoal sem correção.",
      proximo: "finalPrivacidade"
    }
  },
  autoria: {
    voltar: {
      texto: "Retomar os dados já pesquisados antes de publicar o texto",
      narrativa: "Você percebe que o texto ainda não está transparente e volta às fontes para revisar informações e autoria com o grupo.",
      proximo: "privacidade"
    },
    gameover: {
      texto: "Apresentar o texto completo como criação exclusiva da equipe",
      narrativa: "Vocês apagam a participação da IA e fingem que todo o texto surgiu apenas do grupo.",
      proximo: "finalAutoria"
    }
  },
  vies: {
    voltar: {
      texto: "Voltar à revisão do texto e registrar a participação da IA",
      narrativa: "Você volta à etapa de autoria para corrigir o texto e explicar claramente como a ferramenta ajudou.",
      proximo: "autoria"
    },
    gameover: {
      texto: "Manter os exemplos tendenciosos porque já estão no cartaz",
      narrativa: "O grupo decide não questionar generalizações e mantém no estande uma visão que exclui pessoas.",
      proximo: "finalAutoria"
    }
  },
  revisaoAutor: {
    voltar: {
      texto: "Checar novamente os exemplos que mostravam possíveis vieses",
      narrativa: "Você volta aos exemplos problemáticos e registra quais precisam ser corrigidos antes de qualquer publicação.",
      proximo: "vies"
    },
    gameover: {
      texto: "Esconder os trechos problemáticos e entregar o cartaz",
      narrativa: "Sem refazer o conteúdo nem admitir os problemas, vocês apresentam informações que não foram revistas.",
      proximo: "finalAutoria"
    }
  },
  acessibilidade: {
    voltar: {
      texto: "Rever os exemplos inclusivos antes de alterar o cartaz",
      narrativa: "Você volta ao teste de exemplos diversos e verifica quais formas de apresentação podem excluir visitantes.",
      proximo: "vies"
    },
    gameover: {
      texto: "Ignorar o aviso do colega para não atrasar a feira",
      narrativa: "A equipe mantém letras difíceis de ler e muito texto, deixando alguns visitantes de fora.",
      proximo: "finalLimitado"
    }
  },
  impacto: {
    voltar: {
      texto: "Retomar o teste do cartaz antes de acrescentar conteúdo",
      narrativa: "Você suspende a inclusão da notícia e volta ao material acessível já preparado pela equipe.",
      proximo: "acessibilidade"
    },
    gameover: {
      texto: "Usar a notícia e a imagem apenas porque parecem reais",
      narrativa: "Sem conferir autoria nem origem, a equipe publica material sintético como se fosse um fato.",
      proximo: "finalDesinformacao"
    }
  },
  apresentacao: {
    voltar: {
      texto: "Interromper a conversa e conferir a notícia usada no estande",
      narrativa: "Ao perceber que uma resposta depende de algo não confirmado, você volta à verificação do conteúdo.",
      proximo: "impacto"
    },
    gameover: {
      texto: "Responder a todas as dúvidas com conclusões inventadas",
      narrativa: "A equipe prefere parecer segura a admitir limites e cria respostas sem fonte para terminar a apresentação.",
      proximo: "finalDesinformacao"
    }
  },
  boato: {
    voltar: {
      texto: "Voltar ao método usado para verificar as fontes",
      narrativa: "Você reconhece a falha e volta à etapa da pesquisa para revisar todos os dados com uma lista de fontes confiáveis.",
      proximo: "pesquisa"
    },
    gameover: {
      texto: "Cobrir o erro e dizer que o dado é verdadeiro",
      narrativa: "Para evitar constrangimento, vocês mantêm a afirmação falsa no estande.",
      proximo: "finalDesinformacao"
    }
  },
  semIA: {
    voltar: {
      texto: "Voltar ao planejamento geral da feira",
      narrativa: "Você pede uma nova conversa inicial para organizar o que é necessário antes de decidir como usar ou não a IA.",
      proximo: "inicio"
    },
    gameover: {
      texto: "Fazer um projeto individual com uma imagem de outra pessoa",
      narrativa: "Sem combinar limites com o grupo, você usa uma fotografia sem autorização.",
      proximo: "finalConsentimento"
    }
  },
  reuniao: {
    voltar: {
      texto: "Voltar às regras combinadas pela equipe",
      narrativa: "Você revisa os critérios que a reunião deveria seguir e separa novamente tarefas e fontes aceitáveis.",
      proximo: "semIA"
    },
    gameover: {
      texto: "Aceitar a estatística mais chamativa para acabar com a discussão",
      narrativa: "A equipe interrompe a análise e usa um dado sem confirmar apenas para evitar divergências.",
      proximo: "finalDesinformacao"
    }
  },
  equipe: {
    voltar: {
      texto: "Retomar a reunião e perguntar como pedir consentimento",
      narrativa: "Você volta à divisão de tarefas para conversar sobre autorização antes de qualquer edição ou publicação.",
      proximo: "reuniao"
    },
    gameover: {
      texto: "Chamar a foto de brincadeira e mantê-la no estande",
      narrativa: "Vocês minimizam o desconforto da pessoa e continuam expondo sua imagem sem autorização.",
      proximo: "finalConsentimento"
    }
  },
  reparacaoImagem: {
    voltar: {
      texto: "Voltar ao motivo da retirada e conversar novamente com a pessoa",
      narrativa: "Antes de substituir a imagem, você confirma o que pode ser usado e deixa a pessoa decidir como o problema será reparado.",
      proximo: "equipe"
    },
    gameover: {
      texto: "Escolher outra foto da turma sem pedir permissão",
      narrativa: "A equipe troca a primeira imagem por outra sem autorização e repete o mesmo erro.",
      proximo: "finalConsentimento"
    }
  }
};

Object.entries(fluxo).forEach(([nome, etapa]) => {
  if (etapa.tipo === "final") return;

  const avancar = etapa.alternativas[0];
  avancar.tipo = "avancar";
  const caminhos = caminhosEspecificos[nome];

  etapa.alternativas = [
    avancar,
    {
      tipo: "voltar",
      ...caminhos.voltar
    },
    {
      tipo: "gameover",
      ...caminhos.gameover
    }
  ];
});

let estadoAtual = "inicio";
let situacoesRespondidas = 0;
let nickname = "Visitante";
const escolhas = [];
const inicioHistoria = "A feira de ciências da escola acontece amanhã. Você e seu grupo estão preparando um estande sobre inteligência artificial: querem mostrar como ela pode ajudar, mas também quais cuidados são importantes.";

function mostraPergunta() {
  const etapaAtual = fluxo[estadoAtual];

  if (!etapaAtual || etapaAtual.tipo === "final") {
    botaoCreditosFinal.hidden = false;
    botaoTentarNovamente.hidden = false;
    const statusFinal = etapaAtual?.status;
    tituloFinal.textContent = statusFinal === "ruim"
      ? "GAME OVER"
      : statusFinal === "excelente"
        ? "VITÓRIA!!!"
        : "THE END";
    tituloFinal.className = `titulo-final${statusFinal ? ` titulo-final-${statusFinal}` : ""}`;
    tituloFinal.hidden = false;
    textoResultado.hidden = true;
    botaoVerMais.hidden = false;
    botaoVerMais.textContent = "Ver mais";
    botaoVerMais.setAttribute("aria-expanded", "false");
    botaoVerMais.setAttribute("aria-label", "Ver o resumo completo das escolhas");
    caixaPerguntas.textContent = `${nickname}, você decidiu o futuro da IA!`;
    progresso.textContent = `${situacoesRespondidas} situações concluídas`;
    caixaAlternativas.innerHTML = "";
    caixaResultado.style.display = "block";
    botaoReiniciar.style.display = "inline-block";

    textoResultado.textContent = [
      `Jornada de ${nickname}. ${inicioHistoria}`,
      ...escolhas,
      etapaAtual?.texto || "Sua decisão foi registrada."
    ].join("\n\n");

    if (etapaAtual?.status === "ruim") {
      textoResultado.style.color = "var(--cor-resultado-ruim)";
      caixaResultado.style.border = "2px solid var(--cor-borda-resultado-ruim)";
    } else if (etapaAtual?.status === "excelente") {
      textoResultado.style.color = "var(--cor-resultado-excelente)";
      caixaResultado.style.border = "2px solid var(--cor-borda-resultado-excelente)";
    } else {
      textoResultado.style.color = "var(--cor-resultado-normal)";
      caixaResultado.style.border = "2px solid var(--cor-borda-resultado-normal)";
    }

    return;
  }

  botaoCreditosFinal.hidden = true;
  botaoTentarNovamente.hidden = true;
  progresso.textContent = `Situação ${situacoesRespondidas + 1}`;
  caixaPerguntas.textContent = etapaAtual.enunciado;
  caixaAlternativas.innerHTML = "";
  caixaResultado.style.display = "none";
  tituloFinal.hidden = true;
  textoResultado.hidden = true;
  botaoVerMais.hidden = true;
  botaoVerMais.textContent = "Ver mais";
  botaoVerMais.setAttribute("aria-expanded", "false");
  botaoReiniciar.style.display = "none";

  etapaAtual.alternativas.forEach((alternativa) => {
    const botaoAlternativas = document.createElement("button");
    botaoAlternativas.type = "button";
    botaoAlternativas.textContent = alternativa.texto;
    botaoAlternativas.className = `botao-alternativa botao-alternativa-${alternativa.tipo}`;

    botaoAlternativas.addEventListener("click", () => {
      escolhas.push(alternativa.narrativa);
      if (alternativa.tipo !== "voltar") {
        situacoesRespondidas += 1;
      }
      estadoAtual = alternativa.proximo;
      mostraPergunta();
    });
 
    caixaAlternativas.appendChild(botaoAlternativas);
  });
}

caixaResultado.style.display = "none";
textoResultado.style.color = "var(--cor-resultado-normal)";
caixaResultado.style.border = "1px solid transparent";
botaoReiniciar.style.display = "none";

botaoVerMais.addEventListener("click", () => {
  const expandido = botaoVerMais.getAttribute("aria-expanded") !== "true";
  textoResultado.hidden = !expandido;
  botaoVerMais.textContent = expandido ? "Ver menos" : "Ver mais";
  botaoVerMais.setAttribute("aria-expanded", String(expandido));
  botaoVerMais.setAttribute(
    "aria-label",
    expandido ? "Recolher o resumo das escolhas" : "Ver o resumo completo das escolhas"
  );
});

botoesCreditos.forEach((botao) => {
  botao.addEventListener("click", abreTelaCreditos);
});

botaoVoltarCreditos.addEventListener("click", () => {
  telaCreditos.hidden = true;
  telaInicial.hidden = telaAnteriorCreditos !== telaInicial;
  conteudoJogo.hidden = telaAnteriorCreditos !== conteudoJogo;
  botaoAnteriorCreditos.focus();
});

formularioInicial.addEventListener("submit", (evento) => {
  evento.preventDefault();
  nickname = campoNickname.value.trim() || "Visitante";
  telaCreditos.hidden = true;
  telaInicial.hidden = true;
  conteudoJogo.hidden = false;
  mostraPergunta();
});

function limpaJornada() {
  estadoAtual = "inicio";
  escolhas.length = 0;
  situacoesRespondidas = 0;
  progresso.textContent = "";
  textoResultado.textContent = "";
  textoResultado.style.color = "var(--cor-resultado-normal)";
  caixaResultado.style.border = "1px solid transparent";
  tituloFinal.hidden = true;
  textoResultado.hidden = true;
  botaoVerMais.hidden = true;
  botaoVerMais.textContent = "Ver mais";
  botaoVerMais.setAttribute("aria-expanded", "false");
  botaoCreditosFinal.hidden = true;
  botaoTentarNovamente.hidden = true;
  telaCreditos.hidden = true;
}

botaoReiniciar.addEventListener("click", () => {
  limpaJornada();
  conteudoJogo.hidden = true;
  telaInicial.hidden = false;
  campoNickname.focus();
});

botaoTentarNovamente.addEventListener("click", () => {
  limpaJornada();
  telaInicial.hidden = true;
  conteudoJogo.hidden = false;
  mostraPergunta();
});