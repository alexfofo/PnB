var words = ['mariage', 'brune et paul', 'La Croix Valmer', 'Vamos a la playa'];
var word = '';
var display = [];
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var remainingClicks = 8;


function buildAlphabet() {

  var fragment = document.createDocumentFragment();

  alphabet.split('').forEach(
    (letter) => {
      var el = document.createElement("div");
      el.innerHTML = letter;
      el.className = "letter no-selection";
      el.onclick = useLetter;
      fragment.appendChild(el);
    });

  document.getElementById("alphabet").appendChild(fragment);
}

function actualizeDisplay() {
  document.getElementById('guessWord').innerHTML = display.join('');
  document.getElementById('remainingClicks').innerHTML = remainingClicks;
}

function buildGuessLine() {
  var rand = Math.floor(Math.random() * words.length);
  word = words[rand];
  display = [];
  for (var i = 0; i < word.length; i++) {
    display.push(alphabet.includes(word[i].toUpperCase()) ? '_' : word[i]);
  }
  actualizeDisplay();
}

function resetGame() {
    remainingClicks = 8;
    buildGuessLine();
    resetAlphabet();

}

function resetAlphabet() {
  var allLetterDiv = document.getElementsByClassName('letter');

  for (var i = 0; i < allLetterDiv.length; i++) {
    allLetterDiv[i].style.opacity = 1;
    allLetterDiv[i].classList.remove("used");
  }
}

function checkEndGame() {
    var modal = document.getElementById("modal");
    if (word.toUpperCase() === display.join('')) {
        modal.getElementsByTagName('p')[0].innerHTML = "Bravo";
    }
    else if (remainingClicks <= 0) {
        modal.getElementsByTagName('p')[0].innerHTML = "Rééssayer ?";
    }
    else
        return ;
    modal.style.display = "block";
}

function useLetter(that) {
    var tar = that.target;
    var flag = 0;

    if (tar.classList.contains('used'))
        return ;
    word.split('').forEach( (letter, index) => {
        tar.style.opacity = .3;
        if (tar.innerHTML == letter.toUpperCase()) {
            display[index] = letter.toUpperCase();
            ++flag;
        }
    });
    tar.classList.add("used");
    if (flag == 0)
        remainingClicks--;
    actualizeDisplay();
    checkEndGame();
}

var modal = document.getElementById("modal");
var okButton = document.getElementById("okModal");

// When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on ok button, close the modal
okButton.onclick = function() {
    resetGame();
    modal.style.display = "none";
  
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

buildAlphabet();
buildGuessLine();

