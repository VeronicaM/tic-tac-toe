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

    if (!text) {
        $(this).text(choice);
        makeChoice(index, PLAYER);
        makeChoiceComputer();
        var win = checkWin();
        if (win) {
            alert('win ' + win);
        }
    }
});