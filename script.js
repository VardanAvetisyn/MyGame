var side = 30;
var sideX = 15;
var sideY = 15;
const socket = io();
var timer = document.getElementById("timer");
let pause = document.getElementById("pause")
console.log(pause);
let isPause = false;
let restart = document.getElementById("restart")
pause.addEventListener("click", () => {
  
    
  isPause= !isPause
    if(isPause){
        console.log('p')
        pause.innerHTML="start";
    }else {
        pause.innerHTML="pause";
    }
    socket.emit("Pause Game",isPause);
})

restart.addEventListener("click",() => {
    timer.innerHTML = 5;
    socket.emit("restart game")
})


function setup() {
    createCanvas(sideX * side, sideY * side);
    background('#acacac');
}



function drawMatrix(matrix) {
    
    for (var y = 0; y < sideY; y++) {
        for (var x = 0; x < sideX; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("Purple");
            } else if (matrix[y][x] == 5) {
                fill("black");
            }

            rect(x * side, y * side, side, side);
        }
    }

}
let id2

if (timer.innerHTML != null || timer.innerHTML == null) {
    id = setInterval(() => {
        if (+timer.innerHTML <= 0) {
            io().emit("id", id);
            timer.innerHTML = 10;
        } else {
            timer.innerHTML = timer.innerHTML - 1;
        }
    }, 1000);
}

id2 = id;




socket.on("update matrix", drawMatrix)
socket.on("apdate statistic", (obj) => {
    document.getElementById("grass").innerText="Number of created grasses: " + obj.grass
    document.getElementById("grassEater").innerText = "Number of created grass eaters: " + obj.GrassEater
    document.getElementById("predator").innerHTML = "Number of created predator: " + obj.Predator;
})