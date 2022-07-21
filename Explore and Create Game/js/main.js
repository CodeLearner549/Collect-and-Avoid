//Global Variables that need to be reset and Initialization
let state;
let player;
let score;
let best = 0;
let enemies = initEnemies(5);
let enemySpeed = 3;
reset();

// Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state === "start") {
    drawStart();
  } else if (state === "gameon") {
    runGame();
  } else if (state === "gameover") {
    drawGameOver();
  }

  // Request Animation Frame
  requestAnimationFrame(draw);
}

//Events
document.addEventListener("mousedown", mousedownHandler);
function mousedownHandler() {
  mouseIsPressed = true;

  //Start Game on Mousedown
  if (state === "start") {
    state = "gameon";
  }
}

function mouseupHandler() {
  mouseIsPressed = false;
  propeller.pause();
}
