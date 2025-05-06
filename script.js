// Obtém elementos do DOM
const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user_result img");
const botResult = document.querySelector(".bot_result img");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option_image");

// Define imagens possíveis e resultados
const botImages = ["./rock.png", "./paper.png", "./scissors.png"];
const resultados = {
  RR: "Empate",
  RP: "BOT",
  RS: "VOCÊ",
  PP: "Empate",
  PR: "VOCÊ",
  PS: "BOT",
  SS: "Empate",
  SR: "BOT",
  SP: "VOCÊ"
};

// Manipulador de evento para clique na imagem
function aoClicarNaOpcao(evento) {
  const imagemClicada = evento.currentTarget;
  const indiceClicado = Array.from(optionImages).indexOf(imagemClicada);

  // Reinicia os resultados e exibe "Aguarde..."
  userResult.src = botResult.src = "./rock.png";
  result.textContent = "Aguarde...";

  // Ativa a imagem clicada e desativa as outras
  optionImages.forEach((imagem, indice) => {
    imagem.classList.toggle("active", indice === indiceClicado);
  });

  gameContainer.classList.add("start");

  setTimeout(() => {
    gameContainer.classList.remove("start");

    // Define as imagens do usuário e do bot
    const srcImagemUsuario = imagemClicada.querySelector("img").src;
    userResult.src = srcImagemUsuario;

    const numeroAleatorio = Math.floor(Math.random() * botImages.length);
    const srcImagemBot = botImages[numeroAleatorio];
    botResult.src = srcImagemBot;

    // Determina o resultado
    const escolhaUsuario = ["R", "P", "S"][indiceClicado];
    const escolhaBot = ["R", "P", "S"][numeroAleatorio];
    const chaveResultado = escolhaUsuario + escolhaBot;
    const resultadoFinal = resultados[chaveResultado] || "Desconhecido";

    // Exibe o resultado
    result.textContent = escolhaUsuario === escolhaBot ? "Empate na partida" : `${resultadoFinal} VENCEU!`;
  }, 2500);
}

// Adiciona ouvintes de eventos às opções de imagens
optionImages.forEach(imagem => {
  imagem.addEventListener("click", aoClicarNaOpcao);
});