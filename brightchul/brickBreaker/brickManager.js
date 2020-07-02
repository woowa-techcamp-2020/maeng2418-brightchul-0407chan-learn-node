
class Brick {
    constructor({ x, y, status = 1, color = '#0095DD', 
    brickWidth=75, brickHeight=20, brickPadding=10, 
    brickOffsetTop=30, brickOffsetLeft=30}) {
        this.x = x;
        this.y = y;
        this.status = status;
        this.color = color;
        this.brickWidth = brickWidth;
        this.brickHeight = brickHeight;
        this.brickPadding = brickPadding;
        this.brickOffsetTop = brickOffsetTop;
        this.brickOffsetLeft = brickOffsetLeft;
    }
    calculateXY(r, c) {
        this.x = (r * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
        this.y = (c * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
    }
    getInfo() {
        return [this.x, this.y, this.brickWidth, this.brickHeight];
    }
    isCollision(x, y) {
        return (x > this.x && x < this.x + this.brickWidth 
            && y > this.y && y < this.y + this.brickHeight);
    }
    changeStatus() {
        this.status = 0;
    }
}

class BrickManager {
    constructor({x, y, brickColCount, brickRowCount}) {
        const bricks = [];
        for (var c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for (var r = 0; r < brickRowCount; r++) {
                bricks[c][r] = new Brick({ x, y });
            }
        }

        this.bricks = bricks;
        this.brickColCount = brickColCount;
        this.brickRowCount = brickRowCount;
        this.totalCount = brickColCount * brickRowCount;
    }
    getTotalCount() {
        return this.totalCount;
    }
    getBrick(c,r) {
        return this.bricks[c][r];
    }
}
