var socketInfo = {};

chrome.runtime.onMessage.addListener(function(msg, sender, respond){
    if(msg.type === 'getSocket'){
        respond(socketInfo);
    } else if(msg.type === 'saveSocket'){
        socketInfo.socketId = msg.socketId;
        socketInfo.server_socketId = msg.server_socketId;
    }
});

chrome.app.runtime.onLaunched.addListener(function() {
    // Tell your app what to launch and how.
    chrome.app.window.create('index.html', {
        id: 'chrome_chess_index_html',
        minWidth: 800,
        minHeight: 600
    });

});