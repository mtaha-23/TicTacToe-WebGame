let box = document.querySelectorAll(".btn");
let msg = document.querySelector("#msg");
let resetButton = document.querySelector("#rst-btn");
let turnMsg = document.querySelector("#turnMsg");

let turnX = true;
let boxexFilled = 0;

const winPattern = [
    [0, 1, 2], 
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const disableBoxes = () => {
    for (let b of box) {
      b.disabled = true;
    }
  };
  
const enableBoxes = () => {
    for (let b of box) {
      b.disabled = false;
      b.innerText = "";
    }
    msg.classList.remove("winner", "draw");
  };

const resetGame = () => {
    turnX = true;
    boxexFilled = 0;
    enableBoxes();
    msg.innerText = "";
    turnMsg.innerText = "Turn = X";
  };

const gameDraw = () => {
    msg.innerText = "Game Over: Draw!";
    msg.classList.add("draw");
    disableBoxes();
};

const showWinner = (winner) => {
    msg.innerText = "Congratulations, Winner is " + winner;
    msg.classList.add("winner");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = box[pattern[0]].innerText;
        let pos2Val = box[pattern[1]].innerText;
        let pos3Val = box[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

box.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = "X";
            turnX = false;
            turnMsg.innerText = "Turn = O";
        } else {
            box.innerText = "O";
            turnX = true;
            turnMsg.innerText = "Turn = X";
        }
        box.disabled = true;
        boxexFilled++;

        let isWinner = checkWinner();

        if (boxexFilled === 9 && !isWinner) {
            gameDraw();
        }
    });
});

resetButton.addEventListener("click", resetGame);
