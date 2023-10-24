let Creature = require("./creature")
const io = require("./server")

module.exports = class Grass extends Creature{
     mul() {
        this.multiply++;
        var newCell = this.selectRandomCell(0);
        if (this.multiply >= 3 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;  
            statisticObj.grass++
            io.emit("apdate statistic",statisticObj)
        }
    }
    
}