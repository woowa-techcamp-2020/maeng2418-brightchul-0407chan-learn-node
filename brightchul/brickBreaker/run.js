
// 캔버스
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var rightPressed = false;
var leftPressed = false;

const ball = new Ball({
    x : canvas.width / 2, 
    y : canvas.height - 30, 
    ballRadius : 10, 
    dx : 2, 
    dy : -2
});

const paddle = new Paddle({
    paddleWidth : 75, 
    paddleHeight : 10, 
    paddleX : (canvas.width - 75) / 2, 
    paddleY : canvas.height - 10, 
    color: '#0095DD'
});

const brickManager = new BrickManager({
    x : ball.x, 
    y : ball.y, 
    brickRowCount : 5, 
    brickColCount : 3
});


var score = 0;
var lives = 1;

class GameManager {
    constructor({brickManager, ball, paddle, score = 0, lives = 1}) {
        this.brickManager = brickManager;
        this.ball = ball;
        this.paddle = paddle;
        this.score = score;
        this.lives = lives;
    }
    plusScore(v) {
        this.score += v;
    }
    equalScore(v) {
        return this.score === v;
    }
    decreaseLives() {
        this.lives--;
    }
    hasLives() {
        return this.lives > 0;
    }
}

const game = new GameManager({
    brickManager,
    ball,
    paddle
})


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.setX(relativeX - paddle.width/2);
    }
}
function collisionDetection() {
    const brickTotalCount = brickManager.getTotalCount();
    for (var c = 0; c < brickManager.brickColCount; c++) {
        for (var r = 0; r < brickManager.brickRowCount; r++) {
            const brick = brickManager.getBrick(c,r);
            if (brick.status == 1) {
                if(brick.isCollision(ball.x, ball.y)){
                    ball.turnDY();
                    brick.changeStatus();
                    game.plusScore(1);
                    // score++;
                    if (game.equalScore(brickTotalCount)) {
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(...ball.getInfo());
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(...paddle.getInfo());
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for (var c = 0; c < brickManager.brickColCount; c++) {
        for (var r = 0; r < brickManager.brickRowCount; r++) {
            const brick = brickManager.getBrick(c,r);
            if (brick.status === 1) {
                brick.calculateXY(r, c);

                ctx.beginPath();
                ctx.rect(...brick.getInfo());
                ctx.fillStyle = brick.color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + game.score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + game.lives, canvas.width - 65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if (ball.getInfoXRight() > canvas.width || ball.getInfoXLeft() < 0) {
        ball.turnDX();
    }
    if (ball.getInfoYBottom() < 0) {
        ball.turnDY();
    }
    else if (ball.getInfoYTop() > canvas.height) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.turnDY();
        }
        else {
            game.decreaseLives();
            lives--;
            if (game.hasLives()) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                ball.reset();
                paddle.reset();
            }
        }
    }

    if (rightPressed && paddle.x + paddle.width < canvas.width) {
        paddle.move(7);
    }
    else if (leftPressed && paddle.x > 0) {
        paddle.move(-7);
    }
    ball.move();
    requestAnimationFrame(draw);
}

draw();