function spawnEnemys(level) {
    let enemySpawns = [];

    for (let maple of level.maples) {
        mapleSyrups.push(new Syrup(maple.x, maple.y));
        enemySpawns.push(createVector(maple.x, maple.y));
    }

    for (let i = 0; i < level.enemies; i++) {
        enemy[i] = new Car();
        let randomPos = enemySpawns[floor(random(enemySpawns.length))];
        enemy[i].pos = createVector(randomPos.x * gridSize + gridSize / 2, randomPos.y * gridSize + gridSize / 2);
    }
}

// AI
function wanderAI(ai) {
    var aiPos = ai.pos.copy().mult(1 / gridSize);
    if (!ai.prevAiPos) {
        ai.prevAiPos = aiPos.copy();
        ai.move(createVector(0, -(2 * gridSize / 100)), -PI / 2, false, joy);
    }

    if (!(abs(aiPos.x - ai.prevAiPos.x) > 1 || abs(aiPos.y - ai.prevAiPos.y) > 1) && ai.aiMovingDirection) {
        switch (ai.aiMovingDirection) {
            case "left":
                ai.move(createVector(0, -(2 * gridSize / 100)), -PI / 2, false);
                break;
            case "right":
                ai.move(createVector(0, -(2 * gridSize / 100)), PI / 2, false);
                break;
            case "top":
                ai.move(createVector(0, -(2 * gridSize / 100)), 0, false);
                break;
            case "bottom":
                ai.move(createVector(0, -(2 * gridSize / 100)), PI, false);
                break;
            default:
                console.log(ai.aiMovingDirection)
        }
    } else {
        ai.prevAiPos.x = aiPos.x;
        ai.prevAiPos.y = aiPos.y;
        var availableDirections = [];


        if (selectedMap[floor(aiPos.y)][floor(aiPos.x - 1)] === " " || selectedMap[floor(aiPos.y)][floor(aiPos.x - 1)] === "G" || selectedMap[floor(aiPos.y)][floor(aiPos.x - 1)] === "R") {
            availableDirections.push("left");
        }

        if (selectedMap[floor(aiPos.y)][floor(aiPos.x + 1)] === " " || selectedMap[floor(aiPos.y)][floor(aiPos.x + 1)] === "G" || selectedMap[floor(aiPos.y)][floor(aiPos.x + 1)] === "R") {
            availableDirections.push("right");
        }

        if (withInBounds(floor(aiPos.y - 1), floor(aiPos.x))) {
            if (selectedMap[floor(aiPos.y - 1)][floor(aiPos.x)] === " " || selectedMap[floor(aiPos.y - 1)][floor(aiPos.x)] === "G" || selectedMap[floor(aiPos.y - 1)][floor(aiPos.x)] === "RR") {
                availableDirections.push("top");
            }
        }

        if (withInBounds(floor(aiPos.y + 1), floor(aiPos.x))) {
            if (selectedMap[floor(aiPos.y + 1)][floor(aiPos.x)] === " " || selectedMap[floor(aiPos.y + 1)][floor(aiPos.x)] === "G" || selectedMap[floor(aiPos.y + 1)][floor(aiPos.x)] === "R") {
                availableDirections.push("bottom");
            }
        }

        if (availableDirections.length > 1) {
            for (let i = 0; i < availableDirections.length; i++) {
                switch (ai.aiMovingDirection) {
                    case "left":
                        if (availableDirections[i] === "right") {
                            availableDirections.splice(i, 1);
                        }
                        break;
                    case "right":
                        if (availableDirections[i] === "left") {
                            availableDirections.splice(i, 1);
                        }
                        break;
                    case "top":
                        if (availableDirections[i] === "bottom") {
                            availableDirections.splice(i, 1);
                        }
                        break;
                    case "bottom":
                        if (availableDirections[i] === "top") {
                            availableDirections.splice(i, 1);
                        }
                        break;
                }
            }
        }

        ai.aiMovingDirection = availableDirections[floor(random(availableDirections.length))];

        switch (ai.aiMovingDirection) {
            case "left":
                ai.move(createVector(0, -(2 * gridSize / 100)), -PI / 2, false);
                break;
            case "right":
                ai.move(createVector(0, -(2 * gridSize / 100)), PI / 2, false);
                break;
            case "top":
                ai.move(createVector(0, -(2 * gridSize / 100)), 0, false);
                break;
            case "bottom":
                ai.move(createVector(0, -(2 * gridSize / 100)), PI, false);
                break;
            default:
                console.log(ai.aiMovingDirection);
        }
    }
}

var optimalPath = [];

function smartAI(ai) {
    var aiPos = ai.pos.copy().mult(1 / gridSize);
    if (!ai.prevAiPos) {
        ai.prevAiPos = aiPos.copy();
        ai.move(createVector(0, -(2 * gridSize / 100)), -PI / 2, false, joy);
    }

    if (!(abs(aiPos.x - ai.prevAiPos.x) > 1 || abs(aiPos.y - ai.prevAiPos.y) > 1) && ai.aiMovingDirection) {
        switch (ai.aiMovingDirection) {
            case "left":
                ai.move(createVector(0, -(2 * gridSize / 100)), -PI / 2, false);
                break;
            case "right":
                ai.move(createVector(0, -(2 * gridSize / 100)), PI / 2, false);
                break;
            case "top":
                ai.move(createVector(0, -(2 * gridSize / 100)), 0, false);
                break;
            case "bottom":
                ai.move(createVector(0, -(2 * gridSize / 100)), PI, false);
                break;
            default:
                console.log(ai.aiMovingDirection)
        }
    } else {
        optimalPath = solveMaze(selectedMap, ai);
        if (optimalPath.length < 2) {
            ai.prevAiPos.x = aiPos.x;
            ai.prevAiPos.y = aiPos.y;
            var availableDirections = [];


            if (selectedMap[floor(aiPos.y)][floor(aiPos.x - 1)] === " " || selectedMap[floor(aiPos.y)][floor(aiPos.x - 1)] === "G" || selectedMap[floor(aiPos.y)][floor(aiPos.x - 1)] === "R") {
                availableDirections.push("left");
            }

            if (selectedMap[floor(aiPos.y)][floor(aiPos.x + 1)] === " " || selectedMap[floor(aiPos.y)][floor(aiPos.x + 1)] === "G" || selectedMap[floor(aiPos.y)][floor(aiPos.x + 1)] === "R") {
                availableDirections.push("right");
            }

            if (withInBounds(floor(aiPos.y - 1), floor(aiPos.x))) {
                if (selectedMap[floor(aiPos.y - 1)][floor(aiPos.x)] === " " || selectedMap[floor(aiPos.y - 1)][floor(aiPos.x)] === "G" || selectedMap[floor(aiPos.y - 1)][floor(aiPos.x)] === "RR") {
                    availableDirections.push("top");
                }
            }

            if (withInBounds(floor(aiPos.y + 1), floor(aiPos.x))) {
                if (selectedMap[floor(aiPos.y + 1)][floor(aiPos.x)] === " " || selectedMap[floor(aiPos.y + 1)][floor(aiPos.x)] === "G" || selectedMap[floor(aiPos.y + 1)][floor(aiPos.x)] === "R") {
                    availableDirections.push("bottom");
                }
            }

            if (availableDirections.length > 1) {
                for (let i = 0; i < availableDirections.length; i++) {
                    switch (ai.aiMovingDirection) {
                        case "left":
                            if (availableDirections[i] === "right") {
                                availableDirections.splice(i, 1);
                            }
                            break;
                        case "right":
                            if (availableDirections[i] === "left") {
                                availableDirections.splice(i, 1);
                            }
                            break;
                        case "top":
                            if (availableDirections[i] === "bottom") {
                                availableDirections.splice(i, 1);
                            }
                            break;
                        case "bottom":
                            if (availableDirections[i] === "top") {
                                availableDirections.splice(i, 1);
                            }
                            break;
                    }
                }
            }

            ai.aiMovingDirection = availableDirections[floor(random(availableDirections.length))];

            switch (ai.aiMovingDirection) {
                case "left":
                    ai.move(createVector(0, -(2 * gridSize / 100)), -PI / 2, false);
                    break;
                case "right":
                    ai.move(createVector(0, -(2 * gridSize / 100)), PI / 2, false);
                    break;
                case "top":
                    ai.move(createVector(0, -(2 * gridSize / 100)), 0, false);
                    break;
                case "bottom":
                    ai.move(createVector(0, -(2 * gridSize / 100)), PI, false);
                    break;
                default:
                    console.log(ai.aiMovingDirection);
            }
        } else {
            ai.prevAiPos.x = aiPos.x;
            ai.prevAiPos.y = aiPos.y;
            if (floor(aiPos.x) - optimalPath[1][0] == 0) {
                if (floor(aiPos.y) - optimalPath[1][1]==1) {
                    ai.aiMovingDirection = "top";
                } else if (floor(aiPos.y) - optimalPath[1][1]==-1) {
                    ai.aiMovingDirection = "bottom";
                } else {
                    console.log("Mistake with the Maze Solver")
                }
            } else if(floor(aiPos.y) - optimalPath[1][1] == 0) {
                if (floor(aiPos.x) - optimalPath[1][0]==1) {
                    ai.aiMovingDirection = "left";
                 } else if (floor(aiPos.x) - optimalPath[1][0]==-1) {
                    ai.aiMovingDirection = "right";
                  } else {
                    console.log("Mistake with the Maze Solver")
                }
            }
            switch (ai.aiMovingDirection) {
                case "left":
                    ai.move(createVector(0, -(2 * gridSize / 100)), -PI / 2, false);
                    break;
                case "right":
                    ai.move(createVector(0, -(2 * gridSize / 100)), PI / 2, false);
                    break;
                case "top":
                    ai.move(createVector(0, -(2 * gridSize / 100)), 0, false);
                    break;
                case "bottom":
                    ai.move(createVector(0, -(2 * gridSize / 100)), PI, false);
                    break;
                default:
                    console.log(ai.aiMovingDirection);
            }
        }
    }
}