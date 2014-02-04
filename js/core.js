chrome.app.runtime.onLaunched.addListener(function() {
    // Tell your app what to launch and how.
    chrome.app.window.create('index.html', {
        bounds: {
            width: 1080,
            height: 800,
            left: 100,
            top: 100
        },
        minWidth: 800,
        minHeight: 600
    });

});