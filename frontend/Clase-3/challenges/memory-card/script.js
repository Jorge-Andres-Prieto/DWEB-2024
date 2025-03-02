const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = null;
let secondCard = null;
let isFlipping = false;

// Lista de imágenes para las tarjetas
const items = [
  { name: "bee", image: "assets/bee.png" },
  { name: "crocodile", image: "assets/crocodile.png" },
  { name: "macaw", image: "assets/macaw.png" },
  { name: "gorilla", image: "assets/gorilla.png" },
  { name: "tiger", image: "assets/tiger.png" },
  { name: "monkey", image: "assets/monkey.png" },
  { name: "chameleon", image: "assets/chameleon.png" },
  { name: "piranha", image: "assets/piranha.png" },
  { name: "anaconda", image: "assets/anaconda.png" },
  { name: "sloth", image: "assets/sloth.png" },
  { name: "cockatoo", image: "assets/cockatoo.png" },
  { name: "toucan", image: "assets/toucan.png" },
];

// Variables de tiempo y movimientos
let seconds = 0,
    minutes = 0;
let movesCount = 0,
    winCount = 0;

// Función para el temporizador
const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Tiempo:</span> ${minutesValue}:${secondsValue}`;
};

// Función para contar los movimientos
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Pasos:</span> ${movesCount}`;
};

// Función para seleccionar tarjetas aleatorias y duplicarlas
const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;

  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

// Función para barajar el arreglo de tarjetas
const shuffleCards = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// Función para generar la cuadrícula del juego
const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = shuffleCards([...cardValues, ...cardValues]);

  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
          <img src="${cardValues[i].image}" class="image"/>
        </div>
     </div>
    `;
  }

  gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (isFlipping || card.classList.contains("matched") || card === firstCard) {
        return;
      }
      card.classList.add("flipped");

      if (!firstCard) {
        firstCard = card;
      } else {
        secondCard = card;
        isFlipping = true;
        movesCounter();

        let firstCardValue = firstCard.getAttribute("data-card-value");
        let secondCardValue = secondCard.getAttribute("data-card-value");

        if (firstCardValue === secondCardValue) {
          firstCard.classList.add("matched");
          secondCard.classList.add("matched");
          firstCard = null;
          secondCard = null;
          isFlipping = false;
          winCount++;

          if (winCount === (size * size) / 2) {
            clearInterval(interval);
            result.innerHTML = `<h2>Ganaste</h2><h4>Completaste el juego en ${minutes} minutos y ${seconds} segundos con ${movesCount} intentos.</h4>`;
            stopGame();
          }
        } else {
          setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard = null;
            secondCard = null;
            isFlipping = false;
          }, 1000);
        }
      }
    });
  });
};

// Iniciar el juego
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");

  interval = setInterval(timeGenerator, 1000);

  moves.innerHTML = `<span>Pasos:</span> ${movesCount}`;
  initializer();
});

// Detener el juego
const stopGame = () => {
  clearInterval(interval);
  controls.classList.remove("hide");
  stopButton.classList.add("hide");
  startButton.classList.remove("hide");
};

// Función para inicializar el juego
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  matrixGenerator(cardValues);
};

// Evento para detener el juego manualmente
stopButton.addEventListener("click", stopGame);
