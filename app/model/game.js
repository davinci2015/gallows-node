const controller = require('../controller/controller');
const words = require('../content/words');
const util = require('../utils/helpers');
const view = require('../view/view');

var Game = (function() {

	var life = 5;       // user lives
	var hint = 3;       // number of available hints
    var level = 1;      // level
    var currHint;       // Current displayed hint

	var hiddenWord;     // Hidden word / string
    var letterNum;      // Number of letter in word
	var wordObj;        // Contains word, category and array of hints
    var hitCounter = 0; // Count user hits

    /**
     * Method for masking string/word
     * e.g. for string 'Black frog' return '----- ----'
     * @param word
     * @returns {string}
     */
	function maskWord(word) {
		// regex - find all letters and ignore whitespace
		var regex = /[^\s\\]/g;
		return word.replace(regex, '-');
	}

    /**
     * Method for getting random word
     * @returns {Object} with word, category and hints
     */
	function getRandomWord() {
		var random = Math.floor(Math.random() * words.length);
        letterNum = util.countCharactersInString(words[random].word);
		return words[random];
	}

    /**
     * Clear screen
     * and print necessary information
     */
	function refreshScreen() {
        view.clearScreen();
        // Print level
        view.print('Level:', level);
        // Print category
        view.print('Category:',wordObj.category);
        // Print how many hints remaining
        view.print(`Total hints: ${hint} (type '/h' for hint)`);
        // Print divider
        view.print('#####################################');
        // Print current used hint
        view.print(currHint != undefined ? currHint : '');
        // Print gallow status
        controller.printGallows(life);
        // Print hidden word
        view.print(`\n${hiddenWord}`);
        // Request input from user
        controller.requestInput(handleInput);
    }

    /**
     * Use hint from hints array
     * and decrease hint counter for 1
     */
    function useHint() {
        currHint = wordObj.hints.pop();
        hint--;
    }

    /**
     * Check if user hit letter in word
     * If user didn't hit letter then decrease his life counter
     * else 'unmask' letter from hidden word
     * @param character
     */
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
        /**
         * TODO - implemenation when user is dead
         */
    }

    /**
     * Method that will be invoked when user reveal all letter from word
     * Wait for some time and restart game with another word
     */
    function userRevealedWord() {
        level++;
        console.log('\nCongratulations! Next level loading...');
        setTimeout(() => restartGame(), 2000);
    }

    /**
     * Reinitialize counters and restart game
     */
    function restartGame() {
        hitCounter = 0;
        currHint = '';
        start();
    }

    /**
     * Handle user input
     * @param letter - user input
     */
	function handleInput(letter) {
        // Check if user wants hint
        if (letter == '/h' && hint > 0) useHint();
        // Else check if user hit letter
        else checkForHit(letter);

        // Clear screen and print gallows
        refreshScreen();
        // Check if user revealed whole word
        if (hitCounter == letterNum) userRevealedWord();
    }

    /**
     * Public method
     * main method for starting game
     */
	function start() {
		wordObj = getRandomWord();
		hiddenWord = maskWord(wordObj.word);
		refreshScreen();
    }

	return { start }

})();

module.exports = { Game };