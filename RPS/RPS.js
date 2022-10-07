var playerScore = 0;
var computerScore = 0;
var numRoundsPlayed = 0;


function computerPlay(){
    ranNum = Math.floor(Math.random()*3)
    if (ranNum == 0){
        return "rock";
    } else if (ranNum == 1){
        return "paper";
    } else {
        return "scissors";
    }
}

function compare(hand1, hand2){

    lHand1 = hand1.toLowerCase();
    lHand2 = hand2.toLowerCase();

    if (lHand1 == "rock"){
        if (lHand2 == "rock"){
            return "tie game";
        } else if (lHand2 == "paper"){
            return "Computer wins";
        } else {
            return "you win!!";
        }

    } else if (lHand1 == "paper"){
        if (lHand2 == "paper"){
            return "tie game";
        } else if (lHand2 == "scissors"){
            return "Computer wins";
        } else {
            return "you win!!";
        }

    }else {
        if (lHand2 == "scissors"){
            return "tie game";
        } else if (lHand2 == "rock"){
            return "Computer wins";
        } else {
            return "you win!!";
        }

    }
}

function playRound(playerHand, computerHand){
    if (compare(playerHand,computerHand) == "you win!!"){
        return 1;
    } else if (compare(playerHand,computerHand) == "Computer wins"){
        return -1;
    } else {
        return 0;
    }
}

function playGame(numOfRounds){
    let roundsPlayed = 0;
    let pScore = 0;
    let cScore = 0;
    while (numOfRounds > roundsPlayed){
        let cHand = computerPlay();
        roundResult = playRound("paper", cHand);
        if (roundResult == 1){
            pScore += 1;
        } else if (roundResult == -1){
            cScore += 1;
        }
        console.log("paper ," + cHand);
        roundsPlayed +=1;
        console.log(roundsPlayed)
        console.log(pScore)
        console.log(cScore)
    }
    if (pScore > cScore){
        console.log( "player Wins the game");
    } else if (pScore < cScore){
        console.log("compute Wins the game");
    } else {
        console.log("tie game");
    }
    console.log(pScore)
    console.log(cScore)
    
}

function selectRPS(identifier){
    let cHand = computerPlay();
    let result = 0;
    document.getElementById("PR").style.opacity = "0";
    document.getElementById("PS").style.opacity = "0";
    //determine choice
    if (identifier == "PR"){
      document.getElementById("PP").src = "img/rock.png";
      selectComputerRPS(cHand);
      result = playRound("rock",cHand);
    } else if (identifier == "PP"){
      document.getElementById("PP").src = "img/paper.png";
      selectComputerRPS(cHand);
      result = playRound("paper",cHand);
    } else if (identifier == "PS"){
      document.getElementById("PP").src = "img/scissors.png";
      selectComputerRPS(cHand);
      result = playRound("scissors",cHand);
    }
    updateScore(result);
    console.log(cHand);
    console.log(playerScore);
    console.log(computerScore);
    displayScore();

    var delayInMilliseconds = 1000; //1 second

    setTimeout(function() {
        //determine if end of game.
        isEnd();
        resetScreen();
    }, 3000);

  };

function selectComputerRPS(cHand){
    document.getElementById("CR").style.opacity = "0";
    document.getElementById("CS").style.opacity = "0";
    if (cHand == "rock"){
        document.getElementById("CP").src = "img/rock.png";
      } else if (cHand == "paper"){
        document.getElementById("CP").src = "img/paper.png";
      } else if (cHand == "scissors"){
        document.getElementById("CP").src = "img/scissors.png";
      }
}

function updateScore(result){
    if (result == -1){
        computerScore += 1;
    } else if (result == 1){
        playerScore += 1;
    }
}

function displayScore(){
    document.getElementById("playerScore").innerHTML = playerScore.toString();
    document.getElementById("compScore").innerHTML = computerScore.toString();
}

function resetScreen(){
    document.getElementById("PP").src = "img/paper.png";
    document.getElementById("CP").src = "img/paper.png";
    document.getElementById("PR").style.opacity = "1";
    document.getElementById("PP").style.opacity = "1";
    document.getElementById("PS").style.opacity = "1";
    document.getElementById("CR").style.opacity = "1";
    document.getElementById("CP").style.opacity = "1";
    document.getElementById("CS").style.opacity = "1";
}

function startGame(selectedRounds){
    selectedRoundsValue = selectedRounds.value; //get value from options id
    console.log(selectedRoundsValue);
    var numberRounds = selectedRoundsValue;
    sessionStorage.setItem("numberRounds", numberRounds);

    window.location = 'playGame.html'; //change window
}


function isEnd(){
    //end game if number of rounds played is >= rounds selected. Else add one to rounds played and start next round. 
    var numberRounds = sessionStorage.getItem("numberRounds");
    if (numRoundsPlayed >= numberRounds -1){
        //store score
        sessionStorage.setItem("playerScore", playerScore);
        sessionStorage.setItem("computerScore", computerScore);
        //change window
        window.location = 'results.html';
    } else {
        numRoundsPlayed += 1;
    }
}

function displayWin(){
    let element = document.getElementById('displayWinner');
    let element2 = document.
    console.log(element)
    if (playerScore > computerScore){
        element.innerHTML = "You Win!!"
    } else if (playerScore == computerScore){
        element.innerHTML = "Tie Game!!"
    } else {
        element.innerHTML = "Computer Wins!!"
    }
}
