// // /*
// // GAME RULES:
// // - The game has 2 players, playing in rounds, set the final score
// // - In each turn, a player rolls the tow dices as many times as he whishes. Each result get added to his ROUND score
// // - BUT, if the player rolls a 1 among one of the dices, all his ROUND score gets lost. After that, it's the next player's turn
// // - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
// // - The first player to reach the final score points on GLOBAL score wins the game
// // /*
// // Game Two: A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
 // */ 
// Selecting elements
'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores, currentScore, activePlayer, playing;

// Function to initialize the game and using for game reset 
function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; 
  playing = true;
///this code is a click the new game button total value is 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
 }
// Function to switch to the next player
function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  }
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

// Initialize the game
init();
// rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;
    // 2. Display the dice  
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore =currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});
// Event listener for holding the score
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore; //currentScore = 12; activePlayer = 1
    // scores[1] = scores[1] +currentScore;
    // scores[1] = 0 + 12
    // scores[0,12]
    

    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing=false;
      // diceEl.classList.add('hidden');
      // btnRoll.classList.add('hidden')
      // btnHold.classList.add('hidden')
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }                   
  }
});
// starting a new game
btnNew.addEventListener('click', init);
