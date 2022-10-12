'use strict';

// Selecting elements
const name0El = document.querySelector('#score--0');
const name1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
    scores = [0, 0]
    diceEl.classList.add('hidden');
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    name0El.textContent = 0;
    name1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();

const switchPlayers = () => {
    // Switching the active player
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    // Toggling the background
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionalities
btnRoll.addEventListener('click', () => {
        if (playing) {
            // Generating a random dice number
            const dice = Math.trunc(Math.random() * 6) + 1;

            // Display the dice value
            diceEl.classList.remove('hidden');
            diceEl.src = `dice-${dice}.png`;

            // Checking for the condition if rolled dice = 1
            if (dice !== 1) {
                // i-) Add dice value to the current score if dice !== 1
                currentScore += dice;
                document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
            } else {
                switchPlayers(); // invoking the switching players...

                // ... function to maintain DRY principle
            }
        }
    })

// Holding the current score

btnHold.addEventListener('click', () => {
        if (playing) {
            // Adding currentScore to the active player's score
            scores[activePlayer] += currentScore;
            document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

            // Checking if score is >=50
            if (scores[activePlayer] >= 50) {
                // Finished game
                playing = false;
                document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
                document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
                currentScore += 0;
                diceEl.classList.add('hidden')
            } else {
                switchPlayers();
            }
        }
    });

// New game functionalities
btnNew.addEventListener('click', init)