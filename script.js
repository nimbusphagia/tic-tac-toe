function Gameboard(){
    const board = [];
    const players = [{name: "Player One", token: 1, score: 0}, {name: "Player Two", token: 2, score: 0}];
    const newBoard = ()=> {
        for (let i = 0; i < 3; i++){
            board[i] = [];
            for (let j = 0; j < 3; j++){
                board[i][j] = 0;
            }
        }
    }
    newBoard();//initial Board
    const getBoard = () => board;
    const makeMove = (token, row, col)=> {
        if (board[row][col] === 0){
            board[row][col] = token;
        }
    }

    return {players, getBoard, newBoard, makeMove};
}
function GameEngine(){
    const gameboard = Gameboard();
    let activePlayer = gameboard.players[0];
    const switchPlayer = () => {
        activePlayer = activePlayer == gameboard.players[0] ? gameboard.players[1] : gameboard.players[0];
    }
    const getActivePlayer = () => activePlayer;
    const tripleCheck = [false, false, false];
    const resetGame = ()=>{
        gameboard.newBoard();
        gameboard.players[0].score = 0;
        gameboard.players[1].score = 0;
    }
    const scanBoard = (token, num, board)=> {
        let result = "";
        switch (num){
            case 0: //rows
                for (let i = 0; i < 3; i++){
                    for (let j = 0; j < 3; j++){
                        tripleCheck[j] = board[i][j] === token;
                        if(tripleCheck.every((check)=> check === true)){
                            console.log("win!");
                            result = "win";
                            return "win"
                            break;
                        }
                    }
                }
            break;
            case 1: //columns
                for (let i = 0; i < 3; i++){
                    for (let j = 0; j < 3; j++){
                        tripleCheck[j] = board[j][i] === token;
                        if(tripleCheck.every((check)=> check === true)){
                            console.log("win!");
                            result = "win";
                            return "win"
                            break;
                        }
                    }
                }
            break;
            case 2: //1st diagonal
                for (let i = 0; i < 3; i++){
                    tripleCheck[i] = board[i][i] === token;
                    if(tripleCheck.every((check)=> check === true)){
                        console.log("win!");
                        result = "win";
                        return "win"
                        break;
                    }
                }
            break;
            case 3: //2nd diagonal
                for (let i = 0; i < 3; i++){
                    tripleCheck[i] = board[i][2 - i] === token;
                    if(tripleCheck.every((check)=> check === true)){
                        console.log("win!");
                        result = "win";
                        return "win"
                        break;
                    }
                }   
            break;
            case 4: //tie
            for (let i = 0; i < 3; i++){
                if(!board[i].includes(0)){
                    tripleCheck[i] = "tie";
                }
            }
            if(tripleCheck.every((check)=> check === "tie")){
                result = "tie";
                console.log("tie!");
                break;
            }
            break;
        }
    } 
    const checkWin = ()=>{
        for(let i = 0; i < 5; i++){
            let result = scanBoard(activePlayer.token, i, gameboard.getBoard());
            if (result == "tie"){
                result = "";
                return "tie"
            } else if(result == "win"){
                activePlayer.score++;
                result = "";
                return "win"
            }
        }
    }
    return {gameboard, checkWin, getActivePlayer, switchPlayer, resetGame}
}
function Display(){
    const move = (square, player)=>{
        const cssRoot = document.querySelector(":root");
        if(!square.style.background){
            switch (player){
                case 1:
                    square.style.background = "url(./images/black_x.png) no-repeat center";
                    square.style.backgroundSize = "80%";
                    cssRoot.style.setProperty("--hoverSymbol", "url(./images/black_circle.png)");
                    cssRoot.style.setProperty("--hoverSize", "70%");
                    cssRoot.style.setProperty("--activeSymbol", "url(./images/white_circle.png)");
                    break;
                case 2:
                    square.style.background = "url(./images/black_circle.png) no-repeat center";
                    square.style.backgroundSize = "70%";
                    cssRoot.style.setProperty("--hoverSymbol", "url(./images/black_x.png)");
                    cssRoot.style.setProperty("--hoverSize", "80%");
                    cssRoot.style.setProperty("--activeSymbol", "url(./images/white_x.png)");
                    break;
            }
        }
    }
    const score = (p1, p2)=>{ //check mobile score
        const scoreP1 = document.querySelector(".score1");
        const scoreP2 = document.querySelector(".score2");
        scoreP1.textContent = p1.score;
        scoreP2.textContent = p2.score;
    }
    const reset = ()=>{
        const squares = Array.from(document.querySelectorAll(".square"));
        for (cell of squares){
            cell.style.setProperty("background", "");
            cell.style.setProperty("background-size", "");
        }
    }
    const roundDialog = (player, result, score, resetBoard, resetGame)=>{
        const dialog = document.querySelector("dialog");
        const text =  document.querySelector("dialog > h1");
        const btn = document.querySelector(".roundBtn");
        if(score === 3){
            text.textContent = player + " wins!";
            btn.textContent = "New Game";
            dialog.showModal();
            btn.addEventListener("click",()=> {
                const scoreP1 = document.querySelector(".score1");
                const scoreP2 = document.querySelector(".score2");
                scoreP1.textContent = 0;
                scoreP2.textContent = 0;
                resetGame();
                dialog.close();
                reset();
            })
        } else{
            if(result == "win"){
                text.textContent = player + " wins the round!";
                btn.innerHTML = "Next round";
                dialog.showModal();
            } else if(result == "tie"){
                text.textContent = "It's a tie!";
                dialog.showModal();
            }
            btn.addEventListener("click",()=> {
                resetBoard();
                dialog.close();
                reset();
            })
        } 
    }
    return {move, score, roundDialog}
}
function MacroPlay(){
    const playGame = GameEngine();
    const displayGame = Display();
    
    const round = (row, col, squareDOM)=>{
        playGame.gameboard.makeMove(playGame.getActivePlayer().token, row, col);
        displayGame.move(squareDOM, playGame.getActivePlayer().token);
        displayGame.roundDialog(playGame.getActivePlayer().name, playGame.checkWin(), playGame.getActivePlayer().score, playGame.gameboard.newBoard, playGame.resetGame);
        displayGame.score(playGame.gameboard.players[0], playGame.gameboard.players[1]);
        console.log(playGame.gameboard.players);
        playGame.switchPlayer();
    }
    document.querySelector(".grid-container").addEventListener("click", (e)=>{
        let square = e.target.id;
        let row = ""; 
        switch (square.slice(0,1)){
            case "a":
                row = 0;
                break;
            case "b":
                row = 1;
                break;
            case "c":
                row = 2;
                break;
        }
        let column = +square.slice(1, 2);
        round(row, column, e.target);
    });
}
MacroPlay();
 



