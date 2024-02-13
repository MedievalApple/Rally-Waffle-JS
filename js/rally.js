var player;
var enemy = [];
var mapleSyrups = [];
var gridSize;
var carImage;
var cityImage;
var enemyImage;
var grassImage;
var mapleImage;
var selectedMap;
var selectedRoad;
var worldPos;
var stopwatchString;
var collectedSyrups = 0;
var currentLevel = 0;
var levels = [];
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
    levels = getMaps()

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

        spawnEnemys(levels[0]);
        selectedMap = levels[0].map;
        selectedRoad = levels[0].road;
        startStopwatch();
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
    spawnEnemys(levels[currentLevel]);
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
            wanderAI(enemy[i]);
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