class Bomb {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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