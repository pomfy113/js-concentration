var resetButton = document.getElementById("reset-button");
var gameSquares = [];

var colors = [];
for (var i = 0; i < 10; i++) {
  colors.push('square-' + i);
}

function GameSquare(el, color) {
  this.el = el;
  this.isOpen = false;
  this.isLocked = false;
  this.el.addEventListener("click", this, false);
  this.setColor(color); // <-- Set the color!
  }


    GameSquare.prototype.handleEvent = function(e) {
    switch (e.type) {
      case "click":
        if (this.isOpen || this.isLocked) {
          return;
        }
        this.isOpen = true;
        this.el.classList.add('flip');
        }
    }

    GameSquare.prototype.reset = function() {
      this.isOpen = false;
      this.isLocked = false;
      this.el.classList.remove('flip');
    }

    GameSquare.prototype.lock = function() {
      this.isLocked = true;
      this.isOpen = true;
    }

    GameSquare.prototype.setColor = function(color) {
      this.el.children[0].children[1].classList.remove(this.color);
      this.color = color;
      this.el.children[0].children[1].classList.add(color);
    }


function setupGame() {
  var array = document.getElementsByClassName("game-square");
  for (var i = 0; i < array.length; i++) {
    gameSquares.push(new GameSquare(array[i], colors[0]));
  }
}

setupGame();
