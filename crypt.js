function transfromStringToList(textToSplit) {
    return textToSplit.split('')
}

function createString(text) {
    const textToASCII = transfromStringToList(text)
        .reduce(function(accumulator, currentValue) {
        
            const valueInText = transformLetterToASCII(currentValue)

            var valueMultiplied = multiply(valueInText)

            if (valueMultiplied.includes('.')) {
                valueMultiplied = tranformCodefractionated(valueMultiplied)
            }
            
            if (valueMultiplied.length < 3) {
                valueMultiplied = `${getHexNumber(1)}${valueMultiplied}`
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
    const valueMultiplied = ((currentValue * 2) <= 255) 
        ? currentValue * 2
        : currentValue / 2
    return String(valueMultiplied)
}

function tranformCodefractionated(valueMultiplied) {
    return valueMultiplied.replace('.', `0x${getHexNumber(2)}`);
}

function getHexNumber(counter) {
    let string = '', random = ''

    // const letterNumber = '0123456789abcdef'
    // const alphabet = 'abcdefghijklmnopqrstuvwxyz'

    const strings = counter === 1
        ? 'abcdefghijklmnopqrstuvwxyz'
        : '0123456789abcdef'

    while (random.length < counter) {
        string = Math.round(Math.random() * strings.length);
        random += strings.substring(string, string + 1);
    }

    if (random == '0x') {
        getHexNumber(counter)
    }

    return random
}

const text = 'Samuel é'//'Desculpe, só trabalho com casadas'

const textEncrypted = createString(text)

console.log(textEncrypted)






function descrypt(textEncrypted) {
    const textWithoutPoints = descryptPoints(textEncrypted)
    console.log(textWithoutPoints)

    const removeL = removeLetters(textWithoutPoints)
    console.log(removeL)
}

function descryptPoints(textEncrypted) {
    var newText = ''

    const pointsCodes = searchPoints(textEncrypted)
    console.log(pointsCodes)

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
        console.log(letter)
        newText =textWithoutPoints.replace(letter, '0')
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



descrypt(textEncrypted)












// var request = function(url) {
//     fetch(url, {
//         cache: 'reload' // definir o tipo de cache
//     }).then(function(response) {
//         if ( response.ok ) {
//             console.log(response)
//             // texto simples
//             return response.text();
//             // para transformar o `json` que é `string` para um `object`
//             // javascript use `response.json()` que o próximo `then` retornará um `object`
//         }
//         // em caso de resposta "opaca" ou outros erros
//         throw new Error('Fetch error, status code: ' + response.status);
//     }).then(function(text) {
//         // buscar elemento (div)
//         var el = document.getElementById('container');
//         // adicionar resultado (objeto para string)
//         el.innerHTML = el.innerHTML += '<br>' + text;
//     }).catch(function(error) {
//         // caso haja um erro... tratar aqui
//     });

// };

// console.log(request('file:///C:/Users/andre/Desktop/cryptografia/file.txt'))


// function readTextFile(file)
// {
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, false);
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4)
//         {
//             if(rawFile.status === 200 || rawFile.status == 0)
//             {
//                 var allText = rawFile.responseText;
//                 console(allText)
//             }
//         }
//     }
//     rawFile.send(null);
// }

// readTextFile("file:///C:/Users/andre/Desktop/cryptografia/file.txt");

// fetch('file:///C:/Users/andre/Desktop/cryptografia/file.txt')
//   .then(response => response.text())
//   .then(text => console.log(text))

// var openFile = function(event) {
//     var input = event.target;

//     var reader = new FileReader();
//     reader.onload = function(){
//       var text = reader.result;
//       var node = document.getElementById('output');
//       node.innerText = text;
//       console.log(reader.result.substring(0, 200));
//     };
//     reader.readAsText(input.files[0]);
//   };

// openFile('file:///C:/Users/andre/Desktop/cryptografia/file.txt')



































// function tranformCodefractionated(valueMultiplied) {
//     // const random = getHexNumber()

//     // console.log(historyToHexNumber(valueMultiplied, random))

//     return valueMultiplied.replace('.', '0x46');
// }

// function getHexNumber() {
//     let string = '', random = ''
//     // const letterNumber = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
//     const letterNumber = '0123456789abcdef'

//     for (let count = 0; count < 2; count++) {
//         string = Math.round(Math.random() * letterNumber.length);
//         random += letterNumber.substring(string, string + 1);
//     }
//     return random
// }

// function historyToHexNumber(valueMultiplied, random) {
//     valueMultiplied = `key-${valueMultiplied}`

//     console.log('asdf',valueMultiplied, random)

//     // history.push({
//     //     valueMultiplied: random
//     // })
// }

// A = 065 --- 65 * 2= 130 = é
