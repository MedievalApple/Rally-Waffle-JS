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
    background(255);
    showMap(map);
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
        this.pos = createVector(width / 2 - gridSize / 2, height / 2 - gridSize / 2);
        this.carAngle = 0;
        this.w = 32 * 2 - 10;
        this.h = 32 * 2 - 4;
        this.vel = createVector(0, 0);
    }
    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.carAngle);
        noStroke();
        fill(255);
        image(carImage, -this.w / 2-4, -this.h / 2, 64, 64);
        pop();
        stroke(255, 0, 0);
        corners[0] = createVector(-this.w / 2, -this.h / 2).rotate(this.carAngle);
        corners[0].add(this.pos);

        corners[1] = createVector(this.w / 2, -this.h / 2).rotate(this.carAngle);
        corners[1].add(this.pos);

        corners[2] = createVector(-this.w / 2, this.h / 2).rotate(this.carAngle);
        corners[2].add(this.pos);

        corners[3] = createVector(this.w / 2, this.h / 2).rotate(this.carAngle);
        corners[3].add(this.pos);

        strokeWeight(4);
        stroke(255, 0, 0);
        point(corners[0].x, corners[0].y);
        point(corners[1].x, corners[1].y)
        point(corners[2].x, corners[2].y)
        point(corners[3].x, corners[3].y)
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
            if (this.collide()) {
                this.carAngle += PI / 120;
            }
        }
        if (keyIsDown(68)) { // d key
            this.carAngle += PI / 120;
            if (this.collide()) {
                this.carAngle -= PI / 120;
            }
        }
        this.pos.add(this.vel.rotate(this.carAngle));
        if (this.collide()) {
            console.log("Collide");
            this.pos.sub(this.vel);
        }
    }
    collide() {
        corners[0] = createVector(-this.w / 2, -this.h / 2).rotate(this.carAngle);
        corners[0].add(this.pos);
        corners[0].mult(1 / gridSize);

        corners[1] = createVector(this.w / 2, -this.h / 2).rotate(this.carAngle);
        corners[1].add(this.pos);
        corners[1].mult(1 / gridSize);

        corners[2] = createVector(-this.w / 2, this.h / 2).rotate(this.carAngle);
        corners[2].add(this.pos);
        corners[2].mult(1 / gridSize);

        corners[3] = createVector(this.w / 2, this.h / 2).rotate(this.carAngle);
        corners[3].add(this.pos);
        corners[3].mult(1 / gridSize);
        if (map[floor(corners[0].y)][floor(corners[0].x)] == "W") {
            console.log(this.carAngle*260/2*PI);
            return true;
        }
        if (map[floor(corners[1].y)][floor(corners[1].x)] == "W" ||
            map[floor(corners[2].y)][floor(corners[2].x)] == "W" ||
            map[floor(corners[3].y)][floor(corners[3].x)] == "W") {
            return true;
        }
        return false;
    }
}
function UWUmode(uwu) {
    if (uwu == "uwu" || uwu == "UWU") {
        carImage = loadImage("./assets/player_UWU.png");
    }
}