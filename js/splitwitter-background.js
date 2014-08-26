/* Copyright (c) 2014, Maarten Paauw & Owain van Brakel. All rights reserved.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 2 and
 * only version 2 as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */

function checkForValidUrl(tabId, changeInfo, tab) {
    // Check if the open tab is twitter
    if (tab.url.indexOf("twitter.com") > -1) {
        // Set the Splitwitter logo in the URL bar
        setIcon(tab);
        chrome.pageAction.show(tabId);
    }
};

function setIcon(tab) {
    // Get our local settings
    chrome.storage.sync.get({
        enabled: true,
        hashtag: true,
        colorize: true,
        token: undefined,
        secret: undefined
    }, function(items) {
        // If Splitwitter is enabled show the purple icons otherwise show the grey icon
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

    // Get our local settings
    chrome.storage.local.get({
        token: null,
        secret: null,
        screenName: null
    }, function(items) {
        // If the user isn't logged in show the grey icon
        if (items.token == null) {
            chrome.pageAction.setIcon({
                path:"../img/icon38_grey.png", tabId:tab.id
            });
        }
    });
}

// Add on update listener
chrome.tabs.onUpdated.addListener(checkForValidUrl);