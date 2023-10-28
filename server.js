const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require("socket.io")(server)
module.exports = io


var sideX = 15;
var sideY = 15;

matrix = [];
grassArr = [];
GrassEaterArr = [];
PredatorArr = [];
PreyArr = [];
BombNew = [];
let Grass = require("./grass");
let GrassEater = require("./grassEater");
let Predator = require("./Predator");
let Prey = require("./prey");
let Bomb = require("./bomb");


app.use(express.static('.'))
app.get("/", function (req, res) {
    res.redirect('index.html')
})


function random(min, max) {
    if (min === undefined && max === undefined) {
        return Math.random();
    } else if (max === undefined) {
        max = min;
        min = 0;
    }
    return Math.random() * (max - min) + min;
}



function character(quantity, char) {
    let initialNumber = 0;
    while (initialNumber < quantity) {
        let x = Math.floor(random(0, sideX));
        let y = Math.floor(random(0, sideY));
        if (matrix[y][x] == 0 || matrix[y][x] == 1) {
            matrix[y][x] = char;
        }
        initialNumber++;
    }
}

for (let i = 0; i < sideY; i++) {
    matrix.push([]);
    for (let j = 0; j < sideX; j++) {
        matrix[i].push(0);
    }
}





function initGame() {
    statisticObj = {
        grass:0,
        GrassEater:0,
        Predator:0
    }
    character(200, 1);
    character(150, 2);
    character(20, 3);
    character(200, 4);
    character(1, 5);
    startInterval();
    initArrays()
}

function initArrays() {
    grassArr = [];
    GrassEaterArr = [];
    PredatorArr = [];
    PreyArr = [];
    BombNew = [];
    for (var y = 0; y < sideY; y++) {
        for (var x = 0; x < sideX; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y, 1);
                grassArr.push(grass);
            } else if (matrix[y][x] == 2) {
                let GrassEaterNew = new GrassEater(x, y, 2);
                GrassEaterArr.push(GrassEaterNew);
            } else if (matrix[y][x] == 3) {
                let PredatorNew = new Predator(x, y, 3);
                PredatorArr.push(PredatorNew);
            } else if (matrix[y][x] == 4) {
                let PreyNew = new Prey(x, y, 4);
                PreyArr.push(PreyNew);
            } else if (matrix[y][x] == 5) {
                BombNew = new Bomb(x, y, 5);
            }
        }
    }
}
let intName
let speed = 300;
function startInterval() {
    clearInterval(intName)
 intName = setInterval(() => {playGame()},speed)
}

    

function playGame() {
    for (let i in grassArr) {
        grassArr[i].mul();
    }
    for (let i in GrassEaterArr) {
        GrassEaterArr[i].eat();
    }
    for (let i in PredatorArr) {
        PredatorArr[i].meat();
        PredatorArr[i].eat();
    }
    for (let i in PreyArr) {
        PreyArr[i].eat();
    }

    io.emit("update matrix", matrix)
        io.on("id",() => {
            if(id == 0){
                return BombNew.eat();
            }
        })
}

io.on("connection", (socket) => {
    
    socket.emit("update matrix", matrix);
    initGame()
    socket.on("Pause Game", (isPause) => {
        if (isPause) {
            clearInterval(intName)
        } else {
            startInterval()
        }

    })
    socket.on("restart game",hendleRastart)
    socket.on("isSpeed",hendleChangeSeason)    
})
function hendleChangeSeason(isSpeed){
    if(isSpeed == 1){
        speed = 1000
    }else if(isSpeed == 2 || isSpeed == 4){
        speed = 700
    }else {
        speed = 300
    }
}

function hendleRastart(){
    initGame()
}
server.listen(3000, () => {
    console.log('server in listening to port 3000');
})