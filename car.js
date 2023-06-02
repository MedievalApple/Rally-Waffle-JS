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
        this.pointOfCollision;
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
                alert("You Failed");
                restartCurrentLevel();
            }
            rect(-this.w / 2, -50, this.w * this.health, 8, 10);
        }
        pop();
        stroke(255, 0, 0);
        strokeWeight(5);
    }
    move(vel, angle, isAI, joy) {
        var joystick = "";
        let joyStickPos;
        if (isAI) {
            if (joy != " ") {
                //joystick = joy.GetDir();
                joyStickPos = createVector(joy.GetX(), joy.GetY())
            }
            if (joyStickPos) {
                var boardPos = (this.pos.copy()).mult(1 / gridSize);
                this.carAngle = -joyStickPos.heading() + PI / 2;
                if(joyStickPos.mag()>1) {
                    this.health -= 0.001;
                }
                if (selectedMap[floor(boardPos.y)][floor(boardPos.x)] == "G") {
                    this.vel = createVector(0, -(joyStickPos.mag() / 100) * gridSize / 100);
                } else {
                    this.vel = createVector(0, -(3 * joyStickPos.mag() / 100) * gridSize / 100);
                }
            } else {
                if (keyIsDown(87) || joystick == "N" || joystick == "NE" || joystick == "NW") { // w key
                    var boardPos = (this.pos.copy()).mult(1 / gridSize);
                    this.health -= 0.001;
                    if (selectedMap[floor(boardPos.y)][floor(boardPos.x)] == "G") {
                        this.vel = createVector(0, -(1.5 * gridSize / 100));
                    } else {
                        this.vel = createVector(0, -(4 * gridSize / 100));
                    }
                }
                else if (keyIsDown(83) || joystick == "S" || joystick == "SE" || joystick == "SW") { // s key
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
                if (keyIsDown(65) || joystick == "W" || joystick == "NW" || joystick == "SE") { // a key
                    this.carAngle -= PI / 120;
                    if (this.collide()) {
                        this.carAngle += PI / 120;
                        this.simulateImpulse(this.pointOfCollision);
                    }
                }
                if (keyIsDown(68) || joystick == "E" || joystick == "NE" || joystick == "SW") { // d key
                    this.carAngle += PI / 120;
                    if (this.collide()) {
                        this.carAngle -= PI / 120;
                        this.simulateImpulse(this.pointOfCollision);
                    }
                }
            }
            this.pos.add(this.vel.rotate(this.carAngle));
            if (this.collide()) {
                this.pos.sub(this.vel);
                this.simulateImpulse(this.pointOfCollision);
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
        this.pointOfCollision = this.findCollisionPoint();
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
                let v1 = (corners[1].copy().sub(corners[0])).mult(gridSize);
                let angle1 = atan(v1.y / v1.x);
                let v2 = (corners[2].copy().sub(corners[0])).mult(gridSize);
                let angle2 = atan(v2.y / v2.x);
                // if (angle2 < 0) {
                //     angle2 += PI;
                // }
                // if (angle1 < angle2) {
                //     this.carAngle += PI / 120;
                // } else {
                //     this.carAngle -= PI / 120;
                // }
                return true;
            }
        }
        if (withInBounds(floor(corners[1].y), floor(corners[1].x))) {
            if (selectedMap[floor(corners[1].y)][floor(corners[1].x)] == "W") {
                let v1 = (corners[0].copy().sub(corners[1])).mult(gridSize);
                let v2 = (corners[3].copy().sub(corners[1])).mult(gridSize);
                let angle1 = atan(v1.y / v1.x);
                let angle2 = atan(v2.y / v2.x);
                // if (angle2 < 0) {
                //     angle2 += PI;
                // }
                // if (angle1 < angle2) {
                //     this.carAngle -= PI / 120;
                // } else {
                //     this.carAngle += PI / 120;
                // }
                return true;
            }
        }
        if (withInBounds(floor(corners[2].y), floor(corners[2].x))) {
            if (selectedMap[floor(corners[2].y)][floor(corners[2].x)] == "W") {
                let v1 = (corners[0].copy().sub(corners[2])).mult(gridSize);
                let v2 = (corners[3].copy().sub(corners[2])).mult(gridSize);
                let angle1 = atan(v1.y / v1.x);
                let angle2 = atan(v2.y / v2.x);
                // if (angle2 < 0) {
                //     angle2 += PI;
                // }
                // if (angle1 < angle2) {
                //     this.carAngle += PI / 120;
                // } else {
                //     this.carAngle -= PI / 120;
                // }
                return true;
            }
        }
        if (withInBounds(floor(corners[3].y), floor(corners[3].x))) {
            if (selectedMap[floor(corners[3].y)][floor(corners[3].x)] == "W") {
                let v1 = (corners[1].copy().sub(corners[3])).mult(gridSize);
                let v2 = (corners[2].copy().sub(corners[3])).mult(gridSize);
                let angle1 = atan(v1.y / v1.x);
                let angle2 = atan(v2.y / v2.x);
                // if (angle2 < 0) {
                //     angle2 += PI;
                // }
                // if (angle1 < 0) {
                //     angle1 += PI;
                // }
                // if (angle1 < angle2) {
                //     this.carAngle -= PI / 120;
                // } else {
                //     this.carAngle += PI / 120;
                // }
                return true;
            }
        }
        for (let t = 0; t < 1; t += 0.1) {
            if (!withInBounds(floor(lerp(corners[0].y, corners[1].y, t)), floor(lerp(corners[0].x, corners[1].x, t)))) return true;
            if (selectedMap[floor(lerp(corners[0].y, corners[1].y, t))][floor(lerp(corners[0].x, corners[1].x, t))] == "W") {
                return true;
            }
        }
        for (let t = 0; t < 1; t += 0.1) {
            if (!withInBounds(floor(lerp(corners[2].y, corners[3].y, t)), floor(lerp(corners[2].x, corners[3].x, t)))) return true;
            if (selectedMap[floor(lerp(corners[2].y, corners[3].y, t))][floor(lerp(corners[2].x, corners[3].x, t))] == "W") {
                return true;
            }
        }
        return false;
    }
    findCollisionPoint() {
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
        for (let t = 0; t < 1; t += 0.1) {
            if (!withInBounds(floor(lerp(corners[0].y, corners[1].y, t)), floor(lerp(corners[0].x, corners[1].x, t)))) return createVector(lerp(corners[0].x, corners[1].x, t), lerp(corners[0].y, corners[1].y, t));;
            if (selectedMap[floor(lerp(corners[0].y, corners[1].y, t))][floor(lerp(corners[0].x, corners[1].x, t))] == "W") {
                return createVector(lerp(corners[0].x, corners[1].x, t), lerp(corners[0].y, corners[1].y, t));
            }
        }
        for (let t = 0; t < 1; t += 0.1) {
            if (!withInBounds(floor(lerp(corners[2].y, corners[3].y, t)), floor(lerp(corners[2].x, corners[3].x, t)))) return createVector(lerp(corners[2].x, corners[3].x, t), lerp(corners[2].y, corners[3].y, t));
            if (selectedMap[floor(lerp(corners[2].y, corners[3].y, t))][floor(lerp(corners[2].x, corners[3].x, t))] == "W") {
                return createVector(lerp(corners[2].x, corners[3].x, t), lerp(corners[2].y, corners[3].y, t));
            }
        }
        for (let t = 0; t < 1; t += 0.1) {
            if (!withInBounds(floor(lerp(corners[1].y, corners[3].y, t)), floor(lerp(corners[1].x, corners[3].x, t)))) return createVector(lerp(corners[1].x, corners[3].x, t), lerp(corners[1].y, corners[3].y, t));
            if (selectedMap[floor(lerp(corners[1].y, corners[3].y, t))][floor(lerp(corners[1].x, corners[3].x, t))] == "W") {
                return createVector(lerp(corners[1].x, corners[3].x, t), lerp(corners[1].y, corners[3].y, t));
            }
        }
        for (let t = 0; t < 1; t += 0.1) {
            if (!withInBounds(floor(lerp(corners[2].y, corners[0].y, t)), floor(lerp(corners[2].x, corners[0].x, t)))) return createVector(lerp(corners[2].x, corners[0].x, t), lerp(corners[2].y, corners[0].y, t));
            if (selectedMap[floor(lerp(corners[2].y, corners[0].y, t))][floor(lerp(corners[2].x, corners[0].x, t))] == "W") {
                return createVector(lerp(corners[2].x, corners[0].x, t), lerp(corners[2].y, corners[0].y, t));
            }
        }
    }
    simulateImpulse(point) {
        this.carAngle %= 2 * PI;
        let delta = point.copy().sub(this.pos).rotate(this.carAngle);
        let collisionAngle = atan2(delta.x, delta.y);
        // this.collisionAngle %= PI;
        let angleDiff = collisionAngle - this.carAngle;
        let newCarVel = this.vel.copy().mult(cos(angleDiff));
        let deltaAngle = sin(angleDiff);
        if (abs(deltaAngle) > PI / 8) {
            this.pos.add(newCarVel);
            if (this.collide()) {
                this.pos.sub(newCarVel);
            }
        }
        this.carAngle -= deltaAngle * 0.1;
        if (this.collide()) {
            this.carAngle += deltaAngle * 0.1;
        }
        //console.log(deltaAngle);
    }

}