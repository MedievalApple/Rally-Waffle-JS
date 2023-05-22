var player;
function setup() {
    createCanvas(800, 400);
    player = new Car();
}

function draw() {
    background(0);
}
class Car {
    constructor() {
        this.pos = createVector(width/2, height/2);
    }
}