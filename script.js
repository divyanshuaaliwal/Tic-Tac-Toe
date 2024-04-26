
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = 
[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


//let's create a function to initialise the game
function initGame() 
{
    currentPlayer = "X" ;
    gameGrid = ["","","","","","","","",""];

    //UI pr empty bhi karna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "" ;
        boxes[index].style.pointerEvents = "all";
        // one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    });

    newGameBtn.classList.remove("active");// line num 25
    gameInfo.innerText = `Current Player - ${currentPlayer}` ;
}

initGame(); // call the function

// forEach(currentValue, index, arr),
boxes.forEach( (box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

function handleClick(index) {
    if( gameGrid[index] === "") {
        boxes[index].innerHTML = currentPlayer ;
        gameGrid[index] = currentPlayer ;
        boxes[index].style.pointerEvents = "all";
        swapTurn();
        checkGameOver();   
    }
}


// gameGrid = ["","","","","","","","",""];
// const winningPosition = [  [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];
function checkGameOver() {
    let winner = "" ;

    winningPosition.forEach( (element) => {
        if( (gameGrid[element[0]] !== "" )  && ( (gameGrid[element[0]] === gameGrid[element[1]] )  && (gameGrid[element[1]] === gameGrid[element[2]]) ) )
        {
            // winner mil gya
            winner = gameGrid[element[0]] ;

            // now we know X/O is a winner
            boxes[element[0]].classList.add("win");
            boxes[element[1]].classList.add("win");
            boxes[element[2]].classList.add("win");

            // disable pointer events
            boxes.forEach( (box) => {
                box.style.pointerEvents = "none";           
            });
           
            gameInfo.innerText = `Winner Player - ${winner}`;
            newGameBtn.classList.add("active");
            return ;
        }
    });

    // winner nhi mila
   
    if( winner === "")
    {
        let count = 0;
        gameGrid.forEach( (box) => {
            if(box !== "" )
                count++;
        });

        if(count === 9) {
            // all box marked and winner nahi mila
            gameInfo.innerText = "Game Tied !";
            newGameBtn.classList.add("active");
        }
    }

}

function swapTurn()
{
    currentPlayer = currentPlayer == "X" ? "O" : "X" ;
    // UI Update :
    gameInfo.innerText = `Current Player - ${currentPlayer}` ; 
}

newGameBtn.addEventListener("click", initGame);