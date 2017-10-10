var CHOICE_X = "X",
    CHOICE_O = "O",
    choice,
    gameMatrix = [],
    PLAYER = 1,
    COMPUTER = 2,
    WIN_PLAYER = "You won !",
    WIN_COMPUTER = "Computer won !",
    DRAW = "Nobody won !",
    win = false,
    wins = 0,
    losses = 0;

//init game matrix
for (var i = 0; i < 3; i++) {
    gameMatrix[i] = [];
    for (var j = 0; j < 3; j++) {
        gameMatrix[i][j] = 0;
    }
}