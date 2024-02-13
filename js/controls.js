function keyPressed() {
    if (key == "m") {
        document.getElementById("miniMap").hidden = !document.getElementById("miniMap").hidden;
    }
    if (key == "r" && gameOver) {
        gameOver = false;
        totalTime = elapsedTime;
        startStopwatch();
        restartCurrentLevel();
    }
    if (key == "r" && gameWon) {
        gameWon = false;
        currentLevel = -1;
        totalTime = 0;
        startStopwatch();
        nextLevel();
    }
}