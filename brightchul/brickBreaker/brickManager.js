
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
    isLive() {
        return this.status === 1;
    }
}

class BrickManager {
    constructor({x, y, brickColCount, brickRowCount}) {
        const bricks = [];
        for (var c = 0; c < brickColCount; c++) {
            bricks[c] = [];
            for (var r = 0; r < brickRowCount; r++) {
                const brick = new Brick({x, y});
                brick.calculateXY(r, c);
                bricks[c][r] = brick;
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
    bricksLoop(callback) {
        const {brickColCount, brickRowCount} = this;
        for(let c = 0; c<brickColCount; c++) {
            for(let r = 0; r<brickRowCount; r++) {
                callback(this.bricks[c][r], c, r);
            }
        }
    }
    getInfo() {
        // [{info, color}, ...]
        const resultArr = [];
        this.bricksLoop( (brick, c, r) => {
            if(brick.isLive())
                resultArr.push({color : brick.color, info : brick.getInfo()});
        });
        return resultArr;
    }
}
