var wins = 0;
var score; 
var hiddenWord;
var currentWord;
var yourInput;
var audio = new Audio("assets/Horror.mp3");
var game = {
    words: ["hallowen", "trick", "treat", "holiday", "pumpkin", "mummy", "mutant", "witch", "ghost", "vampire", "zombie", "goblin", "lantern", "costume", "sweets", "darkness", "monster", "shadows", "decorations", "moonlight", "spiderweb", "night", "supernatural", "orange", "party", "harvest", "autumn", "squash", "corn", "leaves", "fairy", "candy", "flashlight", "phantom", "cemetery", "poltergeist", "coffin", "corpse", "graveyard", "spirit", "dead", "tombstone"],
    alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    orangeLetters: function() {
        var usedLetters = document.getElementsByClassName("alphabet");
        for (var i = 0; i < usedLetters.length; i++) {
            usedLetters[i].style.visibility = "visible";
            usedLetters[i].style.color = "orange";
        }
    },
    randomNumber: function() {
        var currentWordNumber = Math.floor(Math.random()*42);
        currentWord = this.words[currentWordNumber].split("");
        console.log(currentWord);
    },
    showHiddenWord: function() {
        hiddenWord = [];
        for (var i=0; i < currentWord.length; i++) {
            hiddenWord.push("_");
        }
        document.getElementById("matchedLetters").textContent = hiddenWord.join(" ");
    },
    showOnTheStart: function() {
        score = 12;
        document.getElementById("score").style.color = "wheat";
        document.getElementById("alert").textContent = "";
        document.getElementById("wins").textContent = "Wins: " + wins;
        document.getElementById("score").textContent = "# of guesses remaining: " + score;
    },
    scorecount: function() {
        score--;
        document.getElementById("score").textContent = "# of guesses remaining: " + score;
    },
    wins: function() {
        wins++;
        document.getElementById("wins").textContent = "Wins: " + wins;
    },
    openALetter: function() {
        for (var i = 0; i< currentWord.length; i++) {
            if (yourInput === currentWord[i]) {
                hiddenWord[i] = yourInput;
                document.getElementById("matchedLetters").textContent = hiddenWord.join(" ");   
            }
        }
    },
    alphabetColor: function() {
        if (this.alphabet.indexOf(yourInput)>=0) {
            document.getElementById(this.alphabet.indexOf(yourInput)).style.color = "grey";
        } else {
            document.getElementById("alert").textContent = "Please, use letters only!";
        } 
    },
    winText: function() {
        document.getElementById("score").textContent = "You won! Hooray!!!"; 
        document.getElementById("score").style.color = "orange";
    },
    looseText: function() {
        document.getElementById("score").textContent = "Game Over! Booooo!";
        document.getElementById("score").style.color = "orangered";
    }
};
    
    document.getElementById("button").onclick = function start() {
    game.orangeLetters();
    game.randomNumber();
    game.showHiddenWord();
    game.showOnTheStart();

    document.onkeyup = function(event) {
        yourInput = event.key;
        console.log(yourInput);

        if (hiddenWord.indexOf("_") === -1 || score === 0) {
            return;
        }
        if (currentWord.indexOf(yourInput) === -1) {
            game.scorecount();
        }
        game.openALetter();
        game.alphabetColor();
        if (hiddenWord.indexOf("_") === -1 && score > 0) {
            game.winText();
            game.wins();
            audio.play();
            setTimeout(start, 3000);
        }
        if (score <= 0) {
            game.looseText();
            audio.pause();
            setTimeout(start, 3000);
        } 
    };
};