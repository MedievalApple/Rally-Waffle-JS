class Syrup {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        fill(255, 255, 0);
        push();
        translate(this.x * gridSize - worldPos.x + gridSize / 2, this.y * gridSize - worldPos.y + gridSize / 2);
        mapleImage.resizeNN(gridSize, gridSize);
        image(mapleImage, -gridSize / 4, -gridSize / 4, gridSize / 2, gridSize / 2);
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
