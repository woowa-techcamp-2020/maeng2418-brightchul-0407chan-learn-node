
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

// paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

// brickManager
var brickRowCount = 5;
var brickColumnCount = 3;

// 
var score = 0;
var lives = 3;

const brickManager = new BrickManager({x : ball.x , y : ball.y, brickRowCount : 5, brickColCount : 3});


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
        paddleX = relativeX - paddleWidth / 2;
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
                    // dy = -dy;
                    brick.changeStatus();
                    score++;
                    if (score == brickTotalCount) {
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
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for (var c = 0; c < brickManager.brickColCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
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
    ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
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
        // dx = -dx;
        ball.turnDX();
    }
    if (ball.getInfoYBottom() < 0) {
        ball.turnDY();
        // dy = -dy;
    }
    else if (ball.getInfoYTop() > canvas.height) {
        if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
            ball.turnDY();
            // dy = -dy;
        }
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                ball.reset();
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    ball.move();
    // x += dx;
    // y += dy;
    requestAnimationFrame(draw);
}

draw();