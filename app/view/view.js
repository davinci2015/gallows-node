const atob = require('atob');

var decodeAndPrint = (message) => {
	console.log(atob(message));
};

var print = (message) => {
	console.log(message);
}


module.exports = {
	decodeAndPrint,
	print
}