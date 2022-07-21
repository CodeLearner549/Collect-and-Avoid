// Draw Start Screen
function drawStart() {
  drawMainComponents();

  // Start Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("CLICK TO START", 250, 285);

  ctx.font = "25px Consolas";
  ctx.fillText("WASD TO MOVE", 145, 450);
  ctx.fillText("COLLECT BLOCKS", 460, 450);
  ctx.fillText("AVOID ENEMY BLOCKS", 460, 490);
}

let blocks = initBlocks(1);

// Draw Game Elements
function runGame() {
  //LOGIC
  movePlayer();
  eatBlocks();
  bestUpdate();
  changeEnemy();
  collideEnemy();

  //DRAW
  drawMainComponents();
  drawPlayer();
  drawBlocks();
  drawEnemies();
}

function bestUpdate() {
  if (score > best) {
    best = score;
  }
}

function movePlayer() {
  if (keyPressed["KeyW"] && player.y >= 0) {
    player.y += -player.speed;
  } else if (keyPressed["KeyS"] && player.y <= cnv.height - player.h) {
    player.y += player.speed;
  }

  if (keyPressed["KeyA"] && player.x >= 0) {
    player.x += -player.speed;
  } else if (keyPressed["KeyD"] && player.x <= cnv.width - player.w) {
    player.x += player.speed;
  }
}

function gameOver() {
  state = "gameover";

  setTimeout(reset, 2000);
}

// Draw Game Over Screen
function drawGameOver() {
  drawMainComponents();

  // Game Over Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("GAME OVER", 250, 285);
}

//HELPER FUNCTIONS
function reset() {
  state = "start";
  score = 0;
  player = {
    x: 300,
    y: 300,
    w: 25,
    h: 25,
    speed: 3,
  };
}

function drawMainComponents() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  ctx.font = "30px Consolas";
  ctx.fillStyle = "red";
  ctx.fillText("COLLECT GAME", 25, 35);
  ctx.fillText(`SCORE: ${score}`, 25, cnv.height - 15);
  ctx.fillText(`BEST: ${best}`, cnv.width - 250, cnv.height - 15);
}

function drawPlayer() {
  ctx.strokeStyle = "white";
  ctx.strokeRect(player.x, player.y, player.w, player.h);
}

function drawBlocks() {
  ctx.fillStyle = "green";
  for (let i = 0; i < blocks.length; i++) {
    drawBlock(blocks[i]);
  }
}

function drawBlock(block) {
  ctx.fillRect(block.x, block.y, block.w, block.h);
}

function initBlocks(n) {
  let temp = [];
  for (let num = 1; num <= n; num++) {
    temp.push(newRandomBlock());
  }
  return temp;
}

function newRandomBlock() {
  return {
    x: Math.random() * cnv.width,
    y: Math.random() * cnv.height,
    w: 15,
    h: 15,
    color: "green",
  };
}

function eatBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    if (rectCollide(player, blocks[i])) {
      blocks.splice(i, 1);
      blocks = initBlocks(1);
      score++;
      break;
    }
  }
}

//Enemy

function drawEnemies() {
  ctx.fillStyle = "red";
  for (let i = 0; i < enemies.length; i++) {
    drawEnemy(enemies[i]);
    moveEnemy(enemies[i]);
  }
}

function drawEnemy(a_enemies) {
  ctx.fillRect(a_enemies.x, a_enemies.y, a_enemies.w, a_enemies.h);
}

function initEnemies(n) {
  let temp = [];
  for (let num = 1; num <= n; num++) {
    temp.push(newRandomEnemy());
  }
  return temp;
}

function newRandomEnemy() {
  let position = randomInt(1, 4);
  if (position === 1) {
    //Top Down
    return {
      currentPos: 1,
      x: Math.random() * cnv.width,
      y: 0,
      w: Math.random() * 50,
      h: Math.random() * 50,
      color: "red",
    };
  } else if (position === 2) {
    //Bottom Up

    return {
      currentPos: 2,
      x: Math.random() * cnv.width,
      y: cnv.height,
      w: Math.random() * 50,
      h: Math.random() * 50,
      color: "red",
    };
  } else if (position === 3) {
    //Left Right
    return {
      currentPos: 3,
      x: 0,
      y: Math.random() * cnv.height,
      w: Math.random() * 50,
      h: Math.random() * 50,
      color: "red",
    };
  } else if (position === 4) {
    //Right Left
    return {
      currentPos: 4,
      x: cnv.width,
      y: Math.random() * cnv.height,
      w: Math.random() * 50,
      h: Math.random() * 50,
      color: "red",
    };
  }
}

function moveEnemy(b_enemies) {
  if (b_enemies.currentPos === 1) {
    b_enemies.y += enemySpeed;
  } else if (b_enemies.currentPos === 2) {
    b_enemies.y -= enemySpeed;
  } else if (b_enemies.currentPos === 3) {
    b_enemies.x += enemySpeed;
  } else if (b_enemies.currentPos === 4) {
    b_enemies.x -= enemySpeed;
  }
}

function changeEnemy() {
  let i = 0;
  while (i < enemies.length) {
    if (enemies[i].x < 0) {
      enemies.splice(i, 1);
      enemies.push(newRandomEnemy());
    } else if (enemies[i].x > cnv.width) {
      enemies.splice(i, 1);
      enemies.push(newRandomEnemy());
    } else if (enemies[i].y < 0) {
      enemies.splice(i, 1);
      enemies.push(newRandomEnemy());
    } else if (enemies[i].y > cnv.height) {
      enemies.splice(i, 1);
      enemies.push(newRandomEnemy());
    } else {
      i++;
    }
  }
}

function collideEnemy() {
  //Collision with the Enemies
  for (let i = 0; i < enemies.length; i++) {
    if (rectCollide(player, enemies[i]) === true) {
      gameOver();
    }
  }
}
