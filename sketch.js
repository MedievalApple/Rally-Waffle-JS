var player;
var blocks = [];
var gridSize;
//W = wall
//S = Start
//G = Grass
var map = [];
function setup() {
    createCanvas(800, 800);
    gridSize = width/8;
    player = new Car();
    map = [
        ["W", "W", "W", "W", "W", "W", "W", "W"],
        ["S",  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ],
        [ 0 , "W", "W",  0 , "W", "W", "W",  0 ],
        [ 0 , "W", "W",  0 , "W", "W", "W",  0 ],
        [ 0 , "W", "W",  0 ,  0 ,   0,  0 ,  0 ],
        [ 0 , "W", "W",  0 , "G", "G", "G",  0 ],
        [ 0 ,  0 ,  0 ,  0 , "G", "W", "G",  0 ],
        ["W", "W",  0 , "W", "G", "G", "G",  0 ]
    ];
}

function draw() {
    background(0);
    showMap(map);
    player.move();
    player.show();
}
function showMap(theMap) {
    for(let i = 0; i < theMap.length; i++) {
        for(let j = 0; j < theMap[0].length; j++) {
            if(map[i][j]) {
                if(map[i][j]=="W") {
                    fill(151);
                    noStroke();
                    rect(j*gridSize, i*gridSize, gridSize, gridSize);
                }else if(map[i][j]=="G") {
                    fill(0, 177, 0);
                    noStroke();
                    rect(j*gridSize, i*gridSize, gridSize, gridSize);
                }
            }
        }
    }
}
class Car {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.carAngle = 0;
        this.w = 30;
        this.h = 60;
        this.vel = createVector(0, 0);
    }
    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.carAngle);
        noStroke();
        fill(255);
        rect(-this.w / 2, -this.h / 2, this.w, this.h);
        pop();
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
