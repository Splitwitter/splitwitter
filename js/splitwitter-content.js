function injectCode() {
    $(".js-tweet-btn").css({ backgroundColor : '#942686', background : 'rgba(148, 38, 134, 1)' });
}

$(document).ready(function() {
    chrome.storage.sync.get({
        enabled: true,
    }, function(items) {
        if (items.enabled) {
            injectCode();
        }
    });
});