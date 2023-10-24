let Creature = require("./creature")
const io = require("./server")
module.exports = class GrassEater extends Creature{
    constructor(x, y, index) {
        super(x,y,index)
        this.energy = 20;
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
        return super.chooseCell(character);;
    }
    mul() {
        var newCell = this.selectRandomCell(1);
        if (newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            GrassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8
            statisticObj.GrassEater++
            io.emit("apdate statistic",statisticObj)
        }
    }

    eat() {
        // let foods = this.chooseCell(1)
        let food = this.selectRandomCell(1)
        if (food) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            matrix[newY][newX] = 2
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 5) {
                this.mul()
            }
        }
        else {
            this.move()
        }
    }
    move() {
        this.energy--;
        // let emptyCells = this.chooseCell(0)
        let newCell = this.selectRandomCell(0)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 2
            this.x = newX
            this.y = newY
        }
        if (this.energy <= 0) {
            this.die()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in GrassEaterArr) {
            if (this.x == GrassEaterArr[i].x && this.y == GrassEaterArr[i].y) {
                GrassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}