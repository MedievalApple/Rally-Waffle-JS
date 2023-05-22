var player;
var blocks = [];
var gridSize;
var corners = [];
//W = wall
//S = Start
//G = Grass
var carImage;
var map = [];
var map2 = [];
function setup() {
    createCanvas(800, 800);
    gridSize = width / 8;
    player = new Car();
    map = [
        ["W", "G", "G", "W", "W", "G", "G", "W"],
        ["S", " ", " ", " ", " ", " ", " ", "G"],
        [" ", "W", "W", " ", "W", "W", " ", " "],
        [" ", "W", "W", " ", "W", "W", "W", " "],
        [" ", "W", "W", " ", " ", " ", " ", " "],
        [" ", "W", " ", " ", "G", "G", "G", " "],
        [" ", " ", " ", "G", "G", "W", "G", " "],
        ["W", "W", " ", "W", "G", "G", "G", " "]
    ];

    map2 = [
        ["W", " ", " ", " ", " ", " ", "W", "W"],
        [" ", " ", "G", "W", "G", " ", " ", " "],
        [" ", "G", "G", " ", "W", "W", "W", " "],
        [" ", "W", "W", " ", "W", "W", "W", " "],
        [" ", "W", "W", " ", " ", " ", " ", " "],
        [" ", " ", "W", "G", " ", "W", "W", " "],
        ["G", " ", " ", " ", " ", "W", "W", " "],
        ["W", "W", "W", "G", " ", " ", " ", "S"]
    ];
    carImage = loadImage("./assets/player.png")
}

function draw() {
    background(0);
    showMap(map2);
    player.move();
    player.show();
}
function showMap(theMap) {
    for (let i = 0; i < theMap.length; i++) {
        for (let j = 0; j < theMap[0].length; j++) {
            if (theMap[i][j]) {
                if (theMap[i][j] == "W") {
                    fill(151);
                    noStroke();
                    rect(j * gridSize, i * gridSize, gridSize, gridSize);
                } else if (theMap[i][j] == "G") {
                    fill(0, 177, 0);
                    noStroke();
                    rect(j * gridSize, i * gridSize, gridSize, gridSize);
                }
            }
        }
    }
    for (let i = 0; i < 8; i++) {
        stroke(51);
        strokeWeight(3);
        line(i * gridSize, 0, i * gridSize, height);
        line(0, i * gridSize, width, i * gridSize);
    }
}
class Car {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.carAngle = 0;
        this.w = 32 * 2;
        this.h = 32 * 2;
        this.vel = createVector(0, 0);
    }
    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.carAngle);
        noStroke();
        fill(255);
        image(carImage, -this.w / 2, -this.h / 2, this.w, this.h);
        pop();
        corners[0] = createVector(-this.w / 2, -this.h / 2).rotate(this.carAngle);
        stroke(255, 0, 0);
        point(corners[0].x+this.pos.x, corners[0].y+this.pos.y)
    }
    move() {
        if (keyIsDown(87)) { // w key
            this.vel = createVector(0, -2);
        }
        else if (keyIsDown(83)) { // s key
            this.vel = createVector(0, 2);
        } else {
            this.vel = createVector(0, 0);
        }
        if (keyIsDown(65)) { // a key
            this.carAngle -= PI / 120;
        }
        if (keyIsDown(68)) { // d key
            this.carAngle += PI / 120;
        }
        this.pos.add(this.vel.rotate(this.carAngle));
    }
}
