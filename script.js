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
    const makeMove = (player, row, square) => {
        if(board[row][square] == 0){
            board[row][square] = player.token;
        } else{
            return //
        }
    
    }
    return {getBoard, makeMove};
}

function GameController(playerOne = "Player One", playerTwo = "Player Two"){
    const board = Gameboard();
    const players = [{name: playerOne, token: 1, score: 0}, {name: playerTwo, token: 2, score: 0}];
    let activePlayer = players[0];
    let usedSquares = 0;
    let roundStatus = "ongoing";
    const tripleVerification = [false,false,false];
    const switchPlayerTurn = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];
    const getActivePlayer = () => activePlayer;
    const restartBoard = () =>{
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board.getBoard()[i][j] = 0;
            }
            }
        usedSquares = 0;
        roundStatus = "ongoing";
    }
    const alertTie = ()=>{
        if (usedSquares === 9 && roundStatus === "ongoing"){
            return "tie"
        }
    }
    const winOrLose = (activePlayer)=>{
        if (tripleVerification[0]  && tripleVerification[1] && tripleVerification[2]){
            console.log(activePlayer.name + " won!", board.getBoard());
            activePlayer.score++;
            roundStatus = "won";
            return true;
        } else if(alertTie() == "tie"){
            roundStatus = "tie";
            console.log("It's a tie!", board.getBoard());
        } else{
            tripleVerification[0] = false;
            tripleVerification[1] = false;
            tripleVerification[2] = false;
            return false;
        } 
    }
    const winningPositions = (func, arr, player, num)=>{
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
    const individualVerification = (arr, activePlayer, loopIteration, arrIteration)=>{
        arr[loopIteration][arrIteration] == activePlayer.token ? tripleVerification[loopIteration] = true: tripleVerification[loopIteration] = false;
    }
    const checkWinners = (activePlayer) =>{
        for(let i = 0; i < 5; i++){
            winningPositions(individualVerification, board.getBoard(), activePlayer, i);
            winOrLose(activePlayer);
        }
    }
    const checkScores = (activePlayer)=>{
        if (activePlayer.score == 2){
            console.log(activePlayer.name + " won the game!\n Score: " + activePlayer.score + " - " + players[1].score);
        } else {
            return
        }
    }
    const playRound = (row, square) => {
        board.makeMove(getActivePlayer(), row, square);
        usedSquares++;
        checkWinners(getActivePlayer());
        checkScores(getActivePlayer());
        switchPlayerTurn();
        if(roundStatus == "won" || roundStatus =="tie"){
            restartBoard();
        } 
    }

    return {getActivePlayer, playRound, board};
}

const playGame = GameController(); //NEED NEWGAME FUNCTION







