function save_options() {
    var enabled = document.getElementById("enabled").checked;
    var hashtag = document.getElementById("hashtag").checked;
    
    chrome.storage.sync.set({
        enabled: enabled,
        hashtag: hashtag
    });
}

function restore_options() {
    chrome.storage.sync.get({
        enabled: true,
        hashtag: true
    }, function(items) {
        document.getElementById('enabled').checked = items.enabled;
        document.getElementById('hashtag').checked = items.hashtag;
    });

    document.getElementById('save').addEventListener('click', save_options);
}

document.addEventListener('DOMContentLoaded', restore_options);