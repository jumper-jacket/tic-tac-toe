const cells: NodeListOf<HTMLDivElement> = document.querySelectorAll('[data-index]');
const reset = document.querySelector('#btn') as HTMLElement;

type boardState = " " | "O" | "X";
type TurnState = "O" | "X";

class TicTacToe {
    board: boardState[] = new Array(9).fill(" ");
    turn: TurnState = "O";
    constructor(){
        this.turn = "O";
    }

    boardReset(): void{
        this.board.fill(" ");
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
    
    makeMove(index: number){
        if(this.isLocationUsed(index)){
            this.board[index] = this.turn;
            cells[index].textContent = this.turn;
            this.updateTurn();
        }
    }
    
    private isLocationUsed(index: number): boolean{
        const AlreadyUsedLocation = this.board.map((symbol,index) => {
            if(symbol!==" "){
                return index;
            }
        });
        if(AlreadyUsedLocation.includes(index)){
            console.log("既に入力された場所です");
            return false;
        }
        return !AlreadyUsedLocation.includes(index);
    }

    updateTurn(){
        this.turn = this.turn === "O" ? "X" : "O";
    }

    isGameOver(): boolean{
        return !this.board.includes(' ');
    }

}


const tictactoe = new TicTacToe;
tictactoe.display();

cells.forEach(cell =>{
    cell.addEventListener('click', ()=> {
        const index: string | null  = cell.getAttribute('data-index');
        tictactoe.makeMove(index? parseInt(index): NaN);
        tictactoe.display();
        if(tictactoe.hasWinningLine()){
            tictactoe.updateTurn();
            console.log(`${tictactoe.turn} の勝ち`);
        }
        if(tictactoe.isGameOver()){
            console.log("終了");
        }
    });
});

reset.addEventListener('click', ()=> {
    tictactoe.boardReset();
    cells.forEach(cell =>  cell.textContent=' ');
});