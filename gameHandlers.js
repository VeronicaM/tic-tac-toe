function makeChoice(board, choiceIndex, who) {
    var choiceArray = choiceIndex.split(',').map(Number);
    if (!board[choiceArray[0]][choiceArray[1]]) {
        board[choiceArray[0]][choiceArray[1]] = who;
    }
}

function makeChoiceComputer(board) {
    var computerChoiceValue = computeChoice();
    var computerChoiceText = choice === CHOICE_X ? CHOICE_O : CHOICE_X;

    drawChoiceComputer(computerChoiceValue, computerChoiceText);
    makeChoice(board, computerChoiceValue, COMPUTER);
}

function computeChoice() {
    if (checkFistMove(gameMatrix)) {
        return getRandomChoice(gameMatrix);
    }
    return minmax(gameMatrix, COMPUTER).positionIndex;
}

function checkFistMove(board) {
    return board.reduce(function(a, b) {
        return a.concat(b);
    }).filter(function(val) {
        return val === PLAYER;
    }).length === 1;
}

function getRandomChoice(board) {
    //add random value
    var i = randomIntFromInterval(0, 2),
        j = randomIntFromInterval(0, 2);

    while (board[i][j] !== 0) {
        i = randomIntFromInterval(0, 2),
            j = randomIntFromInterval(0, 2);
    }
    return i + ',' + j;
}

function checkWin(board, player) {
    //rows and columns
    var countPlayerRow = 0,
        countPlayerCol = 0;
    var winResult = player === COMPUTER ? WIN_COMPUTER : WIN_PLAYER;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] === player) {
                countPlayerRow++;
            }
            if (board[j][i] === player) {
                countPlayerCol++;
            }
        }
        if (countPlayerRow === 3 || countPlayerCol === 3) {
            return winResult;
        } else {
            countPlayerRow = 0;
            countPlayerCol = 0;
        }

    }
    //diagonal 1
    if (board[0][0] === player &&
        board[1][1] === player &&
        board[2][2] === player) {
        return winResult;
    }


    //diagonal 2
    if (board[0][2] === player &&
        board[1][1] === player &&
        board[2][0] === player) {
        return winResult;
    }
    //draw
    //flatten gameMatrix array and check for remaining not taken cells
    if (checkDraw(board)) {
        return DRAW;
    }
}

function checkDraw(board) {
    var zeros = board.reduce(function(a, b) {
        return a.concat(b);
    }).filter(function(val) {
        return val === 0;
    }).length;
    if (zeros === 0) {
        return true;
    }
    return false;
}


function availablePositions(board) {
    var newBoard = [];
    for (var i = 0; i < 3; i++) {
        newBoard[i] = [];
        for (var j = 0; j < 3; j++) {
            if (board[i][j] === 0) {
                newBoard[i][j] = 0;
            } else {
                newBoard[i][j] = undefined;
            }
        }
    }
    return newBoard;
}

function minmax(newBoard, player) {
    var availablePos = availablePositions(newBoard);
    var moves = [];
    // checks for the terminal states such as win, lose, and tie and returning a value accordingly

    var winCondition = checkWin(newBoard, player);
    if (winCondition === WIN_PLAYER) {
        return { score: -10 };
    } else if (winCondition === WIN_COMPUTER) {
        return { score: 10 };
    } else if (checkDraw(newBoard)) {
        return { score: 0 };
    }
    // loop through available spots
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (availablePos[i][j] === 0) {
                var move = {};
                move.positionIndex = i + "," + j;
                makeChoice(newBoard, move.positionIndex, player);
                /*collect the score resulted from calling minimax 
                on the opponent of the current player*/
                if (player == PLAYER) {
                    var result = minmax(newBoard, COMPUTER);
                    move.score = result.score;
                } else {
                    var result = minmax(newBoard, PLAYER);
                    move.score = result.score;
                }
                // reset the spot to empty
                newBoard[i][j] = 0;
                // push the object to the array
                moves.push(move);
            }
        }
    }
    // if it is the computer's turn loop over the moves and choose the move with the highest score
    var bestMove;
    if (player === COMPUTER) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        // else loop over the moves and choose the move with the lowest score
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    // return the chosen move (object) from the array to the higher depth
    return moves[bestMove];

}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}