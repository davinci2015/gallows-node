const controller = require('../controller/controller');
const words = require('../content/words');
const util = require('../utils/helpers');
const view = require('../view/view');

var Game = (function() {

	var life = 3;
	var hint = 5;

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
        controller.printGallows(life);
        controller.printWord(`\n${hiddenWord}`);
        controller.requestInput(handleInput);
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

	function handleInput(letter) {
        checkForHit(letter);
        refreshScreen();
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