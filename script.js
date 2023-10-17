var side = 30;
var sideX = 15;
var sideY = 15;


function setup() {
    createCanvas(sideX * side, sideY * side);
    background('#acacac');
}

function draw(matrix) {
    
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

// let id = setInterval(() => {
//     if (+timer.innerHTML <= 1) {
//         clearInterval(id2);
//         if(BombNew.eat() == true){
//             timer.innerHTML = 0;
//         }
//     }
//     timer.innerHTML = timer.innerHTML - 1;
// }, 1000);

// id2 = id;

io().on("update matrix",draw)
