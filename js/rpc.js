var rpc = rpc || {};
// rpc.socketId = null;
rpc.server_socketId = null;
rpc.hooks = {};
rpc._onConnectedCallback = function(result) {
    console.log('_onConnectedCallback');
    if(rpc.hooks.onConnectedCallback){
        rpc.hooks.onConnectedCallback(result);
    }
};

rpc._onSocketAcceptedCallback = function(acceptInfo){
    console.log('_onSocketAcceptedCallback');
    rpc.socketId = acceptInfo.socketId;
    if(rpc.hooks.onSocketAcceptedCallback){
        rpc.hooks.onSocketAcceptedCallback(acceptInfo);
    }
};

rpc._onCreatedServerCallback = function(result){
    console.log('_onCreatedServerCallback');
    chrome.socket.accept(rpc.server_socketId, rpc._onSocketAcceptedCallback);
    if(rpc.hooks.onCreatedServerCallback){
        rpc.hooks.onCreatedServerCallback(result);
    }
};

rpc._onWriteCallback = function(writeInfo){
    if(rpc.hooks.onWriteCallback){
        rpc.hooks.onWriteCallback(writeInfo);
    }
};
rpc._onReadCallback = function(readInfo){
    if(rpc.hooks.onReadCallback){
        if(readInfo.resultCode>0){
            var strData = com.b2str(readInfo.data);
            var objData = JSON.parse(strData);
            rpc.hooks.onReadCallback(objData);
        }
    }
};

rpc.connect = function(ip, port, onConnectedCallback) {
    rpc.hooks.onConnectedCallback = onConnectedCallback;
    chrome.socket.create('tcp', {}, function(createInfo) {
        rpc.socketId = createInfo.socketId;
        chrome.socket.connect(createInfo.socketId, ip, port, rpc._onConnectedCallback);
    });
};
rpc.write = function(data, writeCallback){
    if(!rpc.socketId)
        return false;
    var stringData = JSON.stringify(data);
    var arrayBufferData = com.str2ab(stringData);
    rpc.hooks.onWriteCallback = writeCallback;
    chrome.socket.write(rpc.socketId, arrayBufferData, rpc._onWriteCallback);
};

rpc.read = function(readCallback) {
    if (rpc.socketId) {
        rpc.hooks.onReadCallback = readCallback;
        chrome.socket.read(rpc.socketId, null, rpc._onReadCallback);
    }
};

rpc.disconnect = function(socketId, server_socketId) {
    if(server_socketId){
        chrome.socket.destroy(server_socketId);
    }
    if (socketId) {
        chrome.socket.destroy(socketId);
    }
};

rpc.createServer = function(ip, port, onCreatedServerCallback, onSocketAcceptedCallback) {
    rpc.hooks.onCreatedServerCallback = onCreatedServerCallback;
    rpc.hooks.onSocketAcceptedCallback = onSocketAcceptedCallback;
    if (!rpc.server_socketId) {
        chrome.socket.create('tcp', {}, function(createInfo) {
            rpc.server_socketId = createInfo.socketId;
            chrome.socket.listen(rpc.server_socketId, ip, port, rpc._onCreatedServerCallback);
        });
    } else {
        //TODO:
    }
};