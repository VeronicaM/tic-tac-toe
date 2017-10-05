function showGame() {
    $('.prompt').hide();
    $('.table').css('display', 'flex');
}

function drawChoiceComputer(index, COMPUTER_CHOICE) {
    var query = "[index ='" + index + "'";
    $(query).text(COMPUTER_CHOICE);
}