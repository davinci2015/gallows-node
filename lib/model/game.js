const controller = require('../controller/controller');
const words = require('../content/words');
const util = require('../utils/helpers');
const view = require('../view/view');
const atob = require('atob');

var Game = (function() {

    var life = 5;       // user lives
    var hint = 3;       // number of available hints
    var level = 1;      // level
    var currHint;       // Current displayed hint

    var hiddenWord;             // Hidden word / string
    var letterNum;              // Number of letter in word
    var wordObj;                // Contains word, category and array of hints
    var hitCounter = 0;         // Count user hits
    var unmaskedLetters = [];   // Array of unmasked letters

    /**
     * Method for getting random word
     * @returns {Object} with word, category and hints
     */
    function getRandomWord() {
        if (words.length > 0) {
            // Get random number from 0 - words.length
            var random = Math.floor(Math.random() * words.length);
            // Deep clone object
            var word = JSON.parse(JSON.stringify(words[random]));
            // Remove used object/word from array
            util.removeElemFromArrayById(word.id, words);
            // Decode base64 word
            word.word = atob(word.word);
            // Count how many letters word have
            letterNum = util.countCharactersInString(word.word);

            return word;
        }
        else finishGame('You came to the end. Congratulations!');

    }

    /**
     * Clear screen
     * and print necessary information
     * @param requestInput {Boolean} - if set to false input will not be requested
     */
    function refreshScreen(requestInput) {
        view.clearScreen();
        // Print level
        view.print(`Level: ${level}`);
        // Print how many hints remaining
        view.print(`Hints: ${hint} (type '/h' for hint)`);
        // Print category
        view.print(`Category: ${wordObj.category}`);
        // Print divider
        view.print('*****************************');
        // Print current used hint
        view.print(currHint != undefined ? currHint : '');
        // Print gallow status
        controller.printGallows(life);
        // Print hidden word
        view.print(`\n${hiddenWord}`);
        // Request input from user
        if (requestInput !== false) controller.requestInput(handleInput);
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
        character = character.toLowerCase();

        // search for letter
        for (var i = 0; i < wordObj.word.length; i++) {
            // if user hit letter and letter is not unmasked
            if (wordObj.word[i].toLowerCase() == character &&
                unmaskedLetters.indexOf(character) == -1)
            {
                hiddenWord = util.replaceCharacterInString(hiddenWord, i, wordObj.word[i]);
                hitCounter++;
                hit = true;
            }
        }

        if (!hit && --life === 0) finishGame('Dead. Hanging. On gallows.');
        else unmaskedLetters.push(character);
    }

    /**
     * Call this method when user is dead or there are no more words for gallows
     */
    function finishGame(message) {
        refreshScreen(false);
        view.print(message);
        process.exit();
    }

    /**
     * Method that will be invoked when user reveal all letter from word
     * Wait for some time and restart game with another word
     */
    function userRevealedWord() {
        level++;
        console.log('\nCongratulations! Loading next level...');
        setTimeout(() => restartGame(), 2000);
    }

    /**
     * Reinitialize counters and restart game
     */
    function restartGame() {
        unmaskedLetters = [];
        hitCounter = 0;
        currHint = '';
        start();
    }

    /**
     * Handle user input
     * @param letter - user input
     */
    function handleInput(letter) {
        if (letter != undefined && letter != '') {
            // Check if user wants hint
            if ((letter == '/h' || letter == '/H') && hint > 0) useHint();
            // Else check if user hit letter
            else checkForHit(letter);
        }
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
        hiddenWord = util.maskWord(wordObj.word, '-');
        refreshScreen();
    }

    return { start }

})();

module.exports = { Game };