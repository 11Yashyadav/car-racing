const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const level = document.querySelector(".level");

// loading audio files

let gameStart = new Audio();
let gameOver = new Audio();

gameStart.src = "assets/audio/game_theme.mp3";
gameOver.src = "assets/audio/gameOver_theme.mp3";

const levelSpeed = { easy: 7, moderate: 10, difficult: 14 };

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};
let player = { speed: 7, score: 0 };
level.addEventListener("click", (e) => {
  player.speed = levelSpeed[e.target.id];
});

startScreen.addEventListener("click", () => {
  // gameArea.classList.remove('hide');
  startScreen.classList.add("hide");
  gameArea.innerHTML = "";

  player.start = true;
  gameStart.play();
  gameStart.loop = true;
  player.score = 0;
  window.requestAnimationFrame(gamePlay);

  for (let i = 0; i < 5; i++) {
    let roadLineElement = document.createElement("div");
    roadLineElement.setAttribute("class", "roadLines");
    roadLineElement.y = i * 150;
    roadLineElement.style.top = roadLineElement.y + "px";
    gameArea.appendChild(roadLineElement);
  }

  let carElement = document.createElement("div");
  carElement.setAttribute("class", "car");
  gameArea.appendChild(carElement);

  player.x = carElement.offsetLeft;
  player.y = carElement.offsetTop;

  for (let i = 0; i < 3; i++) {
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemyCar");
    enemyCar.y = (i + 1) * 350 * -1;
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.backgroundColor = randomColor();
    enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
    gameArea.appendChild(enemyCar);
  }
});

function randomColor() {
  function c() {
    let hex = Math.floor(Math.random() * 256).toString(16);
    return ("0" + String(hex)).substr(-2);
  }
  return "#" + c() + c() + c();
}

function onCollision(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();

  return !(
    aRect.top > bRect.bottom ||
    aRect.bottom < bRect.top ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function onGameOver() {
  player.start = false;
  gameStart.pause();
  gameOver.play();
  startScreen.classList.remove("hide");
  startScreen.innerHTML =
    "Game Over <br> Your final score is " +
    player.score +
    "<br> Press here to restart the game.";
}
