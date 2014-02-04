var rpc = {};
rpc.socketId = null;
rpc.hooks = {};
rpc._onConnectedCallback = function(result) {
    console.log('_onConnectedCallback');
    if(rpc.hooks.onConnectedCallback){
        rpc.hooks.onConnectedCallback(acceptInfo);
    }
};

rpc._onSocketAcceptedCallback = function(acceptInfo){
    console.log('_onSocketAcceptedCallback');
    if(rpc.hooks.onSocketAcceptedCallback){
        rpc.hooks.onSocketAcceptedCallback(acceptInfo);
    }
};

rpc._onCreatedServerCallback = function(result){
    console.log('_onCreatedServerCallback');
    chrome.socket.accept(rpc.socketId, rpc._onSocketAcceptedCallback);
    if(rpc.hooks.onCreatedServerCallback){
        rpc.hooks.onCreatedServerCallback(result);
    }
};

rpc.connect = function(ip, port, onConnectedCallback) {
    rpc.hooks.onConnectedCallback = onConnectedCallback;
    chrome.socket.create('tcp', {}, function(createInfo) {
        rpc.socketId = createInfo.socketId;
        chrome.socket.connect(createInfo.socketId, ip, port, rpc._onConnectedCallback);
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

rpc.createServer = function(ip, port, onCreatedServerCallback, onSocketAcceptedCallback) {
    rpc.hooks.onCreatedServerCallback = onCreatedServerCallback;
    rpc.hooks.onSocketAcceptedCallback = onSocketAcceptedCallback;
    if (!rpc.socketId) {
        chrome.socket.create('tcp', {}, function(createInfo) {
            rpc.socketId = createInfo.socketId;
            chrome.socket.listen(rpc.socketId, ip, port, rpc._onCreatedServerCallback);
        });
    } else {
        //TODO:
    }
};