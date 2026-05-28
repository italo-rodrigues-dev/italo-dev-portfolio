const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

let pointsX = 0;
let pointsO = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(function(cell, index) {
    cell.addEventListener("click", function() {
        playMove(index);
    });
});

function playMove(index) {
    if (board[index] !== "" || gameActive === false) {
        return;
    }

    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    checkResult();

    if (gameActive === true) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = "Player " + currentPlayer + "'s turn";
    }
}

function checkResult() {
    for (let i = 0; i < winningCombinations.length; i++) {
        let a = winningCombinations[i][0];
        let b = winningCombinations[i][1];
        let c = winningCombinations[i][2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            gameActive = false;
            message.textContent = "Player " + currentPlayer + " wins!";

            if (currentPlayer === "X") {
                pointsX++;
                scoreX.textContent = pointsX;
            } else {
                pointsO++;
                scoreO.textContent = pointsO;
            }

            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        message.textContent = "Draw!";
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(function(cell) {
        cell.textContent = "";
    });

    message.textContent = "Player X's turn";
}

restartBtn.addEventListener("click", resetGame);

message.textContent = "Player X's turn";