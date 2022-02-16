'use strict';

// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const activePlayerBackground0 = document.querySelector('.player--0');

const activePlayerBackground1 = document.querySelector('.player--1');
//Starting conditions

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayerBackground0.classList.toggle('player--active');
  activePlayerBackground1.classList.toggle('player--active');
};

let scores, currentScore, activePlayer, playing;
//Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  activePlayerBackground0.classList.remove('player--winner');
  activePlayerBackground1.classList.remove('player--winner');
  activePlayerBackground0.classList.add('player--active');
  activePlayerBackground1.classList.remove('player--active');
  diceEL.classList.add('hidden');
};

init();

//Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll

    const dice = Math.trunc(Math.random() * 6 + 1);

    // 2. Display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `images/dice-${dice}.png`;

    if (dice !== 1) {
      // Add dice to current score

      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // 1. Add current score  to active player's score
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100  if so finish the game
    if (scores[activePlayer] >= 30) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player-active');
      diceEL.classList.toggle('hidden');
      playing = false;
    } else {
      // 3. Switch to  the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
