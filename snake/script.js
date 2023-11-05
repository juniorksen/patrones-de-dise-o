let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box
};
let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
};

// Define las estrategias de movimiento
const strategies = {
  left: (snakeHead) => ({ x: snakeHead.x - box, y: snakeHead.y }),
  right: (snakeHead) => ({ x: snakeHead.x + box, y: snakeHead.y }),
  up: (snakeHead) => ({ x: snakeHead.x, y: snakeHead.y - box }),
  down: (snakeHead) => ({ x: snakeHead.x, y: snakeHead.y + box }),
};

// Selecciona la estrategia de movimiento
function setDirection(newDirection) {
  direction = newDirection;
}

// Mueve la serpiente utilizando la estrategia seleccionada
function moveSnake() {
  let snakeHead = Object.assign({}, snake[0]); // Copiamos la cabeza de la serpiente
  let newHead = strategies[direction](snakeHead);
  snake.unshift(newHead); // Agregamos la nueva cabeza a la serpiente
  if (newHead.x === food.x && newHead.y === food.y) {
    // La serpiente come la comida
    // Generamos una nueva comida
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  } else {
    snake.pop(); // Eliminamos la cola de la serpiente
  }
}

// Maneja los eventos del teclado
document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 37: // Tecla izquierda
      setDirection('left');
      break;
    case 38: // Tecla arriba
      setDirection('up');
      break;
    case 39: // Tecla derecha
      setDirection('right');
      break;
    case 40: // Tecla abajo
      setDirection('down');
      break;
  }
});

// Dibuja el fondo
function createBackground() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

// Dibuja la serpiente
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

// Dibuja la comida
function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

// Función principal del juego
function startGame() {
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game);
      alert('Game Over :(');
    }
  }

  createBackground();
  drawSnake();
  drawFood();
  moveSnake();
}

let game = setInterval(startGame, 100);
