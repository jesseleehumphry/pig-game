/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

// loses entire score / round score after rolling 2 sixes.
// Set input where players can set the winning score. (Google).
// Make two dice (only 1 needs to be 1.)

*/

var scores, rounds, activePlayer, gamePlaying, lastRoll, topScore, dice;

init();

document.querySelector('.btn-new').addEventListener('click', function (){
    init();
});

document.querySelector('.btn-roll').addEventListener('click', function (){

    if (gamePlaying) {
        
        for (var i=0;i<2;i++) {
            dice[i] = Math.floor(Math.random() * 6) + 1;
            var diceDOM = document.getElementById('dice'+[i]);
            diceDOM.style.display = 'block';
            diceDOM.src = 'img/dice-'+dice[i]+'.png';
            
        }

        console.log(dice);

        // display result

        if (dice.indexOf(1) == -1) {        
            for (var i=0;i<2;i++) {
                var scoreDOM = document.getElementById('pocket-'+activePlayer);
                if (dice[i] > 1 ) {
                    round+=dice[i];
                    scoreDOM.textContent = round;
                    if (dice[i] == 6 && lastRoll[i] == 6) {
                        lastRoll[i] = dice[i];
                        scores[activePlayer] = 0;
                        nextPlayer();
                    } else {
                        lastRoll[i] = dice[i];
                    }
                console.log('last roll was: '+lastRoll[i]);
               }
            }
        } 
        // update rounds score if roll > 1
        else {
                nextPlayer(); 
            }
        
        // Hot roller bonus
        if (round >= topScore) {
            document.getElementById('name-'+activePlayer).textContent = 'HOT ROLLER';
            document.getElementById('name-'+activePlayer).style.color = 'red';
            document.getElementById('score-'+activePlayer).style.color = 'red';
        }
    }
});

document.querySelector('.btn-bank').addEventListener('click', function (){
    if (gamePlaying) {
        scores[activePlayer] += round;
    
        // UI update
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
        document.getElementById('pocket-'+activePlayer).textContent = 0;
        document.querySelector('.dice').style.display = 'none';
    
        //Check for win condition
        if (scores[activePlayer] >= topScore) {
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.getElementById('name-'+activePlayer).textContent = 'WINNER!';
            for (var i=0;i<2;i++) {
                var diceDOM = document.getElementById('dice'+[i]);
                diceDOM.style.display = 'none';
            }
            document.querySelector('.btn-roll').style.display = 'none';
            document.querySelector('.btn-bank').style.display = 'none';
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer(){
    round = 0;
    lastRoll = [0,0];
    document.getElementById('pocket-'+activePlayer).textContent = 0;
    for (var i=0;i<2;i++) {
        var diceDOM = document.getElementById('dice'+[i]);
        diceDOM.style.display = 'none';
    }
    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer++ : activePlayer--;
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
};

function init() {
    scores = [0,0];
    round = 0;
    gamePlaying = true;
    lastRoll = [0,0];
    if (!isDefined(activePlayer)) {activePlayer = 0}
    if (!isDefined(dice)) {dice = [0,0]}
    if (!isDefined(topScore)) {topScore = 100}
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('pocket-0').textContent = '0';
    document.getElementById('pocket-1').textContent = '0';
    for (var i=0;i<2;i++) {
        var diceDOM = document.getElementById('dice'+[i]);
        diceDOM.style.display = 'none';
    }
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-bank').style.display = 'block';

   
    switch(true){
        case activePlayer > 0:
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            document.getElementById('name-'+activePlayer).textContent = 'Player ' + (activePlayer+1);
            activePlayer = 0;
            document.getElementById('name-'+activePlayer).textContent = 'Player ' + (activePlayer+1);
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
            break;
        default: 
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
            document.getElementById('name-'+activePlayer).textContent = 'Player ' + (activePlayer+1);
    }
 
}

document.querySelector('.btn-confirm-score').addEventListener('click', function (){
    var inputDOM = document.getElementById('score-input').value
    
    if (isNaN(inputDOM) || inputDOM < 2) {
        alert('The score input must be a number greater than 1.')
    } else {
        var c = confirm('Setting a score will start a new game. Are you sure you want to do this?');
        if (c = true) {
            if (topScore === inputDOM) {
                alert('The score you input is already the winning score. The game won\'t be restarted.');
            } else {
                topScore = inputDOM;
                init();
            }
        }

    }
});

// Check for variable definition, return 'false' if undefined.
function isDefined(variable) {
    if (variable == undefined) {
        return false;
    } else {
        return true;
    }
}

