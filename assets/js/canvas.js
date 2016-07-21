/**
 * Created by ksong on 2016/7/14.
 */
var canvas, ctx;
var vertexes = [];
var diffPt = [];
var autoDiff = 1000;
var verNum = 250;
var height = 200;
var canvasW = window.innerWidth + 40;
var addListener = function (e, str, func) {
    if (e.addEventListener) {
        e.addEventListener(str, func, false);
    } else if (e.attachEvent) {
        e.attachEvent("on" + str, func);
    }
};

addListener(window, "load", init);

function resize() {
    canvasW = document.getElementById('canvas-wrapper').offsetWidth + 40;
    initCanvas(canvasW, height);
    var cW = canvas.width;
    var cH = canvas.height;
    for (var i = 0; i < verNum; i++)        vertexes[i] = new Vertex(cW / (verNum - 1) * i, cH/2, cH / 4);
    initDiffPt();
}

function initCanvas(width, height) {
    canvas = document.getElementById("canvas");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
}

function init() {
    resize();
    var FPS = 30;
    var interval = 1000 / FPS >> 0;
    var timer = setInterval(update, interval);
    if (window.addEventListener) addListener(window, "DOMMouseScroll", wheelHandler);
    addListener(window, "mousewheel", wheelHandler);
    addListener(window, "resize", resize);
}

var wheelHandler = function (e) {
    autoDiff = 200;
    //var rand = Math.ceil(Math.random() * canvas.width) - 3;
    xx = 1 + Math.floor((verNum/5 - 2) * 400 / canvas.width);
    diffPt[xx] = autoDiff;
};

function initDiffPt() {
    for (var i = 0; i < verNum; i++)
        diffPt[i] = 0;
}
var xx = 150;
var dd = 15;

function update() {
    //ctx.rect(50,20,280,620);
    //ctx.stroke();
    //ctx.clip();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    autoDiff -= autoDiff * 0.9;
    diffPt[xx] = autoDiff;

    for (var i = xx - 1; i > 0; i--) {
        var d = xx - i;
        if (d > dd)d = dd;
        diffPt[i] -= (diffPt[i] - diffPt[i + 1]) * (1 - 0.01 * d);
    }

    for (var i = xx + 1; i < verNum; i++) {
        var d = i - xx;
        if (d > dd)d = dd;
        diffPt[i] -= (diffPt[i] - diffPt[i - 1]) * (1 - 0.01 * d);
    }


    for (var i = 0; i < vertexes.length; i++) {
        vertexes[i].updateY(diffPt[i]);
    }

    draw();

}
var color1 = "#6ca0f6";
var color2 = "#367aec";
function draw() {
    ctx.beginPath();
    ctx.moveTo(0, window.innerHeight);
    ctx.fillStyle = color1;
    ctx.lineTo(vertexes[0].x, vertexes[0].y);
    for (var i = 1; i < vertexes.length; i++) {
        ctx.lineTo(vertexes[i].x, vertexes[i].y);
    }
    ctx.lineTo(canvas.width, window.innerHeight);
    ctx.lineTo(0, window.innerHeight);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, window.innerHeight);
    ctx.fillStyle = color2;
    ctx.lineTo(vertexes[0].x + 15, vertexes[0].y + 5);
    for (var i = 1; i < vertexes.length; i++) {
        ctx.lineTo(vertexes[i].x + 15, vertexes[i].y + 5);
    }
    ctx.lineTo(canvas.width, window.innerHeight);
    ctx.lineTo(0, window.innerHeight);
    ctx.fill();
}

function Vertex(x, y, baseY) {
    this.baseY = baseY;
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.targetY = 0;
    this.friction = 0.15;
    this.deceleration = 0.95;
}

Vertex.prototype.updateY = function (diffVal) {
    this.targetY = diffVal + this.baseY;
    this.vy += this.targetY - this.y;
    this.y += this.vy * this.friction;
    this.vy *= this.deceleration;
};
var blue = function () {
    color1 = "#6ca0f6";
    color2 = "#367aec";
};
