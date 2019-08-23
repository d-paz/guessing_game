var randomNumber = Math.floor(Math.random()*100) + 1;

//Will display the number of guesses a user has made
var numberOfGuesses = document.querySelector('.numberOfGuesses');
//Logs the past guesses of the user
var guesses = document.querySelector('.guesses');
//Stores last guess
var lastResult = document.querySelector('.lastResult');
//Will inform the user of their proximity to the random number
var lowOrHi = document.querySelector('.lowOrHi');

var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

//Will be used to turn the button grayscale once the game is complete
var guessButton = document.querySelector('.guessSubmit');

//Will be used to display/hide the "results" box upon starting/restarting the game
var results = document.querySelector('.results');

//The game will end once this reaches 10
var guessCount = 1;
var resetButton;

//Pressing enter will now submit the user's guess
var enterPress = document.getElementById("guessField");
enterPress.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("guessSubmit").click();
    }
});

function checkGuess() {
    numberOfGuesses.textContent = 'Number of guesses: ' + guessCount;
    var userGuess = Number(guessField.value);
    results.style.visibility="visible";

    if(guessCount === 1) {
      guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent += userGuess + ' ';
    if(userGuess === randomNumber) {
      lastResult.textContent = 'Congratulations! You got it right!';
      lastResult.style.backgroundColor = 'green';
      lowOrHi.textContent = '';
      setGameOver();
    } else if(guessCount === 10) {
      lastResult.textContent = 'GAME OVER';
      setGameOver();
    } else {
        
      lastResult.textContent = 'Wrong!';
      lastResult.style.backgroundColor = 'red';
      if(userGuess < randomNumber) {
        lowOrHi.textContent = 'Last guess was too low!';
      } else if(userGuess > randomNumber) {
        lowOrHi.textContent = 'Last guess was too high!';
      }
    }
 
    guessCount++;
    guessField.value = '';
    guessField.focus();
  }
  guessSubmit.addEventListener('click', checkGuess);
  
  function setGameOver() {
	  guessField.disabled = true;
	  guessSubmit.disabled = true;
	  resetButton = document.createElement('button');
      resetButton.textContent = 'Start new game';
      //Turns the "Guess!" button grayscale
      guessButton.style.backgroundColor = 'silver';
      guessButton.style.color = 'dimgray';
      guessButton.style.borderColor='black';


      document.body.appendChild(resetButton);
	  resetButton.addEventListener('click', resetGame);
  }
  
  function resetGame() {
	  guessCount = 1;
	
	  const resetParas = document.querySelectorAll('.resultParas p');
	  for(var i = 0; i < resetParas.length; i++) {
		  resetParas[i].textContent = '';
	  }
	  resetButton.parentNode.removeChild(resetButton);
	
	  guessField.disabled = false;
	  guessSubmit.disabled = false;
	  guessField.value = '';
      guessField.focus();
      
      //Restores the original theme of the "Guess!" button
      guessButton.style.backgroundColor = 'teal';
      guessButton.style.color = 'white';
      guessButton.style.borderColor='teal';

      //Will hide the results box
      results.style.visibility="hidden";
    randomNumber = Math.floor(Math.random()*100) + 1;
  }
