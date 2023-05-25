var player;
var enemy = [];
var blocks = [];
var gridSize;
var corners = [];
//W = wall
//S = Start
//G = Grass
//L = Lava
//E = End
//T = Tile
var carImage;
var enemyImage;
var selectedMap;
var map = [];
var map2 = [];
var map3 = [];
var map5 = [];
var road = []
var worldPos;
var numEnemy = 10;
function setup() {
    createCanvas(800, 800);
    gridSize = 100;
    player = new Car();
    for (let i = 0; i < numEnemy; i++) {
        enemy[i] = new Car();
    }
    //enemy = new Car();
    worldPos = createVector(0, 0);
    map = [
        ["S", "G", "G", "W", "W", "G", "W", "W", "W", "W", " ", " ", " ", " ", " ", "G"],
        [" ", " ", " ", " ", " ", " ", " ", "G", "W", "G", " ", "W", "W", "G", " ", " "],
        [" ", "W", "W", " ", "W", "W", " ", " ", " ", " ", " ", "W", "W", "G", "G", " "],
        [" ", "W", "W", " ", "W", "W", "W", " ", "W", "W", "G", "G", "W", "G", "W", " "],
        [" ", "W", "W", " ", " ", " ", " ", " ", "W", "W", "W", "G", "G", "G", "G", " "],
        [" ", "W", " ", " ", "G", "G", "G", " ", " ", " ", " ", "G", "W", "W", "W", " "],
        [" ", " ", " ", "G", "G", "W", "G", "G", "G", "W", " ", " ", " ", " ", " ", " "],
        [" ", "G", " ", "W", "G", "G", "G", "G", "G", "W", " ", "G", "W", "W", "G", " "],
        [" ", "W", " ", " ", " ", " ", " ", "W", "G", "H", " ", "G", "G", "W", " ", " "],
        [" ", "G", " ", "G", "W", "G", " ", "G", "W", "G", " ", " ", " ", " ", " ", "G"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "G", "G", " ", "G", " ", "G", " ", "W"],
        [" ", "W", "W", " ", "W", "G", "G", " ", " ", " ", " ", "G", " ", " ", " ", " "],
        [" ", "W", "W", " ", "W", "W", "W", " ", "G", "G", "W", "G", " ", "G", "G", " "],
        [" ", "W", " ", " ", " ", " ", " ", " ", "G", "W", "W", "G", " ", "W", "W", " "],
        [" ", "W", " ", "G", "G", "W", "G", " ", " ", "G", "W", "G", " ", "G", "G", " "],
        [" ", " ", " ", "W", "W", "W", "G", "W", " ", " ", " ", " ", " ", " ", " ", " "]
    ];

    road = [
        ["V", "-", "-", "-", "-", "-", "-", "-", "-", "-", " ", "H", "H", "H", " ", "-"],
        [" ", "H", "H", "T", "H", "H", " ", "-", "-", "-", "V", "-", "-", "-", "L", " "],
        ["V", "-", "-", "V", "-", "-", "L", " ", "H", "H", "V", "-", "-", "-", "-", "V"],
        ["V", "-", "-", "V", "-", "-", "-", "V", "-", "-", " ", "-", "-", "-", "-", "V"],
        ["V", "-", "-", " ", "H", "H", "H", " ", "-", "-", "-", "-", "-", "-", "-", "V"],
        ["V", "-", " ", " ", "-", "-", "-", "L", "H", "H", " ", "-", "-", "-", "-", "V"],
        [" ", "H", " ", "-", "-", "-", "-", "-", "-", "-", " ", " ", " ", " ", " ", " "],
        ["V", "-", "V", "-", "-", "-", "-", "-", "-", "-", "V", "-", "-", "-", "-", "V"],
        ["V", "W", " ", "H", "H", "H", " ", "-", "-", "-", "V", "-", "-", "-", " ", " "],
        ["V", "-", "V", "-", "-", "-", "-", "-", "-", "-", " ", "H", "T", "H", " ", "-"],
        [" ", "H", " ", "T", " ", " ", " ", " ", "-", "-", "V", "-", "V", "-", "V", "-"],
        ["V", "-", "-", "V", "-", "-", "-", " ", "H", "H", " ", "G", " ", "H", "H", " "],
        ["V", "W", "W", "V", "W", "W", "W", "V", "G", "G", "W", "G", "V", "G", "G", "V"],
        ["V", "W", " ", " ", " ", " ", " ", " ", "G", "W", "W", "G", "V", "W", "W", "V"],
        ["V", "W", "V", "G", "G", "W", "G", " ", " ", "G", "W", "G", "V", "G", "G", "V"],
        ["L", "H", " ", "W", "W", "W", "G", "W", " ", " ", " ", " ", " ", "H", "H", " "]
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

    map5 = [
        ["W", "W", "W", "W", "W", "W", "L", "L", "L", "L", "W", "W", "W", "W", "W", "W"],
        ["W", "W", "W", "W", "L", "L", "T", "T", "T", "T", "L", "L", "W", "W", "W", "W"],
        ["W", "W", "W", "L", "T", "T", "L", "T", "T", "T", "T", "T", "L", "W", "W", "W"],
        ["W", "W", "L", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "L", "W", "W"],
        ["W", "L", "T", "T", "L", "T", "T", "T", "L", "T", "T", "T", "T", "T", "L", "W"],
        ["W", "L", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "L", "W"],
        ["L", "T", "T", "T", "T", "T", "W", "T", "T", "W", "T", "L", "T", "T", "T", "L"],
        ["L", "T", "S", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "L"],
        ["L", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "L"],
        ["L", "T", "T", "T", "T", "T", "W", "T", "T", "W", "T", "T", "T", "T", "T", "L"],
        ["W", "L", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "L", "W"],
        ["W", "L", "T", "L", "T", "T", "T", "T", "T", "T", "T", "L", "T", "T", "L", "W"],
        ["W", "W", "L", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "L", "W", "W"],
        ["W", "W", "W", "L", "T", "T", "T", "T", "T", "T", "T", "T", "L", "W", "W", "W"],
        ["W", "W", "W", "W", "L", "L", "T", "T", "L", "T", "L", "L", "W", "W", "W", "W"],
        ["W", "W", "W", "W", "W", "W", "L", "L", "L", "L", "W", "W", "W", "W", "W", "W"]
    ];
    carImage = loadImage("./assets/player.png");
    enemyImage = loadImage("./assets/enmeny.png");
}

function draw() {
    background(255);
    showMap(map2);
    selectedMap = map2;
    player.move(null, null, true);
    player.show(carImage, true);
    for (let i = 0; i < numEnemy; i++) {
        enemy[i].show(enemyImage);
        Wander(enemy[i]);
    }
}
function showMap(theMap) {
    for (let i = 0; i < theMap.length; i++) {
        for (let j = 0; j < theMap[0].length; j++) {
            if (theMap[i][j]) {
                if (theMap[i][j] == "W") {
                    fill(151);
                    noStroke();
                    rect(j * gridSize - worldPos.x, i * gridSize - worldPos.y, gridSize, gridSize);
                } else if (theMap[i][j] == "G") {
                    fill(0, 177, 0);
                    noStroke();
                    rect(j * gridSize - worldPos.x, i * gridSize - worldPos.y, gridSize, gridSize);
                }
            }
        }
    }
    for (let i = 0; i < 16; i++) {
        // stroke(51);
        // strokeWeight(3);
        // line(i * gridSize, 0, i * gridSize, height);
        // line(0, i * gridSize, width, i * gridSize);
    }
}
class Car {
    constructor() {
        this.pos = createVector(width / 2 - gridSize / 2, height / 2 - gridSize / 2);
        this.carAngle = 0;
        this.w = 32 * 2 - 10;
        this.h = 32 * 2 - 12;
        this.vel = createVector(0, 0);
        this.health = 1;

        //This is for enemies
        this.aiMovingDirection = "top";
        this.prevAiPos;
    }
    show(theImage, UI) {
        push();
        translate(this.pos.x - worldPos.x, this.pos.y - worldPos.y);
        rotate(this.carAngle);
        noStroke();
        fill(255);
        image(theImage, -this.w / 2 - 5, -this.h / 2 - 6, 64, 64);
        if (UI) {
            fill(255);
            strokeWeight(3);
            stroke(0);
            rect(-this.w / 2, -50, this.w, 8, 10);
            if (this.health >= 0.75) {
                fill(lerpColor(color(254, 212, 3), color(99, 225, 7), (this.health * 4) - 3));
                // fill(99, 225, 7);
            } else if (this.health >= 0.5) {
                fill(lerpColor(color(255, 102, 3), color(254, 212, 3), (this.health * 4) - 2));
                //fill(254, 212, 3);
            } else if (this.health > 0.25) {
                fill(lerpColor(color(240, 7, 10), color(255, 102, 3), (this.health * 4) - 1));
                //fill(255, 102, 3);
            } else {
                fill(240, 7, 10);
            }
            noStroke();
            if (this.health < 0) this.health = 0;
            rect(-this.w / 2, -50, this.w * this.health, 8, 10);
        }
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
                var boardPos = (this.pos.copy()).mult(1 / gridSize);
                this.health -= 0.001;
                if (map2[floor(boardPos.y)][floor(boardPos.x)] == "G") {
                    this.vel = createVector(0, -1);
                } else {
                    this.vel = createVector(0, -3);
                }
            }
            else if (keyIsDown(83)) { // s key
                this.health -= 0.001;
                var boardPos = (this.pos.copy()).mult(1 / gridSize);
                if (map2[floor(boardPos.y)][floor(boardPos.x)] == "G") {
                    this.vel = createVector(0, 1);
                } else {
                    this.vel = createVector(0, 3);
                }
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
            if (keyIsDown(88)) { // x key
                var boardPos = (this.pos.copy()).mult(1 / gridSize);
                this.pos = createVector(floor(boardPos.x), floor(boardPos.y)).mult(gridSize).add(gridSize / 2, gridSize / 2);
            }
            if (this.pos.x > width / 2) {
                if (this.pos.x + width / 2 > 1600) {
                    worldPos.x = 1600 - width;
                } else {
                    worldPos.x = floor(this.pos.x - (width / 2));
                }
            }
            if (this.pos.y > height / 2) {
                if (this.pos.y + height / 2 > 1600) {
                    worldPos.y = 1600 - height;
                } else {
                    worldPos.y = floor(this.pos.y - (height / 2));
                }
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
        if (withInBounds(floor(corners[0].y), floor(corners[0].x))) {
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
        }
        if (withInBounds(floor(corners[1].y), floor(corners[1].x))) {
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
        }
        if (withInBounds(floor(corners[2].y), floor(corners[2].x))) {
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
        }
        if (withInBounds(floor(corners[3].y), floor(corners[3].x))) {
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
        }
        for (let t = 0; t < 1; t += 0.1) {
            if (!withInBounds(floor(lerp(corners[0].y, corners[1].y, t)), floor(lerp(corners[0].x, corners[1].x, t)))) return true;
            if (map2[floor(lerp(corners[0].y, corners[1].y, t))][floor(lerp(corners[0].x, corners[1].x, t))] == "W") {
                return true;
            }
        }
        for (let t = 0; t < 1; t += 0.1) {
            if (!withInBounds(floor(lerp(corners[2].y, corners[3].y, t)), floor(lerp(corners[2].x, corners[3].x, t)))) return true;
            if (map2[floor(lerp(corners[2].y, corners[3].y, t))][floor(lerp(corners[2].x, corners[3].x, t))] == "W") {
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
function Wander(ai) {
    var aiPos = (ai.pos.copy()).mult(1 / gridSize);
    if (!ai.prevAiPos) {
        ai.prevAiPos = aiPos.copy();
        ai.move(createVector(0, -2), -PI / 2, false);
    }
    if (!(abs(aiPos.x - ai.prevAiPos.x) > 1 || abs(aiPos.y - ai.prevAiPos.y) > 1)) {
        switch (ai.aiMovingDirection) {
            case "left":
                ai.move(createVector(0, -2), -PI / 2, false);
                break;
            case "right":
                ai.move(createVector(0, -2), PI / 2, false);
                break;
            case "top":
                ai.move(createVector(0, -2), 0, false);
                break;
            case "bottom":
                ai.move(createVector(0, -2), PI, false);
                break;
            default:
                console.log(ai.aiMovingDirection)
        }
    } else {
        ai.prevAiPos.x = aiPos.x;
        ai.prevAiPos.y = aiPos.y;
        var avaibleDirections = [];
        if (selectedMap[floor(aiPos.y)][floor(aiPos.x - 1)] == " " || selectedMap[floor(aiPos.y)][floor(aiPos.x - 1)] == "G") {
            avaibleDirections.push("left");
            // ai.move(createVector(0, -2), -PI / 2, false);
        }
        if (selectedMap[floor(aiPos.y)][floor(aiPos.x + 1)] == " " || selectedMap[floor(aiPos.y)][floor(aiPos.x + 1)] == "G") {
            avaibleDirections.push("right");
            // ai.move(createVector(0, -2), -PI / 2, false);
        }
        if (withInBounds(floor(aiPos.y - 1), floor(aiPos.x))) {
            if (selectedMap[floor(aiPos.y - 1)][floor(aiPos.x)] == " " || selectedMap[floor(aiPos.y - 1)][floor(aiPos.x)] == "G") {
                avaibleDirections.push("top");
                // ai.move(createVector(0, -2), -PI / 2, false);
            }
        }
        if (withInBounds(floor(aiPos.y + 1), floor(aiPos.x))) {
            if (selectedMap[floor(aiPos.y + 1)][floor(aiPos.x)] == " " || selectedMap[floor(aiPos.y + 1)][floor(aiPos.x)] == "G") {
                avaibleDirections.push("bottom");
                // ai.move(createVector(0, -2), -PI / 2, false);
            }
        }
        ai.aiMovingDirection = avaibleDirections[floor(random(avaibleDirections.length))];
        switch (ai.aiMovingDirection) {
            case "left":
                ai.move(createVector(0, -2), -PI / 2, false);
                break;
            case "right":
                ai.move(createVector(0, -2), PI / 2, false);
                break;
            case "top":
                ai.move(createVector(0, -2), 0, false);
                break;
            case "bottom":
                ai.move(createVector(0, -2), PI, false);
                break;
            default:
                console.log(ai.aiMovingDirection)
        }
        console.log("Change Spot");
    }
}
function withInBounds(x, y) {
    if (x < 0 || x >= 16 || y < 0 || y >= 16) return false;
    return true;
}