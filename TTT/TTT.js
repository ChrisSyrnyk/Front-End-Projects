/*on hover*/
let roundsPlayed = 0;   //round counter
let positionsPlayed = [];
let positions = [0,0,0,0,0,0,0,0,0]; //logs piece and position of piece
let roundWon = false;


class Player {
    constructor () {
        this.score = 0;
        this.playCount = 0;
        this.piece = null;
        this.win = null; //set to true on win
        this.type = null;
    }
}

const player1 = new Player;
const player2 = new Player;


function completeTurn(player){
    player.playCount += 1;  //increment players num of rounds played
    roundsPlayed ++;    //increment rounds played
    checkEnd(); //check for end of game (6 rounds)
}

function assignPiece(selection,player){
    player.piece = selection;
}

function selectPosition(position){
    //only complete if position not already taken;
    if (isPositionAvailable(position.id)==false && roundWon == false){
    if (roundsPlayed %2 == 0){
        placePiece(position, player1);
        completeTurn(player1)
    } else {
        placePiece(position, player2);
        completeTurn(player2);
    }
    }
}

function placePiece(positionContainer, player){
    /*add img to parent element x or o depending on slection give it class piece*/
    const newImg = document.createElement("img");
    if (player.piece == "o"){
        logPosition(positionContainer.id, 2)
        newImg.src = "img/o-icon.png";
    } else {
        newImg.src = "img/x-icon.png";
        logPosition(positionContainer.id, 1)
    }
    newImg.className = "piece"
    positionContainer.appendChild(newImg);
    console.log("piece placed")
    removeAvailablePosition(positionContainer.id);
}




//adds positions to array containing already played positions
function removeAvailablePosition(position){
    positionsPlayed.push(position); //add to positions played array
}

//checks played position array for match. Returns true if position already played.
function isPositionAvailable(position){
    let i = 0;
    let match = false;
    while ( i < positionsPlayed.length){
        if (positionsPlayed[i] == position){
            match = true;
        }
        i++;
    }
    return match;
}


function checkEnd(){
    // after each round check for winner
     if (checkForWinner() ==true){
         endGame();
     } else if (roundsPlayed == 6){
        endGame();
    }
}

function endGame(){
    let winner = determineWinner();
    console.log(winner);
    if (winner == 0){
        console.log("tie game");
    } else if (winner == 1){
        console.log("x's win");
    } else if (winner == 2){
        console.log("o's win");
    }
    roundWon = true;
    roundsPlayed = 0;
    updateMessage(winner);
    toggleDisplay(endScreen);
}

function updateMessage(winner){
    let container = document.getElementById("end-message");
    if (winner == 1){
        let message = document.createTextNode("X's Win");
        container.appendChild(message);
    } else if (winner == 2){
        let message = document.createTextNode("O's Win");
        container.appendChild(message);
    } else {
        let message = document.createTextNode("Tie Game");
        container.appendChild(message);
    }
}

/*clear board*/
function clearBoard(){
    while(positionsPlayed.length > 0){
        let positionId = positionsPlayed[0];
        let position = document.getElementById(positionId);
        //add fade transition for
        position.innerHTML="";  //remove inner html container img x or o
        positionsPlayed.shift(0); //remove first element from posisiton played
    }
    roundWon = false;
}

/*Start game*/
let x = "x"
let o = "o"
function startGame(piece){
    console.log("start game")
    //assign player piece
      if (piece == "x"){
          assignPiece(piece, player1)
          assignPiece(o, player2)
      } else {
        assignPiece(piece, player1)
        assignPiece(x, player2)
      }
    //replace start button with reset button  
    let startButton = document.getElementById("startGame");
    let resetButton = document.getElementById("resetGame");
    startButton.style.display = "none";
    resetButton.style.display = "block";  
    }

function resetGame(){
    console.log("reset Game");
    //clear the game board
    if (endScreen.style.display == "block"){
        toggleDisplay(endScreen);
    }
    clearBoard();
    resetPositions();
    removeEndMessage();
}

//take position id and place in right place of array 
function logPosition (positionid, piece){
    /*
    in positions[], index is place on board, 0 = unplaued, 1='x', 2='o'
    012
    345     --> positions[0,1,2,3,4,5,6,7,8]
    678
    */
    if (positionid == "tl"){
        positions[0] = piece;
    } else if (positionid == "tm"){
        positions[1] = piece;
    } else if (positionid == "tr"){
        positions[2] = piece;
    } else if (positionid == "ml"){
        positions[3] = piece;
    } else if (positionid == "mm"){
        positions[4] = piece;
    } else if (positionid == "mr"){
        positions[5] = piece;
    } else if (positionid == "bl"){
        positions[6] = piece;
    } else if (positionid == "bm"){
        positions[7] = piece;
    } else if (positionid == "br"){
        positions[8] = piece;
    }
}

//determine winner from positions array
function determineWinner(){
    let pieceX = 1; // 1=='x';
    let pieceO = 2;
    let xWin = false;
    let oWin = false;
    //check rows
    let i = 0;
    while (i < 7){
        if(positions[i]== pieceX && positions[i+1]== pieceX && positions[i+2]==pieceX){
            xWin = true;
        }
        if(positions[i]== pieceO && positions[i+1]== pieceO && positions[i+2]==pieceO){
            oWin = true;
        }
        i +=3;
    }
    //check columns
    i = 0;
    while (i < 3){
        if(positions[i]== pieceX && positions[i+3]== pieceX && positions[i+6]==pieceX){
            xWin = true;
        }
        if(positions[i]== pieceO && positions[i+3]== pieceO && positions[i+6]==pieceO){
            oWin = true;
        }
        i ++;
    }
    //check diagnols
    if(positions[0]== pieceX && positions[4]== pieceX && positions[8]==pieceX
        || positions[2]== pieceX && positions[4]== pieceX && positions[6]==pieceX){
        xWin = true;
    }
    if(positions[0]== pieceO && positions[4]== pieceO && positions[8]==pieceO
        || positions[2]== pieceO && positions[4]== pieceO && positions[6]==pieceO){
        oWin = true;
    }
    //check who won
    if (xWin == true && oWin == true){
        //tie game
        return 0
    } else if (xWin == true){
        //x's win
        return 1
    } else if (oWin == true){
        //o's win
        return 2
    } else {
        //tie game
        return 0
    }
}

function checkForWinner(){
    let results = determineWinner();
    if (results == 1){
        return true;
    } else if (results == 2){
        return true;
    } else {
        return false;
    }
}

function selectPiece(piece){
    let xIcon = document.getElementById("xPiece"); 
    let oIcon = document.getElementById("oPiece"); 
    if (piece == 'x'){
        xIcon.style.backgroundColor = "var(--selectionGreen)";
        oIcon.style.backgroundColor = "var(--transparent)";
        player1.piece = "x";
        player2.piece = "o"
    } else {
        xIcon.style.backgroundColor = "var(--transparent)";
        oIcon.style.backgroundColor = "var(--selectionGreen)";
        player1.piece = "o";
        player2.piece = "x";
    }
    
}

function selectP2(type){
    let player = document.getElementById("player");
    let computer = document.getElementById("computer");
    if (type == "player"){
        player.style.backgroundColor = "var(--selectionGreen)";
        computer.style.backgroundColor = "var(--transparent)";
        player2.type = "player";
    } else {
        player.style.backgroundColor = "var(--transparent)";
        computer.style.backgroundColor = "var(--selectionGreen)";
        player2.type = "computer";
    }
    
}

function toggleDisplay(id){
    let currentSetting = id.style.display;
    if (currentSetting == "block"){
        id.style.display = "none";
    } else if (currentSetting == "none"){
        id.style.display = "block";
    }
}

function newGame(){
    if (player1.piece != null && player2.type != null){
        toggleDisplay(homeWindow);
        console.log(player2.type);
        console.log(player1.piece);
    } else {
        //highlight unchoosen
    }
}

function home(){
    clearBoard();
    resetPlayer(player1);
    resetPlayer(player2);
    if (endScreen.style.display == "block"){
        toggleDisplay(endScreen);
    }
    toggleDisplay(homeWindow);
    //remove input info
    removeInputInfo();
    resetPositions();
    removeEndMessage();
    roundsPlayed = 0;
}

function resetPlayer(player){
    player.playCount = 0;
    player.piece = null;
    player.win = null;
    player.type = null;
}

function removeEndMessage(){
    let container = document.getElementById("end-message");
    container.innerHTML="";
    resetWin();
}

function removeInputInfo(){
    let xIcon = document.getElementById("xPiece"); 
    let oIcon = document.getElementById("oPiece");
    let player = document.getElementById("player");
    let computer = document.getElementById("computer"); 
    player.style.backgroundColor = "var(--transparent)";
    computer.style.backgroundColor = "var(--transparent)";
    xIcon.style.backgroundColor = "var(--transparent)";
    oIcon.style.backgroundColor = "var(--transparent)";
}


function resetPositions(){
    let i = 0;
    while (i<positions.length){
        positions[i] = 0;
        i++;
    }
}




