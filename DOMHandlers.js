function showGame() {
    $('.prompt').hide();
    $('.table').css('display', 'flex');
}

function drawChoiceComputer(index, COMPUTER_CHOICE) {
    var query = "[index ='" + index + "'";
    $(query).text(COMPUTER_CHOICE);
}

function colorWin(winningCombo, color) {
    for (var i = 0; i < winningCombo.length; i++) {
        var query = "[index ='" + winningCombo[i] + "'";
        $(query).css("color", color);
    }
}

function updateScore(id, score) {
    $("#" + id).text(score);
}

function drawNewGame() {
    $('.prompt').show();
    $('.table').hide();
    $('.table .cell').text("");
    $('.cell').css('color', 'black');
}