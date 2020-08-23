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

            var valueMultiplied = checksIfTheValuesWillBeMultipliedOrDivided(valueInText)

            if (valueMultiplied.includes('.')) {
                valueMultiplied = tranformCodeFractionated(valueMultiplied)
            }

            if (valueMultiplied.length < 3) {
                valueMultiplied = `${createHash(1)}${valueMultiplied}`
            }

            return accumulator.concat(valueMultiplied)
        }, '')
    return textToASCII
}

function transformLetterToASCII(currentValue) {
    return currentValue.charCodeAt()
}

function checksIfTheValuesWillBeMultipliedOrDivided(currentValue) {
    let valueMultiplied, hash

    if ((currentValue * 2) <= 255) {
        valueMultiplied = String(currentValue * 2)
        hash = checkExistInKeysOfOperation('multiply', createHash(1, true),
            keysOfOperation.multiplied, keysOfOperation.divided)
        addHashInKeysOfOperation(keysOfOperation.multiplied, hash)
    }
    else {
        valueMultiplied = String(currentValue / 2)
        hash = checkExistInKeysOfOperation('divide', createHash(1, true),
            keysOfOperation.multiplied, keysOfOperation.divided)
        addHashInKeysOfOperation(keysOfOperation.divided, hash)
    }

    return valueMultiplied += hash
}

function checkExistInKeysOfOperation(id, hash, multiplied, divided) {
    if (id === 'multiply' && multiplied.length <= 6) {
        hash = getHash(multiplied, divided, hash)
    }
    else if (multiplied.length === 7) {
        hash = multiplied[Math.floor(Math.random() * 6)]
    }

    if (id === 'divide' && divided.length <= 6) {
        hash = getHash(multiplied, divided, hash)
    }
    else if (divided.length === 7) {
        hash = divided[Math.floor(Math.random() * 6)]
    }
    return hash
}

function getHash(multiplied, divided, hash) {
    while (multiplied.includes(hash) || divided.includes(hash) || hash === undefined) {
        hash = createHash(1, true)
    }
    return hash
}

function addHashInKeysOfOperation(value, hash) {
    if (value.length <= 6) {
        value.push(hash)
    }
}

function tranformCodeFractionated(valueMultiplied) {
    return valueMultiplied.replace('.', `0x${createHash(2)}`);
}

function createHash(counter, stringType) {
    let string = '', random = ''
    const strings = stringsForHash(counter, stringType)

    while (random.length < counter) {
        string = Math.round(Math.random() * strings.length);
        random += strings.substring(string, string + 1);
    }

    if (random === undefined) {
        createHash(counter, stringType)
    }

    return random
}

function stringsForHash(counter, stringType = false) {
    if (counter === 1) {
        return stringType === false
            ? 'abcdefghijklmnopqrstuvwyz'
            : '!@#$%&*()_-=/+'
    }
    else if (counter === 2) {
        return '0123456789abcdef'
    }
}

function descrypt(textEncrypted) {
    const textWithoutPoints = descryptPoints(textEncrypted)

    const originalValue = returnToTheOriginalValue(textWithoutPoints)

    let text = ''

    for (let code of originalValue) {
        text += transformASCIIToLetter(code)
    }

    return text
}

function descryptPoints(textEncrypted) {
    const pointsCodes = getPoints(textEncrypted)

    if (pointsCodes != []) {
        for (let char of pointsCodes) {
            textEncrypted = textEncrypted.replace(char, '.')
        }
    }
    return textEncrypted
}

function getPoints(textEncrypted) {
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
                codes = ''
            }
        }
    }

    return accumulator
}

function removeLetters(textWithoutPoints) {
    const letters = findLetters(textWithoutPoints)

    var newText = ''
    for (let letter of letters) {
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

function transformASCIIToLetter(textEncrypted) {
    const regex = /[0-9]/
    let text = '', code = ''

    for (let char of textEncrypted) {
        if (regex.test(char) && code.length != 3) {
            code += char
        }
        text += char
    }
}

function returnToTheOriginalValue(textEncrypted) {
    const regex = /[0-9]/
    let listOfCodes = [], code = ''

    for (let char of textEncrypted) {
        if (regex.test(char) || char == '.') {
            code += char
        }

        if (!regex.test(char) && char != '.') {
            listOfCodes.push(remultiplicar(code, char))
            code = ''
        }
    }

    return listOfCodes
}

function remultiplicar(code, key) {
    return keysOfOperation.multiplied.indexOf(key) != -1
        ? code / 2
        : code * 2
}

function transformASCIIToLetter(code) {
    return String.fromCharCode(code)
}



const text = 'O Brasil é um país continental, considerado o 5º maior do mundo em extensão territorial'

const textEncrypted = encrypt(text)

const textDescrypt = descrypt(textEncrypted)


// console.log(keysOfOperation)

console.log(text)

console.log(textEncrypted)

console.log(textDescrypt)
var fileSelected2 = document.getElementById('textFiltDescriptografado')

window.onload = function () {
    //Check the support for the File API support
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('txtfiletoread');
        var fileSelected2 = document.getElementById('textFiltDescriptografado')
        if (fileSelected) {
            fileSelected.addEventListener('change', function (e) {
                //Set the extension for the file
                var fileExtension = /text.*/;
                //Get the file object
                var fileTobeRead = fileSelected.files[0];
                //Check of the extension match
                if (fileTobeRead.type.match(fileExtension)) {
                    //Initialize the FileReader object to read the 2file
                    var fileReader = new FileReader();
                    fileReader.onload = function (e) {
                        var fileContents = document.getElementById('filecontents');
                        fileContents.innerText = encrypt(fileReader.result);
                    }
                    fileReader.readAsText(fileTobeRead);
                }
                else {
                    alert("Por favor selecione arquivo texto");
                }

            }, false);
        }
        if (fileSelected2) {
            fileSelected2.addEventListener('change', function (e) {
                //Set the extension for the file
                var fileExtension = /text.*/;
                //Get the file object
                var fileTobeRead = fileSelected2.files[0];
                //Check of the extension match
                if (fileTobeRead.type.match(fileExtension)) {
                    //Initialize the FileReader object to read the 2file
                    var fileReader = new FileReader();
                    fileReader.onload = function (e) {
                        var fileContents = document.getElementById('filecontentsOriginal');
                        console.log(fileReader.result)
                        fileContents.innerText = descrypt(fileReader.result);
                    }
                    fileReader.readAsText(fileTobeRead);
                }
                else {
                    alert("Por favor selecione arquivo texto");
                }

            }, false);
        }
        else {
            alert("Arquivo(s) não suportado(s)");
        }
    }

}