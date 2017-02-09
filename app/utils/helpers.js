var countCharactersInString = str => {
    return str.replace(/ /g, '').length;
};

var replaceCharacterInString = (str, index, character) => {
    return str.substr(0, index) + character + str.substr(index + character.length);
};

module.exports = {
    countCharactersInString,
    replaceCharacterInString,
};