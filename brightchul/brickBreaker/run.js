
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

const game = new GameManager({
    brickManager,
    ball,
    paddle,
    canvas
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
        game.paddle.setX(relativeX - game.paddle.width/2);
    }
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(...game.ball.getInfo());
    ctx.fillStyle = game.ball.color;
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(...game.paddle.getInfo());
    ctx.fillStyle = game.paddle.color;
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for (var c = 0; c < game.brickManager.brickColCount; c++) {
        for (var r = 0; r < game.brickManager.brickRowCount; r++) {
            const brick = game.brickManager.getBrick(c,r);
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

    game.collisionDetection();
    game.isOutBallX();
    game.isOutBallY();
    game.movePaddle(rightPressed, leftPressed);
    game.moveBall();
    ball.move();

    requestAnimationFrame(draw);
}

draw();