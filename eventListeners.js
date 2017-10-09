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
        var winCondition = checkWin(gameMatrix, PLAYER);
        if (winCondition) {
            win = true;
            alert('win ' + winCondition);
        } else {
            makeChoiceComputer(gameMatrix);
            winCondition = checkWin(gameMatrix, COMPUTER);
            if (winCondition) {
                win = true;
                alert('win ' + winCondition);
            }
        }
    }
});