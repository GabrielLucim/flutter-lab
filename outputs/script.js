/*
  Flutter Lab
  Este arquivo controla uma simulação didática. Ele não executa Dart/Flutter.
*/

const missions = [
  {
    id: "variavel",
    title: "Uma caixa com etiqueta",
    level: "DART · DADOS",
    format: "PREENCHER LACUNA",
    goal: "Guardar um nome em uma variável.",
    intro: "Antes de montar uma tela, um aplicativo precisa lembrar de informações. Vamos guardar o nome de quem está usando o Painel de Missões.",
    conceptTitle: "Variável: uma caixa com nome",
    conceptDescription: "Uma variável guarda um valor para ser usado depois. Em Dart, escrevemos o tipo, escolhemos um nome e colocamos o valor. O nome deve dizer o que há dentro da caixa.",
    explanation: [
      ["String", "É o tipo usado para textos, como nomes e mensagens."],
      ["nome", "É a etiqueta da caixa. Um nome claro evita confusão depois."],
      ["=", "Lê-se “recebe”: ele coloca o valor do lado direito dentro da variável."],
      ["\"Nina\"", "Textos ficam entre aspas. Aspas simples também funcionam em Dart."],
      [";", "Fecha esta instrução em Dart."]
    ],
    instruction: "Complete a etiqueta da variável. Queremos guardar o texto “Nina” em uma variável chamada nome.",
    activity: {
      type: "fill",
      prefix: "String ",
      suffix: ' = "Nina";',
      placeholder: "nome",
      ariaLabel: "Nome da variável",
      correct: ["nome"]
    },
    hints: [
      "A lacuna não recebe o texto “Nina”; ela recebe o nome que você dará à caixa.",
      "Um nome de variável começa com letra ou _. Para seguir o exemplo, use nome.",
      "Fica assim: String nome = \"Nina\";"
    ],
    previewTitle: "A informação foi guardada",
    preview: '<div class="output-label">VALOR DA VARIÁVEL</div><div class="output-value">Nina</div><p>Mais tarde, o programa pode usar <code>nome</code> sem digitar “Nina” de novo.</p>',
    evaluate: function (answer) {
      const raw = String(answer || "").trim();
      const value = raw;
      if (!value) return fail("A caixa ainda está sem etiqueta. Escreva um nome para a variável.");
      if (/["']/.test(raw)) return fail("Quase: as aspas são para o valor “Nina”. Aqui falta apenas o nome da variável.");
      if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(raw)) return fail("Um nome de variável não pode começar com número nem ter espaços. Tente uma palavra simples.");
      if (this.activity.correct.indexOf(value) === -1) {
        if (normalise(raw) === "nome") return fail("Quase: Dart diferencia letras maiúsculas e minúsculas. Nos próximos exemplos, a variável é <strong>nome</strong>, toda em minúsculas.");
        return fail("Esse nome seria válido, mas nesta missão vamos usar <strong>nome</strong> para manter o resto dos exemplos fácil de acompanhar.");
      }
      return pass("Boa! <code>nome</code> é a etiqueta, e <code>String</code> avisa que dentro dela existe texto.");
    }
  },
  {
    id: "tipos",
    title: "Cada dado tem seu jeito",
    level: "DART · DADOS",
    format: "ASSOCIAR TIPOS",
    goal: "Distinguir texto, números e verdadeiro/falso.",
    intro: "O app não guarda só nomes. Ele também precisa saber quantas missões foram feitas, uma nota e se a meta já foi concluída. O tipo ajuda o código a entender cada valor.",
    conceptTitle: "Tipo é a categoria do dado",
    conceptDescription: "Dart usa tipos para deixar claro o que cada variável pode guardar. Você não precisa decorar tudo agora: basta enxergar a diferença entre texto, número inteiro, decimal e resposta de sim/não.",
    explanation: [
      ["String", "Guarda texto. Mesmo “2026” entre aspas ainda é texto."],
      ["int", "Guarda números inteiros, como 0, 3 e 42."],
      ["double", "Guarda números com parte decimal, como 8.5 ou 1.75."],
      ["bool", "Só aceita true ou false: verdadeiro ou falso."]
    ],
    instruction: "Associe cada valor ao tipo que ele precisa ter. Leia o valor, não apenas o nome da variável.",
    activity: {
      type: "match",
      fields: [
        { key: "apelido", label: 'apelido = "Nina"', correct: "String" },
        { key: "feitas", label: "missoesFeitas = 3", correct: "int" },
        { key: "media", label: "media = 8.5", correct: "double" },
        { key: "concluida", label: "metaConcluida = false", correct: "bool" }
      ],
      options: ["", "String", "int", "double", "bool"]
    },
    hints: [
      "Procure aspas, vírgula/ponto decimal e as palavras true ou false.",
      "3 não tem casas decimais; 8.5 tem. false não é uma palavra solta: é um valor lógico.",
      "Na ordem: String, int, double e bool."
    ],
    previewTitle: "Quatro valores, quatro categorias",
    preview: '<div class="data-list"><div><span>apelido</span><code>String</code><strong>Nina</strong></div><div><span>missoesFeitas</span><code>int</code><strong>3</strong></div><div><span>media</span><code>double</code><strong>8.5</strong></div><div><span>metaConcluida</span><code>bool</code><strong>false</strong></div></div><p>O tipo funciona como uma etiqueta extra: ele deixa o código mais claro e evita misturar informações diferentes.</p>',
    evaluate: function (answer) {
      const data = answer || {};
      const errors = this.activity.fields.filter(function (field) {
        return data[field.key] !== field.correct;
      });
      if (!Object.keys(data).length) return fail("Escolha um tipo em cada linha antes de conferir.");
      if (!errors.length) return pass("Acertou as quatro categorias. Agora você sabe que “tipo” não é enfeite: ele explica que espécie de dado existe ali.");
      const first = errors[0];
      if (first.key === "apelido") return fail("“Nina” está entre aspas, então é texto. Texto em Dart usa <code>String</code>.");
      if (first.key === "feitas") return fail("3 é um número sem casas decimais. Para ele, escolha <code>int</code>.");
      if (first.key === "media") return fail("8.5 tem parte decimal. Em Dart, números assim usam <code>double</code>.");
      return fail("<code>false</code> responde apenas sim/não. O tipo correto é <code>bool</code>.");
    }
  },
  {
    id: "print",
    title: "Faça o código responder",
    level: "DART · TEXTO",
    format: "PREENCHER LACUNA",
    goal: "Mostrar uma mensagem com interpolação.",
    intro: "Quando estamos aprendendo, o console é como um caderno de recados do programa. O comando print() escreve algo lá. E a interpolação deixa uma frase usar o valor de uma variável.",
    conceptTitle: "Uma frase que se adapta",
    conceptDescription: "Dentro de uma String, o símbolo $ antes do nome da variável coloca o valor dela na frase. Isso evita montar frases diferentes para cada pessoa.",
    explanation: [
      ["print(...)", "Mostra uma informação no console enquanto o programa está rodando."],
      ["\"Boa, ...!\"", "É uma String: uma frase escrita entre aspas."],
      ["$nome", "É a interpolação. O Dart troca isso pelo conteúdo da variável nome."],
      ["$" + "{meta - feitas}", "Quando a expressão é maior, usamos chaves depois do $. Veremos contas na próxima missão."]
    ],
    instruction: "Complete a mensagem para que ela use a variável nome e, quando executada, mostre “Boa, Nina!”.",
    activity: {
      type: "fill",
      prefix: 'print("Boa, ',
      suffix: '!");',
      placeholder: "$nome",
      ariaLabel: "Trecho de interpolação",
      correct: ["$nome"]
    },
    hints: [
      "Você quer inserir uma variável dentro de uma frase, não digitar “Nina” de novo.",
      "Em Dart, uma variável simples entra na String com o símbolo $ antes do nome.",
      "A linha completa é: print(\"Boa, $nome!\");"
    ],
    previewTitle: "O recado que apareceria no console",
    preview: '<div class="output-label">SAÍDA ILUSTRATIVA</div><div class="message-preview">Boa, Nina!</div><p>Se <code>nome</code> mudasse para “Caio”, a mesma linha mostraria “Boa, Caio!”.</p>',
    evaluate: function (answer) {
      const value = String(answer || "").trim();
      if (!value) return fail("Falta o pedaço que conecta a frase à variável.");
      if (value === "nome") return fail("Está perto: sem o <code>$</code>, o Dart leria “nome” como texto comum. Falta o símbolo de interpolação.");
      if (value === "$nome") return pass("Perfeito. <code>$nome</code> será trocado pelo valor guardado na variável quando o Dart executar a linha.");
      if (value.indexOf("Nina") !== -1) return fail("A frase até ficaria parecida, mas o objetivo é ela mudar junto com a variável. Use <code>$nome</code>.");
      return fail("Confira o nome da variável e o símbolo <code>$</code>. A resposta esperada é curta.");
    }
  },
  {
    id: "operadores",
    title: "Descubra o que falta",
    level: "DART · LÓGICA",
    format: "MINI CÓDIGO",
    goal: "Usar uma subtração e imprimir o resultado.",
    intro: "Aplicativos vivem fazendo pequenas contas: pontos que faltam, dias até um evento, itens restantes. Operadores são símbolos que pedem essas contas.",
    conceptTitle: "O sinal - também é uma instrução",
    conceptDescription: "Para saber quantas missões ainda faltam, subtraímos o que já foi feito da meta total. O resultado também pode ser guardado em uma variável.",
    explanation: [
      ["meta - feitas", "Lê-se “meta menos feitas”. O resultado será 3 quando meta é 5 e feitas é 2."],
      ["int faltam", "Como o resultado é inteiro neste exemplo, ele pode ficar em uma variável do tipo int."],
      ["print(faltam)", "Mostra o valor calculado. É uma forma simples de conferir a lógica."],
      ["=", "Aqui continua significando “recebe”; não é uma pergunta de comparação."]
    ],
    instruction: "Crie <code>int faltam</code> calculando <code>meta - feitas</code> e depois mostre o valor com <code>print(faltam);</code>.",
    activity: {
      type: "code",
      starter: [
        "int meta = 5;",
        "int feitas = 2;",
        "",
        "// Guarde a quantidade que falta em uma variável chamada faltam.",
        ""
      ].join("\n")
    },
    hints: [
      "Você não precisa mudar as duas primeiras linhas. Comece uma nova linha com int faltam =",
      "A conta segue a ordem da pergunta: total menos o que já foi feito. Depois imprima a variável.",
      "Uma solução é: int faltam = meta - feitas; e, na linha seguinte, print(faltam);"
    ],
    previewTitle: "A conta do painel",
    preview: '<div class="output-label">META 5 · FEITAS 2</div><div class="output-value">3 missões faltam</div><p>É uma prévia do raciocínio. O número foi calculado no exemplo, não por um compilador dentro desta página.</p>',
    evaluate: function (answer) {
      const code = String(answer || "").replace(/\/\/.*$/gm, "");
      if (!/\bint\s+faltam\s*=/.test(code)) return fail("Você já tem meta e feitas. Agora crie a variável <code>int faltam</code> para guardar o resultado.");
      if (!/^\s*int\s+faltam\s*=\s*meta\s*-\s*feitas\s*;\s*$/m.test(code)) return fail("A variável existe, mas falta uma linha completa com a conta certa: <code>int faltam = meta - feitas;</code>.");
      if (!/^\s*print\s*\(\s*faltam\s*\)\s*;\s*$/m.test(code)) return fail("A conta está pronta. Em uma nova linha, peça que o programa mostre o resultado com <code>print(faltam);</code>.");
      return pass("Boa leitura de código: você calculou o que falta e pediu para enxergar esse valor. A prévia mostra o resultado esperado, 3.");
    }
  },
  {
    id: "condicao",
    title: "O app precisa escolher",
    level: "DART · LÓGICA",
    format: "ESCOLHER ALTERNATIVA",
    goal: "Corrigir uma condição de meta.",
    intro: "Agora o Painel de Missões deve reagir: se a pessoa chegou à meta, mostra comemoração; caso contrário, incentiva a continuar. Para isso, usamos if e else.",
    conceptTitle: "Uma pergunta com dois caminhos",
    conceptDescription: "O bloco if roda quando uma condição é verdadeira. O else cuida do outro caso. O detalhe importante aqui: atingir a meta de 5 também conta como sucesso.",
    explanation: [
      ["if", "Significa “se”. Depois dele vem uma condição entre parênteses."],
      [">=", "Significa “maior ou igual”. Inclui o número da meta."],
      ["else", "É o caminho que acontece quando a condição não é verdadeira."],
      ["{ }", "As chaves agrupam as linhas que pertencem a cada escolha."]
    ],
    instruction: "Evite usar <code>></code>: com ele, 5 ficaria fora da comemoração. Escolha a comparação que inclui 5 e também qualquer número maior.",
    activity: {
      type: "choice",
      code: [
        "int feitas = 5;",
        "int meta = 5;",
        "",
        "if (feitas ___ meta) {",
        '  print("Meta alcançada!");',
        "} else {",
        '  print("Você consegue!");',
        "}"
      ].join("\n"),
      choices: [
        { value: ">", label: "<code>></code> — só quando feitas é maior que meta" },
        { value: "==", label: "<code>==</code> — apenas quando os dois valores são iguais" },
        { value: ">=", label: "<code>>=</code> — quando feitas é maior ou igual à meta" },
        { value: "<=", label: "<code><=</code> — quando feitas é menor ou igual à meta" }
      ],
      correct: ">="
    },
    hints: [
      "Leia a frase em voz alta: a meta foi atingida se feitas for “maior ou igual” a meta.",
      "O sinal > sozinho deixa 5 de fora. Você precisa acrescentar o sinal de igualdade.",
      "A comparação certa é: feitas >= meta."
    ],
    previewTitle: "Dois caminhos possíveis",
    preview: '<div class="condition-grid"><div><span>feitas = 5 · meta = 5</span><strong>Meta alcançada!</strong></div><div><span>feitas = 2 · meta = 5</span><strong>Você consegue!</strong></div></div><p>Com <code>>=</code>, chegar exatamente em 5 já é suficiente para comemorar.</p>',
    evaluate: function (answer) {
      if (!answer) return fail("Escolha uma comparação para completar a condição.");
      if (answer === ">") return fail("Esse era o problema: <code>></code> só aceita valores maiores que 5. O próprio 5 ficaria de fora.");
      if (answer === "==") return fail("<code>==</code> aceita exatamente 5, mas rejeitaria 6. A pergunta também deve aceitar quem passou da meta.");
      if (answer === "<=") return fail("Esse símbolo aponta para o lado contrário: ele trataria 2 como sucesso e 6 como falha.");
      return pass("Exato. <code>>=</code> cobre quem chegou à meta e quem foi além. É uma correção pequena, mas muda o comportamento do app.");
    }
  },
  {
    id: "funcao",
    title: "Uma receita que dá para repetir",
    level: "DART · LÓGICA",
    format: "ORDENAR BLOCOS",
    goal: "Organizar uma função com retorno.",
    intro: "Quando uma ideia aparece mais de uma vez no código, podemos dar um nome para ela. Uma função é como uma receita: recebe ingredientes, faz algo e pode devolver um resultado.",
    conceptTitle: "Função: montar e devolver",
    conceptDescription: "Esta função recebe um nome e a quantidade de missões feitas. Ela cria uma frase e usa return para entregar a frase de volta para quem chamou a função.",
    explanation: [
      ["String criarRecado(...)", "String antes do nome diz que a função vai devolver um texto."],
      ["String nome, int feitas", "São parâmetros: informações que entram na função."],
      ["return", "Entrega o resultado para fora da função."],
      ["void main()", "É o ponto em que este exemplo demonstra a chamada da função."]
    ],
    instruction: "Use os botões ↑ e ↓ para colocar os blocos em uma leitura fácil: abertura da função, retorno, fechamento e, por fim, a demonstração dentro de main.",
    activity: {
      type: "order",
      start: ["call", "close", "header", "return"],
      correct: ["header", "return", "close", "call"],
      items: {
        header: "String criarRecado(String nome, int feitas) {",
        return: '  return "Boa, $nome! Você fez $feitas missões."; ',
        close: "}",
        call: 'void main() { print(criarRecado("Nina", 2)); }'
      }
    },
    hints: [
      "Uma função abre com sua assinatura e uma chave. Nesta leitura guiada, a demonstração vem depois da receita.",
      "A linha com return precisa ficar dentro das chaves, antes da chave de fechamento.",
      "Ordem: assinatura → return → } → void main() { print(criarRecado(...)); }"
    ],
    previewTitle: "A mensagem devolvida pela função",
    preview: '<div class="message-preview">Boa, Nina! Você fez 2 missões.</div><p>A mesma função pode ser chamada com outros valores sem copiar toda a frase.</p>',
    evaluate: function (answer) {
      const order = Array.isArray(answer) ? answer : [];
      const expected = this.activity.correct;
      if (order.length !== expected.length) return fail("Ainda faltam blocos na sua tentativa.");
      if (order.every(function (id, index) { return id === expected[index]; })) {
        return pass("Sequência certa. <code>return</code> fica dentro da função para devolver o texto, e <code>main</code> mostra uma chamada válida. Esta ordem deixa a leitura mais fácil para quem começa.");
      }
      const firstWrong = order.findIndex(function (id, index) { return id !== expected[index]; });
      if (firstWrong === 0) return fail("Comece pela assinatura da função. É ela que dá nome à receita e abre a chave.");
      if (firstWrong === 1) return fail("Depois de abrir a função, ela precisa fazer algo antes de fechar. Coloque o <code>return</code> aqui.");
      if (firstWrong === 2) return fail("A chave <code>}</code> encerra a função, então ela vem depois do <code>return</code>.");
      return fail("A demonstração em <code>void main()</code> usa a função pronta. Ela deve ficar por último nesta leitura guiada.");
    }
  },
  {
    id: "lista",
    title: "Várias tarefas, uma lista",
    level: "DART · DADOS",
    format: "EXPLORAR VISUALMENTE",
    goal: "Entender o primeiro item de uma lista.",
    intro: "Em vez de criar uma variável para cada tarefa, podemos agrupá-las em uma lista. Assim, o Painel de Missões consegue lidar com vários itens parecidos.",
    conceptTitle: "List guarda uma sequência",
    conceptDescription: "Uma List organiza vários valores em ordem. Em programação, a contagem dos índices geralmente começa em 0. Não é erro: é uma convenção muito usada.",
    explanation: [
      ["List<String>", "Uma lista em que cada item é um texto."],
      ["tarefas[0]", "Pede o item que está na posição 0: o primeiro da lista."],
      ["tarefas[1]", "É o segundo item. A posição aumenta de um em um."],
      ["[ ]", "Os colchetes indicam a posição que você quer acessar."]
    ],
    instruction: "Clique na tarefa que seria devolvida por <code>tarefas[0]</code>. Olhe o número pequeno de cada cartão.",
    activity: {
      type: "list",
      items: [
        { value: "revisar", index: 0, label: "Revisar para a prova" },
        { value: "leitura", index: 1, label: "Ler duas páginas" },
        { value: "resumo", index: 2, label: "Fazer um resumo" }
      ],
      declaration: [
        "List<String> tarefas = [",
        '  "Revisar para a prova",',
        '  "Ler duas páginas",',
        '  "Fazer um resumo",',
        "];"
      ].join("\n"),
      correct: "revisar"
    },
    hints: [
      "Índice é a posição dentro da lista. O primeiro cartão tem índice 0.",
      "Não escolha pelo texto mais importante; escolha pelo número entre colchetes.",
      "A resposta é “Revisar para a prova”, marcada com [0]."
    ],
    previewTitle: "A lista por trás dos cartões",
    preview: '<div class="output-label">LIST&lt;STRING&gt; TAREFAS</div><div class="data-list"><div><span>[0] Revisar para a prova</span><code>String</code><strong>1º</strong></div><div><span>[1] Ler duas páginas</span><code>String</code><strong>2º</strong></div><div><span>[2] Fazer um resumo</span><code>String</code><strong>3º</strong></div></div><p>O primeiro item visual tem índice <code>0</code>. Esse detalhe aparece em várias linguagens.</p>',
    evaluate: function (answer) {
      if (!answer) return fail("Clique em um dos cartões para escolher uma posição da lista.");
      if (answer === "revisar") return pass("Isso! A primeira tarefa tem índice 0. É estranho só na primeira vez; depois vira um reflexo.");
      return fail("Quase. Você clicou em um item real da lista, mas <code>tarefas[0]</code> pede exatamente a posição 0, não a 1 nem a 2.");
    }
  },
  {
    id: "arvore",
    title: "Flutter é feito de peças encaixadas",
    level: "FLUTTER · BASE",
    format: "LER UMA ÁRVORE",
    goal: "Reconhecer o widget que organiza uma tela.",
    intro: "Chegou a ponte para o Flutter. Em Flutter, tudo na interface é um widget: texto, botão, espaço e até a estrutura geral da tela. Eles ficam encaixados como uma árvore.",
    conceptTitle: "De fora para dentro",
    conceptDescription: "O código começa em main(), chama runApp() e entrega um widget principal. MaterialApp prepara o aplicativo Material; Scaffold organiza uma página com áreas como AppBar e body.",
    explanation: [
      ["main()", "É o ponto de partida de um programa Dart."],
      ["runApp(...)", "Pede ao Flutter para desenhar o widget que recebeu."],
      ["MaterialApp", "Configura uma aplicação que usa os componentes visuais do Material."],
      ["Scaffold", "Oferece uma estrutura comum de tela: barra superior, conteúdo, botão flutuante e mais."],
      ["Text", "É uma peça simples que mostra palavras na tela."]
    ],
    instruction: "Clique no widget que serve de “estrutura da página”: é nele que AppBar e body costumam morar.",
    activity: {
      type: "tree",
      nodes: [
        { value: "main", label: "main()", depth: 0 },
        { value: "runApp", label: "runApp(const MeuPainelApp())", depth: 1 },
        { value: "material", label: "MaterialApp", depth: 2 },
        { value: "scaffold", label: "Scaffold", depth: 3 },
        { value: "appbar", label: "appBar: AppBar(...)", depth: 4 },
        { value: "center", label: "body: Center(...)", depth: 4 },
        { value: "text", label: "Text(\"Olá\")", depth: 5 }
      ],
      correct: "scaffold"
    },
    hints: [
      "A pergunta não é “qual mostra texto?”. Procure a peça que divide a página em regiões.",
      "AppBar e body são propriedades de um widget específico do Flutter.",
      "A resposta é Scaffold. MaterialApp fica um nível acima, cuidando do aplicativo como um todo."
    ],
    previewTitle: "Uma árvore de widgets",
    preview: '<div class="phone-mini"><div class="phone-mini-top"></div><div class="phone-appbar">Meu Painel</div><div class="phone-mini-content centered">Text<br>“Olá, Nina!”</div></div><p>Esta pequena tela é construída de widgets encaixados. A árvore do código descreve esse encaixe.</p>',
    evaluate: function (answer) {
      if (!answer) return fail("Clique em uma peça da árvore para responder.");
      if (answer === "scaffold") return pass("Certo. <code>Scaffold</code> é a estrutura de uma tela típica e pode receber <code>appBar</code>, <code>body</code> e outras áreas.");
      if (answer === "material") return fail("<code>MaterialApp</code> também é importante, mas ele configura o aplicativo inteiro. A estrutura de uma página específica é o <code>Scaffold</code>.");
      if (answer === "text") return fail("<code>Text</code> mostra palavras, mas não organiza uma página inteira.");
      return fail("Siga a árvore até a peça que costuma conter <code>AppBar</code> e <code>body</code>.");
    }
  },
  {
    id: "scaffold",
    title: "Monte a primeira tela",
    level: "FLUTTER · TELA",
    format: "MONTAR CÓDIGO",
    goal: "Completar uma estrutura com Scaffold e AppBar.",
    intro: "Agora vamos montar uma tela bem pequena do Meu Painel. Você não precisa escrever tudo de uma vez: escolha as duas peças que faltam e veja onde elas entram.",
    conceptTitle: "Uma página tem base e barra superior",
    conceptDescription: "Em um app Material, MaterialApp costuma apontar para uma página inicial. A página usa Scaffold. Dentro dela, AppBar cria a barra do topo e body recebe o conteúdo principal.",
    explanation: [
      ["home:", "Indica qual será a primeira página do aplicativo."],
      ["Scaffold(...)", "É a página que organiza as áreas principais."],
      ["appBar:", "Recebe uma AppBar com o título que aparecerá no topo."],
      ["body:", "Recebe o conteúdo abaixo da barra. Aqui usamos Center e Text."]
    ],
    instruction: "Escolha os dois widgets que faltam para transformar o esqueleto em uma tela com barra superior.",
    activity: {
      type: "builder",
      fields: [
        { key: "page", correct: "Scaffold", options: ["", "Scaffold", "Center", "Text"] },
        { key: "bar", correct: "AppBar", options: ["", "AppBar", "Column", "ElevatedButton"] }
      ]
    },
    hints: [
      "home recebe uma página inteira, não apenas um texto. No Flutter Material, essa página costuma ser um Scaffold.",
      "A propriedade appBar pede um widget criado justamente para a barra do topo.",
      "Escolha Scaffold em home e AppBar na linha appBar."
    ],
    previewTitle: "A tela que esse esqueleto descreve",
    preview: '<div class="phone-mini"><div class="phone-mini-top"></div><div class="phone-appbar">Meu Painel</div><div class="phone-mini-content centered">Olá, Nina!</div></div><p><code>Scaffold</code> dá a forma; <code>AppBar</code> coloca o título no topo; <code>Text</code> mostra a mensagem.</p>',
    evaluate: function (answer) {
      const data = answer || {};
      if (!data.page || !data.bar) return fail("Ainda há uma ou duas lacunas sem escolha. Complete as duas antes de conferir.");
      if (data.page !== "Scaffold") return fail("A primeira lacuna representa a página inicial completa. A opção que organiza essa página é <code>Scaffold</code>.");
      if (data.bar !== "AppBar") return fail("A segunda lacuna fica depois de <code>appBar:</code>. Use o widget que cria uma barra no topo: <code>AppBar</code>.");
      return pass("Tela montada! Você encaixou <code>Scaffold</code> dentro de <code>home</code> e <code>AppBar</code> dentro da página.");
    }
  },
  {
    id: "layout",
    title: "Empilhe as partes do painel",
    level: "FLUTTER · LAYOUT",
    format: "MONTAR LAYOUT",
    goal: "Escolher um layout vertical.",
    intro: "Uma tela tem mais de uma coisa: título, número de missões e botão. Para decidir como essas peças ficam lado a lado ou uma abaixo da outra, usamos widgets de layout.",
    conceptTitle: "Column organiza de cima para baixo",
    conceptDescription: "Column empilha seus children na vertical. Row deixa as peças lado a lado. Os dois nomes são literais: column é coluna; row é linha.",
    explanation: [
      ["Column", "Organiza os widgets filhos verticalmente."],
      ["Row", "Organiza os widgets filhos horizontalmente."],
      ["children: [ ... ]", "É a lista de widgets que ficará dentro de Column ou Row."],
      ["mainAxisAlignment", "Pode controlar como os filhos se distribuem no eixo principal."]
    ],
    instruction: "O painel precisa mostrar três cartões um abaixo do outro. Clique no widget de layout que representa essa escolha. A miniatura ao lado muda só como simulação visual.",
    activity: {
      type: "layout",
      options: ["Column", "Row", "Stack"],
      correct: "Column"
    },
    hints: [
      "Pense em uma coluna de caderno: os itens seguem de cima para baixo.",
      "Row seria útil se os cartões precisassem ficar na mesma linha.",
      "Para empilhar verticalmente, use Column."
    ],
    previewTitle: "Três blocos do Meu Painel",
    preview: '<div class="phone-mini"><div class="phone-mini-top"></div><div class="phone-appbar">Meu Painel</div><div class="phone-mini-content centered">Uma <code>Column</code> pode empilhar o título, o progresso e um botão.</div></div><p>O desenho é ilustrativo. No app real, os filhos ficariam dentro de <code>children: [ ... ]</code>.</p>',
    evaluate: function (answer) {
      if (!answer) return fail("Clique em uma opção de layout para testar sua escolha.");
      if (answer === "Column") return pass("Isso. <code>Column</code> coloca os filhos em uma coluna vertical, perfeito para esses cartões.");
      if (answer === "Row") return fail("<code>Row</code> coloca os itens lado a lado. Olhe a miniatura: o pedido é empilhar, não alinhar na mesma linha.");
      return fail("<code>Stack</code> sobrepõe widgets. Ela é útil em casos especiais, mas não é a forma mais direta de criar uma lista vertical.");
    }
  },
  {
    id: "estado",
    title: "Um botão que muda a tela",
    level: "FLUTTER · INTERAÇÃO",
    format: "SIMULAR ESTADO",
    goal: "Entender o aviso setState.",
    intro: "Para fechar nosso painel, falta interação: a pessoa toca no botão e o número de missões feitas aumenta. Um valor pode mudar; a tela também precisa saber que deve ser desenhada outra vez.",
    conceptTitle: "setState avisa o Flutter",
    conceptDescription: "Quando uma tela precisa mudar, o objeto State ligado a um StatefulWidget chama setState. Dentro do callback, o valor muda; depois, o Flutter agenda um novo desenho do que depende desse valor.",
    explanation: [
      ["StatefulWidget", "É usado quando a interface pode mudar enquanto o app está aberto."],
      ["onPressed", "É a função que roda quando alguém toca no botão."],
      ["feitas++", "Aumenta o valor de feitas em 1."],
      ["setState(() { ... })", "O callback altera o valor, e setState avisa o Flutter para redesenhar a tela."]
    ],
    instruction: "Escolha a linha que deve ficar dentro de <code>onPressed</code>. Depois experimente o botão da prévia: ele é uma simulação em JavaScript, não Flutter rodando.",
    activity: {
      type: "state",
      choices: [
        { value: "print", label: '<code>print("feito");</code>' },
        { value: "increment", label: "<code>feitas++;</code>" },
        { value: "setstate", label: "<code>setState(() { feitas++; });</code>" }
      ],
      correct: "setstate"
    },
    hints: [
      "A variável precisa aumentar, mas a questão também pede que a interface seja atualizada.",
      "Só <code>feitas++</code> muda o número; ainda falta avisar a tela para redesenhar.",
      "Use <code>setState(() { feitas++; });</code> dentro de onPressed."
    ],
    previewTitle: "Prévia de uma mudança de estado",
    preview: '<div class="output-label">BOTÃO + ESTADO</div><div class="message-preview">A contagem pode mudar sem trocar de tela.</div><p>O botão interativo acima é uma simulação deste site. Em Flutter real, o papel de redesenhar seria do <code>setState</code>.</p>',
    evaluate: function (answer) {
      if (!answer) return fail("Escolha uma linha para colocar dentro de <code>onPressed</code>.");
      if (answer === "print") return fail("Esse print só deixa um recado no console; ele não muda a quantidade de missões nem atualiza a interface.");
      if (answer === "increment") return fail("Você encontrou a mudança do número, mas falta chamar <code>setState</code> para avisar que a interface precisa ser redesenhada.");
      return pass("Fechou a trilha com uma ideia importante: o callback de <code>setState</code> muda o dado, e o Flutter recebe o aviso para redesenhar a parte afetada.");
    }
  }
];

const STORAGE_KEY = "flutter-lab-progresso-v3";
const $ = function (selector) {
  return document.querySelector(selector);
};

const elements = {
  nav: $("#lesson-nav"),
  progressLabel: $("#progress-label"),
  progressBar: $("#progress-bar"),
  progressTrack: $(".progress-track"),
  savedIndicator: $("#saved-indicator"),
  card: $("#lesson-card"),
  kicker: $("#lesson-kicker"),
  title: $("#lesson-title"),
  level: $("#lesson-level"),
  intro: $("#lesson-intro"),
  format: $("#mission-format"),
  goal: $("#mission-goal"),
  conceptTitle: $("#concept-title"),
  conceptDescription: $("#concept-description"),
  explanation: $("#explanation-list"),
  instruction: $("#exercise-instruction"),
  activityPanel: $("#activity-panel"),
  honestyBadge: $("#honesty-badge"),
  check: $("#check-button"),
  hint: $("#hint-button"),
  resetActivity: $("#reset-activity"),
  hintBox: $("#hint-box"),
  feedback: $("#feedback"),
  previewTitle: $("#preview-title"),
  preview: $("#preview-output"),
  completion: $("#completion-status"),
  next: $("#next-button"),
  workspace: $(".workspace"),
  final: $("#final-card"),
  restart: $("#restart-button"),
  resetProgress: $("#reset-progress")
};

function defaultState() {
  return {
    active: 0,
    completed: [],
    answers: {},
    drafts: {},
    hints: {}
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return defaultState();
    const known = missions.map(function (mission) { return mission.id; });
    return {
      active: Number.isInteger(saved.active) && saved.active >= 0 && saved.active < missions.length ? saved.active : 0,
      completed: Array.isArray(saved.completed) ? saved.completed.filter(function (id) { return known.indexOf(id) !== -1; }) : [],
      answers: saved.answers && typeof saved.answers === "object" ? saved.answers : {},
      drafts: saved.drafts && typeof saved.drafts === "object" ? saved.drafts : {},
      hints: saved.hints && typeof saved.hints === "object" ? saved.hints : {}
    };
  } catch (error) {
    return defaultState();
  }
}

let state = loadState();
let currentMission = state.active;
let savedTimer = null;

function normalise(value) {
  return String(value || "").trim().toLowerCase();
}

function pass(message) {
  return { ok: true, message: message };
}

function fail(message) {
  return { ok: false, message: message };
}

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function missionAt(index) {
  return missions[index];
}

function isComplete(mission) {
  return state.completed.indexOf(mission.id) !== -1;
}

function saveState(showIndicator) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (showIndicator !== false) {
      elements.savedIndicator.textContent = "Salvo";
      elements.savedIndicator.classList.add("show");
      window.clearTimeout(savedTimer);
      savedTimer = window.setTimeout(function () {
        elements.savedIndicator.classList.remove("show");
      }, 1400);
    }
  } catch (error) {
    elements.savedIndicator.textContent = "Não salvo";
    elements.savedIndicator.classList.add("show");
  }
}

function renderNav() {
  elements.nav.replaceChildren();
  missions.forEach(function (mission, index) {
    const button = document.createElement("button");
    const complete = isComplete(mission);
    button.type = "button";
    button.className = "lesson-tab" + (index === currentMission ? " active" : "") + (complete ? " complete" : "");
    button.setAttribute("aria-current", index === currentMission ? "step" : "false");
    button.setAttribute("aria-label", "Missão " + (index + 1) + ": " + mission.title + (complete ? ", concluída" : ""));

    const number = document.createElement("span");
    number.className = "tab-number";
    number.setAttribute("aria-hidden", "true");
    number.textContent = complete ? "✓" : String(index + 1).padStart(2, "0");

    const label = document.createElement("span");
    label.className = "tab-label";
    label.textContent = mission.title;

    button.append(number, label);
    button.addEventListener("click", function () {
      showMission(index, false);
    });
    elements.nav.append(button);
  });
}

function renderExplanations(items) {
  elements.explanation.replaceChildren();
  items.forEach(function (item, index) {
    const row = document.createElement("div");
    row.className = "explanation-item";

    const number = document.createElement("span");
    number.className = "explanation-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const content = document.createElement("div");
    const term = document.createElement("strong");
    term.textContent = item[0];
    const description = document.createElement("p");
    description.textContent = item[1];

    content.append(term, description);
    row.append(number, content);
    elements.explanation.append(row);
  });
}

function updateProgress() {
  const percent = Math.round((state.completed.length / missions.length) * 100);
  elements.progressLabel.textContent = state.completed.length + " de " + missions.length + " missões concluídas";
  elements.progressBar.style.width = percent + "%";
  elements.progressTrack.setAttribute("aria-valuenow", String(percent));
}

function scrollBehavior() {
  if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "auto";
  }
  return "smooth";
}

function clearFeedback() {
  elements.feedback.className = "feedback hidden";
  elements.feedback.innerHTML = "";
}

function setFeedback(kind, message) {
  elements.feedback.className = "feedback " + kind;
  elements.feedback.innerHTML = message;
}

function updateHint(mission) {
  const seen = Number(state.hints[mission.id] || 0);
  const safeSeen = Math.max(0, Math.min(seen, mission.hints.length));
  if (safeSeen) {
    elements.hintBox.classList.remove("hidden");
    elements.hintBox.innerHTML = "<strong>Dica " + safeSeen + ":</strong> " + mission.hints[safeSeen - 1];
  } else {
    elements.hintBox.classList.add("hidden");
    elements.hintBox.textContent = "";
  }
  if (safeSeen >= mission.hints.length) {
    elements.hint.textContent = "Dicas vistas";
  } else {
    elements.hint.textContent = "Ver dica " + (safeSeen + 1) + " de " + mission.hints.length;
  }
}

function updateCompletion(mission) {
  const complete = isComplete(mission);
  const hintsSeen = Number(state.hints[mission.id] || 0);
  if (complete) {
    elements.completion.textContent = hintsSeen ? "Missão concluída · você usou " + hintsSeen + (hintsSeen === 1 ? " dica" : " dicas") : "Missão concluída";
    elements.completion.classList.add("is-complete");
  } else {
    elements.completion.textContent = "Missão ainda não concluída";
    elements.completion.classList.remove("is-complete");
  }
  elements.next.disabled = !complete;
  elements.next.textContent = currentMission === missions.length - 1 ? "Ver conclusão" : "Próxima missão";
}

function getAnswer(mission) {
  if (mission.activity.type === "code") {
    return state.drafts[mission.id] || mission.activity.starter;
  }
  return state.answers[mission.id];
}

function answerFor(mission, defaultValue) {
  const answer = state.answers[mission.id];
  return answer === undefined ? defaultValue : answer;
}

function renderFill(mission) {
  const answer = answerFor(mission, "");
  const activity = mission.activity;
  elements.activityPanel.innerHTML =
    '<div class="code-line"><span>' + escapeHTML(activity.prefix) + '</span>' +
    '<input class="inline-input" id="fill-answer" type="text" autocomplete="off" spellcheck="false" maxlength="34" placeholder="' + escapeHTML(activity.placeholder) + '" aria-label="' + escapeHTML(activity.ariaLabel) + '" value="' + escapeHTML(answer) + '">' +
    '<span>' + escapeHTML(activity.suffix) + "</span></div>" +
    '<p class="activity-note">Você está completando apenas a lacuna. A página verifica a estrutura da resposta, mas não roda este Dart.</p>';
  const input = $("#fill-answer");
  input.addEventListener("input", function () {
    state.answers[mission.id] = input.value;
    saveState();
    clearFeedback();
  });
}

function renderMatch(mission) {
  const storedAnswer = answerFor(mission, {});
  const answer = storedAnswer && typeof storedAnswer === "object" ? storedAnswer : {};
  const activity = mission.activity;
  elements.activityPanel.innerHTML =
    '<div class="type-matching-grid">' +
    activity.fields.map(function (field) {
      const selected = answer[field.key] || "";
      const ownOptions = activity.options.map(function (option) {
        const label = option || "Escolha um tipo";
        return '<option value="' + escapeHTML(option) + '"' + (option === selected ? " selected" : "") + ">" + escapeHTML(label) + "</option>";
      }).join("");
      return '<label class="match-row"><code>' + escapeHTML(field.label) + '</code><select data-match="' + escapeHTML(field.key) + '" aria-label="Tipo para ' + escapeHTML(field.label) + '">' + ownOptions + "</select></label>";
    }).join("") +
    "</div>";

  elements.activityPanel.querySelectorAll("[data-match]").forEach(function (select) {
    select.addEventListener("change", function () {
      const saved = answerFor(mission, {});
      const data = saved && typeof saved === "object" ? saved : {};
      data[select.dataset.match] = select.value;
      state.answers[mission.id] = data;
      saveState();
      clearFeedback();
    });
  });
}

function renderChoice(mission) {
  const answer = answerFor(mission, "");
  const activity = mission.activity;
  let html = "";
  if (activity.code) {
    html += '<div class="prediction-card"><pre>' + escapeHTML(activity.code) + "</pre></div>";
  }
  html += '<div class="choice-list" role="group" aria-label="Alternativas">';
  html += activity.choices.map(function (choice, index) {
    const selected = answer === choice.value;
    return '<button class="choice-option' + (selected ? " selected" : "") + '" type="button" aria-pressed="' + String(selected) + '" data-choice="' + escapeHTML(choice.value) + '"><span class="choice-badge">' + String.fromCharCode(65 + index) + '</span><span>' + choice.label + "</span></button>";
  }).join("");
  html += "</div>";
  elements.activityPanel.innerHTML = html;
  elements.activityPanel.querySelectorAll("[data-choice]").forEach(function (button) {
    button.addEventListener("click", function () {
      state.answers[mission.id] = button.dataset.choice;
      saveState();
      clearFeedback();
      renderChoice(mission);
    });
  });
}

function renderCode(mission) {
  const draft = state.drafts[mission.id] === undefined ? mission.activity.starter : state.drafts[mission.id];
  elements.activityPanel.innerHTML =
    '<div class="code-lab-label"><span>RASCUNHO DART</span><span>checagem de estrutura, sem compilação</span></div>' +
    '<label class="sr-only" for="code-editor">Digite seu código Dart</label>' +
    '<textarea id="code-editor" class="code-editor" spellcheck="false" autocapitalize="off" autocomplete="off">' + escapeHTML(draft) + "</textarea>";
  const editor = $("#code-editor");
  editor.addEventListener("input", function () {
    state.drafts[mission.id] = editor.value;
    saveState();
    clearFeedback();
  });
}

function renderOrder(mission) {
  const activity = mission.activity;
  const order = Array.isArray(answerFor(mission, null)) ? answerFor(mission, null) : activity.start.slice();
  if (!Array.isArray(state.answers[mission.id])) {
    state.answers[mission.id] = order.slice();
    saveState(false);
  }
  elements.activityPanel.innerHTML =
    '<div class="order-list" aria-label="Blocos para ordenar">' +
    order.map(function (id, index) {
      return '<div class="order-row"><span class="order-position">' + (index + 1) + '</span><code class="order-code">' + escapeHTML(activity.items[id]) + '</code><span class="order-controls"><button class="order-move" type="button" data-move="up" data-index="' + index + '" aria-label="Subir bloco ' + (index + 1) + '"' + (index === 0 ? " disabled" : "") + '>↑</button><button class="order-move" type="button" data-move="down" data-index="' + index + '" aria-label="Descer bloco ' + (index + 1) + '"' + (index === order.length - 1 ? " disabled" : "") + '>↓</button></span></div>';
    }).join("") +
    "</div><p class=\"activity-note\">Os botões permitem ordenar sem precisar arrastar, inclusive pelo teclado.</p>";
  elements.activityPanel.querySelectorAll("[data-move]").forEach(function (button) {
    button.addEventListener("click", function () {
      const next = state.answers[mission.id].slice();
      const position = Number(button.dataset.index);
      const target = button.dataset.move === "up" ? position - 1 : position + 1;
      const temporary = next[position];
      next[position] = next[target];
      next[target] = temporary;
      state.answers[mission.id] = next;
      saveState();
      clearFeedback();
      renderOrder(mission);
    });
  });
}

function renderList(mission) {
  const answer = answerFor(mission, "");
  const declaration = mission.activity.declaration
    ? '<div class="prediction-card"><pre>' + escapeHTML(mission.activity.declaration) + "</pre></div>"
    : "";
  elements.activityPanel.innerHTML =
    declaration + '<div class="list-explorer" style="margin-top: 12px;">' +
    mission.activity.items.map(function (item) {
      const selected = answer === item.value;
      return '<button class="list-item' + (selected ? " selected" : "") + '" type="button" data-list="' + escapeHTML(item.value) + '" aria-pressed="' + String(selected) + '"><span class="list-index">[' + item.index + ']</span><span class="list-name">' + escapeHTML(item.label) + "</span></button>";
    }).join("") +
    "</div>";
  elements.activityPanel.querySelectorAll("[data-list]").forEach(function (button) {
    button.addEventListener("click", function () {
      state.answers[mission.id] = button.dataset.list;
      saveState();
      clearFeedback();
      renderList(mission);
    });
  });
}

function renderTree(mission) {
  const answer = answerFor(mission, "");
  elements.activityPanel.innerHTML =
    '<div class="widget-tree" role="group" aria-label="Árvore de widgets">' +
    mission.activity.nodes.map(function (node) {
      const selected = answer === node.value;
      return '<button class="tree-node tree-depth-' + node.depth + (selected ? " selected" : "") + '" type="button" aria-pressed="' + String(selected) + '" data-tree="' + escapeHTML(node.value) + '"><span class="tree-caret">↳</span>' + escapeHTML(node.label) + "</button>";
    }).join("") +
    "</div>";
  elements.activityPanel.querySelectorAll("[data-tree]").forEach(function (button) {
    button.addEventListener("click", function () {
      state.answers[mission.id] = button.dataset.tree;
      saveState();
      clearFeedback();
      renderTree(mission);
    });
  });
}

function renderBuilder(mission) {
  const storedAnswer = answerFor(mission, {});
  const answer = storedAnswer && typeof storedAnswer === "object" ? storedAnswer : {};
  const page = mission.activity.fields[0];
  const bar = mission.activity.fields[1];
  function optionsFor(field) {
    const selected = answer[field.key] || "";
    return field.options.map(function (option) {
      const label = option || "escolha";
      return '<option value="' + escapeHTML(option) + '"' + (option === selected ? " selected" : "") + ">" + escapeHTML(label) + "</option>";
    }).join("");
  }
  elements.activityPanel.innerHTML =
    '<div class="builder-code">' +
    '<div class="builder-line">MaterialApp(</div>' +
    '<div class="builder-line builder-indent-1">home: <select class="builder-select" data-builder="' + page.key + '" aria-label="Widget da página inicial">' + optionsFor(page) + "</select>(</div>" +
    '<div class="builder-line builder-indent-2">appBar: <select class="builder-select" data-builder="' + bar.key + '" aria-label="Widget da barra superior">' + optionsFor(bar) + "</select>(title: Text(\"Meu Painel\")),</div>" +
    '<div class="builder-line builder-indent-2">body: Center(child: Text(\"Olá, Nina!\")),</div>' +
    '<div class="builder-line builder-indent-1">),</div>' +
    "<div class=\"builder-line\">);</div>" +
    "</div>";
  elements.activityPanel.querySelectorAll("[data-builder]").forEach(function (select) {
    select.addEventListener("change", function () {
      const saved = answerFor(mission, {});
      const data = saved && typeof saved === "object" ? saved : {};
      data[select.dataset.builder] = select.value;
      state.answers[mission.id] = data;
      saveState();
      clearFeedback();
    });
  });
}

function renderLayout(mission) {
  const answer = answerFor(mission, "");
  const direction = answer === "Row" ? "row" : answer === "Stack" ? "stack" : "column";
  elements.activityPanel.innerHTML =
    '<div class="layout-builder"><div class="widget-options" role="group" aria-label="Widget de layout">' +
    mission.activity.options.map(function (option) {
      const selected = answer === option;
      return '<button class="widget-option' + (selected ? " selected" : "") + '" type="button" aria-pressed="' + String(selected) + '" data-layout="' + escapeHTML(option) + '">' + escapeHTML(option) + "</button>";
    }).join("") +
    '</div><div class="layout-sketch" aria-label="Miniatura da organização escolhida"><header>Meu Painel</header><div class="sketch-content ' + direction + '"><span class="sketch-card">Meta</span><span class="sketch-card">Progresso</span><span class="sketch-card">Botão</span></div></div></div>';
  elements.activityPanel.querySelectorAll("[data-layout]").forEach(function (button) {
    button.addEventListener("click", function () {
      state.answers[mission.id] = button.dataset.layout;
      saveState();
      clearFeedback();
      renderLayout(mission);
    });
  });
}

function renderState(mission) {
  const answer = answerFor(mission, "");
  const countState = state.drafts[mission.id] && typeof state.drafts[mission.id] === "object" ? state.drafts[mission.id] : { count: 2 };
  const count = Number.isFinite(countState.count) ? countState.count : 2;
  elements.activityPanel.innerHTML =
    '<div class="state-simulator"><div><div class="missing-line">onPressed: () {<br>&nbsp;&nbsp;___<br>}</div><div class="choice-list" role="group" aria-label="Linha para atualizar o estado" style="margin-top: 10px;">' +
    mission.activity.choices.map(function (choice, index) {
      const selected = answer === choice.value;
      return '<button class="choice-option' + (selected ? " selected" : "") + '" type="button" aria-pressed="' + String(selected) + '" data-state-choice="' + escapeHTML(choice.value) + '"><span class="choice-badge">' + String.fromCharCode(65 + index) + '</span><span>' + choice.label + "</span></button>";
    }).join("") +
    '</div></div><div class="state-phone"><header>Meu Painel</header><div class="state-count" id="state-count">' + count + '</div><p>missões feitas</p><button class="state-button" id="simulate-button" type="button">Marcar uma como feita</button></div></div><p class="activity-note">Este botão responde de verdade no navegador com JavaScript só para ilustrar a mudança visual. Ele não é uma execução de Flutter.</p>';

  elements.activityPanel.querySelectorAll("[data-state-choice]").forEach(function (button) {
    button.addEventListener("click", function () {
      state.answers[mission.id] = button.dataset.stateChoice;
      saveState();
      clearFeedback();
      renderState(mission);
    });
  });
  $("#simulate-button").addEventListener("click", function () {
    const nextState = state.drafts[mission.id] && typeof state.drafts[mission.id] === "object" ? state.drafts[mission.id] : { count: 2 };
    nextState.count = (Number(nextState.count) || 0) + 1;
    state.drafts[mission.id] = nextState;
    saveState();
    const countNode = $("#state-count");
    countNode.textContent = String(nextState.count);
  });
}

function renderActivity(mission) {
  if (mission.activity.type === "fill") renderFill(mission);
  if (mission.activity.type === "match") renderMatch(mission);
  if (mission.activity.type === "choice") renderChoice(mission);
  if (mission.activity.type === "code") renderCode(mission);
  if (mission.activity.type === "order") renderOrder(mission);
  if (mission.activity.type === "list") renderList(mission);
  if (mission.activity.type === "tree") renderTree(mission);
  if (mission.activity.type === "builder") renderBuilder(mission);
  if (mission.activity.type === "layout") renderLayout(mission);
  if (mission.activity.type === "state") renderState(mission);
}

function showMission(index, moveFocus) {
  currentMission = index;
  state.active = index;
  saveState(false);
  const mission = missionAt(index);

  elements.kicker.textContent = "MISSÃO " + String(index + 1).padStart(2, "0") + " DE " + missions.length;
  elements.title.textContent = mission.title;
  elements.level.textContent = mission.level;
  elements.intro.textContent = mission.intro;
  elements.format.textContent = mission.format;
  elements.goal.textContent = mission.goal;
  elements.conceptTitle.textContent = mission.conceptTitle;
  elements.conceptDescription.textContent = mission.conceptDescription;
  elements.instruction.innerHTML = mission.instruction;
  elements.previewTitle.textContent = mission.previewTitle;
  elements.preview.innerHTML = mission.preview;
  elements.honestyBadge.textContent = mission.activity.type === "code" ? "SEM COMPILAR DART" : "SIMULAÇÃO DIDÁTICA";

  renderExplanations(mission.explanation);
  renderActivity(mission);
  clearFeedback();
  updateHint(mission);
  updateCompletion(mission);
  renderNav();
  updateProgress();

  if (moveFocus) {
    elements.card.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    window.setTimeout(function () {
      elements.card.focus({ preventScroll: true });
    }, 350);
  }
}

function checkCurrentMission() {
  const mission = missionAt(currentMission);
  const result = mission.evaluate(getAnswer(mission));
  if (result.ok) {
    if (!isComplete(mission)) state.completed.push(mission.id);
    saveState();
    setFeedback("success", result.message + " Você pode continuar quando quiser.");
    updateCompletion(mission);
    renderNav();
    updateProgress();
  } else {
    setFeedback("error", result.message + " Tente ajustar a resposta ou abra uma dica.");
  }
}

function showNextHint() {
  const mission = missionAt(currentMission);
  const seen = Math.min(Number(state.hints[mission.id] || 0), mission.hints.length);
  if (seen < mission.hints.length) {
    state.hints[mission.id] = seen + 1;
    saveState();
  }
  updateHint(mission);
}

function resetCurrentActivity() {
  const mission = missionAt(currentMission);
  delete state.answers[mission.id];
  delete state.drafts[mission.id];
  saveState();
  clearFeedback();
  renderActivity(mission);
}

function goNext() {
  const mission = missionAt(currentMission);
  if (!isComplete(mission)) return;
  if (currentMission < missions.length - 1) {
    showMission(currentMission + 1, true);
    return;
  }
  elements.workspace.classList.add("hidden");
  elements.final.classList.remove("hidden");
  elements.final.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
}

function restartEverything() {
  const confirmed = window.confirm("Recomeçar vai apagar respostas, rascunhos e o progresso salvo neste navegador. Quer continuar?");
  if (!confirmed) return;
  state = defaultState();
  currentMission = 0;
  saveState();
  elements.final.classList.add("hidden");
  elements.workspace.classList.remove("hidden");
  showMission(0, true);
}

elements.check.addEventListener("click", checkCurrentMission);
elements.hint.addEventListener("click", showNextHint);
elements.resetActivity.addEventListener("click", resetCurrentActivity);
elements.next.addEventListener("click", goNext);
elements.restart.addEventListener("click", restartEverything);
if (elements.resetProgress) {
  elements.resetProgress.addEventListener("click", restartEverything);
}

showMission(currentMission, false);
