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

        return false;
    }

    checkColumn(symbol: boardState, index: number): boolean {
        if(symbol === this.board[index+3] && symbol === this.board[index+6]){
            return true;
        }
        return false;
    }

    checkRow(symbol: boardState, index: number): boolean {

    }
    
}

const ticTacToe = new TicTacToe();
ticTacToe.display();
rlp.close();