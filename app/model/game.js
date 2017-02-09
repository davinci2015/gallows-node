const controller = require('../controller/controller');
const words = require('../content/words');
const util = require('../utils/helpers');
const view = require('../view/view');

var Game = (function() {

	var life = 5;
	var hint = 3;
    var currHint;

	var hiddenWord;
    var letterNum;
	var wordObj;
    var hitCounter = 0;

	function maskWord(word) {
		// regex - find all letter and ignore whitespace
		var regex = /[^\s\\]/g;
		return word.replace(regex, '-');
	}

	function getRandomWord() {
		var random = Math.floor(Math.random() * words.length);
        letterNum = util.countCharactersInString(words[random].word);
		return words[random];
	}

	function refreshScreen() {
        view.clearScreen();
        view.print(`Category: ${wordObj.category}`);
        view.print(`Hints: ${hint} (type 'hint' for hint)`);
        view.print(currHint != undefined ? currHint : '');
        controller.printGallows(life);
        view.print(`\n${hiddenWord}`);
        controller.requestInput(handleInput);
    }

    function useHint() {
        currHint = wordObj.hints.pop();
        hint--;
    }

	function checkForHit(character) {
        var hit = false;

        // search for letter
        for (var i = 0; i < wordObj.word.length; i++) {
            if (wordObj.word[i].toLowerCase() == character.toLowerCase()) {
                hiddenWord = util.replaceCharacterInString(hiddenWord, i, character.toLowerCase());
                hitCounter++;
                hit = true;
            }
        }

        if (!hit) life--;
    }

    function userRevealedWord() {
        console.log("Done!");
    }

	function handleInput(letter) {
        // Check if user wants hint
        if (letter == 'hint' && hint > 0)
            useHint();
        // Else check if user hit letter
        else
            checkForHit(letter);

        // Clear screen and print gallows
        refreshScreen();
        // Check if user revealed whole word
        if (hitCounter == letterNum) userRevealedWord();
    }

	function start() {
		wordObj = getRandomWord();
		hiddenWord = maskWord(wordObj.word);
		refreshScreen();
	}

	return {
		start
	} 

})();

module.exports = {
	Game
};