const view = require('../view/view');
const asciiArt = require('../content/ascii');

var printGallows = (lifes) => {
	view.decodeAndPrint(asciiArt.gallows[lifes.toString()]);
}

var printWord = (word) => {
	view.print(word);
}

module.exports = { 
	printGallows,
	printWord,
}