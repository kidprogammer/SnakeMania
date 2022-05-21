// Game Constants & Variables

//change to see

let InputDir = { x: 0, y: 0 };
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
let speed = 11;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  //   console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

const updateHighScoreDisplay = () =>
  highScoreBox.innerHTML = `High Score: ${localStorage.getItem("highScore") ? localStorage.getItem("highScore") : "0"}`

const updateHighScore = (score) => {
  const currentHighScore = localStorage.getItem("highScore")
  if(score > parseInt(currentHighScore)){
    localStorage.setItem("highScore", score)
    updateHighScoreDisplay();
  }
}

function isCollide(snake) {
  //If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      updateHighScore(score);
      return true;
    }
    // If you bump into the wall
    if (
      snake[0].x >= 18 ||
      snake[0].x <= 0 ||
      snake[0].y >= 18 ||
      snake[0].y <= 0
    ) {
      updateHighScore(score)
      return true;
    }
  }
}

function gameEngine() {
  // Part 1: Updating the snake array & food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    InputDir = { x: 0, y: 0 };
    // alert("Game Over. Press any key to play again!");
    snakeArr = [{ x: 13, y: 15 }];
    // musicSound.play();
    score = 0;
  }

  // If you have eaten the food, increament the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + InputDir.x,
      y: snakeArr[0].y + InputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += InputDir.x;
  snakeArr[0].y += InputDir.y;
  //Part 2: Display the snake and food
  //Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Main logic starts here
updateHighScoreDisplay();
window.requestAnimationFrame(main);
InputDir = { x: 0, y: 0 }; // Start the game
window.addEventListener("keydown", (e) => {

  if (e.key == "ArrowUp" || e.key == "w" || e.key == "W") {
    moveSound.play();
    InputDir.x = 0;
    InputDir.y = -1;
  } else if (e.key == "ArrowDown" || e.key == "s" || e.key == "S") {
    moveSound.play();
    InputDir.x = 0;
    InputDir.y = 1;
  } else if (e.key == "ArrowLeft" || e.key == "a" || e.key == "A") {
    moveSound.play();
    InputDir.x = -1;
    InputDir.y = 0;
  } else if (e.key == "ArrowRight" || e.key == "d" || e.key == "D") {
    moveSound.play();
    InputDir.x = 1;
    InputDir.y = 0;
  } 
});
