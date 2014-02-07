window.onload = function() {
    com.bg = new com.class.Bg();
    com.dot = new com.class.Dot();
    com.pane = new com.class.Pane();
    com.pane.isShow = false;

    com.childList = [com.bg, com.dot, com.pane];
    com.mans = {}; //棋子集合
    com.createMans(com.initMap); //生成棋子  
    com.bg.show();

    $('#restart').prop('disabled', true);
    chrome.runtime.sendMessage({
        type: 'getSocket'
    }, function(result) {
        rpc.disconnect(result.socketId, result.server_socketId);
    });
    // com.get("bnBox").style.display = "block";
};

function onSocketAcceptedCallback(acceptInfo) {
    $('.pinfo').append("<p>对手已加入， 红方先手!</p>");
    play.competitor = play.myRole === 'red' ? 'black' : 'red';
    $('#restart').prop('disabled', false);
    rpc.read(onRpcCallback);
}

function onCreatedServerCallback(result) {
    if (result < 0) {
        bootbox.alert('创建服务失败，请重试！');
    } else {
        play.init('red');
        $('#startServer, #connectServer').prop('disabled', true);
        $('.pinfo').append("<p>棋局已摆好， 等待对手加入...</p>");
        chrome.runtime.sendMessage({
            type: 'saveSocket',
            server_socketId: rpc.server_socketId
        });
    }
}

function onConnectedToServerCallback(result) {
    if (result < 0) {
        bootbox.alert('连接服务器失败，请重试！');
    } else {
        $('.pinfo').append("<p>已加入棋局， 红方先手!</p>");
        play.init('black');
        play.competitor = play.myRole === 'red' ? 'black' : 'red';
        $('#startServer, #connectServer').prop('disabled', true);
        $('#restart').prop('disabled', false);

        rpc.read(onRpcCallback);
    }
}

function onRpcCallback(data) {
    if (data.type === 'confirmRestart') {
        bootbox.confirm('对方请求重来一盘， 是否允许？', function(allow) {
            if (allow) {
                $('.pinfo').html('');
                play.init(play.myRole);
                play.competitor = play.myRole === 'red' ? 'black' : 'red';
            }
            rpc.write({
                'type': 'restart',
                'allow': allow
            });
        });
    } else if (data.type === 'restart') {
        bootbox.hideAll();
        if (data.allow) {
            $('.pinfo').html('');
            play.init(play.myRole);
            play.competitor = play.myRole === 'red' ? 'black' : 'red';
        } else {
            bootbox.alert('对方不同意重来一盘！');
        }
    } else if (data.type === 'move') {
        var newX = 8 - data.x;
        var newY = 9 - data.y;
        play.moveChess(data.nowManKey, newX, newY);
        play.currentPlayer = play.myRole;
    } else if (data.type === 'eat') {
        var newX2 = 8 - data.x;
        var newY2 = 9 - data.y;
        play.eatChess(data.nowManKey, data.key, newX2, newY2);
        play.currentPlayer = play.myRole;
    } else if (data.type === 'closed') {
        rpc.disconnect(rpc.socketId, rpc.server_socketId);
        bootbox.alert('对方已退出棋局!');
    }
    rpc.read(onRpcCallback);
}

$(document).click(function(e) {
    var target = $(e.target);
    if (target.is('#startServer')) {
        rpc.createServer('0.0.0.0', 8776, onCreatedServerCallback, onSocketAcceptedCallback);
    } else if (target.is('#connectServer')) {
        bootbox.prompt("IP地址: ", function(result) {
            if (!result) {
                bootbox.alert('请输入IP地址才能连接!');
            } else {
                rpc.connect(result, 8776, onConnectedToServerCallback);
            }
        });
    } else if (target.is('#restart')) {
        rpc.write({
            type: 'confirmRestart'
        });
        bootbox.alert('等待对方确认重来一盘！');
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
// chrome.app.window.current().onClosed.addListener(function() {
//     rpc.write({
//         type: 'closed'
//     }, function() {

//     });
// });