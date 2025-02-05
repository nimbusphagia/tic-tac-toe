//BOARD
function Gameboard(){
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(0);
        }
        }

    const getBoard = () => board;
    const makeMove = (player, row, square) => board[--row][--square] = player.token; 

    return {getBoard, makeMove};
}

function GameController(playerOne = "Player One", playerTwo = "Player Two"){
    const board = Gameboard();
    const players = [{name: "Player1", token: 1}, {name: "Player 2", token: 2}];
    let activePlayer = players[0];

    const switchPlayerTurn = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];
    const getActivePlayer = () => activePlayer;
    const checkWinner = () => {
        
    };

    const playRound = (row, square) => {
        board.makeMove(getActivePlayer(), row, square);
        switchPlayerTurn();

    }

    return {getActivePlayer, playRound};
}

const test = [
            [1,0,1],
            [0,0,1],
            [0,0,1]];
let token = 1;

function calcConditions(){ //"TEST" = BOARD; "TOKEN" = PLAYERS.TOKEN; RETURN CHECKWINNER
    const tripleCheck = [false,false,false];

    
    function individualVerification(arr, token, loopIteration, arrIteration){
        arr[loopIteration][arrIteration] == token ? tripleCheck[loopIteration] = true: tripleCheck[loopIteration] = false;
    }
    function loopItems (func, test, token, num){
        if(num == 3){
            for (let i = 0; i < 3; i++){
                func(test, token, i, i);
            }
        } else if(num == 4){
            for (let i = 0; i < 3; i++){
                func(test.toReversed(), token, i, i);
            }
            } else{
            for (let i = 0; i < 3; i++){
                func(test, token, i, num);
            }
        }
        
    }
    function winOrLose(){//USE FILTER
        if (tripleCheck[0] && tripleCheck[1] && tripleCheck[2]){
            console.log("you won!", test);
            return true;
        } else{
            tripleCheck[0] = false;
            tripleCheck[1] = false;
            tripleCheck[2] = false;
            return false;
        } 
    }
    function checkWinners(){
        for(let i = 0; i < 5; i++){
            loopItems(individualVerification, test, token, i);
            if(winOrLose()){
                break;
            };

        }
    }
        checkWinners();

    return tripleCheck;//outcome;
}
console.log(calcConditions())



