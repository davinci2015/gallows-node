const readline = require('readline');
const view = require('../view/view');
const asciiArt = require('../content/ascii');
const atob = require('atob');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var printGallows = lifes => {
    view.print(atob(asciiArt.gallows[lifes.toString()]));
};

var requestInput = callback => {
    rl.question('Enter letter: ', letter => {
        callback(letter);
    });
};

module.exports = {
    printGallows,
    requestInput
};