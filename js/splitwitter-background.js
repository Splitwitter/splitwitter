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
    if (tab.url.indexOf("twitter.com") > -1) {
        setIcon(tab);
        chrome.pageAction.show(tabId);
    }
};

function setIcon(tab) {
    chrome.storage.sync.get({
        enabled: true,
        hashtag: true,
        colorize: true,
        token: undefined,
        secret: undefined
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

    chrome.storage.local.get({
        token: null,
        secret: null,
        screenName: null
    }, function(items) {
        if (items.token == null) {
            chrome.pageAction.setIcon({
                path:"../img/icon38_grey.png", tabId:tab.id
            });
        }
    });
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);