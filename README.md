# Negociações JavaScript

## Sobre o projeto.

Esse é meu projeto do módulo de JavaScript avançado da Alura, do professor Flávio Almeida do site **[Cangaceiro JavaScript](http://cangaceirojavascript.com.br/).**

O projeto dessa módulo é basicamente uma página de cadastro de negociações de bolsa de valores, onde as mesmas não podem ser mutáveis após de feitas. Cadastraremos novas negociações, inclusive, elas serão importadas de serviços especializados, tudo aplicando o paradigma funcional e orientado a objetos ao, mesmo tempo, utilizando o melhor dos dois mundos.

Em um primeiro momento, o escopo dessa aplicação pode parecer bem reduzido, mas é o suficiente para aplicar recursos mais avançados e novos do JavaScript, como **proxy** e **promises**, assim como armazenamento de dados por lado do cliente usando o **indexDB**. Esse projeto para mim foi essencial para mergulha mais nessa linguagem da web e coloca mais em práticas padrões de projetos e estruturação de código.

## O que eu aprendi.

Desde já o que sobra é elogios para o orientado, com sua didática e carinho pelo ensino. Esse módulo de três cursos foi perfeito para eu mergulha no mundo js e descobri ferramentas extremamente úteis.

Primeiro levando um pouco para a arquitetura do projeto e estrutura do código puder passear por paradigmas diferentes como **Orientação a Objetos** e o **Paradigma Funcional**, *onde puder sair um pouco das suas definições e coloca a mão na massa* e compreende melhor suas aplicações e extrair o melhor de cada um.

Também puder transitar entre alguns padrões de projeto para resolve problema corriqueiros como **padrão Factory** que consiste em uma classe ser especializada em criar determinado tipo de objeto.

Puder compreende melhor algumas propriedades de tipos de dados como spread, same, filter, que nunca havia entendido muito bem. Além de algumas novas funcionalidade para mim como bind e a API Reflex que são *ótimos para serem usados para especifica o escopo que queremos que determina função trabalhe*.

Tive o prazer também de dissecar recursos mais avançados como **proxy** para criar alguma ‘armadilhas’ quando determina classe era instanciada sem altera o modelo padrão, assim como trabalhar mais com **promises** e fugir das famijeradas **Callback Hell**. Outro ponto que vale nota, é entender melhor a diferença de **XMLHttpsrequest** e **fetch API**.

Um dos conhecimentos adquiridos que para mim era novo até então e que foram de grande valia é a opção de persistir dados no lado do cliente com o **indexdDB**, onde eu posso manipular os dados como foi necessário para o projeto. E o padrão **DAO** (Data Access Object), que nessa situação, ele abstrairá os detalhes de lidar com o banco de dados. 

## Rodando o Projeto.

para da start no servidor, abra o terminal vá até  pasta server do projeto e de um npm start.

Nessa página (index.html) você pode adicionar negociações que vão para o banco de dados (indexdDB) e serão mantidas, vão ser recarregadas automáticas as negociações que estiverem no servido, caso queira adiciona alguma diretamente lá pode abrir na página http://localhost:3000/post.html onde após adiciona irá ter a resposta no console.log.
