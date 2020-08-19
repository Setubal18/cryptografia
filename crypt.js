var keysOfOperation = {
    multiplied: [],
    divided: []
}

function transfromStringToList(textToSplit) {
    return textToSplit.split('')
}

function encrypt(text) {
    const textToASCII = transfromStringToList(text)
        .reduce(function (accumulator, currentValue) {

            const valueInText = transformLetterToASCII(currentValue)

            var valueMultiplied = multiply(valueInText)

            if (valueMultiplied.includes('.')) {
                // valueMultiplied = tranformCodeFractionated(valueMultiplied)
            }

            if (valueMultiplied.length < 3) {
                // valueMultiplied = `${getHash(1)}${valueMultiplied}`
            }

            console.log(valueMultiplied)

            return accumulator.concat(valueMultiplied)
        }, '')
    return textToASCII
}

function transformLetterToASCII(currentValue) {
    return currentValue.charCodeAt()
}

function multiply(currentValue) {
    var valueMultiplied = '', multiplied = false

    if ((currentValue * 2) <= 255) {
        valueMultiplied = String(currentValue * 2)
        multiplied = true
    }
    else {
        SvalueMultiplied = String(currentValue / 2)
    }

    if (multiplied === true) {
        console.log('Entrou1111111')
        var hash = checkExistInKeysOfOperation(keysOfOperation.multiplied, keysOfOperation.divided, hash)
        addHashInKeysOfOperation(keysOfOperation.multiplied, hash)
    }
    else {
        console.log('Entrou22222222')
        var hash = checkExistInKeysOfOperation(keysOfOperation.multiplied, keysOfOperation.divided, hash)
        addHashInKeysOfOperation(keysOfOperation.divided, hash)
    }

    const valueWithHash = valueMultiplied += hash

    return valueWithHash
}

function addHashInKeysOfOperation(value, hash) {
    if (value.length <= 7) {
        value.push(hash)
    }
}

function checkExistInKeysOfOperation(value, value2, hash) {
    while (value.includes(hash) || value2.includes(hash) || hash === undefined) {
        hash = getHash(1, true)
    }
    return hash
}


function tranformCodeFractionated(valueMultiplied) {
    return valueMultiplied.replace('.', `0x${getHash(2)}`);
}

function stringsForHash(counter, stringType = false) {
    if (counter === 1) {
        return stringType === false
            ? 'abcdefghijklmnopqrstuvwxyz'
            : '!@#$%&*()_-=/+'
    }
    else if (counter === 2) {
        return '0123456789abcdef'
    }
}

function getHash(counter, stringType) {
    let string = '', random = ''
    const strings = stringsForHash(counter, stringType)

    while (random.length < counter) {
        string = Math.round(Math.random() * strings.length);
        random += strings.substring(string, string + 1);
    }

    // if (random == '0x') {getHash(counter)}

    return random
}


console.log(keysOfOperation)

const text = 'Samuel é'//'Desculpe, só trabalho com casadas'

const textEncrypted = encrypt(text)

console.log(textEncrypted)

// console.log(multiplied)
// console.log(divided)




function descrypt(textEncrypted) {
    const textWithoutPoints = descryptPoints(textEncrypted)
    console.log(textWithoutPoints)

    const lettersRemoved = removeLetters(textWithoutPoints)
    console.log(lettersRemoved)

    const codeChar = getCode(lettersRemoved)
    console.log(codeChar)
}

function descryptPoints(removeL) {
    var newText = ''

    const pointsCodes = searchPoints(textEncrypted)

    for (char of pointsCodes) {
        newText = textEncrypted.replace(pointsCodes, '.')
    }
    return newText
}

function searchPoints(textEncrypted) {

    if (textEncrypted.includes('0x')) {
        var accumulator = [], codes = ''

        for (let char of textEncrypted) {

            if (codes === '0' && char !== 'x') {
                codes = ''
            }

            if (char === '0') {
                codes += char
            }

            else if (codes === '0' && char === 'x') {
                codes += char
            }

            else if (codes.length >= 2 && codes.length <= 4) {
                codes += char
            }

            if (codes.length === 4) {
                accumulator.push(codes)
            }
        }
    }

    return accumulator
}

function removeLetters(textWithoutPoints) {
    const letters = findLetters(textWithoutPoints)

    var newText = ''
    for (letter of letters) {
        newText = textWithoutPoints.replace(letter, '0')
    }
    return newText
}

function findLetters(textWithoutPoints) {
    const regex = /[a-z]/

    if (regex.test(textWithoutPoints)) {
        var listOfLetters = []

        for (let char of textWithoutPoints) {
            if (regex.test(char)) {
                listOfLetters.push(char)
            }
        }
    }
    return listOfLetters
}

function getCode(lettersRemoved) {
    var listOfCodes = [], aux = ''
    let { length, [length - 1]: lastElement } = listOfCodes

    for (let str of lettersRemoved) {
        if (aux.length === 3) {
            listOfCodes.push(aux)
            aux = ''
        }

        if (listOfCodes.length >= 1) {
            if (str === '.' || listOfCodes[listOfCodes.length - 1].length === 4) {
                listOfCodes[listOfCodes.length - 1] += str
                str = ''
            }
        }

        aux += str
    }
    return listOfCodes
}



// descrypt(textEncrypted)