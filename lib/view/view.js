const atob = require('atob');

var decodeAndPrint = (message) => {
	console.log(atob(message));
};

var print = (message) => {
	console.log(message);
};

var clearScreen = () => {
	process.stdout.write('\033[2J');
};

module.exports = {
	decodeAndPrint,
	print,
	clearScreen
};