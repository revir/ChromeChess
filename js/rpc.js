var rpc = {};
rpc.socketId = null;

rpc.onConnectedCallback = function(result) {

};

rpc.onSocketAcceptedCallback = function(acceptInfo){

};

rpc.onCreatedServerCallback = function(result){
    chrome.socket.accept(rpc.socketId, onSocketAcceptedCallback);
};

rpc.connect = function(ip, port) {
    chrome.socket.create('tcp', {}, function(createInfo) {
        rpc.socketId = createInfo.socketId;
        chrome.socket.connect(createInfo.socketId, ip, port, onConnectedCallback);
    });
};

rpc.read = function() {
    if (rpc.socketId) {
        chrome.socket.read(rpc.socketId, null, function(readInfo) {
            if (readInfo.resultCode > 0) {
                // readInfo.data is an arrayBuffer.
            }
        });
    }
};

rpc.disconnect = function() {
    if (rpc.socketId) {
        chrome.socket.disconnect(rpc.socketId);
        rpc.socketId = null;
    }
};

rpc.createServer = function(ip, port) {
    if (!rpc.socketId) {
        chrome.socket.create('tcp', {}, function(createInfo) {
            rpc.socketId = createInfo.socketId;
            chrome.socket.listen(rpc.socketId, ip, port, onCreatedServerCallback);
        });
    } else {
        //TODO:
    }
};