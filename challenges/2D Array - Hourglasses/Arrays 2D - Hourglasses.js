'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/* Considering arr is a 2D array. My pivot for each hourglass will be the letter 'd' in the hourglass pattern, so the first and last column does not have pivots. In addition, for each row the first and last position can not be a pivot.*/
function getHourglassesSum(arr) {
    var hourglassesSum = [];
    var arrLength = arr.length;
    var previousRow, nextRow;

    for (var i = 1; i < arrLength - 1; i++) {
        previousRow = i - 1;
        nextRow = i + 1;
        for (var j = 1; j < arr[i].length - 1; j++) {
            hourglassesSum.push(arr[previousRow][j - 1] + 
            arr[previousRow][j] + arr[previousRow][j + 1] + 
            arr[i][j] + arr[nextRow][j - 1] + arr[nextRow][j] + 
            arr[nextRow][j + 1]);
		}
    }

    return hourglassesSum;
}

/* The array must meet:
1.- Each element of the array has to be between -9 and 9.
2.- Has to contain 6 rows and 6 columns: 6 x 6 = 36 elements
*/
function arrayPreconditionAreOK(arr) {
    const ARRAY_LENGTH = 6;
    const MIN_PERMITTED_VALUE = -9;
    const MAX_PERMITTED_VALUE = 9;
    var arrayIsOK = true;

    if (arr.length != ARRAY_LENGTH) {
        arrayIsOK = false;
    }
    else {
        for (var i = 0; i < arr.length; i++) {
            if (arrayIsOK) {
                if (arr[i].length != ARRAY_LENGTH) {
                    arrayIsOK = false;
                    break;
                }

                for (var j = 0; j < arr[i].length; j++) {
                    if (arr[i][j] < MIN_PERMITTED_VALUE || arr[i][j] > MAX_PERMITTED_VALUE) {
                        arrayIsOK = false;
                        break;
                    }
                }
            }
        }

    }
    return arrayIsOK;
}

function hourglassSum(arr) {
    const ARR_LENGTH = 36;
    var maxHourglassSum = 0;

    if (arrayPreconditionAreOK(arr)) {
        maxHourglassSum = Math.max(...getHourglassesSum(arr));
    }

    return maxHourglassSum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let arr = Array(6);

    for (let i = 0; i < 6; i++) {
        arr[i] = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    let result = hourglassSum(arr);

    ws.write(result + "\n");

    ws.end();
}
