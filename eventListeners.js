$("#X").click(function() {
    choice = CHOICE_X;
    showGame();
});
$("#O").click(function() {
    choice = CHOICE_O;
    showGame();
});

$(".cell").click(function(e) {
    var text = $(this).text();
    var index = $(this).attr('index');

    if (!text && !win) {
        $(this).text(choice);
        makeChoice(gameMatrix, index, PLAYER);
        var winResult = checkWin(gameMatrix, PLAYER);
        var winCondition = winResult[0];
        if (winCondition === WIN_PLAYER) {
            win = true;
            colorWin(winResult[1], "green");
            wins++;
            alert(winCondition);
            updateScore("wins", wins);
        } else if (winCondition === DRAW) {
            alert(DRAW);
            startGame();
            drawNewGame();
        } else {
            makeChoiceComputer(gameMatrix);
            winResult = checkWin(gameMatrix, COMPUTER);
            winCondition = winResult[0];
            if (winCondition === WIN_COMPUTER) {
                win = true;
                losses++;
                updateScore("losses", losses);
                colorWin(winResult[1], "red");
                alert(winCondition);
            }
        }
    } else if (win) {
        startGame();
        drawNewGame();
    }
});