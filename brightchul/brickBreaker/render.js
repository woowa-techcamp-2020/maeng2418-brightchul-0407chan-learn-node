
class Render {
    constructor({canvas, ctx, game}) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.game = game;
        this.rightPressed = false;
        this.leftPressed = false;
        this.render = this.render.bind(this);
        this.eventSetting();
    }
    eventSetting() {
        document.addEventListener("keydown", e => {
            if (e.key == "Right" || e.key == "ArrowRight") {
                this.rightPressed = true;
            }
            else if (e.key == "Left" || e.key == "ArrowLeft") {
                this.leftPressed = true;
            }
        }, false);

        document.addEventListener("keyup", e => {
            if (e.key == "Right" || e.key == "ArrowRight") {
                this.rightPressed = false;
            }
            else if (e.key == "Left" || e.key == "ArrowLeft") {
                this.leftPressed = false;
            }
        }, false);
        document.addEventListener("mousemove", e => {
            var relativeX = e.clientX - this.canvas.offsetLeft;
            if (relativeX > 0 && relativeX < canvas.width) {
                this.game.paddle.setX(relativeX - this.game.paddle.width/2);
            }
        }, false);
    }
    drawRect(info, color) {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.rect(...info);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
    drawCircle(info, color) {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(...info);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
    drawText({font, color, text, x, y}) {
        const ctx = this.ctx;
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    }
    drawBall() {
        const {info, color} = this.game.getModelInfo('ball');
        this.drawCircle(info, color);
    }
    drawBricks() {
        // status가 1인건만 받는다.
        const brickArr = this.game.getModelInfo('brickManager');
        brickArr.forEach(brick => 
            this.drawRect(brick.info, brick.color));
    }
    drawPaddle() {
        const {info, color} = this.game.getModelInfo('paddle');
        this.drawRect(info, color);
    }
    drawScore() {
        const ctx = this.ctx;
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + this.game.score, 8, 20);
    }
    drawLives() {
        const ctx = this.ctx;
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: " + this.game.lives, this.canvas.width - 65, 20);
    }
    render() {
        this.game.operate(this.rightPressed, this.leftPressed);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBricks();
        this.drawBall();
        this.drawPaddle();
        this.drawScore();
        this.drawLives();

        requestAnimationFrame(this.render);
    }
}

