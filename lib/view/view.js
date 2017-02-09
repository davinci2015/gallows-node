var print = (message) => {
	console.log(message);
};

var clearScreen = () => {
	process.stdout.write('\033[2J');
};

module.exports = {
	print,
	clearScreen
};