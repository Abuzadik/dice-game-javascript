// Select the elements
const player1_Element = document.querySelector(".player1");
const player2_Element = document.querySelector(".player2");
const score1_Element = document.getElementById("score1");
const score2_Element = document.getElementById("score2");
const current1_Element = document.getElementById("current1");
const current2_Element = document.getElementById("current2");

const newGameBtn = document.querySelector(".btnnew");
const rollBtn = document.querySelector(".btnroll");
const holdBtn = document.querySelector(".btnhold");
const dice = document.querySelector(".dice");

// Initialize game state variables
let score, currentScore, activePlayer, playing;

/**
 * Function to initialize the game state.
 * Sets the initial scores, current score, active player, and playing status.
 * Also updates the DOM to reflect these initial values.
 */
function starter() {
  score = [0, 0]; 
  currentScore = 0; 
  activePlayer = 0; 
  playing = true; 
  
  // Update the scores and current scores in the DOM
  score1_Element.textContent = 0;
  score2_Element.textContent = 0;
  current1_Element.textContent = 0;
  current2_Element.textContent = 0;
}
starter();

/**
 * Event listener for the "Roll Dice" button.
 * Rolls a random number between 1 and 6, updates the current score,
 * and handles the case where the rolled number is 1.
 */
rollBtn.addEventListener("click", function () {
  if (playing) {
    // Generate a random dice roll between 1 and 6
    const roll = Math.trunc(Math.random() * 6) + 1;
    console.log(roll);

    // Display the rolled number
    dice.textContent = roll;

    // If the roll is not 1, add the roll to the current score
    if (roll !== 1) {
      currentScore += roll;
      document.getElementById(`current${activePlayer + 1}`).textContent = currentScore;
    } else {
      // If the roll is 1, switch to the other player
      switchPlayers();
    }
  }
});

/**
 * Function to switch the active player.
 * Resets the current score and toggles the active player class in the DOM.
 */
function switchPlayers() {
  // Reset the current score in the DOM
  document.getElementById(`current${activePlayer + 1}`).textContent = 0;
  currentScore = 0;

  // Switch the active player
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Toggle the active player class for visual indication
  player1_Element.classList.toggle("player-active");
  player2_Element.classList.toggle("player-active");
}

/**
 * Event listener for the "Hold" button.
 * Adds the current score to the active player's total score,
 * checks if the player has won, and switches to the other player if not.
 */
holdBtn.addEventListener("click", function () {
  if (playing) {
    // Add current score to the active player's total score
    score[activePlayer] += currentScore;

    // Update the total score in the DOM
    document.getElementById(`score${activePlayer + 1}`).textContent = score[activePlayer];

    // Check if the active player's score is 100 or more
    if (score[activePlayer] >= 100) {
      // End the game if the active player has won
      playing = false;
      document.querySelector(`.player${activePlayer + 1}`).classList.add("player-winner");
      document.querySelector(`.player${activePlayer + 1}`).classList.remove("player-active");
    } else {
      // Switch to the other player if no one has won yet
      switchPlayers();
    }
  }
});

/**
 * Event listener for the "New Game" button.
 * Resets the game state to the initial values.
 */
newGameBtn.addEventListener("click", starter);
