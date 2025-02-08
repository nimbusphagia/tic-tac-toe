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
    const makeMove = (player, row, square) => board[row][square] = player.token;//NEED LOGIC TO NOT REWRITE SQUARES 
    return {getBoard, makeMove};
}

function GameController(playerOne = "Player One", playerTwo = "Player Two"){
    const board = Gameboard();
    const players = [{name: "Player 1", token: 1}, {name: "Player 2", token: 2}];
    let activePlayer = players[0];
    const tripleVerification = [false,false,false];
    const switchPlayerTurn = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];
    const getActivePlayer = () => activePlayer;

    function winOrLose(activePlayer){
        if (tripleVerification[0] && tripleVerification[1] && tripleVerification[2]){
            console.log(activePlayer.name + " won!", board.getBoard());
            return true;
        } else{
            tripleVerification[0] = false;
            tripleVerification[1] = false;
            tripleVerification[2] = false;
            return false;
        } 
    }
    function winningPositions (func, arr, player, num){
        if(num == 3){
            for (let i = 0; i < 3; i++){
                func(arr, player, i, i);
            }
        } else if(num == 4){
            for (let i = 0; i < 3; i++){
                func(arr.toReversed(), player, i, i);
            }
            } else{
            for (let i = 0; i < 3; i++){
                func(arr, player, i, num);
            }
        }
    } 
    function individualVerification(arr, activePlayer, loopIteration, arrIteration){
        arr[loopIteration][arrIteration] == activePlayer.token ? tripleVerification[loopIteration] = true: tripleVerification[loopIteration] = false;
    }
    function checkWinners(activePlayer){
        for(let i = 0; i < 5; i++){
            winningPositions(individualVerification, board.getBoard(), activePlayer, i);
            if(winOrLose(activePlayer)){
                //here we can stop the round
                break;
            };
        }
    }
    const playRound = (row, square) => {
        board.makeMove(getActivePlayer(), row, square);
        checkWinners(getActivePlayer());
        switchPlayerTurn();
    }

    return {getActivePlayer, playRound};
}

const playGame = GameController();
playGame.playRound(0,0);
playGame.playRound(1,1);
playGame.playRound(1,0);
playGame.playRound(2,1);
playGame.playRound(2,0);
console.log();




