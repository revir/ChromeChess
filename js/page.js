window.onload = function() {
    com.bg = new com.class.Bg();
    com.dot = new com.class.Dot();
    com.pane = new com.class.Pane();
    com.pane.isShow = false;

    com.childList = [com.bg, com.dot, com.pane];
    com.mans = {}; //棋子集合
    com.createMans(com.initMap); //生成棋子  
    com.bg.show();
    // com.get("bnBox").style.display = "block";
};

function onSocketAcceptedCallback(acceptInfo) {
    $('.pinfo').text("对手已加入， 红方先手!");
    play.currentPlayer = 'red';
    $('.pinfo').text(play.currentPlayer);
    if (play.myRole !== play.currentPlayer) {
        play.waitForCompetitor();
    }
}

function onCreatedServerCallback(result) {
    play.init('red');
    $('.pinfo').text("棋局已摆好， 等待对手加入...");
}

function onConnectedToServerCallback(result) {
    // if (result > 0) {
        $('.pinfo').text("已加入棋局， 红方先手!");
        play.init('black');
        play.currentPlayer = 'red';
        $('.pinfo').text(play.currentPlayer);
        if (play.myRole !== play.currentPlayer) {
            play.waitForCompetitor();
        }
    // }
}

$(document).click(function(e) {
    var target = $(e.target);
    if (target.is('#startServer')) {
        rpc.createServer('0.0.0.0', 8776, onCreatedServerCallback, onSocketAcceptedCallback);
    } else if (target.is('#connectServer')) {
        $('#connect-modal').modal();
    } else if (target.is('#startConnect')) {
        $('#connect-modal').modal('hide');
        rpc.connect('192.168.1.105', 8776, onConnectedToServerCallback);
    } else if (target.is('#disconnect')) {
        rpc.disconnect();
        alert('disconnect');

    } else if (target.is('#stypeBn')) {
        // var stype =com.nowStype;
        // if (stype=="stype1") stype="stype2";
        // else if (stype=="stype2") stype="stype1";
        // com.init(stype);
        // com.show();
        // play.depth = 4;
        // play.init();
        // document.cookie="stype=" +stype;
        // clearInterval(timer);
        // var i=0;
        // var timer = setInterval(function (){
        //     com.show();
        //     if (i++>=5) clearInterval(timer);
        // },2000);
    } else if (target.is('#chess')) {
        play.clickCanvas(e);
    }
});