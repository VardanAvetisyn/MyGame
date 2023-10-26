let Creature = require("./creature")
const io = require("./server")
module.exports = class Predator extends Creature{
    constructor(x, y, index) {
        super(x,y,index)
        this.energy = 1;
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
    mul() {
        var newCell = this.selectRandomCell(2);
        if (newCell) {
            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            PredatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 8
            statisticObj.Predator++
            io.emit("apdate statistic",statisticObj)
        }
    }

    meat() {
        let food = this.selectRandomCell(4)
        if (food) {
            this.energy+= 10;
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            matrix[newY][newX] = 3
            this.x = newX
            this.y = newY
            for (var i in PreyArr) {
                if (newX == PreyArr[i].x && newY == PreyArr[i].y) {
                    PreyArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 10) {
                this.mul()
            }
        }
    }

    eat() {
        let array = [1,2];
        let food;
        for(let i = 0; i < array.length; i++){
            food = this.selectRandomCell(array[i])
        }
        if (food) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            matrix[newY][newX] = 3
            this.x = newX
            this.y = newY
            for (var i in GrassEaterArr) {
                if (newX == GrassEaterArr[i].x && newY == GrassEaterArr[i].y) {
                    GrassEaterArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 100) {
                this.mul()
            }
        }
        else {
            this.move()
        }
    }
    move() {
        this.energy--;
        let newCell = this.selectRandomCell(0)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 3
            this.x = newX
            this.y = newY
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in PredatorArr) {
            if (this.x == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                PredatorArr.splice(i, 1);
                break;
            }
        }
    }
}