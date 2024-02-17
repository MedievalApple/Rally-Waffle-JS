var corners = [];

class Car {
    constructor() {
        this.pos = createVector(width / 2 - gridSize / 2, height / 2 - gridSize / 2);
        this.carAngle = 0;
        this.w = (32 - 5) * (gridSize / 50);
        this.h = (32 - 6) * (gridSize / 50);
        this.vel = createVector(0, 0);
        this.health = 1;

        //This is for enemies
        this.aiMovingDirection;
        this.prevAiPos;
    }
    show(theImage, UI) {
        push();
        translate(this.pos.x - worldPos.x, this.pos.y - worldPos.y);
        rotate(this.carAngle);
        noStroke();
        fill(255);
        image(theImage, -this.w / 2 - (5 * (gridSize / 100)), -this.h / 2 - (6 * (gridSize / 100)), 32 * (gridSize / 50), 32 * (gridSize / 50));
        theImage.resizeNN(gridSize, gridSize);
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
            if (this.health < 0) {
                this.health = 0;
                //alert("You Failed");
                gameOver = true;
                clearInterval(stopwatchInterval);
            }
            rect(-this.w / 2, -50, this.w * this.health, 8, 10);
        }
        pop();
        stroke(255, 0, 0);
        strokeWeight(5);
    }
    move(vel, angle, isAI, joy) {
        let joyStickPos;
        if (isAI) {
            if (joy != " ") {
                joyStickPos = createVector(joy.GetX(), joy.GetY())
            }

            if (joyStickPos) {
                var boardPos = (this.pos.copy()).mult(1 / gridSize);
                this.carAngle = -joyStickPos.heading() + PI / 2;
                if (joyStickPos.mag() > 1) {
                    this.health -= 0.001;
                }
                if (selectedMap[floor(boardPos.y)][floor(boardPos.x)] == "G") {
                    this.vel = createVector(0, -(joyStickPos.mag() / 100) * gridSize / 100);
                } else {
                    this.vel = createVector(0, -(3 * joyStickPos.mag() / 100) * gridSize / 100);
                }
            } else {
                if (keyIsDown(87) || keyIsDown(38)) { // w & up key
                    var boardPos = (this.pos.copy()).mult(1 / gridSize);
                    this.health -= 0.001;
                    if (selectedMap[floor(boardPos.y)][floor(boardPos.x)] == "G") {
                        this.vel = createVector(0, -(1.5 * gridSize / 100));
                    } else {
                        this.vel = createVector(0, -(4 * gridSize / 100));
                    }
                } else if (keyIsDown(83) || keyIsDown(40)) { // s & down key
                    this.health -= 0.001;
                    var boardPos = (this.pos.copy()).mult(1 / gridSize);
                    if (selectedMap[floor(boardPos.y)][floor(boardPos.x)] == "G") {
                        this.vel = createVector(0, (1.5 * gridSize / 100));
                    } else {
                        this.vel = createVector(0, (4 * gridSize / 100));
                    }
                } else {
                    this.vel = createVector(0, 0);
                }

                if (keyIsDown(65) || keyIsDown(37)) { // a & left key
                    this.carAngle -= PI / 80;
                    let collisionData = this.collide();
                    if (collisionData) {
                        this.simulateImpulse(collisionData.x, collisionData.y);
                    }
                }
                if (keyIsDown(68) || keyIsDown(39)) { // d & right key
                    this.carAngle += PI / 80;
                    let collisionData = this.collide();
                    if (collisionData) {
                        this.simulateImpulse(collisionData.x, collisionData.y);
                    }
                }
            }

            this.pos.add(this.vel.rotate(this.carAngle));
            let collisionData = this.collide();
            if (collisionData) {
                this.simulateImpulse(collisionData.x, collisionData.y);
            }

            if (keyIsDown(88)) { // x key
                var boardPos = (this.pos.copy()).mult(1 / gridSize);
                this.pos = createVector(floor(boardPos.x), floor(boardPos.y)).mult(gridSize).add(gridSize / 2, gridSize / 2);
            }

            if (this.pos.x > width / 2) {
                if (this.pos.x + width / 2 > 16 * gridSize) {
                    worldPos.x = (16 * gridSize) - width;
                } else {
                    worldPos.x = floor(this.pos.x - (width / 2));
                }
            }

            if (this.pos.y > height / 2) {
                if (this.pos.y + height / 2 > 16 * gridSize) {
                    worldPos.y = (16 * gridSize) - height;
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
    collideOtherCar(car) {
        if (floor(this.pos.x / gridSize) == floor(car.pos.x / gridSize) && floor(this.pos.y / gridSize) == floor(car.pos.y / gridSize)) return true;
        return false;
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

        if (withInBounds(floor(corners[0].y), floor(corners[0].x))) {
            if (selectedMap[floor(corners[0].y)][floor(corners[0].x)] == "W") {
                return createVector(floor(corners[0].y), floor(corners[0].x));;
            }
        }

        if (withInBounds(floor(corners[1].y), floor(corners[1].x))) {
            if (selectedMap[floor(corners[1].y)][floor(corners[1].x)] == "W") {
                return createVector(floor(corners[1].y), floor(corners[1].x));;
            }
        }

        if (withInBounds(floor(corners[2].y), floor(corners[2].x))) {
            if (selectedMap[floor(corners[2].y)][floor(corners[2].x)] == "W") {
                return createVector(floor(corners[2].y), floor(corners[2].x));
            }
        }

        if (withInBounds(floor(corners[3].y), floor(corners[3].x))) {
            if (selectedMap[floor(corners[3].y)][floor(corners[3].x)] == "W") {
                return createVector(floor(corners[3].y), floor(corners[3].x));
            }
        }
        for (let t = 0; t < 1; t += 0.1) {
            if (!withInBounds(floor(lerp(corners[0].y, corners[1].y, t)), floor(lerp(corners[0].x, corners[1].x, t)))) {
                return createVector(floor(lerp(corners[0].y, corners[1].y, t)), floor(lerp(corners[0].x, corners[1].x, t)));
            }
            if (selectedMap[floor(lerp(corners[0].y, corners[1].y, t))][floor(lerp(corners[0].x, corners[1].x, t))] == "W") {
                return createVector(floor(lerp(corners[0].y, corners[1].y, t)), floor(lerp(corners[0].x, corners[1].x, t)));
            }
        }
        for (let t = 0; t < 1; t += 0.1) {
            if (!withInBounds(floor(lerp(corners[2].y, corners[3].y, t)), floor(lerp(corners[2].x, corners[3].x, t)))) {
                return createVector(floor(lerp(corners[2].y, corners[3].y, t)), floor(lerp(corners[2].x, corners[3].x, t)));
            };
            if (selectedMap[floor(lerp(corners[2].y, corners[3].y, t))][floor(lerp(corners[2].x, corners[3].x, t))] == "W") {
                return createVector(floor(lerp(corners[2].y, corners[3].y, t)), floor(lerp(corners[2].x, corners[3].x, t)));
            }
        }
        return false;
    }

    simulateImpulse(row, col) {
        this.carAngle %= 2 * PI;
        if (this.carAngle < 0) {
            this.carAngle = 2 * PI - this.carAngle;
        }
        let targetAngle = int(this.carAngle / (PI / 2) + 0.5);
        this.carAngle -= Math.sign(this.carAngle - targetAngle) * 0.05;
        if (!withInBounds(row, col)) {
            if (abs((row * gridSize + gridSize / 2) - this.pos.x) > abs((col * gridSize + gridSize / 2) - this.pos.y)) {
                this.pos.y -= Math.sign((row * gridSize + gridSize / 2) - this.pos.x) * 3
            } else {
                this.pos.x -= Math.sign((col * gridSize + gridSize / 2) - this.pos.y) * 3
            }
        } else {
            if (abs(this.pos.y - (row * gridSize + gridSize / 2)) > abs(this.pos.x - (col * gridSize + gridSize / 2))) {
                this.pos.y += Math.sign(this.pos.y - (row * gridSize + gridSize / 2)) * 3
            } else {
                this.pos.x += Math.sign(this.pos.x - (col * gridSize + gridSize / 2)) * 3
            }
        }
    }

}