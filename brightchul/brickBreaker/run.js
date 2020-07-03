
// 캔버스
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

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
});

const renderer = new Render({canvas, ctx, game});
renderer.render();