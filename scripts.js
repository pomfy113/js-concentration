var startButton = document.getElementById("start-button");
var resetButton = document.getElementById("reset-button");

//initializations for game
var gameSquares = [];
var firstSquare = null;
var colors = [];

//Grab element for number of flips
var attempts = 0;
document.getElementById("score").innerHTML = attempts;
//Set this for how long you want to play
var timeRemaining =  30;
display = document.querySelector('#time');

//color creation
for (var i = 0; i < 10; i++) {
  colors.push('square-' + i);
}

//Used in randomizer
function random(n) {
  return Math.floor(Math.random() * n);
}

//makes color arrays
//returns a concated array of colors
function getSomeColors() {
  var colorscopy = colors.slice();
  var randomColors = [];
  for (var i = 0; i < 8; i++) {
    var index = random(colorscopy.length);
    randomColors.push(colorscopy.splice(index, 1)[0]);
  }
  return randomColors.concat(randomColors.slice());
}

//used for randomizing color arrays
function randomizeColors() {
  var randomColors = getSomeColors();
  gameSquares.forEach(function(gameSquare) {
    var color = randomColors.splice(random(randomColors.length), 1)[0];
    gameSquare.setColor(color);
  });
}

//creation of game squares
//start off with them unlocked
//on click, set the colored box to go up
function GameSquare(el, color) {
  this.el = el;
  this.isOpen = false;
  this.isLocked = false;
  this.el.addEventListener("click", this, false);
  this.setColor(color); // <-- Set the color!
  }

//click setter
//flips things if pressed
  GameSquare.prototype.handleEvent = function(e) {
    switch (e.type) {
      case "click":
        if (this.isOpen || this.isLocked) {
          return;
        }
        this.isOpen = true;
        this.el.classList.add('flip');
        checkGame(this); // <- check the game here!
    }
  }
//resets them back to default color
//reverts flip function (sets them back down)
    GameSquare.prototype.reset = function() {
      this.isOpen = false;
      this.isLocked = false;
      this.el.classList.remove('flip');
    }
//locks into place if colors matched
    GameSquare.prototype.lock = function() {
      this.isLocked = true;
      this.isOpen = true;
    }
//color setting
    GameSquare.prototype.setColor = function(color) {
      this.el.children[0].children[1].classList.remove(this.color);
      this.color = color;
      this.el.children[0].children[1].classList.add(color);
    }

//game start
//starts with color arrays and setting each game square's color
function setupGame() {
      var array = document.getElementsByClassName("game-square");
      var randomColors = getSomeColors();             // Get an array of 8 random color pairs
      for (var i = 0; i < array.length; i++) {
        var index = random(randomColors.length);      // Get a random index
        var color = randomColors.splice(index, 1)[0]; // Get the color at that index
        gameSquares.push(new GameSquare(array[i], color));
    }
}
//deals with comparing square colors
//first one always flips
function checkGame(gameSquare) {
      if (firstSquare === null) {
        firstSquare = gameSquare;
        return
      }
//if the second matches, lock both
//else, reset both of them
//also adds 1 to the "amt of flips" counter
      if (firstSquare.color === gameSquare.color) {
        firstSquare.lock();
        gameSquare.lock();
      } else {
        var a = firstSquare;
        var b = gameSquare;
        setTimeout(function() {
          a.reset();
          b.reset();
          firstSquare = null;
        }, 400);
      }
      firstSquare = null;
      attempts += 1
      document.getElementById("score").innerHTML = attempts;

    }

//Reset button!
    resetButton.onclick = function(){
        clearGame();
    }

//Reset!
//also resets flip counter
    function clearGame() {
      gameSquares.forEach(function(gameSquare) {
        gameSquare.reset();
      });
      setTimeout(function() {
        randomizeColors();
      }, 500);
      attempts = 0;
      document.getElementById("score").innerHTML = attempts;
    }

//timer function; borrowed the timer format from a stackoverflow place
//when timer hits 0, it clears the board
    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;
            if (--timer < 0) {
                timer = duration;
                alert("Times up! Clearing the board!");
                clearGame();
            }
        }, 1000);
        resetButton.onclick = function(){
            timer = timeRemaining;
            clearGame();
            }
    }
//starts whenever you're ready
//disables afterward to prevent weirdness with timer
//idk how to deal with stopping ongoing simultaneous functions ;;
startButton.onclick = function(){
    startTimer(timeRemaining, display);
    setupGame();
    startButton.disabled = true;

}
