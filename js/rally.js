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
var cityImage;
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
var straightRoadImage;
var verticalRoadImage;
var cornerRoadImage;
var cornerRightRoadImage;
var cornerLeftRoadImage;
var cornerDownRoadImage;
var TRoadImage;
var TRightRoadImage;
var TLeftRoadImage;
var TTopRoadImage;
var intersectionImage;
var stopwatchString;
var collectedSyrups = 0;
var currentLevel = 0;
var levels = [];
var mapleImage;
var playerName = localStorage.getItem("username");
var joy = " ";

const imageCache = {};

function cachedLoadImage(path) {
    if (!imageCache[path]) {
        imageCache[path] = loadImage(path);
    }

    return imageCache[path];
}

function preload() {
    levels[0] = {
        "map": [
            ["R", "G", "G", "W", "W", "G", "W", "W", "W", "W", "R", "R", "R", "R", "R", "G"],
            ["R", "R", "R", "R", "R", "R", "R", "G", "W", "G", "R", "W", "W", "G", "R", "R"],
            ["R", "W", "W", "R", "W", "W", "R", "R", "R", "R", "R", "W", "W", "G", "G", "R"],
            ["R", "W", "W", "R", "W", "W", "W", "R", "W", "W", "G", "G", "W", "G", "W", "R"],
            ["R", "W", "W", "R", "R", "R", "R", "R", "W", "W", "W", "G", "G", "G", "G", "R"],
            ["R", "W", "R", "R", "G", "G", "G", "R", "R", "R", "R", "G", "W", "W", "W", "R"],
            ["R", "R", "R", "G", "G", "W", "G", "G", "G", "W", "R", "R", "R", "R", "R", "R"],
            ["R", "G", "R", "W", "G", "G", "G", "G", "G", "W", "R", "G", "W", "W", "G", "R"],
            ["R", "W", "R", "R", "R", "R", "R", "W", "G", "R", "R", "G", "G", "W", "R", "R"],
            ["R", "G", "R", "G", "W", "G", "R", "G", "W", "G", "R", "R", "R", "R", "R", "G"],
            ["R", "R", "R", "R", "R", "R", "R", "R", "G", "G", "R", "G", "R", "G", "R", "W"],
            ["R", "W", "W", "R", "W", "G", "G", "R", "R", "R", "R", "G", "R", "R", "R", "R"],
            ["R", "W", "W", "R", "W", "W", "W", "R", "G", "G", "W", "G", "R", "G", "G", "R"],
            ["R", "W", "R", "R", "R", "R", "R", "R", "G", "W", "W", "G", "R", "W", "W", "R"],
            ["R", "W", "R", "G", "G", "W", "G", "R", "R", "G", "W", "G", "R", "G", "G", "R"],
            ["R", "R", "R", "W", "W", "W", "G", "W", "R", "R", "R", "R", "R", "R", "R", "R"]
        ],
        "maples": [
            createVector(3, 1),
            createVector(7, 2),
            createVector(15, 4),
            createVector(0, 5),
            createVector(15, 7),
            createVector(6, 8),
            createVector(10, 8),
            createVector(2, 9),
            createVector(9, 11),
            createVector(13, 11),
            createVector(4, 13),
            createVector(0, 15),
            createVector(2, 15)
        ],
        "enemies": 0,
        "start": createVector(0, 0),
        "direction": PI
    }

    levels[1] = {
        "map": [
            ["W", "R", "R", "R", "R", "R", "G", "W", "G", "R", "R", "R", "R", "R", "G", "W"],
            ["R", "R", "G", "W", "G", "R", "R", "R", "R", "R", "W", "R", "G", "R", "R", "G"],
            ["R", "G", "G", "G", "W", "W", "W", "R", "G", "G", "W", "R", "W", "W", "R", "R"],
            ["R", "W", "W", "G", "W", "W", "W", "R", "G", "W", "W", "R", "W", "W", "W", "R"],
            ["R", "W", "W", "G", "R", "R", "R", "R", "W", "W", "W", "R", "R", "R", "R", "R"],
            ["R", "R", "W", "R", "R", "W", "W", "R", "G", "W", "W", "R", "G", "W", "W", "R"],
            ["G", "R", "R", "R", "G", "W", "W", "R", "G", "G", "G", "R", "W", "W", "W", "R"],
            ["W", "W", "W", "R", "R", "R", "R", "R", "W", "W", "G", "R", "G", "R", "R", "R"],
            ["W", "R", "R", "R", "G", "R", "W", "W", "W", "G", "R", "R", "R", "R", "W", "G"],
            ["R", "R", "G", "R", "W", "R", "R", "R", "R", "R", "R", "W", "G", "R", "R", "R"],
            ["R", "G", "G", "R", "G", "W", "W", "R", "G", "W", "R", "W", "W", "W", "W", "R"],
            ["R", "W", "W", "R", "R", "W", "G", "R", "R", "G", "R", "G", "W", "W", "W", "R"],
            ["R", "W", "W", "G", "R", "R", "R", "W", "R", "W", "R", "R", "R", "R", "R", "R"],
            ["R", "G", "W", "W", "R", "W", "R", "R", "R", "R", "R", "G", "R", "W", "W", "R"],
            ["R", "R", "R", "W", "R", "W", "W", "R", "G", "R", "R", "R", "R", "W", "R", "R"],
            ["W", "G", "R", "R", "R", "G", "G", "R", "W", "W", "W", "G", "R", "R", "R", "G"]
        ],
        "maples": [
            createVector(0, 11),
            createVector(1, 9),
            createVector(2, 14),
            createVector(3, 0),
            createVector(7, 3),
            createVector(8, 11),
            createVector(11, 8),
            createVector(12, 0),
            createVector(14, 7),
            createVector(14, 14),
            createVector(15, 3)
        ],
        "enemies": 2,
        "start": createVector(7, 7),
        "direction": 0
    }

    levels[2] = {
        "map": [
            ["R", "G", "G", "W", "W", "G", "W", "W", "W", "W", "R", "R", "R", "R", "R", "G"],
            ["R", "R", "R", "R", "R", "R", "R", "G", "W", "G", "R", "W", "W", "G", "R", "R"],
            ["R", "W", "W", "R", "W", "W", "R", "R", "R", "R", "R", "W", "W", "G", "G", "R"],
            ["R", "W", "W", "R", "W", "W", "W", "R", "W", "W", "G", "G", "W", "G", "W", "R"],
            ["R", "W", "W", "R", "R", "R", "R", "R", "W", "W", "W", "G", "G", "G", "G", "R"],
            ["R", "W", "R", "R", "G", "G", "G", "R", "R", "R", "R", "G", "W", "W", "W", "R"],
            ["R", "R", "R", "G", "G", "W", "G", "G", "G", "W", "R", "R", "R", "R", "R", "R"],
            ["R", "G", "R", "W", "G", "G", "G", "G", "G", "W", "R", "G", "W", "W", "G", "R"],
            ["R", "W", "R", "R", "R", "R", "W", "W", "W", "G", "R", "R", "R", "R", "W", "G"],
            ["R", "W", "G", "R", "W", "R", "R", "R", "R", "R", "R", "W", "G", "R", "R", "R"],
            ["R", "G", "G", "R", "G", "W", "W", "R", "G", "W", "R", "W", "W", "W", "W", "R"],
            ["R", "W", "W", "R", "R", "W", "G", "R", "R", "G", "R", "G", "W", "W", "W", "R"],
            ["R", "W", "W", "G", "R", "R", "R", "W", "R", "W", "R", "R", "R", "R", "R", "R"],
            ["R", "G", "W", "W", "R", "W", "R", "R", "R", "R", "R", "G", "R", "W", "W", "R"],
            ["R", "R", "R", "W", "R", "W", "W", "R", "G", "R", "R", "R", "R", "W", "R", "R"],
            ["W", "G", "R", "R", "R", "G", "G", "R", "W", "W", "W", "G", "R", "R", "R", "G"]
        ],
        "maples": [
            createVector(3, 1),
            createVector(7, 2),
            createVector(15, 4),
            createVector(0, 5),
            createVector(15, 7),
            createVector(11, 8),
            createVector(8, 11),
            createVector(0, 12),
            createVector(7, 14),
            createVector(14, 14),
            createVector(3, 15),
        ],
        "enemies": 4,
        "start": createVector(0, 0),
        "direction": PI
    };

    levels[3] = {
        "map": [
            ["W", "R", "R", "R", "R", "R", "G", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
            ["W", "R", "W", "G", "W", "R", "R", "R", "W", "R", "W", "W", "W", "R", "W", "R"],
            ["W", "R", "R", "R", "W", "R", "W", "R", "W", "R", "R", "R", "R", "R", "W", "R"],
            ["W", "R", "W", "W", "W", "R", "W", "R", "W", "W", "W", "R", "W", "R", "W", "R"],
            ["W", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "W", "R", "R", "R"],
            ["W", "G", "W", "R", "W", "W", "W", "R", "W", "R", "W", "W", "W", "W", "W", "R"],
            ["W", "R", "R", "R", "R", "R", "R", "R", "W", "R", "R", "R", "R", "R", "W", "R"],
            ["W", "R", "W", "R", "W", "R", "W", "R", "W", "W", "W", "R", "W", "R", "W", "R"],
            ["W", "R", "W", "R", "R", "R", "R", "R", "R", "R", "R", "R", "W", "R", "R", "R"],
            ["W", "R", "W", "W", "W", "R", "W", "R", "W", "R", "W", "R", "W", "R", "W", "W"],
            ["G", "R", "R", "R", "R", "R", "W", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
            ["G", "R", "W", "R", "W", "W", "W", "R", "W", "R", "W", "R", "G", "W", "G", "R"],
            ["G", "R", "W", "R", "W", "R", "R", "R", "W", "R", "R", "R", "W", "W", "W", "R"],
            ["W", "R", "W", "R", "W", "R", "W", "R", "W", "R", "W", "R", "G", "W", "G", "R"],
            ["W", "R", "R", "R", "R", "R", "W", "R", "R", "R", "W", "R", "R", "R", "R", "R"],
            ["W", "W", "W", "W", "W", "G", "G", "G", "W", "G", "G", "G", "W", "W", "W", "W"]
        ],
        "maples": [
            createVector(7, 0),
            createVector(11, 0),
            createVector(3, 2),
            createVector(9, 2),
            createVector(7, 4),
            createVector(15, 4),
            createVector(3, 6),
            createVector(9, 6),
            createVector(15, 8),
            createVector(5, 10),
            createVector(9, 10),
            createVector(1, 12),
            createVector(7, 14),
            createVector(11, 14),
            createVector(15, 14)
        ],
        "enemies": 5,
        "start": createVector(1, 0),
        "direction": PI
    };

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

    specialCarSkins = {
        "uwu": loadImage("./assets/player/uwu.png"),
        "ean": loadImage("./assets/player/nelson.png")
    }

    if (specialCarSkins[playerName.toLowerCase()]) {
        carImage = specialCarSkins[playerName.toLowerCase()];
    } else {
        carImage = loadImage("./assets/player/player.png");
    }

    specialCityTexture = {
        "uwu": loadImage("./assets/map/city.png")
    }

    if (specialCityTexture[playerName.toLowerCase()]) {
        cityImage = specialCityTexture[playerName.toLowerCase()];
    } else {
        cityImage = loadImage("./assets/map/cityBW.png");
    }

    enemyImage = loadImage("./assets/enemy/enemy.png");
    grassImage = loadImage("./assets/map/grass.png");
    mapleImage = loadImage("./assets/items/maple.png");

    cachedLoadImage("./assets/road/000001010.png");
    cachedLoadImage("./assets/road/000100010.png");
    cachedLoadImage("./assets/road/000101000.png");
    cachedLoadImage("./assets/road/000101010.png");
    cachedLoadImage("./assets/road/010000010.png");
    cachedLoadImage("./assets/road/010001000.png");
    cachedLoadImage("./assets/road/010001010.png");
    cachedLoadImage("./assets/road/010100000.png");
    cachedLoadImage("./assets/road/010100010.png");
    cachedLoadImage("./assets/road/010101000.png");
    cachedLoadImage("./assets/road/010101010.png");
}

function setup() {
    if (localStorage.getItem("username") == "" || localStorage.getItem("username") == undefined || localStorage.getItem("username") == null) {
        window.location.replace("index.html");
    } else {
        console.log(playerName);

        var canvas = createCanvas(floor(window.innerWidth / 2.5), floor((window.innerWidth / 2.5)));
        canvas.id("game");
        gridSize = floor(width / 8);

        if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
            joy = new JoyStick('joyDiv');
        }

        player = new Car();
        player.pos = createVector(gridSize / 2, gridSize / 2);
        player.carAngle = PI;
        worldPos = createVector(0, 0);

        spawnEntities(levels[0]);
        selectedMap = levels[0].map;
        selectedRoad = levels[0].road;
        startStopwatch();
    }
}

function mousePressed() { }

function keyPressed() {
    if (key == "m") {
        document.getElementById("miniMap").hidden = !document.getElementById("miniMap").hidden;
    }
}

function nextLevel() {
    currentLevel++;
    worldPos = createVector(0, 0);

    if (currentLevel == levels.length) {
        alert("you win");
        currentLevel = -1;
        addScore(playerName, stopwatchString);
        clearInterval(stopwatchInterval);
        startStopwatch();
        nextLevel();
        return;
    }

    selectedMap = levels[currentLevel].map;
    selectedRoad = levels[currentLevel].road;
    enemy = [];
    collectedSyrups = 0;

    for (let i = currentLevel - 1; i >= 0; i--) {
        collectedSyrups += levels[i].maples.length;
    }

    mapleSyrups = [];
    player.pos = createVector(levels[currentLevel].start.x * gridSize + gridSize / 2, levels[currentLevel].start.y * gridSize + gridSize / 2);
    player.carAngle = levels[currentLevel].direction;
    player.health = 1;

    console.log(currentLevel)
    console.log(levels[currentLevel])
    spawnEntities(levels[currentLevel]);
}

function restartCurrentLevel() {
    currentLevel--;
    nextLevel();
}

function draw() {
    background(255);
    drawMiniMap(selectedMap);
    showMap(selectedMap);

    player.move(null, null, true, joy);
    player.show(carImage, true);

    for (let i = 0; i < enemy.length; i++) {
        enemy[i].show(enemyImage);
        if (i < 1) {
            smartAI(enemy[i]);
        } else {
            Wander(enemy[i]);
        }

        if (enemy[i].collideOtherCar(player)) {
            restartCurrentLevel();
            console.log("collideWithPlayer");
        }
    }

    for (let i = 0; i < mapleSyrups.length; i++) {
        mapleSyrups[i].show();

        if (mapleSyrups[i].collide()) {
            mapleSyrups.splice(i, 1);
            player.health = 1;
            collectedSyrups++;
        }
    }

    if (mapleSyrups.length == 0) {
        nextLevel();
    }

    fill(255, 60, 0);
    noStroke();
    rect(width - width / 6, 0, width / 6, width / 40, 5);
    fill(255);
    textSize(width / 50);
    fill(255, 255, 0);
    text(localStorage.getItem("username"), width - width / 20, width / 50)
    fill(255, 255, 255);
    text(stopwatchString, width - width / 6 + width / 30, width / 50);
    fill(255, 255, 0);
    text(collectedSyrups, width - width / 6 + width / 100, width / 50);
}

function drawMiniMap() {
    let miniMap = document.getElementById("miniMap"); // canvas

    let miniMapWidth = miniMap.width;
    let miniMapHeight = miniMap.height;

    let miniMapContext = miniMap.getContext("2d");

    miniMapContext.fillStyle = "rgb(63, 65, 63)";
    miniMapContext.fillRect(0, 0, miniMapWidth, miniMapHeight);

    // Calculating the ratio of game board positions to canvas positions
    const ratioX = miniMapWidth / selectedMap[0].length;
    const ratioY = miniMapHeight / selectedMap.length;

    const playerX = floor(player.pos.x / gridSize) * ratioX + ratioX / 2;
    const playerY = floor(player.pos.y / gridSize) * ratioY + ratioY / 2;

    // Draw the player (circle, rgb(255, 112, 0))
    miniMapContext.fillStyle = "rgb(255, 112, 0)";
    miniMapContext.beginPath();
    miniMapContext.arc(playerX, playerY, 5, 0, 2 * Math.PI);
    miniMapContext.fill();

    // Draw maple syrups (square, rgb(255, 255, 0))
    miniMapContext.fillStyle = "rgb(255, 255, 0)";
    for (let i = 0; i < mapleSyrups.length; i++) {
        miniMapContext.fillRect(mapleSyrups[i].x * ratioX, mapleSyrups[i].y * ratioY, ratioX, ratioY);
    }
}

// Function to check if "R" is present in adjacent cells
function getAdjacentMask(map, row, col) {
    let mask = 0b00000000;

    /*
        0 1 2
        3   5
        6 7 8
    */

    const top = 0b000000010;
    const left = 0b000001000;
    const right = 0b000100000;
    const bottom = 0b010000000;

    function getNeighbor(row, col) {
        if (row < 0 || row >= map.length || col < 0 || col >= map[0].length) {
            return 0;
        }

        return map[row][col] == "R" ? 1 : 0;
    }

    if (col >= 0 && col < map[0].length && row >= 0 && row < map.length) {
        // return map[row - 1][col] * top + map[row][col - 1] * left + map[row][col + 1] * right + map[row + 1][col] * bottom;
        return getNeighbor(row - 1, col) * top
            + getNeighbor(row, col - 1) * left
            + getNeighbor(row, col + 1) * right
            + getNeighbor(row + 1, col) * bottom;
    }

    return mask;
}

// Function to place an image at a specified position on the game board
function placeImageAtPos(row, col, img) {
    push();
    translate(row * gridSize - worldPos.x + gridSize / 2, col * gridSize - worldPos.y + gridSize / 2);
    img.resizeNN(gridSize, gridSize);
    image(img, -gridSize / 2, -gridSize / 2, gridSize, gridSize);
    pop();
}

function getImageByNeighbors(map, row, col) {
    const mask = getAdjacentMask(map, row, col);

    if (mask == 0x00000000) {
        return cachedLoadImage("./assets/road/010000010.png");
    }

    return cachedLoadImage("./assets/road/" + mask.toString(2).padStart(9, "0") + ".png");
}

function showMap(map) {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            if (map[row][col]) {
                if (map[row][col] == "W") {
                    fill(151);
                    noStroke();
                    cityImage.resizeNN(gridSize, gridSize);
                    image(cityImage, col * gridSize - worldPos.x, row * gridSize - worldPos.y, gridSize, gridSize);
                } else if (map[row][col] == "G") {
                    fill(0, 177, 0);
                    noStroke();
                    grassImage.resizeNN(gridSize, gridSize);
                    image(grassImage, col * gridSize - worldPos.x, row * gridSize - worldPos.y, gridSize, gridSize);
                } else if (map[row][col] == "R") {
                    const roadImage = getImageByNeighbors(map, row, col);
                    if (roadImage) {
                        placeImageAtPos(col, row, roadImage);
                    }
                }
            }
        }
    }
    // if (optimalPath) {
    //     for (let i = 0; i < optimalPath.length; i++) {
    //         noStroke();
    //         fill(255, 0, 255);
    //         rect(optimalPath[i][0] * gridSize - worldPos.x, optimalPath[i][1] * gridSize - worldPos.y, gridSize, gridSize)
    //     }
    // }
}

class Syrup {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        fill(255, 255, 0);
        push();
        translate(this.x * gridSize - worldPos.x + gridSize / 2, this.y * gridSize - worldPos.y + gridSize / 2);
        image(mapleImage, -gridSize / 4, -gridSize / 4, gridSize / 2, gridSize / 2);
        mapleImage.resizeNN(gridSize / 2, gridSize / 2);
        pop();
    }

    collide() {
        var boardPos = (player.pos.copy()).mult(1 / gridSize);
        if (this.y == floor(boardPos.y) && this.x == floor(boardPos.x)) {
            return true;
        }
        return false;
    }
}

function spawnEntities(level) {
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
function Wander(ai) {
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