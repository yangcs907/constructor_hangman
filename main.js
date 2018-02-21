var inquirer = require('inquirer');

var checkForLetter = require('./word.js');

var lettersToDisplay = require('./letter.js');


var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var lettersAlreadyGuessed = [];
var lettersCorrectlyGuessed = [];
var displayHangman;

var nflTeams = ['falcons', 'patriots', 'eagles', 'saints', 'texans', 'cowboys', 'giants', 'seahawks', 'panthers', 'cardinals',
  'colts', 'bears', 'packers', 'vikings', 'lions', 'bills', 'dolphins', 'jets', 'jaguars', 'redskins', 'broncos', 'chargers', 'chiefs', 'raiders',
  'fortyniners', 'rams', 'browns', 'bengals', 'steelers', 'ravens', 'buccaneers', 'titans'];



var game = {

  wordBank : nflTeams,
  guessesRemaining : 10,
  currentWrd : null,


  startGame : function(){
    this.guessesRemaining = 10;

    var j = Math.floor(Math.random() * this.wordBank.length);
    this.currentWrd = this.wordBank[j];

    console.log('Welcome to NFL Hangman, guess the NFL team!');

    displayHangman = new lettersToDisplay(this.currentWrd);
    displayHangman.parseDisplay();
    console.log('Guesses Left: ' + game.guessesRemaining);

    keepPromptingUser();
  }

};


function keepPromptingUser(){

  console.log('');

  if(game.guessesRemaining > 0){
    inquirer.prompt([
      {
        type: "value",
        name: "letter",
        message: "Guess a Letter: "
      }
    ]).then(function(userInput){

      var inputLetter = userInput.letter.toLowerCase();

      if(alphabet.indexOf(inputLetter) == -1){

        console.log('Im sorry ' + inputLetter + '" is not a valid input. Please try again');
        console.log('Guesses Left: ' + game.guessesRemaining);
        console.log('Letters already guessed: ' + lettersAlreadyGuessed);
        keepPromptingUser();

      }
      else if(alphabet.indexOf(inputLetter) != -1 && lettersAlreadyGuessed.indexOf(inputLetter) != -1){

        console.log('You have already gussed ' + inputLetter + '". Try again!');
        console.log('Guesses Left: ' + game.guessesRemaining);
        console.log('Letters already guessed: ' + lettersAlreadyGuessed);
        keepPromptingUser();

      }
      else{

        lettersAlreadyGuessed.push(inputLetter);


        var letterInWord = checkForLetter(inputLetter, game.currentWrd);

        if(letterInWord){

          lettersCorrectlyGuessed.push(inputLetter);

          displayHangman = new lettersToDisplay(game.currentWrd, lettersCorrectlyGuessed);
          displayHangman.parseDisplay();

          if(displayHangman.winner){
            console.log('You win! Congrats, you are a true NFL fan');
            return;
          }
          else{
            console.log('Guesses Left: ' + game.guessesRemaining);
            console.log('Letters already guessed: ' + lettersAlreadyGuessed);
            keepPromptingUser();
          }

        }
        else{
          game.guessesRemaining--;

          displayHangman.parseDisplay();
          console.log('Guesses Left: ' + game.guessesRemaining);
          console.log('Letters already guessed: ' + lettersAlreadyGuessed);
          keepPromptingUser();
        }

      }

    });

  }
  else{
    console.log('Sorry, seems like you have lost!');
    console.log('The NFL team was ' + game.currentWrd + '".');
  }

}

game.startGame();
