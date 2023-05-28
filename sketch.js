var player;
var enemy = [];
var mapleSyrups = [];
var gridSize;
var corners = [];
//W = wall
//S = Start
//G = Grass
//L = Lava
//E = End
//T = Tile
//https://www.lookuptables.com/text/extended-ascii-table
var carImage;
var enemyImage;
var grassImage;
var selectedMap;
var selectedRoad;
var map = [];
var map2 = [];
var map3 = [];
var map5 = [];
var road = [];
var road2;
var worldPos;
// var numEnemy = 0;
var straigtRoadImage;
var verticalRoadImage;
var cornerRoadImage;
var cornerRightRoadImage;
var cornerLeftRoadImage;
var cornerDownRoadImage;
var TRoadImage;
var TRightRoadImage;
var TLeftRoadImage;
var TTopRoadImage;
var stopwatchString;
var collectedSyrups = 0;
var currentMap = 0;
function setup() {
    createCanvas(floor(window.innerWidth / 2.5), floor((window.innerWidth / 2.5)));
    gridSize = floor(width / 8);
    player = new Car();
    player.pos = createVector(gridSize / 2, gridSize / 2);
    player.carAngle = PI;
    // for (let i = 0; i < numEnemy; i++) {
    //     enemy[i] = new Car();
    // }
    //enemy = new Car();
    worldPos = createVector(0, 0);
    map = [
        ["S", "G", "G", "W", "W", "G", "W", "W", "W", "W", " ", " ", " ", " ", " ", "G"],
        [" ", " ", " ", " ", " ", " ", " ", "G", "W", "G", "M", "W", "W", "G", " ", " "],
        [" ", "W", "W", " ", "W", "W", " ", "M", " ", " ", " ", "W", "W", "G", "G", " "],
        [" ", "W", "W", " ", "W", "W", "W", " ", "W", "W", "G", "G", "W", "G", "W", " "],
        [" ", "W", "W", " ", " ", " ", " ", " ", "W", "W", "W", "G", "G", "G", "G", "M"],
        ["M", "W", " ", " ", "G", "G", "G", " ", " ", " ", " ", "G", "W", "W", "W", " "],
        [" ", " ", " ", "G", "G", "W", "G", "G", "G", "W", " ", " ", " ", " ", " ", " "],
        [" ", "G", " ", "W", "G", "G", "G", "G", "G", "W", " ", "G", "W", "W", "G", "M"],
        [" ", "W", " ", " ", " ", " ", "M", "W", "G", "-", "M", "G", "G", "W", " ", " "],
        [" ", "G", "M", "G", "W", "G", " ", "G", "W", "G", " ", " ", " ", " ", " ", "G"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "G", "G", " ", "G", " ", "G", " ", "W"],
        [" ", "W", "W", " ", "W", "G", "G", " ", " ", "M", " ", "G", " ", "M", " ", " "],
        [" ", "W", "W", " ", "W", "W", "W", " ", "G", "G", "W", "G", " ", "G", "G", " "],
        [" ", "W", " ", " ", "M", " ", " ", " ", "G", "W", "W", "G", " ", "W", "W", " "],
        [" ", "W", " ", "G", "G", "W", "G", " ", " ", "G", "W", "G", " ", "G", "G", " "],
        ["M", " ", " ", "W", "W", "W", "G", "W", " ", " ", " ", " ", "M", " ", " ", " "]
    ];

    road = [
        ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", "┌", "-", "-", "-", "┐", " "],
        ["├", "-", "-", "T", "-", "-", "┐", " ", " ", " ", "|", " ", " ", " ", "L", "┐"],
        ["|", " ", " ", "|", " ", " ", "L", "T", "-", "-", "┘", " ", " ", " ", " ", "|"],
        ["|", " ", " ", "|", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", " ", "|"],
        ["|", " ", " ", "├", "-", "-", "-", "┤", " ", " ", " ", " ", " ", " ", " ", "|"],
        ["|", " ", "┌", "┘", " ", " ", " ", "L", "-", "-", "┐", " ", " ", " ", " ", "|"],
        ["├", "-", "┤", " ", " ", " ", " ", " ", " ", " ", "├", "-", "-", "-", "-", "┤"],
        ["|", " ", "|", " ", " ", " ", " ", " ", " ", " ", "|", " ", " ", " ", " ", "|"],
        ["|", " ", "├", "-", "-", "-", "┐", " ", " ", "-", "┤", " ", " ", " ", "┌", "┘"],
        ["|", " ", "|", " ", " ", " ", "|", " ", " ", " ", "├", "-", "T", "-", "┤", " "],
        ["├", "-", "┴", "T", "-", "-", "┴", "┐", " ", " ", "|", " ", "|", " ", "|", " "],
        ["|", " ", " ", "|", " ", " ", " ", "├", "-", "-", "┘", " ", "├", "-", "┴", "┐"],
        ["|", " ", " ", "|", " ", " ", " ", "|", " ", " ", " ", " ", "|", "", " ", "|"],
        ["|", " ", "┌", "┴", "-", "-", "-", "┤", " ", " ", " ", " ", "|", " ", " ", "|"],
        ["|", " ", "|", " ", " ", " ", " ", "L", "┐", " ", " ", " ", "|", " ", " ", "|"],
        ["L", "-", "┘", " ", " ", " ", " ", " ", "L", "-", "-", "-", "┴", "-", "-", "┘"]
    ];

    map2 = [
        ["W", " ", " ", " ", " ", " ", "G", "W", "G", " ", " ", " ", " ", " ", "G", "W"],
        [" ", " ", "G", "W", "G", " ", " ", " ", " ", "M", "W", " ", "G", " ", " ", "G"],
        [" ", "G", "G", "G", "W", "W", "W", " ", "G", "G", "W", " ", "W", "W", "M", " "],
        ["M", "W", "W", "G", "W", "W", "W", " ", "G", "W", "W", " ", "W", "W", "W", " "],
        [" ", "W", "W", "G", " ", " ", " ", " ", "W", "W", "W", " ", " ", " ", " ", " "],
        [" ", " ", "W", " ", " ", "W", "W", " ", "G", "W", "W", " ", "G", "W", "W", " "],
        ["G", " ", " ", " ", "G", "W", "W", " ", "G", "G", "G", " ", "W", "W", "W", " "],
        ["W", "W", "W", " ", " ", " ", " ", "S", "W", "W", "G", " ", "G", " ", " ", " "],
        ["W", " ", " ", " ", "G", " ", "W", "W", "W", "G", " ", " ", " ", " ", "W", "G"],
        [" ", " ", "G", " ", "W", " ", " ", " ", " ", " ", " ", "W", "G", " ", " ", " "],
        [" ", "G", "G", " ", "G", "W", "W", " ", "G", "W", " ", "W", "W", "W", "W", " "],
        [" ", "W", "W", " ", " ", "W", "G", " ", "M", "G", " ", "G", "W", "W", "W", " "],
        [" ", "W", "W", "G", " ", " ", " ", "W", " ", "W", " ", " ", " ", " ", " ", " "],
        [" ", "G", "W", "W", " ", "W", " ", " ", " ", " ", " ", "G", " ", "W", "W", " "],
        [" ", " ", " ", "W", " ", "W", "W", " ", "G", " ", " ", " ", " ", "W", "M", " "],
        ["W", "G", " ", "M", " ", "G", "G", " ", "W", "W", "W", "G", " ", " ", " ", "G"]
    ];
    road2 = [
        [" ", "┌", "-", "-", "-", "┐", " ", " ", " ", "┌", "-", "T", "-", "┐", " ", " "],
        ["┌", "┘", " ", " ", " ", "L", "-", "T", "-", "┘", " ", "|", " ", "L", "┐", " "],
        ["|", " ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|", " ", " ", "L", "┐"],
        ["|", " ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|", " ", " ", " ", "|"],
        ["|", " ", " ", " ", "┌", "-", "-", "┤", " ", " ", " ", "├", "-", "-", "-", "┤"],
        ["L", "┐", " ", "┌", "┘", " ", " ", "|", " ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", "L", "-", "┤", " ", " ", " ", "|", " ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", "├", "-", "T", "-", "┘", " ", " ", " ", "|", " ", "┌", "-", "┘"],
        [" ", "┌", "-", "┤", " ", "|", " ", " ", " ", " ", "┌", "┴", "-", "┤", " ", " "],
        ["┌", "┘", " ", "|", " ", "L", "-", "T", "-", "-", "┤", " ", " ", "L", "-", "┐"],
        ["|", " ", " ", "|", " ", " ", " ", "|", " ", " ", "|", " ", " ", " ", " ", "|"],
        ["|", " ", " ", "L", "┐", " ", " ", "L", "┐", " ", "|", " ", " ", " ", " ", "|"],
        ["|", " ", " ", " ", "├", "-", "┐", " ", "|", " ", "├", "-", "T", "-", "-", "┤"],
        ["|", " ", " ", " ", "|", " ", "L", "T", "┴", "T", "┤", " ", "|", " ", " ", "|"],
        ["L", "-", "┐", " ", "|", " ", " ", "|", " ", "L", "┴", "-", "┤", " ", "┌", "┘"],
        [" ", " ", "L", "-", "┘", " ", " ", "|", " ", " ", " ", " ", "L", "-", "┘", " "]
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
    grassImage = loadImage("./assets/grass.png");
    straigtRoadImage = loadImage("./assets/stright.png");
    verticalRoadImage = loadImage("./assets/strightRotate90.png");
    cornerRoadImage = loadImage("./assets/90.png");
    cornerRightRoadImage = loadImage("./assets/90Right.png");
    cornerLeftRoadImage = loadImage("./assets/90Left.png");
    cornerDownRoadImage = loadImage("./assets/90Down.png");
    TRoadImage = loadImage("./assets/t.png");
    TRightRoadImage = loadImage("./assets/tRight.png");
    TLeftRoadImage = loadImage("./assets/tLeft.png");
    TTopRoadImage = loadImage("./assets/tTop.png");
    spawnSyrups(map, 0);
    let miniMap = document.getElementById("miniMap");
    for (let i = 0; i < 13; i++) {
        let syrup = document.createElement("div");
        syrup.style = `width:` + (window.innerWidth * .15 * .0625) + `px; height:` + (window.innerWidth * .15 * .0625) + `px; position: absolute; left:` + (mapleSyrups[i].x * window.innerWidth * .15 * .0625) + `px; top:` + (mapleSyrups[i].y * window.innerWidth * .15 * .0625) + `px; background-color: rgb(255, 255, 0);`;
        syrup.id = mapleSyrups[i].x + "-" + mapleSyrups[i].y;
        miniMap.append(syrup);
    }
    selectedMap = map;
    selectedRoad = road;
    startStopwatch();
}
// function mousePressed() {
//     nextLevel();
// }
function nextLevel() {
    currentMap++;
    selectedMap = map2;
    selectedRoad = road2;
    enemy = [];
    for (let i = 0; i < mapleSyrups.length; i++) {
        document.getElementById(mapleSyrups[i].x + "-" + mapleSyrups[i].y).remove();
    }
    mapleSyrups = [];
    player.pos = createVector(7 * gridSize + gridSize / 2, 7 * gridSize + gridSize / 2);
    player.carAngle = 0;
    player.health = 1;
    spawnSyrups(selectedMap, 6);
    for (let i = 0; i < 6; i++) {
        let syrup = document.createElement("div");
        syrup.style = `width:` + (window.innerWidth * .15 * .0625) + `px; height:` + (window.innerWidth * .15 * .0625) + `px; position: absolute; left:` + (mapleSyrups[i].x * window.innerWidth * .15 * .0625) + `px; top:` + (mapleSyrups[i].y * window.innerWidth * .15 * .0625) + `px; background-color: rgb(255, 255, 0);`;
        syrup.id = mapleSyrups[i].x + "-" + mapleSyrups[i].y;
        miniMap.append(syrup);
    }
}
function draw() {
    // if (!stopwatchString) {
    //     startStopwatch();
    // }
    background(255);
    showRoad(selectedRoad);
    showMap(selectedMap);
    player.move(null, null, true);
    player.show(carImage, true);
    for (let i = 0; i < enemy.length; i++) {
        enemy[i].show(enemyImage);
        Wander(enemy[i]);
        if (enemy[i].collideOtherCar(player)) {
            // location.reload();
            console.log("collideWithPlayer");
            clearInterval(stopwatchInterval);
        }
    }
    let carHTML = document.getElementById("car");
    carHTML.style.left = (floor(player.pos.x / gridSize) * (window.innerWidth * .15 * .0625)) + "px";
    carHTML.style.top = (floor(player.pos.y / gridSize) * (window.innerWidth * .15 * .0625)) + "px";
    for (let i = 0; i < mapleSyrups.length; i++) {
        mapleSyrups[i].show();
        if (mapleSyrups[i].collide()) {
            document.getElementById(mapleSyrups[i].x + "-" + mapleSyrups[i].y).remove();
            mapleSyrups.splice(i, 1);
            player.health = 1;
            collectedSyrups++;
        }
    }
    if (mapleSyrups.length == 0) {
        if (currentMap < 1) {
            nextLevel();
        } else { noLoop() }
    }
    fill(255, 60, 0);
    noStroke();
    rect(width - 90, 5, 85, 20, 5);
    fill(255);
    textSize(15);
    text(stopwatchString, width - 65, 20);
    fill(255, 255, 0);
    text(collectedSyrups, width - 85, 20);
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
                    image(grassImage, j * gridSize - worldPos.x, i * gridSize - worldPos.y, gridSize, gridSize);
                    grassImage.resizeNN(gridSize, gridSize);
                }
            }
        }
    }
}
function showRoad(theRoad) {
    for (let i = 0; i < theRoad.length; i++) {
        for (let j = 0; j < theRoad[0].length; j++) {
            if (theRoad[i][j]) {
                if (theRoad[i][j] == "-") {
                    push();
                    translate(j * gridSize - worldPos.x + gridSize / 2, i * gridSize - worldPos.y + gridSize / 2);
                    //image(straigtRoadImage, j * gridSize - worldPos.x, i * gridSize - worldPos.y, gridSize, gridSize);
                    image(straigtRoadImage, -gridSize / 2, -gridSize / 2, gridSize, gridSize);
                    straigtRoadImage.resizeNN(gridSize, gridSize);
                    pop();
                    //rect(j * gridSize - worldPos.x, i * gridSize - worldPos.y, gridSize, gridSize);
                } else if (theRoad[i][j] == "|") {
                    push();
                    translate(j * gridSize - worldPos.x + gridSize / 2, i * gridSize - worldPos.y + gridSize / 2);
                    image(verticalRoadImage, -gridSize / 2, -gridSize / 2, gridSize, gridSize);
                    //image(straigtRoadImage, 0,0);
                    verticalRoadImage.resizeNN(gridSize, gridSize);
                    pop();
                } else if (theRoad[i][j] == "T") {
                    push();
                    translate(j * gridSize - worldPos.x + gridSize / 2, i * gridSize - worldPos.y + gridSize / 2);
                    image(TRoadImage, -gridSize / 2, -gridSize / 2, gridSize, gridSize);
                    TRoadImage.resizeNN(gridSize, gridSize);
                    pop();
                } else if (theRoad[i][j] == "┘") {
                    push();
                    translate(j * gridSize - worldPos.x + gridSize / 2, i * gridSize - worldPos.y + gridSize / 2);
                    image(cornerRoadImage, -gridSize / 2, -gridSize / 2, gridSize, gridSize);
                    //image(straigtRoadImage, 0,0);
                    cornerRoadImage.resizeNN(gridSize, gridSize);
                    pop();
                } else if (theRoad[i][j] == "├") {
                    push();
                    translate(j * gridSize - worldPos.x + gridSize / 2, i * gridSize - worldPos.y + gridSize / 2);
                    image(TRightRoadImage, -gridSize / 2, -gridSize / 2, gridSize, gridSize);
                    //image(straigtRoadImage, 0,0);
                    TRightRoadImage.resizeNN(gridSize, gridSize);
                    pop();
                } else if (theRoad[i][j] == "┤") {
                    push();
                    translate(j * gridSize - worldPos.x + gridSize / 2, i * gridSize - worldPos.y + gridSize / 2);
                    image(TLeftRoadImage, -gridSize / 2, -gridSize / 2, gridSize, gridSize);
                    //image(straigtRoadImage, 0,0);
                    TLeftRoadImage.resizeNN(gridSize, gridSize);
                    pop();
                } else if (theRoad[i][j] == "┴") {
                    push();
                    translate(j * gridSize - worldPos.x + gridSize / 2, i * gridSize - worldPos.y + gridSize / 2);
                    image(TTopRoadImage, -gridSize / 2, -gridSize / 2, gridSize, gridSize);
                    //image(straigtRoadImage, 0,0);
                    TTopRoadImage.resizeNN(gridSize, gridSize);
                    pop();
                } else if (theRoad[i][j] == "L") {
                    push();
                    translate(j * gridSize - worldPos.x + gridSize / 2, i * gridSize - worldPos.y + gridSize / 2);
                    image(cornerRightRoadImage, -gridSize / 2, -gridSize / 2, gridSize, gridSize);
                    //image(straigtRoadImage, 0,0);
                    cornerRightRoadImage.resizeNN(gridSize, gridSize);
                    pop();
                } else if (theRoad[i][j] == "┌") {
                    push();
                    translate(j * gridSize - worldPos.x + gridSize / 2, i * gridSize - worldPos.y + gridSize / 2);
                    image(cornerLeftRoadImage, -gridSize / 2, -gridSize / 2, gridSize, gridSize);
                    //image(straigtRoadImage, 0,0);
                    cornerLeftRoadImage.resizeNN(gridSize, gridSize);
                    pop();
                } else if (theRoad[i][j] == "┐") {
                    push();
                    translate(j * gridSize - worldPos.x + gridSize / 2, i * gridSize - worldPos.y + gridSize / 2);
                    image(cornerDownRoadImage, -gridSize / 2, -gridSize / 2, gridSize, gridSize);
                    //image(straigtRoadImage, 0,0);
                    cornerDownRoadImage.resizeNN(gridSize, gridSize);
                    pop();
                }
            }
        }
    }
}
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
                alert("You Failed");
                location.reload();
            }
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
                if (selectedMap[floor(boardPos.y)][floor(boardPos.x)] == "G") {
                    this.vel = createVector(0, -(gridSize / 100));
                } else {
                    this.vel = createVector(0, -(3 * gridSize / 100));
                }
            }
            else if (keyIsDown(83)) { // s key
                this.health -= 0.001;
                var boardPos = (this.pos.copy()).mult(1 / gridSize);
                if (selectedMap[floor(boardPos.y)][floor(boardPos.x)] == "G") {
                    this.vel = createVector(0, (gridSize / 100));
                } else {
                    this.vel = createVector(0, (3 * gridSize / 100));
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
                this.pos.sub(this.vel);
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
            if (selectedMap[floor(corners[1].y)][floor(corners[1].x)] == "W") {
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
            if (selectedMap[floor(corners[2].y)][floor(corners[2].x)] == "W") {
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
            if (selectedMap[floor(corners[3].y)][floor(corners[3].x)] == "W") {
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
}

class Syrup {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    show() {
        fill(255, 255, 0);
        noStroke();
        circle(this.x * gridSize - worldPos.x + gridSize / 2, this.y * gridSize - worldPos.y + gridSize / 2, 15);
    }
    collide() {
        var boardPos = (player.pos.copy()).mult(1 / gridSize);
        if (this.y == floor(boardPos.y) && this.x == floor(boardPos.x)) {
            console.log(this.x, this.y, " ", floor(boardPos.x), floor(boardPos.y));
            return true;
        }
        return false;
    }
}

function spawnSyrups(theMap, numEnemy) {
    let countOfAddedEnemies = 0;
    for (let i = 0; i < theMap.length; i++) {
        for (let j = 0; j < theMap[0].length; j++) {
            if (theMap[i][j]) {
                if (theMap[i][j] == "M") {
                    console.log(j, i);
                    mapleSyrups.push(new Syrup(j, i));
                    if (countOfAddedEnemies<numEnemy) {
                        enemy[countOfAddedEnemies] = new Car();
                        enemy[countOfAddedEnemies].pos = createVector(j * gridSize + gridSize / 2, i * gridSize + gridSize / 2);
                        countOfAddedEnemies++;
                    }
                }
            }
        }
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
        ai.move(createVector(0, -(2 * gridSize / 100)), -PI / 2, false);
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
    }
}
function withInBounds(x, y) {
    if (x < 0 || x >= 16 || y < 0 || y >= 16) return false;
    return true;
}
var stopwatchInterval;
function startStopwatch() {
    var startTime = Date.now();
    stopwatchInterval = setInterval(function () {
        var elapsedTime = Date.now() - startTime;
        var minutes = Math.floor(elapsedTime / (60 * 1000));
        var seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
        var milliseconds = Math.floor((elapsedTime % 1000) / 10);

        // Add leading zeros if necessary
        minutes = padNumber(minutes);
        seconds = padNumber(seconds);
        milliseconds = padNumber(milliseconds);

        stopwatchString = minutes + ":" + seconds + ":" + milliseconds;

        // You can stop the stopwatch by calling clearInterval(stopwatchInterval);
    }, 10);
}

function padNumber(number) {
    return number.toString().padStart(2, "0");
}