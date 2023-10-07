class Bomb extends Creature{
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
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 0
                for (var i in grassArr) {
                    if (x == grassArr[i].x && y == grassArr[i].y) {
                        grassArr.splice(i, );
                        break;
                    }
                }
                for (var i in GrassEaterArr) {
                    if (x == GrassEaterArr[i].x && y == GrassEaterArr[i].y) {
                        GrassEaterArr.splice(i, );
                        break;
                    }
                }
                for (var i in PredatorArr) {
                    if (x == PredatorArr[i].x && y == PredatorArr[i].y) {
                        PredatorArr.splice(i, );
                        break;
                    }
                }
                for (var i in PreyArr) {
                    if (x == PreyArr[i].x && y == PreyArr[i].y) {
                        PreyArr.splice(i, );
                        break;
                    }
                }
            }
        }
    }
}