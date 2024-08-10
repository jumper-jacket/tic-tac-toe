"use strict";
const cells = document.querySelectorAll('[data-index]');
class TicTacToe {
    board;
    turn = "O";
    constructor() {
        this.board = this.boardInit();
        this.turn = "O";
    }
    boardInit() {
        return new Array(9).fill(" ");
    }
    display() {
        for (let i = 0; i < 9; i += 3) {
            console.log(`${this.board[i]}|${this.board[i + 1]}|${this.board[i + 2]}`);
            if (i < 6) {
                console.log(`- - -`);
            }
        }
    }
    hasWinningLine() {
        if (this.checkColumn()) {
            return true;
        }
        if (this.checkRow()) {
            return true;
        }
        if (this.checkDiagonal()) {
            return true;
        }
        return false;
    }
    checkColumn() {
        for (let i = 0; i < 3; i++) {
            if (this.board[i] === this.board[i + 3] && this.board[i] === this.board[i + 6] && this.board[i] !== ' ') {
                return true;
            }
        }
        return false;
    }
    checkRow() {
        for (let i = 0; i < 9; i += 3) {
            if (this.board[i] === this.board[i + 1] && this.board[i] === this.board[i + 2] && this.board[i] !== ' ') {
                return true;
            }
        }
        return false;
    }
    checkDiagonal() {
        if (this.board[0] === this.board[4] && this.board[0] === this.board[8] && this.board[0] !== ' ') {
            return true;
        }
        if (this.board[2] === this.board[4] && this.board[2] === this.board[6] && this.board[2] !== ' ') {
            return true;
        }
        return false;
    }
    makeMove(index) {
        if (this.isLocationUsed(index)) {
            this.board[index] = this.turn;
            cells[index].textContent = this.turn;
            this.updateTurn();
        }
    }
    isLocationUsed(index) {
        const AlreadyUsedLocation = this.board.map((symbol, index) => {
            if (symbol !== " ") {
                return index;
            }
        });
        if (AlreadyUsedLocation.includes(index)) {
            console.log("既に入力された場所です");
            return false;
        }
        return !AlreadyUsedLocation.includes(index);
    }
    updateTurn() {
        this.turn = this.turn === "O" ? "X" : "O";
    }
    isGameOver() {
        return !this.board.includes(' ');
    }
}
const tictactoe = new TicTacToe;
tictactoe.display();
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');
        tictactoe.makeMove(index ? parseInt(index) : NaN);
        tictactoe.display();
        if (tictactoe.hasWinningLine()) {
            tictactoe.updateTurn();
            console.log(`${tictactoe.turn} の勝ち`);
        }
        if (tictactoe.isGameOver()) {
            console.log("終了");
        }
    });
});
