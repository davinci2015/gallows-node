const controller = require('../controller/controller');
const words = require('../content/words');

var Game = (function() {

	var life = 3;
	var hint = 5;

	var hiddenWord;
	var wordObj;

	function maskWord(word) {
		// regex - find all letter and ignore whitespace
		var regex = /[^\s\\]/g;
		return word.replace(regex, '-');
	}

	function getRandomWord() {
		var random = Math.floor(Math.random() * words.length);
		return words[random];
	}

	function printGallows() {
		controller.printGallows(life);
	}

	function printWord() {
		controller.printWord(hiddenWord);
	}

	function start() {
		wordObj = getRandomWord();
		hiddenWord = maskWord(wordObj.word);
		printGallows();
		printWord();
	}

	return {
		printGallows,
		start
	} 

})();

module.exports = {
	Game
}