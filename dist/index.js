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
            i < 2 ? console.log(`- - -`) : console.log("");
        }
    }
}
const ticTacToe = new TicTacToe();
ticTacToe.display();
rlp.close();
