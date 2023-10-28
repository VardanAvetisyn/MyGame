let Creature = require("./creature")

module.exports = class Prey extends Creature{
    constructor(x, y, index) {
        super(x,y,index)
        this.energy = 8;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    eat() {
        let food = this.selectRandomCell(0)
        if (food) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            matrix[newY][newX] = 4
            this.x = newX
            this.y = newY
        }
    }
    move() {
        this.energy--;
        let newCell = this.selectRandomCell(0)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 4
            this.x = newX
            this.y = newY
        }
        if (this.energy <= 0) {
            this.die()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in PreyArr) {
            if (this.x == PreyArr[i].x && this.y == PreyArr[i].y) {
                PreyArr.splice(i, 1);
                break;
            }
        }
    }
}