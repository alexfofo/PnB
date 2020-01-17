

var words = ['friteuse', 'frigo', 'cheval', 'bac a biere'];
var word = '';
var display = [];
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


function buildAlphabet() {
  
  var fragment = document.createDocumentFragment();

  alphabet.split('').forEach(
    (letter) => {
      var el = document.createElement("div");
      el.innerHTML = letter;
      el.className = "letter no-selection";
      el.onclick = checkLetter;
      fragment.appendChild(el);
    });

  document.getElementById("alphabet").appendChild(fragment);
}

function actualizeDisplay() {
  document.getElementById('guessWord').innerHTML = display.join('');
}

function buildGuessLine() {
  console.log('reset guess line');
  var rand = Math.floor(Math.random() * words.length);
  word = words[rand];
  display = [];
  for (var i = 0; i < word.length; i++) {
    display.push(alphabet.includes(word[i].toUpperCase()) ? '_' : word[i]);
  }
  actualizeDisplay();
  resetOpacity();
}

function resetOpacity() {
  var allLetterDiv = document.getElementsByClassName('letter');
  
  for (var i = 0; i < allLetterDiv.length; i++) {
    allLetterDiv[i].style.opacity = 1;
  }
}

function checkLetter(that) {
  var tar = that.target;

  word.split('').forEach( (letter, index) => {
    tar.style.opacity = .3;
    if (tar.innerHTML == letter.toUpperCase()) {
      display[index] = letter.toUpperCase();
    }
  });
  actualizeDisplay();
  console.log(that.target);

}

buildAlphabet();
buildGuessLine();
