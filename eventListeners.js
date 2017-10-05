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
        makeChoice(index, PLAYER);
        var winCondition = checkWin();
        if (winCondition) {
            win = true;
            alert('win ' + winCondition);
        } else {
            makeChoiceComputer();
            winCondition = checkWin();
            if (winCondition) {
                win = true;
                alert('win ' + winCondition);
            }
        }
    }
});