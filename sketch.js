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
var intersectionImage;
var stopwatchString;
var collectedSyrups = 0;
var currentLevel = 0;
var levels = [];
var mapleImage;
var playerName = localStorage.getItem("username");
function setup() {
    if (localStorage.getItem("username") == "" || localStorage.getItem("username") == undefined || localStorage.getItem("username") == null) {
        window.location.replace("index.html");
    } else {
        console.log(playerName);

        var canvas = createCanvas(floor(window.innerWidth / 2.5), floor((window.innerWidth / 2.5)));
        canvas.id("game");
        gridSize = floor(width / 8);

        joy = " ";

        if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
            console.log("Is Mobile");
            joy = new JoyStick('joyDiv');
            //document.getElementById("joyDiv").hidden = false;
        } else {
            console.log("I Not Mobile");
            //document.getElementById("joyDiv").hidden = true;
        }

        player = new Car();
        player.pos = createVector(gridSize / 2, gridSize / 2);
        player.carAngle = PI;
        // for (let i = 0; i < numEnemy; i++) {
        //     enemy[i] = new Car();
        // }
        //enemy = new Car();
        worldPos = createVector(0, 0);
        levels[0] = {
            "map": [
                ["S", "G", "G", "W", "W", "G", "W", "W", "W", "W", " ", " ", " ", " ", " ", "G"],
                [" ", " ", " ", "M", " ", " ", " ", "G", "W", "G", " ", "W", "W", "G", " ", " "],
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
            ],
            "road": [
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
                ["|", " ", " ", "|", " ", " ", " ", "|", " ", " ", " ", " ", "|", " ", " ", "|"],
                ["|", " ", "┌", "┴", "-", "-", "-", "┤", " ", " ", " ", " ", "|", " ", " ", "|"],
                ["|", " ", "|", " ", " ", " ", " ", "L", "┐", " ", " ", " ", "|", " ", " ", "|"],
                ["L", "-", "┘", " ", " ", " ", " ", " ", "L", "-", "-", "-", "┴", "-", "-", "┘"]
            ],
            "maples": 13,
            "enemies": 0,
            "start": createVector(0, 0),
            "direction": PI
        }

        levels[1] = {
            "map": [
                ["W", " ", " ", " ", " ", " ", "G", "W", "G", " ", " ", "M", " ", " ", "G", "W"],
                [" ", " ", "G", "W", "G", " ", " ", " ", " ", "M", "W", " ", "G", " ", " ", "G"],
                [" ", "G", "G", "G", "W", "W", "W", " ", "G", "G", "W", " ", "W", "W", "M", " "],
                ["M", "W", "W", "G", "W", "W", "W", " ", "G", "W", "W", " ", "W", "W", "W", " "],
                [" ", "W", "W", "G", " ", " ", " ", " ", "W", "W", "W", " ", " ", " ", " ", " "],
                [" ", " ", "W", " ", " ", "W", "W", " ", "G", "W", "W", " ", "G", "W", "W", " "],
                ["G", " ", " ", " ", "G", "W", "W", " ", "G", "G", "G", " ", "W", "W", "W", " "],
                ["W", "W", "W", "M", " ", " ", " ", "S", "W", "W", "G", " ", "G", " ", " ", " "],
                ["W", " ", " ", " ", "G", " ", "W", "W", "W", "G", " ", "M", " ", " ", "W", "G"],
                [" ", " ", "G", " ", "W", " ", " ", " ", " ", " ", " ", "W", "G", " ", " ", " "],
                [" ", "G", "G", " ", "G", "W", "W", " ", "G", "W", " ", "W", "W", "W", "W", " "],
                [" ", "W", "W", " ", " ", "W", "G", " ", "M", "G", " ", "G", "W", "W", "W", " "],
                ["M", "W", "W", "G", " ", " ", " ", "W", " ", "W", " ", " ", " ", " ", " ", " "],
                [" ", "G", "W", "W", " ", "W", " ", " ", " ", " ", " ", "G", " ", "W", "W", " "],
                [" ", " ", " ", "W", " ", "W", "W", "M", "G", " ", " ", " ", " ", "W", "M", " "],
                ["W", "G", " ", "M", " ", "G", "G", " ", "W", "W", "W", "G", " ", " ", " ", "G"]
            ],
            "road": [
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
            ],
            "maples": 11,
            "enemies": 2,
            "start": createVector(7, 7),
            "direction": 0
        }

        levels[2] = {
            "map": [
                ["S", "G", "G", "W", "W", "G", "W", "W", "W", "W", " ", " ", " ", " ", " ", "G"],
                [" ", " ", " ", "M", " ", " ", " ", "G", "W", "G", " ", "W", "W", "G", " ", " "],
                [" ", "W", "W", " ", "W", "W", " ", "M", " ", " ", " ", "W", "W", "G", "G", " "],
                [" ", "W", "W", " ", "W", "W", "W", " ", "W", "W", "G", "G", "W", "G", "W", " "],
                [" ", "W", "W", " ", " ", " ", " ", " ", "W", "W", "W", "G", "G", "G", "G", "M"],
                ["M", "W", " ", " ", "G", "G", "G", " ", " ", " ", " ", "G", "W", "W", "W", " "],
                [" ", " ", " ", "G", "G", "W", "G", "G", "G", "W", " ", " ", " ", " ", " ", " "],
                [" ", "G", " ", "W", "G", "G", "G", "G", "G", "W", " ", "G", "W", "W", "G", "M"],
                [" ", "W", " ", " ", " ", " ", "W", "W", "W", "G", " ", "M", " ", " ", "W", "G"],
                [" ", "W", "G", " ", "W", " ", " ", " ", " ", " ", " ", "W", "G", " ", " ", " "],
                [" ", "G", "G", " ", "G", "W", "W", " ", "G", "W", " ", "W", "W", "W", "W", " "],
                [" ", "W", "W", " ", " ", "W", "G", " ", "M", "G", " ", "G", "W", "W", "W", " "],
                ["M", "W", "W", "G", " ", " ", " ", "W", " ", "W", " ", " ", " ", " ", " ", " "],
                [" ", "G", "W", "W", " ", "W", " ", " ", " ", " ", " ", "G", " ", "W", "W", " "],
                [" ", " ", " ", "W", " ", "W", "W", "M", "G", " ", " ", " ", " ", "W", "M", " "],
                ["W", "G", " ", "M", " ", "G", "G", " ", "W", "W", "W", "G", " ", " ", " ", "G"]
            ],
            "road": [
                ["|", " ", " ", " ", " ", " ", " ", " ", " ", " ", "┌", "-", "-", "-", "┐", " "],
                ["├", "-", "-", "T", "-", "-", "┐", " ", " ", " ", "|", " ", " ", " ", "L", "┐"],
                ["|", " ", " ", "|", " ", " ", "L", "T", "-", "-", "┘", " ", " ", " ", " ", "|"],
                ["|", " ", " ", "|", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", " ", "|"],
                ["|", " ", " ", "├", "-", "-", "-", "┤", " ", " ", " ", " ", " ", " ", " ", "|"],
                ["|", " ", "┌", "┘", " ", " ", " ", "L", "-", "-", "┐", " ", " ", " ", " ", "|"],
                ["├", "-", "┤", " ", " ", " ", " ", " ", " ", " ", "├", "-", "-", "-", "-", "┤"],
                ["|", " ", "|", " ", " ", " ", " ", " ", " ", " ", "|", " ", " ", " ", " ", "|"],
                ["|", " ", "L", "T", "-", "┐", " ", " ", " ", " ", "├", "-", "-", "┐", " ", " "],
                ["|", " ", " ", "|", " ", "L", "-", "T", "-", "-", "┤", " ", " ", "L", "-", "┐"],
                ["|", " ", " ", "|", " ", " ", " ", "|", " ", " ", "|", " ", " ", " ", " ", "|"],
                ["|", " ", " ", "L", "┐", " ", " ", "L", "┐", " ", "|", " ", " ", " ", " ", "|"],
                ["|", " ", " ", " ", "├", "-", "┐", " ", "|", " ", "├", "-", "T", "-", "-", "┤"],
                ["|", " ", " ", " ", "|", " ", "L", "T", "┴", "T", "┤", " ", "|", " ", " ", "|"],
                ["L", "-", "┐", " ", "|", " ", " ", "|", " ", "L", "┴", "-", "┤", " ", "┌", "┘"],
                [" ", " ", "L", "-", "┘", " ", " ", "|", " ", " ", " ", " ", "L", "-", "┘", " "]
            ],
            "maples": 11,
            "enemies": 4,
            "start": createVector(0, 0),
            "direction": PI
        };

        levels[3] = {
            "map": [
                ["W", "S", " ", " ", " ", " ", "G", "M", " ", " ", " ", "M", " ", " ", " ", " "],
                ["W", " ", "W", "G", "W", " ", " ", " ", "W", " ", "W", "W", "W", " ", "W", " "],
                ["W", " ", " ", "M", "W", " ", "W", " ", "W", "M", " ", " ", " ", " ", "W", " "],
                ["W", " ", "W", "W", "W", " ", "W", " ", "W", "W", "W", " ", "W", " ", "W", " "],
                ["W", " ", " ", " ", " ", " ", " ", "M", " ", " ", " ", " ", "W", " ", " ", "M"],
                ["W", "G", "W", " ", "W", "W", "W", " ", "W", " ", "W", "W", "W", "W", "W", " "],
                ["W", " ", " ", "M", " ", " ", " ", " ", "W", "M", " ", " ", " ", " ", "W", " "],
                ["W", " ", "W", " ", "W", " ", "W", " ", "W", "W", "W", " ", "W", " ", "W", " "],
                ["W", " ", "W", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W", " ", " ", "M"],
                ["W", " ", "W", "W", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", "W"],
                ["G", " ", " ", " ", " ", "M", "W", " ", " ", "M", " ", " ", " ", " ", " ", " "],
                ["G", " ", "W", " ", "W", "W", "W", " ", "W", " ", "W", " ", "G", "W", "G", " "],
                ["G", "M", "W", " ", "W", " ", " ", " ", "W", " ", " ", " ", "W", "W", "W", " "],
                ["W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "W", " ", "G", "W", "G", " "],
                ["W", " ", " ", " ", " ", " ", "W", "M", " ", " ", "W", "M", " ", " ", " ", "M"],
                ["W", "W", "W", "W", "W", "G", "G", "G", "W", "G", "G", "G", "W", "W", "W", "W"]
            ],
            "road": [
                [" ", "┌", "-", "-", "-", "┐", " ", "┌", "-", "T", "-", "-", "-", "T", "-", "┐"],
                [" ", "|", " ", " ", " ", "├", "-", "┤", " ", "|", " ", " ", " ", "|", " ", "|"],
                [" ", "├", "-", "-", " ", "|", " ", "|", " ", "L", "-", "T", "-", "┤", " ", "|"],
                [" ", "|", " ", " ", " ", "|", " ", "|", " ", " ", " ", "|", " ", "|", " ", "|"],
                [" ", "L", "-", "T", "-", "┴", "-", "+", "-", "T", "-", "┘", " ", "L", "-", "┤"],
                [" ", " ", " ", "|", " ", " ", " ", "|", " ", "|", " ", " ", " ", " ", " ", "|"],
                [" ", "┌", "-", "+", "-", "T", "-", "┤", " ", "L", "-", "T", "-", "┐", " ", "|"],
                [" ", "|", " ", "|", " ", "|", " ", "|", " ", " ", " ", "|", " ", "|", " ", "|"],
                [" ", "|", " ", "L", "-", "+", "-", "+", "-", "T", "-", "┤", " ", "├", "-", "┘"],
                [" ", "|", " ", " ", " ", "|", " ", "|", " ", "|", " ", "|", " ", "|", " ", " "],
                [" ", "├", "-", "T", "-", "┘", " ", "├", "-", "+", "-", "+", "-", "┴", "-", "┐"],
                [" ", "|", " ", "|", " ", " ", " ", "|", " ", "|", " ", "|", " ", " ", " ", "|"],
                [" ", "|", " ", "|", " ", "┌", "-", "┤", " ", "├", "-", "┤", " ", " ", " ", "|"],
                [" ", "|", " ", "|", " ", "|", " ", "|", " ", "|", " ", "|", " ", " ", " ", "|"],
                [" ", "L", "-", "┴", "-", "┘", " ", "L", "-", "┘", " ", "L", "-", "-", "-", "┘"],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
            ],
            "maples": 15,
            "enemies": 5,
            "start": createVector(1, 0),
            "direction": PI
        }


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

        if (playerName.toLowerCase() == "uwu") {
            UWUmode();
        }

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
        cityImage = loadImage("./assets/cityBW.png");
        mapleImage = loadImage("./assets/maple.png");
        intersectionImage = loadImage("./assets/4way.png");
        spawnSyrups(levels[0].map, 0);
        let miniMap = document.getElementById("miniMap");
        for (let i = 0; i < 13; i++) {
            let syrup = document.createElement("div");
            syrup.style = `width: 6.25%; height: 6.25%; position: absolute; left:` + (mapleSyrups[i].x * 6.25) + `%; top:` + (mapleSyrups[i].y * 6.25) + `%; background-color: rgb(255, 255, 0);`;
            syrup.id = mapleSyrups[i].x + "-" + mapleSyrups[i].y;
            miniMap.append(syrup);
        }
        selectedMap = levels[0].map;
        selectedRoad = levels[0].road;
        startStopwatch();
    }
}

function mousePressed() {
    //nextLevel();
}
//yay
function keyPressed() {
    if (key == "m") {
        document.getElementById("miniMapDiv").hidden = !document.getElementById("miniMapDiv").hidden;
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
    for (let i = 0; i < mapleSyrups.length; i++) {
        document.getElementById(mapleSyrups[i].x + "-" + mapleSyrups[i].y).remove();
    }
    collectedSyrups = 0;
    for (let i = currentLevel - 1; i >= 0; i--) {
        collectedSyrups += levels[i].maples;
    }
    mapleSyrups = [];
    player.pos = createVector(levels[currentLevel].start.x * gridSize + gridSize / 2, levels[currentLevel].start.y * gridSize + gridSize / 2);
    player.carAngle = levels[currentLevel].direction;
    player.health = 1;
    spawnSyrups(selectedMap, levels[currentLevel].enemies);
    for (let i = 0; i < levels[currentLevel].maples; i++) {
        let syrup = document.createElement("div");
        syrup.style = `width:` + (window.innerWidth * .15 * .0625) + `px; height:` + (window.innerWidth * .15 * .0625) + `px; position: absolute; left:` + (mapleSyrups[i].x * window.innerWidth * .15 * .0625) + `px; top:` + (mapleSyrups[i].y * window.innerWidth * .15 * .0625) + `px; background-color: rgb(255, 255, 0);`;
        syrup.id = mapleSyrups[i].x + "-" + mapleSyrups[i].y;
        miniMap.append(syrup);
    }
}
function restartCurrentLevel() {
    currentLevel--;
    nextLevel();
}
function draw() {
    // if (!stopwatchString) {
    //     startStopwatch();
    // }
    background(255);
    showRoad(selectedRoad);
    showMap(selectedMap);
    player.move(null, null, true, joy);
    player.show(carImage, true);
    for (let i = 0; i < enemy.length; i++) {
        enemy[i].show(enemyImage);
        Wander(enemy[i]);
        if (enemy[i].collideOtherCar(player)) {
            // location.reload();
            restartCurrentLevel();
            console.log("collideWithPlayer");
            //clearInterval(stopwatchInterval);
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
        nextLevel();
    }
    fill(255, 60, 0);
    noStroke();
    rect(width - width/6, 0, width/6, width/40, 5);
    fill(255);
    textSize(width/50);
    fill(255, 255, 0);
    text(localStorage.getItem("username"), width - width/20, width/50)
    fill(255, 255, 255);
    text(stopwatchString, width - width/6+width/30, width/50);
    fill(255, 255, 0);
    text(collectedSyrups, width-width/6+width/100, width/50);
}
function showMap(theMap) {
    for (let i = 0; i < theMap.length; i++) {
        for (let j = 0; j < theMap[0].length; j++) {
            if (theMap[i][j]) {
                if (theMap[i][j] == "W") {
                    fill(151);
                    noStroke();
                    image(cityImage, j * gridSize - worldPos.x, i * gridSize - worldPos.y, gridSize, gridSize);
                    cityImage.resizeNN(gridSize, gridSize);
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
                } else if (theRoad[i][j] == "+") {
                    push();
                    translate(j * gridSize - worldPos.x + gridSize / 2, i * gridSize - worldPos.y + gridSize / 2);
                    image(intersectionImage, -gridSize / 2, -gridSize / 2, gridSize, gridSize);
                    //image(straigtRoadImage, 0,0);
                    intersectionImage.resizeNN(gridSize, gridSize);
                    pop();
                }
            }
        }
    }
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

function spawnSyrups(theMap, numEnemy) {
    let enemiesSpot = [];
    for (let i = 0; i < theMap.length; i++) {
        for (let j = 0; j < theMap[0].length; j++) {
            if (theMap[i][j]) {
                if (theMap[i][j] == "M") {
                    mapleSyrups.push(new Syrup(j, i));
                    enemiesSpot.push(createVector(j, i));
                }
            }
        }
    }
    for (let i = 0; i < numEnemy; i++) {
        enemy[i] = new Car();
        let randomPos = enemiesSpot[floor(random(enemiesSpot.length))];
        enemy[i].pos = createVector(randomPos.x * gridSize + gridSize / 2, randomPos.y * gridSize + gridSize / 2);
    }
}
//Switches Player Sprite To UWU
function UWUmode() {
    carImage = loadImage("./assets/player_UWU.png");
}

//AI
function Wander(ai) {
    var aiPos = (ai.pos.copy()).mult(1 / gridSize);
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
        var avaibleDirections = [];
        if (selectedMap[floor(aiPos.y)][floor(aiPos.x - 1)] == " " || selectedMap[floor(aiPos.y)][floor(aiPos.x - 1)] == "G" || selectedMap[floor(aiPos.y)][floor(aiPos.x - 1)] == "M") {
            avaibleDirections.push("left");
            // ai.move(createVector(0, -2), -PI / 2, false);
        }
        if (selectedMap[floor(aiPos.y)][floor(aiPos.x + 1)] == " " || selectedMap[floor(aiPos.y)][floor(aiPos.x + 1)] == "G" || selectedMap[floor(aiPos.y)][floor(aiPos.x + 1)] == "M") {
            avaibleDirections.push("right");
            // ai.move(createVector(0, -2), -PI / 2, false);
        }
        if (withInBounds(floor(aiPos.y - 1), floor(aiPos.x))) {
            if (selectedMap[floor(aiPos.y - 1)][floor(aiPos.x)] == " " || selectedMap[floor(aiPos.y - 1)][floor(aiPos.x)] == "G" || selectedMap[floor(aiPos.y - 1)][floor(aiPos.x)] == "M") {
                avaibleDirections.push("top");
                // ai.move(createVector(0, -2), -PI / 2, false);
            }
        }
        if (withInBounds(floor(aiPos.y + 1), floor(aiPos.x))) {
            if (selectedMap[floor(aiPos.y + 1)][floor(aiPos.x)] == " " || selectedMap[floor(aiPos.y + 1)][floor(aiPos.x)] == "G" || selectedMap[floor(aiPos.y + 1)][floor(aiPos.x)] == "M") {
                avaibleDirections.push("bottom");
            }
        }
        if (avaibleDirections.length > 1) {
            for (let i = 0; i < avaibleDirections.length; i++) {
                if (ai.aiMovingDirection == "left") {
                    if (avaibleDirections[i] == "right")
                        avaibleDirections.splice(i, 1);
                }
                if (ai.aiMovingDirection == "right") {
                    if (avaibleDirections[i] == "left")
                        avaibleDirections.splice(i, 1);
                }
                if (ai.aiMovingDirection == "top") {
                    if (avaibleDirections[i] == "bottom")
                        avaibleDirections.splice(i, 1);
                }
                if (ai.aiMovingDirection == "bottom") {
                    if (avaibleDirections[i] == "top")
                        avaibleDirections.splice(i, 1);
                }
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
