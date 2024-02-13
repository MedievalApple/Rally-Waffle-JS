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