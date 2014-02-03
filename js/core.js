
var onConnectedCallback = function(result){
    
};

(function main() {
    chrome.socket.create('tcp', {}, function(createInfo) {
        chrome.socket.connect(createInfo.socketId, config.serverIp, config.serverPort, onConnectedCallback);
    });
}());