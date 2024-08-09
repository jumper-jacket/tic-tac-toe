import readlinePromises from 'readline/promises';

const rlp = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
});


//const userInput = async() => {
//    try{
//        const input = await rlp.question("入力: ");
//        console.log(`入力された内容: ${input}`);
//    } catch (error){
//        console.error(error);
//    } finally {
//        rlp.close();
//    }
//}

type boardState = " " | "O" | "X";

class TicTacToe {
    board: boardState[];
    constructor(){
        this.board = this.boardInit();
    }

    boardInit(): boardState[]{
        return new Array(9).fill(" ");
    }

    display(){
        for(let i=0;i<3;i++){
            console.log(`${this.board[i]}|${this.board[i+1]}|${this.board[i+2]}`);
            if(i<2){
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

    checkColumn(): boolean {
        for(let i=0;i<3;i++){
            if(this.board[i] === this.board[i+3] && this.board[i] === this.board[i+6] && this.board[i]!==' '){
                return true;
            }
        }
        return false;
    }

    checkRow(): boolean {
       for(let i=0;i<3;i+=3){
            if(this.board[i]===this.board[i+1] && this.board[i]===this.board[i+2] && this.board[i]!==' '){
                return true;
            }
       }
        return false;
    }

    checkDiagonal(): boolean {
        if(this.board[0]===this.board[4] && this.board[0]===this.board[8] && this.board[0]!==' '){
            return true;
        }

        if(this.board[2]===this.board[4] && this.board[0]===this.board[6] && this.board[0]!==' '){
            return true;
        }
        return false;
    }
    
}

const ticTacToe = new TicTacToe();
ticTacToe.display();
rlp.close();