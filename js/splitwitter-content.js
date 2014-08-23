function injectCode() {
    console.log('enabled');
}

chrome.storage.sync.get({
    enabled: true,
}, function(items) {
    if (items.enabled) {
        injectCode();
    }
});