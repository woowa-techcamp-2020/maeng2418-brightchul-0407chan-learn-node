
class GameManager {
    constructor({brickManager, ball, paddle, score = 0, lives = 2, canvas}) {
        this.brickManager = brickManager;
        this.ball = ball;
        this.paddle = paddle;
        this.score = score;
        this.lives = lives;
        this.canvas = canvas;
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
    collisionDetection() {
        const brickTotalCount = brickManager.getTotalCount();
        this.brickManager.bricksLoop((brick, c, r) => {
            if(brick.isLive() && brick.isCollision(ball.x, ball.y)) {
                ball.turnDY();
                brick.changeStatus();
                game.plusScore(1);

                if (game.equalScore(brickTotalCount)) {
                    alert("YOU WIN, CONGRATS!");
                    document.location.reload();
                }
            }
        });
    }
    isOutBallX() {
        if (this.ball.getInfoXRight() > this.canvas.width || this.ball.getInfoXLeft() < 0) {
            this.ball.turnDX();
        }
    }
    isOutBallY() {
        const {ball, paddle, canvas} = this;

        if (ball.getInfoYBottom() < 0) {
            ball.turnDY();
        }
        else if (ball.getInfoYTop() > canvas.height) {
            if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
                ball.turnDY();
            }
            else {
                this.decreaseLives();
                if (!this.hasLives()) {
                    alert("GAME OVER");
                    document.location.reload();
                }
                else {
                    ball.reset();
                    paddle.reset();
                }
            }
        }
    }
    movePaddle(rightPressed, leftPressed) {
        const paddle = this.paddle;
        if (rightPressed && paddle.x + paddle.width < this.canvas.width) {
            paddle.move(7);
        }
        else if (leftPressed && paddle.x > 0) {
            paddle.move(-7);
        }
    }
    moveBall() {
        this.ball.move();
    }
}
