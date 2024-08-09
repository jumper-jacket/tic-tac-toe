"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("readline/promises"));
const rlp = promises_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
class TicTacToe {
    constructor() {
        this.board = this.boardInit();
    }
    boardInit() {
        return new Array(9).fill(" ");
    }
    display() {
        for (let i = 0; i < 3; i++) {
            console.log(`${this.board[i]}|${this.board[i + 1]}|${this.board[i + 2]}`);
            if (i < 2) {
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
        for (let i = 0; i < 3; i += 3) {
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
        if (this.board[2] === this.board[4] && this.board[0] === this.board[6] && this.board[0] !== ' ') {
            return true;
        }
        return false;
    }
}
const ticTacToe = new TicTacToe();
ticTacToe.display();
rlp.close();
