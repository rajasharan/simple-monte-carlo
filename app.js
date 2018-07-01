var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var WIDTH = 400;
var HEIGHT = 400;
var RADIUS = 200;

var circlePoints = 0;
var totalPoints = 0;

function reset() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawArc(RADIUS, RADIUS, RADIUS, "brown");
    circlePoints = 0;
    totalPoints = 0;
}

function drawArc(x, y, r, color) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
}

function isInside(x, y, r) {
    var flag = (x*x) + (y*y) <= (r*r);
    var color = flag? "red": "black";
    drawArc(x+RADIUS, y+RADIUS, 1, color);
    return flag;
}

function countCirclePoints(points, radius) {
    return R.length(R.filter(p => isInside(p[0], p[1], radius))(points));
}

function countTotalPoints(points) {
    return R.length(points);
}

function pi(circlePoints, totalPoints) {
    return 4 * (circlePoints / totalPoints);
}

function genRand(min, max) {
    return () => Math.random() * (max - min) + min;
}

function generateSimulation(radius) {
    return function runSimulation(n) {
        var points = R.zip(R.times(genRand(-radius, radius), n), R.times(genRand(-radius, radius), n));
        circlePoints += countCirclePoints(points, radius);
        totalPoints += countTotalPoints(points);
        //console.log({circlePoints, totalPoints});
        return pi(circlePoints, totalPoints);
    }
}

var runSimulation = generateSimulation(200);
