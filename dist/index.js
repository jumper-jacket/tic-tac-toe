"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicTacToe = void 0;
const promises_1 = __importDefault(require("readline/promises"));
const rlp = promises_1.default.createInterface({
    input: process.stdin,
});
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
    async makeMove() {
        let input = NaN;
        while (Number.isNaN(input) || this.isLocationUsed(input)) {
            input = parseInt(await rlp.question(`${this.turn}の番`));
            if (input < 0 || input > 8) {
                console.log("index : 0~8");
                input = NaN;
            }
        }
        this.board[input] = this.turn;
        this.updateTurn();
    }
    isLocationUsed(input) {
        const AlreadyUsedLocation = this.board.map((symbol, index) => {
            if (symbol !== " ") {
                return index;
            }
        });
        if (AlreadyUsedLocation.includes(input)) {
            console.log("既に入力された場所です");
        }
        return AlreadyUsedLocation.includes(input);
    }
    updateTurn() {
        this.turn = this.turn === "O" ? "X" : "O";
    }
}
exports.TicTacToe = TicTacToe;
class Game {
    tictactoe;
    isGameOver;
    constructor() {
        this.tictactoe = new TicTacToe();
        this.isGameOver = false;
    }
    async start() {
        console.log("game start");
        this.tictactoe.display();
        console.log("");
        while (!this.isGameOver) {
            await this.tictactoe.makeMove();
            if (this.tictactoe.hasWinningLine()) {
                this.isGameOver = true;
                this.tictactoe.display();
            }
            console.clear();
            this.tictactoe.display();
        }
        rlp.close();
    }
}
const game = new Game;
game.start();
