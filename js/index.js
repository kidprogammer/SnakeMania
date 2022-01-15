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
  console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  //If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
    // If you bump into the wall
    if (
      snake[0].x >= 18 ||
      snake[0].x <= 0 ||
      snake[0].y >= 18 ||
      snake[0].y <= 0
    ) {
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
    alert = "Game Over. Press any key to play again!";
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
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  InputDir = { x: 0, y: 1 }; // Start the game
  moveSound.play();

  if(e.key == "ArrowUp" || e.key == "w"){
    console.log("ArrowUp");
    InputDir.x = 0;
    InputDir.y = -1;
  }

  else if(e.key == "ArrowDown" || e.key == "s"){
    console.log("ArrowDown");
    InputDir.x = 0;
    InputDir.y = 1;
  }

//   else if(e.key == "ArrowLeft" || e.key =="")

else if(e.key == "ArrowLeft" || e.key =="a"){
    console.log("ArrowLeft");
      InputDir.x = -1;
      InputDir.y = 0;
}

else 

  switch (e.key) {
    // case "ArrowUp":
    //   console.log("ArrowUp");
    //   InputDir.x = 0;
    //   InputDir.y = -1;
    //   break;
    // case "w":
    //   console.log("w");
    //   InputDir.x = 0;
    //   InputDir.y = -1;
    //   break;
    // case "ArrowDown":
    //   console.log("ArrowDown");
    //   InputDir.x = 0;
    //   InputDir.y = 1;
    //   break;
    // case "s":
    //   console.log("s");
    //   InputDir.x = 0;
    //   InputDir.y = 1;
    //   break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      InputDir.x = -1;
      InputDir.y = 0;
      break;
    case "a":
      console.log("a");
      InputDir.x = -1;
      InputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      InputDir.x = 1;
      InputDir.y = 0;
      break;
    case "d":
      console.log("d");
      InputDir.x = 1;
      InputDir.y = 0;
      break;
    default:
      break;
  }
});
