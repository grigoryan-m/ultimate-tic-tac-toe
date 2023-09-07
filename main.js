"use strict";

let boards = [
    [1,2,3,4,5,6,7,8,9], // Main
    ['.','.','.','.','.','.','.','.','.'], // Board1
    ['.','.','.','.','.','.','.','.','.'], // Board2
    ['.','.','.','.','.','.','.','.','.'], // Board3
    ['.','.','.','.','.','.','.','.','.'], // Board4
    ['.','.','.','.','.','.','.','.','.'], // Board5
    ['.','.','.','.','.','.','.','.','.'], // Board6
    ['.','.','.','.','.','.','.','.','.'], // Board7
    ['.','.','.','.','.','.','.','.','.'], // Board8
    ['.','.','.','.','.','.','.','.','.'], // Board9
]
let currentBoard, boardId, buttons, globalTurn, localTurn, domGlobalTurn, domLocalTurn;

document.addEventListener("DOMContentLoaded",()=>{
    currentBoard = "Main"
    ,boardId = document.getElementById("boardId")
    ,buttons = document.getElementsByClassName("cell")
    ,domGlobalTurn = document.getElementById("globalTurn")
    ,domLocalTurn = document.getElementById("localTurn")
    ,globalTurn = 'X'
    ,localTurn = 'X';

    checkBoards();
});

function updateBoard(cellID){
    if(currentBoard === "Main"){
        // You can switch boards, if current board is main
        currentBoard = cellID;
        boardId.innerText = "Board: " + currentBoard;
    }else{
        boards[currentBoard][cellID-1] = localTurn;
        localTurn = localTurn == 'X' ? 'O' : 'X';
        domLocalTurn.innerText = `Local turn: ${localTurn}  `;
        for(let i = 0; i < boards[currentBoard].length; i++){
            if(boards[currentBoard][i] === '.'){
                buttons[i].disabled = false;
            }else{
                buttons[i].disabled = true;
            }
        }
        let result = isGameFinished(currentBoard);
        if(result != null){
            if(result != 'Tie'){
                boards[0][currentBoard-1] = result;
            }else{
                boards[0][currentBoard-1] = globalTurn;
            }
            currentBoard = "Main";
            globalTurn = globalTurn === 'X' ? 'O' : 'X';
            domGlobalTurn.innerText = `Global turn: ${globalTurn}`;
        }
    }
    checkBoards(currentBoard);
}

function checkBoards(boardName){
    if(currentBoard === "Main"){
        for(let i = 0; i < buttons.length; i++){
            buttons[i].innerText = boards[0][i];
            if(buttons[i].innerText != 'X' && buttons[i].innerText != 'O'){
                buttons[i].disabled = false;
            }else{
                buttons[i].disabled = true;
            }
        }
        if(isGameFinished(0) != null){
            if(isGameFinished(0) != "Tie"){
                alert(`Player ${isGameFinished(0)} won!`);
            }else{
                alert("Tie game!");
            }
        }
    }else{
        for(let i = 0; i < buttons.length; i++){
            buttons[i].innerText = boards[boardName][i];
            if(buttons[i].innerText === '.'){
                buttons[i].disabled = false;
            }else{
                buttons[i].disabled = true;
            }
        }
    }
}

function isGameFinished(boardName) {
    const board = boards[boardName];
    
    // Check for horizontal, vertical, and diagonal wins
    for (let i = 0; i < 3; i++) {
        // Check rows and columns
        if (
            (board[i] === 'X' && board[i + 3] === 'X' && board[i + 6] === 'X') || // Vertical win
            (board[i * 3] === 'X' && board[i * 3 + 1] === 'X' && board[i * 3 + 2] === 'X') // Horizontal win
        ) {
            return 'X'; // Player X wins
        }
        if (
            (board[i] === 'O' && board[i + 3] === 'O' && board[i + 6] === 'O') || // Vertical win
            (board[i * 3] === 'O' && board[i * 3 + 1] === 'O' && board[i * 3 + 2] === 'O') // Horizontal win
        ) {
            return 'O'; // Player O wins
        }
    }

    // Check diagonals
    if (
        (board[0] === 'X' && board[4] === 'X' && board[8] === 'X') || // Diagonal win (top-left to bottom-right)
        (board[2] === 'X' && board[4] === 'X' && board[6] === 'X')
    ) {
        return 'X'; // Player X wins
    }
    if (
        (board[0] === 'O' && board[4] === 'O' && board[8] === 'O') || // Diagonal win (top-left to bottom-right)
        (board[2] === 'O' && board[4] === 'O' && board[6] === 'O')
    ) {
        return 'O'; // Player O wins
    }

    // Check for a tie
    if (!board.includes('.') && !board.some(cell => Number.isInteger(cell))) {
        return 'Tie'; // It's a tie
    }

    // Game is not finished
    return null;
}