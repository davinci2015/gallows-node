const view = require('./view');
const asciiArt = require('./ascii');

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