const ball = document.getElementById('ball');
const leftPaddle = document.getElementById('leftPaddle');
const rightPaddle = document.getElementById('rightPaddle');
const game = document.getElementById('game');
const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');

let ballX = 300;
let ballY = 200;
let ballSpeedX = 5;
let ballSpeedY = 5;

let leftPaddleY = 150;
let rightPaddleY = 150;
let pScore = 0;
let cScore = 0;
let moveRight = true

function moveRightPaddle() {
    if (moveRight == true) {
        if (rightPaddleY + 50 < ballY) {
            rightPaddleY += 4;
        } else if (rightPaddleY + 50 > ballY) {
            rightPaddleY -= 4;
        }
    } else {
        // do nothing
    }
}


document.addEventListener('keydown', (event) => {
    if (event.key === 'w' && leftPaddleY > 0) {
      leftPaddleY -= 20;
    } else if (event.key === 's' && leftPaddleY < 300) {
      leftPaddleY += 20;
    }
  });

function resetBallSpeed() {
    ballSpeedX = 5;
    ballSpeedY = 5;
    cScore = 0;
    pScore = 0;
    ballX = 300;
    ballY = 200;
    playerScore.innerHTML = String(pScore);
    computerScore.innerHTML = String(cScore);
    moveRight = true
}

function update() {
    if (pScore == 10) {
        document.getElementById('message').innerHTML = "You win! Great Job.";
        document.getElementById('message').style.color = "green";
        ballSpeedX = 0;
        ballSpeedY = 0;
    } else if (cScore == 10) {
        document.getElementById('message').innerHTML = "You Loose! Computer Win."
        document.getElementById('message').style.color = "red";
        ballSpeedX = 0;
        ballSpeedY = 0;
    } else if (ballSpeedX != 0) {
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        document.getElementById('message').innerHTML = "";
    }
    

    if (ballY < 0 ) {
        ballSpeedY = -ballSpeedY;
    }
    
    if (ballY > 380) {
        ballSpeedY = -ballSpeedY;
        moveRight = true;
    }

    if ((ballX > 570 && ballY > rightPaddleY && ballY < rightPaddleY + 100)) {
        ballSpeedX = -ballSpeedX;
        moveRight = false;
    }

    if (((ballX < 30 && ballY > leftPaddleY && ballY < leftPaddleY + 100))) {
        ballSpeedX = -ballSpeedX;
        moveRight = true;
    }
    
    if (ballX < 0) {
        ballX = 300;
        ballY = 200;
        cScore += 1;
        computerScore.innerHTML = String(cScore);
    }
    
    if (ballX > 600) {
        ballX = 300;
        ballY = 200;
        pScore += 1;
        playerScore.innerHTML = String(pScore);
    }
    
    moveRightPaddle();

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    leftPaddle.style.top = leftPaddleY + 'px';
    rightPaddle.style.top = rightPaddleY + 'px';
}

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
