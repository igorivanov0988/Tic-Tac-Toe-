$(document).ready(function(){
const gameArea = document.getElementById('gameArea');
const cell = document.getElementsByClassName('cell');
const movePlayerMain = document.getElementById('movePlayer');

$('.btn').click(function(){
    $('.contentBlock').slideToggle(300, function(){
        if ($(this).is(':hidden')) {
            $('.btn').html('Старт');
        } else {
            $('.btn').html('Свернуть игру');
        }
    });
    return false;
});

var player = "x";

const winIndex = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

for(let i = 1; i <= 9; i++) {
    gameArea.innerHTML += "<div class='cell' pos=" + i + "></div>";
}

for (let i = 0; i< cell.length; i++) {
    cell[i].addEventListener('click', clickOnBoard, false);
}

function clickOnBoard() {

    const data = [];

    if(!this.innerHTML) {
        this.innerHTML = player;
    }else {
        alert("Ячейка занята");
        return;
    }

    for(let i in cell){
        if(cell[i].innerHTML == player){
            data.push(parseInt(cell[i].getAttribute('pos')));
        }
    }

    if(checkWinnings(data)) {

        $("#dial").dialog(
                {modal:true},
                {minWidth:400},
                {title:"Игра окончена! " +
                    " Выиграл: " + player},
                {buttons:{"Начать новую игру":function(){ $(this).dialog("close"); restart()}}},
                {close:function(){restart()}}
            );
    }else {
        let draw = true;
        for(let i in cell) {
            if(cell[i].innerHTML == '') draw = false;
        }
        if(draw) {
            $("#dial").dialog(
                {modal:true},
                {title:"Игра окончена! " +
                        " Ничья :)"},
                {buttons:{"Начать новую игру":function(){ $(this).dialog("close"); restart()}}},
                {close:function(){restart()}}
            );
        }
    }

    player = player == "x" ? "o" : "x";
    movePlayerMain.innerHTML = player.toUpperCase();
}

function checkWinnings(data) {
    for(let i in winIndex) {
        let win = true;
        for(var j in winIndex[i]) {
            let id = winIndex[i][j];
            let ind = data.indexOf(id);

            if(ind == -1) {
                win = false
            }
        }

        if(win) return true;
    }
    return false;
}

function restart() {
    for(let i = 0; i < cell.length; i++) {
        cell[i].innerHTML = '';
    }
}
});