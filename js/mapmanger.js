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