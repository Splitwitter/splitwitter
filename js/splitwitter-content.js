function injectCode() {
    $(".js-tweet-btn").css({ backgroundColor : '#942686', background : 'rgba(148, 38, 134, 1)' });
    $(".tweet-btn").css({ backgroundColor : '#942686', background : 'rgba(148, 38, 134, 1)' });
    $(".dm-new-button").css({ backgroundColor : '#942686', background : 'rgba(148, 38, 134, 1)', border : 'none' });
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