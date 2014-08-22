function save_options() {
    var checked = document.getElementById("enabled").checked;
    chrome.storage.sync.set({
        enabled: checked
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 1500);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        enabled: true,
    }, function(items) {
        document.getElementById('enabled').checked = items.enabled;
    });

    document.getElementById('save').addEventListener('click', save_options);
}

document.addEventListener('DOMContentLoaded', restore_options);