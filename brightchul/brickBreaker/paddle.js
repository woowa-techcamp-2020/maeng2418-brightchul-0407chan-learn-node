
class Paddle {
    constructor({paddleX, paddleY, paddleHeight, paddleWidth, color}) {
        this.originX = paddleX;
        this.x = paddleX;
        this.y = paddleY;
        this.height = paddleHeight;
        this.width = paddleWidth;
        this.color = color;
    }
    getInfo() {
        return [this.x, this.y, this.width, this.height];
    }
    setX(v) {
        this.x = v;
    }
    move(v) {
        this.x += v;
    }
    reset() {
        this.x = this.originX;
    }
}