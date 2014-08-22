function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url.indexOf('twitter.com')  > -1) {
        setIcon(tab);
        chrome.pageAction.show(tabId);
    }
};

function setIcon(tab) {
    chrome.storage.sync.get({
        enabled: true,
    }, function(items) {
        if (items.enabled) {
            chrome.pageAction.setIcon({
                path:"../img/icon38.png", tabId:tab.id
            });
        } else {
            chrome.pageAction.setIcon({
                path:"../img/icon38_grey.png", tabId:tab.id
            });
        }
    });
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);

/*
 *
 * ADD THIS TO POPUP CODE WHEN USER CLICKS SAVE!
 *
 */

/*chrome.tabs.getSelected(null, function(tab) {
  var code = 'window.location.reload();';
  chrome.tabs.executeScript(tab.id, {code: code});
});*/
