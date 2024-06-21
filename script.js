const gameBoard = document.getElementById("game-board");
const boardSize = 20;
const cellSize = gameBoard.clientWidth / boardSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };
let score = 0;

let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("high-score").textContent = `High Score: ${highScore}`;

// Updates the position of the snake and checks for collisions
function update() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }

  if (checkCollision(head)) {
    alert("Game Over! Your score: " + score);
    resetGame();
  }
  // Updating the current score
  document.getElementById("current-score").textContent = `Score: ${score}`;

  // Checking and updating the maximum score
  if (score > highScore) {
    highScore = score;
    document.getElementById(
      "high-score"
    ).textContent = `High Score: ${highScore}`;
    localStorage.setItem("highScore", highScore);
  }
}

// Draws a snake and food on the playing field
function draw() {
  gameBoard.innerHTML = "";
  snake.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.position = "absolute";
    snakeElement.style.left = segment.x * cellSize + "px";
    snakeElement.style.top = segment.y * cellSize + "px";
    snakeElement.style.width = cellSize + "px";
    snakeElement.style.height = cellSize + "px";
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });

  const foodElement = document.createElement("div");
  foodElement.style.position = "absolute";
  foodElement.style.left = food.x * cellSize + "px";
  foodElement.style.top = food.y * cellSize + "px";
  foodElement.style.width = cellSize + "px";
  foodElement.style.height = cellSize + "px";
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

// Generates new food at a random location
function generateFood() {
  food = {
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize),
  };
}

// Checks if the snake collides with field boundaries or with itself
function checkCollision(head) {
  return (
    head.x < 0 ||
    head.x >= boardSize ||
    head.y < 0 ||
    head.y >= boardSize ||
    snake.some(
      (segment) =>
        segment.x === head.x && segment.y === head.y && segment !== head
    )
  );
}

// Resets the game to the initial state
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  generateFood();
  score = 0;
  document.getElementById("current-score").textContent = `Score: ${score}`;
}

// Changes the direction of movement of the snake
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      direction = { x: 1, y: 0 };
      break;
  }
});

setInterval(() => {
  update();
  draw();
}, 100);
