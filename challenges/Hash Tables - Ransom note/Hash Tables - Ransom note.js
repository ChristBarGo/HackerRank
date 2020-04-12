'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/* 
After checking preconditions specified in the exercise statement they are applied to 'magazine' and 'note' parameters, each item of 'note' is searched in 'magazine taking into account they are case-sensitive'. In case a 'note' word is found in 'magazine', it will be removed in this last one. If not, as Harold did not find a word for his ransom note, the function automatically will print "No". The function just will print "Yes" when each word of 'note' is exactly found in 'magazine' variable.
*/
function checkMagazine(magazine, note) {
    const POSITIVE_RESULT = "Yes";
    const NEGATIVE_RESULT = "No";
    const ARRAY_MAX_LENGTH = 30000;

    var printResult = POSITIVE_RESULT;

    if (magazine != null && note != null &&
        magazine.length >= 1 && magazine.length <= ARRAY_MAX_LENGTH &&
        note.length >= 1 && note.length <= ARRAY_MAX_LENGTH) {
        const SPACE_CHAR = " ";
        const MIN_WORD_LENGTH = 1;
        const MAX_WORD_LENGTH = 5;

        var currentRansomWord;
        var wordInMagazineIndex;

        for (var i = 0; i < note.length; i++) {
            currentRansomWord = note[i];
            if (currentRansomWord.length >= MIN_WORD_LENGTH &&
                currentRansomWord.length <= MAX_WORD_LENGTH &&
                /^[a-z]+$/i.test(currentRansomWord)) {
                wordInMagazineIndex = magazine.indexOf(currentRansomWord);
                if (wordInMagazineIndex > -1) {
-                    magazine.splice(wordInMagazineIndex, 1);
                }   
                else {
                    printResult = NEGATIVE_RESULT;
                    break;
                }        
            }
            else {
                printResult = NEGATIVE_RESULT;
                break;
            } 
        }
    }

    console.log(printResult);
}

function main() {
    const mn = readLine().split(' ');

    const m = parseInt(mn[0], 10);

    const n = parseInt(mn[1], 10);

    const magazine = readLine().split(' ');

    const note = readLine().split(' ');

    checkMagazine(magazine, note);
}
