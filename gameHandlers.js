function makeChoice(choiceIndex, who) {
    var choiceArray = choiceIndex.split(',').map(Number);
    if (!gameMatrix[choiceArray[0]][choiceArray[1]]) {
        gameMatrix[choiceArray[0]][choiceArray[1]] = who;
    }
}

function makeChoiceComputer() {
    var computerChoiceValue = computeChoice();
    var computerChoiceText = choice === CHOICE_X ? CHOICE_O : CHOICE_X;

    drawChoiceComputer(computerChoiceValue, computerChoiceText);
    makeChoice(computerChoiceValue, COMPUTER);
}

function computeChoice() {
    //add random value
    var i = randomIntFromInterval(0, 2),
        j = randomIntFromInterval(0, 2);

    while (gameMatrix[i][j] !== 0) {
        i = randomIntFromInterval(0, 2),
            j = randomIntFromInterval(0, 2);
    }
    return i + ',' + j;
}

function checkWin() {
    //rows and columns
    var countPlayerRow = 0,
        countComputerRow = 0,
        countPlayerCol = 0,
        countComputerCol = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (gameMatrix[i][j] === PLAYER) {
                countPlayerRow++;
            } else if (gameMatrix[i][j] === COMPUTER) {
                countComputerRow++;
            }
            if (gameMatrix[j][i] === PLAYER) {
                countPlayerCol++;
            } else if (gameMatrix[j][i] === COMPUTER) {
                countComputerCol++;
            }
        }
        if (countPlayerRow === 3 || countPlayerCol === 3) {
            return WIN_PLAYER;
        } else if (countComputerRow === 3 || countComputerCol === 3) {
            return WIN_COMPUTER;
        } else {
            countComputerRow = 0;
            countPlayerRow = 0;
            countComputerCol = 0;
            countPlayerCol = 0;
        }

    }

    //diagonal 1
    if (gameMatrix[0][0] === PLAYER &&
        gameMatrix[1][1] === PLAYER &&
        gameMatrix[2][2] === PLAYER) {
        return WIN_PLAYER;
    }
    if (gameMatrix[0][0] === COMPUTER &&
        gameMatrix[1][1] === COMPUTER &&
        gameMatrix[2][2] === COMPUTER) {
        return WIN_COMPUTER;
    }

    //diagonal 2
    if (gameMatrix[0][2] === PLAYER &&
        gameMatrix[1][1] === PLAYER &&
        gameMatrix[2][0] === PLAYER) {
        return WIN_PLAYER;
    }
    if (gameMatrix[0][2] === COMPUTER &&
        gameMatrix[1][1] === COMPUTER &&
        gameMatrix[2][0] === COMPUTER) {
        return WIN_COMPUTER;
    }
    //draw
    //flatten gameMatrix array and check for remaining not taken cells
    var zeros = gameMatrix.reduce(function(a, b) {
        return a.concat(b);
    }).filter(function(val) {
        return val === 0;
    }).length;
    if (zeros === 0) {
        return DRAW;
    }
    // return false;
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}