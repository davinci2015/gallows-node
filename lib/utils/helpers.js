/**
 * Count all characters in string
 * Ignore whitespaces
 * @param str {String}
 * @returns {Number}
 */
var countCharactersInString = str => {
    return str.replace(/ /g, '').length;
};

/**
 * Replace character in string with some other character
 * @param str {String} - string in which we're changing character
 * @param index {Number} - position of character in string
 * @param character {String} - character with which we're changing character in string
 * @returns {string}
 */
var replaceCharacterInString = (str, index, character) => {
    return str.substr(0, index) + character + str.substr(index + character.length);
};


/**
 * Remove object from array of objects identified by 'id' property
 * @param id - id of object
 * @param arr - array of objects
 */
var removeElemFromArrayById = (id, arr) => {
    var index;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            index = i;
            break;
        }
    }

    if (index != undefined) arr.splice(i, 1);
};

/**
 * Method for masking string/word
 * e.g. for string 'Black frog' return '----- ----'
 * @param str {string}
 * @param maskCharacter {string} character with which we're changing mask character
 * @returns {string}
 */
function maskWord(str, maskCharacter) {
    // regex - find all letters and ignore whitespace
    var regex = /[^\s\\]/g;
    return str.replace(regex, maskCharacter);
}

module.exports = {
    countCharactersInString,
    replaceCharacterInString,
    removeElemFromArrayById,
    maskWord,
};