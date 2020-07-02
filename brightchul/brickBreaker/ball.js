
class Ball {
    constructor({x, y, ballRadius, dx, dy}) {
        this.originX = x;
        this.originY = y;
        this.x = x;
        this.y = y;
        this.ballRadius = ballRadius;
        this.dx = dx;
        this.dy = dy;
        this.color = "#0095DD";
        this.doublePI = Math.PI * 2;
    }
    turnDX() {
        this.dx = -this.dx;
    }
    turnDY() {
        this.dy = -this.dy;
    }
    move() {
        this.x += this.dx;
        this.y += this.dy;
    }
    reset() {
        this.x = this.originX;
        this.y = this.originY;
        this.dx = 3;
        this.dy = -3;
    }
    getInfo() {
        return [this.x, this.y, this.ballRadius, 0, this.doublePI];
    }
    getInfoXRight() {
        return this.x + this.dx + this.ballRadius;
    }
    getInfoXLeft() {
        return this.x + this.dx - this.ballRadius;
    }
    getInfoYTop() {
        return this.y + this.dy + this.ballRadius;
    }
    getInfoYBottom() {
        return this.y + this.dy - this.ballRadius;
    }
}