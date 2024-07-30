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
// const saveGame = document.querySelector('.btnsave');

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

  //reset localStorage
  localStorage.clear();

}
starter();

function loadGame() {
  const savedGameState = localStorage.getItem("gameState");
  if (savedGameState) {
    const gameState = JSON.parse(savedGameState);
    score = gameState.score;
    currentScore = gameState.currentScore;
    activePlayer = gameState.activePlayer;
    playing = gameState.playing;

    // Update the scores and current scores in the DOM
    score1_Element.textContent = score[0];
    score2_Element.textContent = score[1];
    current1_Element.textContent = activePlayer === 0 ? currentScore : 0;
    current2_Element.textContent = activePlayer === 1 ? currentScore : 0;

    // Set the active player class
    if (activePlayer === 0) {
      player1_Element.classList.add("player-active");
      player2_Element.classList.remove("player-active");
    } else {
      player1_Element.classList.remove("player-active");
      player2_Element.classList.add("player-active");
    }
  }
}


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
    autoSave();

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
    if (score[activePlayer] >= 10) {
      // End the game if the active player has won
      winners();
    } else {
      // Switch to the other player if no one has won yet
      switchPlayers();
    }
    autoSave();

  }
});

/**
 * Event listener for the "New Game" button.
 * Resets the game state to the initial values.
 */
newGameBtn.addEventListener("click", starter);

//auto save func
function autoSave() {
  const gameState = {
    score: score,
    currentScore: currentScore,
    activePlayer: activePlayer,
    playing: playing
  };
  localStorage.setItem("gameState", JSON.stringify(gameState));
}

//saveGame.addEventListener('click', autosave)


window.addEventListener('load', loadGame);


function winners(params) {
  if (score[activePlayer] >= 10) {
    win_count = [document.getElementById('count1'), document.getElementById('count2')]
    let counter = parseInt(win_count[activePlayer].textContent)|| 0 
    win_count[activePlayer].textContent = counter + 1;
    console.log(typeof win_count[activePlayer].textContent)
    playing = false; 
    starter();
  }
}

winners();

