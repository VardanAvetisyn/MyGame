var timer = document.getElementById("timer");
var audio = document.getElementById("audio")
var matrix = [];
var side = 30;
var n = 15;
var m = 15;

for (let i = 0; i <n; i++) {
matrix.push([])
for (let j = 0; j < m; j++) {
matrix[i].push(0)
}
}

function characters(index,count) {
for (let a = 0; a < count; a++) {
var v = Math.floor(random(0,n))
var w = Math.floor(random(0,m))
matrix[v][w] = index
}
}
var grassArr = [];
var GrassEaterArr = [];
var PredatorArr = [];
var PreyArr = [];
var BombNew  = []

function setup() {
    characters(1,200)
    characters(2,150)
    characters(3,20)
    characters(4,200)
    characters(5,1)
    frameRate(10);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y, 1)
                grassArr.push(grass)
            }
            else if (matrix[y][x] == 2) {
                let GrassEaterNew = new GrassEater(x, y, 2)
                GrassEaterArr.push(GrassEaterNew)
            }
            else if (matrix[y][x] == 3) {
                let PredatorNew = new Predator(x, y, 3)
                PredatorArr.push(PredatorNew)
            }
            else if (matrix[y][x]== 4) {
                let PreyNew = new Prey(x, y, 4)
                PreyArr.push(PreyNew)
            }else if (matrix[y][x]== 5) {
                BombNew = new Bomb(x, y, 5)
            }
        }
    }
}


function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("Purple")
            }else if(matrix[y][x] == 5){
                fill("black")
            }

            rect(x * side, y * side, side, side);

        }

    }
    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in GrassEaterArr) {
        GrassEaterArr[i].eat()
    }
    for (let i in PredatorArr) {
        PredatorArr[i].meat()
        PredatorArr[i].eat()
    }
    for (let i in PreyArr) {
        PreyArr[i].eat()
    }
    setInterval( ()=> {
            BombNew.eat()  
    }, 30000);
    
}
let id = setInterval(() => {
    if(+timer.innerHTML <= 0){
        audio.play();
        clearInterval(id2)
        timer.innerHTML = 0
    }
    timer.innerHTML = timer.innerHTML - 1;
},1000)