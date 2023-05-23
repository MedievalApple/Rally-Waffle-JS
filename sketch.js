var player;
var enemy;
var blocks = [];
var gridSize;
var corners = [];
//W = wall
//S = Start
//G = Grass
//E = End
var carImage;
var enemyImage;
var map = [];
var map2 = [];
var map3 = [];
function setup() {
    createCanvas(1600, 1600);
    gridSize = width / 16;
    player = new Car();
    enemy = new Car();
    map = [
        ["S", "G", "G", "W", "W", "G", "W", "W", "W", "W", " ", " ", " ", " ", " ", "G"],
        [" ", " ", " ", " ", " ", " ", " ", "G", "W", "G", " ", "W", "W", "G", " ", " "],
        [" ", "W", "W", " ", "W", "W", " ", " ", " ", " ", " ", "W", "W", "G", "G", " "],
        [" ", "W", "W", " ", "W", "W", "W", " ", "W", "W", "G", "G", "W", "G", "W", " "],
        [" ", "W", "W", " ", " ", " ", " ", " ", "W", "W", "W", "G", "G", "G", "G", " "],
        [" ", "W", " ", " ", "G", "G", "G", " ", " ", " ", " ", "G", "W", "W", "W", " "],
        [" ", " ", " ", "G", "G", "W", "G", " ", " ", "W", " ", " ", " ", " ", " ", " "],
        [" ", "G", " ", "W", "G", "G", "G", "G", " ", "W", " ", "G", "W", "W", "G", " "],
        [" ", "W", " ", " ", " ", " ", " ", "W", "G", " ", " ", "G", "G", "W", " ", " "],
        [" ", "G", " ", "G", "W", "G", " ", "G", "W", "G", " ", " ", " ", " ", " ", "G"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "G", "G", " ", "G", " ", "G", " ", "W"],
        [" ", "W", "W", " ", "W", "G", "G", " ", " ", " ", " ", "G", " ", " ", " ", " "],
        [" ", "W", "W", " ", "W", "W", "W", " ", "G", "G", "W", "G", " ", "G", "G", " "],
        [" ", "W", " ", " ", " ", " ", " ", " ", "G", "W", "W", "G", " ", "W", "W", " "],
        [" ", "W", " ", "G", "G", "W", "G", " ", " ", "G", "W", "G", " ", "G", "G", " "],
        [" ", " ", " ", "W", "W", "W", "G", "W", " ", " ", " ", " ", " ", " ", " ", " "]
    ];

    map2 = [
        ["W", " ", " ", " ", " ", " ", "G", "W", "G", " ", " ", " ", " ", " ", "G", "W"],
        [" ", " ", "G", "W", "G", " ", " ", " ", " ", " ", "W", " ", "G", " ", " ", "G"],
        [" ", "G", "G", "G", "W", "W", "W", " ", "G", "G", "W", " ", "W", "W", " ", " "],
        [" ", "W", "W", "G", "W", "W", "W", " ", "G", "W", "W", " ", "W", "W", "W", " "],
        [" ", "W", "W", "G", " ", " ", " ", " ", "W", "W", "W", " ", " ", " ", " ", " "],
        [" ", " ", "W", "G", " ", "W", "W", " ", "G", "W", "W", " ", "G", "W", "W", " "],
        ["G", " ", " ", " ", " ", "W", "W", " ", "G", "G", "G", " ", "W", "W", "W", " "],
        ["W", "W", "W", "G", " ", " ", " ", "S", "W", "W", "G", " ", " ", " ", " ", " "],
        ["W", " ", " ", " ", " ", " ", "W", "W", "W", " ", " ", " ", " ", " ", "W", "G"],
        [" ", " ", "G", " ", "G", " ", " ", " ", " ", " ", " ", "W", "G", " ", " ", " "],
        [" ", "G", "G", " ", "G", "W", "W", " ", "G", "W", " ", "W", "W", "W", "W", " "],
        [" ", "W", "W", " ", " ", "W", "G", " ", " ", "G", " ", " ", "W", "W", "W", " "],
        [" ", "W", "W", "G", " ", " ", " ", "W", " ", "W", " ", " ", " ", " ", " ", " "],
        [" ", "G", "W", "W", " ", "W", " ", " ", " ", " ", " ", "G", " ", "W", "W", " "],
        [" ", " ", " ", "W", " ", "W", "W", " ", "G", " ", " ", " ", " ", "W", " ", " "],
        ["W", "G", " ", " ", " ", "G", "G", " ", "W", "W", "W", "G", " ", " ", " ", "G"]
    ];

    map3 = [
        ["W", "G", "G", "W", "G", "G", "W", "G", "G", "W", "G", "G", "W", "G", "G", "W"],
        ["G", "S", " ", "G", " ", " ", "G", "W", "W", "G", " ", " ", "G", " ", " ", "G"],
        ["G", " ", " ", " ", " ", " ", "G", "W", "W", "G", " ", " ", " ", " ", " ", "G"],
        ["W", "G", "G", "W", " ", " ", "W", "G", "G", "W", "G", " ", "W", "G", "G", "W"],
        ["G", "G", "G", "G", " ", " ", "G", "G", "G", "G", " ", " ", "G", "W", "W", "G"],
        ["G", "G", "G", "G", " ", " ", "G", "G", "G", "G", " ", " ", "G", "W", "W", "G"],
        ["W", "G", "G", "W", " ", " ", "W", "G", "G", "W", " ", " ", "W", "G", "G", "W"],
        ["G", " ", " ", " ", " ", " ", "G", "W", "W", "G", " ", " ", " ", " ", " ", "G"],
        ["G", " ", " ", "G", " ", " ", "G", "W", "W", "G", " ", " ", " ", " ", " ", "G"],
        ["W", "G", "G", "W", "G", " ", "W", "G", "G", "W", "G", "G", "W", " ", "G", "W"],
        ["G", " ", " ", "G", " ", " ", " ", " ", " ", "G", "G", "G", "G", " ", " ", "G"],
        ["G", " ", " ", " ", " ", " ", " ", " ", " ", "G", "G", "G", "G", " ", " ", "G"],
        ["W", "G", "G", "W", "G", "G", "W", "G", "G", "W", "G", "G", "W", "G", "G", "W"],
        ["G", "G", "G", "G", "W", "W", "G", "G", "G", "G", "W", "W", "G", "W", "W", "G"],
        ["G", "G", "G", "G", "W", "W", "G", "G", "G", "G", "W", "W", "G", "W", "W", "G"],
        ["W", "G", "G", "W", "G", "G", "W", "G", "G", "W", "G", "G", "W", "G", "G", "W"]
    ];

    map4 = [
        ["S", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        ["W", " ", "W", "W", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " "],
        [" ", " ", " ", " ", "W", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        ["W", "G", "W", "W", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " "],
        ["G", "G", "G", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        ["W", "W", "W", " ", "W", "W", "W", " ", "W", " ", "W", " ", "W", " ", "W", " "],
        [" ", " ", " ", " ", " ", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        ["W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " "],
        [" ", " ", " ", " ", "W", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        ["W", " ", "W", "W", "W", "W", "W", " ", "W", " ", "W", " ", "W", " ", "W", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        ["W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", "W", "W", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " "],
        ["W", " ", "W", " ", "w", " ", "W", " ", "W", " ", "W", " ", "W", " ", "w", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", " "],
        ["W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", "E"]
    ];
    carImage = loadImage("./assets/player.png");
    enemyImage = loadImage("./assets/enmeny.png");
}

function draw() {
    background(255);
    showMap(map2);
    player.move(null, null, true);
    player.show(carImage);
    enemy.show(enemyImage);
    Wander(enemy);
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
    for (let i = 0; i < 16; i++) {
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
        this.h = 32 * 2 - 12;
        this.vel = createVector(0, 0);
    }
    show(theImage) {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.carAngle);
        noStroke();
        fill(255);
        image(theImage, -this.w / 2 - 5, -this.h / 2 - 6, 64, 64);
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

        // strokeWeight(4);
        // stroke(255, 0, 0);
        // point(corners[0].x, corners[0].y);
        // point(corners[1].x, corners[1].y);
        // point(corners[2].x, corners[2].y);
        // point(corners[3].x, corners[3].y);
    }
    move(vel, angle, isAI) {
        if (isAI) {
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
        } else {
            this.carAngle = angle;
            this.pos.add(vel.rotate(this.carAngle));
            if (this.collide()) {
                this.pos.sub(vel);
            }
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
        // let v1 = (corners[0].copy().sub(corners[2])).mult(gridSize);
        // let v2 = (corners[3].copy().sub(corners[2])).mult(gridSize);
        //line(corners[2].x * gridSize, corners[2].y * gridSize, corners[3].x * gridSize, corners[3].y * gridSize);
        //line(corners[0].x * gridSize, corners[0].y * gridSize, v2.x + corners[2].x * gridSize, v2.y + corners[2].y * gridSize);
        // let angle1 = atan(v1.y / v1.x);
        // let angle2 = atan(v2.y / v2.x);
        // text(floor(angle1), this.pos.x - 10, this.pos.y);
        // text(floor(angle2), this.pos.x + 10, this.pos.y);
        if (map2[floor(corners[0].y)][floor(corners[0].x)] == "W") {
            let v1 = (corners[1].copy().sub(corners[0])).mult(gridSize);
            let angle1 = atan(v1.y / v1.x);
            let v2 = (corners[2].copy().sub(corners[0])).mult(gridSize);
            let angle2 = atan(v2.y / v2.x);
            if (angle2 < 0) {
                angle2 += PI;
            }
            if (angle1 < angle2) {
                this.carAngle += PI / 120;
            } else {
                this.carAngle -= PI / 120;
            }
            return true;
        }
        if (map2[floor(corners[1].y)][floor(corners[1].x)] == "W") {
            let v1 = (corners[0].copy().sub(corners[1])).mult(gridSize);
            let v2 = (corners[3].copy().sub(corners[1])).mult(gridSize);
            let angle1 = atan(v1.y / v1.x);
            let angle2 = atan(v2.y / v2.x);
            if (angle2 < 0) {
                angle2 += PI;
            }
            if (angle1 < angle2) {
                this.carAngle -= PI / 120;
            } else {
                this.carAngle += PI / 120;
            }
            return true;
        }
        if (map2[floor(corners[2].y)][floor(corners[2].x)] == "W") {
            let v1 = (corners[0].copy().sub(corners[2])).mult(gridSize);
            let v2 = (corners[3].copy().sub(corners[2])).mult(gridSize);
            let angle1 = atan(v1.y / v1.x);
            let angle2 = atan(v2.y / v2.x);
            if (angle2 < 0) {
                angle2 += PI;
            }
            if (angle1 < angle2) {
                this.carAngle += PI / 120;
            } else {
                this.carAngle -= PI / 120;
            }
            return true;
        }
        if (map2[floor(corners[3].y)][floor(corners[3].x)] == "W") {
            let v1 = (corners[1].copy().sub(corners[3])).mult(gridSize);
            let v2 = (corners[2].copy().sub(corners[3])).mult(gridSize);
            let angle1 = atan(v1.y / v1.x);
            let angle2 = atan(v2.y / v2.x);
            if (angle2 < 0) {
                angle2 += PI;
            }
            if (angle1 < 0) {
                angle1 += PI;
            }
            if (angle1 < angle2) {
                this.carAngle -= PI / 120;
            } else {
                this.carAngle += PI / 120;
            }
            return true;
        }
        for(let t = 0; t < 1; t+=0.1) {
            if(map2[floor(lerp(corners[0].y, corners[1].y, t))][floor(lerp(corners[0].x, corners[1].x, t))]=="W") {
                return true;
            }
        }
        for(let t = 0; t < 1; t+=0.1) {
            if(map2[floor(lerp(corners[2].y, corners[3].y, t))][floor(lerp(corners[2].x, corners[3].x, t))]=="W") {
                return true;
            }
        }
        return false;
    }
}

//Switches Player Sprite To UWU
function UWUmode(uwu) {
    if (uwu == "uwu" || uwu == "UWU") {
        carImage = loadImage("./assets/player_UWU.png");
    }
}

//AI
function Wander(ai){
    ai.move(createVector(-2, 0), 0, false);
    //console.log(ai.pos.x, " ", ai.pos.y);
}