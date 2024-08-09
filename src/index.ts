import readlinePromises from 'readline/promises';

const rlp = readlinePromises.createInterface({
    input: process.stdin,
});



type boardState = " " | "O" | "X";
type TurnState = "O" | "X";

export class TicTacToe {
    board: boardState[];
    turn: TurnState = "O";
    constructor(){
        this.board = this.boardInit();
        this.turn = "O";
    }

    private boardInit(): boardState[]{
        return new Array(9).fill(" ");
    }

    display(){
        for(let i=0;i<9;i+=3){
            console.log(`${this.board[i]}|${this.board[i+1]}|${this.board[i+2]}`);
            if(i<6){
                console.log(`- - -`)
            }
        }
    }

    hasWinningLine():boolean {
        if(this.checkColumn()){
            return true;
        }

        if(this.checkRow()){
            return true;
        }

        if(this.checkDiagonal()){
            return true;
        }

        return false;
    }

    private checkColumn(): boolean {
        for(let i=0;i<3;i++){
            if(this.board[i] === this.board[i+3] && this.board[i] === this.board[i+6] && this.board[i]!==' '){
                return true;
            }
        }
        return false;
    }

    private checkRow(): boolean {
       for(let i=0;i<9;i+=3){
            if(this.board[i]===this.board[i+1] && this.board[i]===this.board[i+2] && this.board[i]!==' '){
                return true;
            }
       }
        return false;
    }

    private checkDiagonal(): boolean {
        if(this.board[0]===this.board[4] && this.board[0]===this.board[8] && this.board[0]!==' '){
            return true;
        }

        if(this.board[2]===this.board[4] && this.board[2]===this.board[6] && this.board[2]!==' '){
            return true;
        }
        return false;
    }
    
    async makeMove(){
        let input: number = NaN;
        while(Number.isNaN(input)|| this.isLocationUsed(input)){
            input = parseInt(await rlp.question(`${this.turn}の番`));
            if(input<0 || input>8){
                console.log("index : 0~8");
                input = NaN;
            }
        }
        this.board[input] = this.turn;
        this.updateTurn();
    }
    
    private isLocationUsed(input: number): boolean{
        const AlreadyUsedLocation = this.board.map((symbol,index) =>{
            if(symbol!==" "){
                return index;
            }
        });
        if(AlreadyUsedLocation.includes(input)){
            console.log("既に入力された場所です");
        }
        return AlreadyUsedLocation.includes(input);
    }

    private updateTurn(){
        this.turn = this.turn === "O" ? "X" : "O";
    }

}


class Game {
    private tictactoe: TicTacToe;
    private isGameOver: boolean;

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
            if(this.tictactoe.hasWinningLine()){
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
