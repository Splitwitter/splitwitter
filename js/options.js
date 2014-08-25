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

function saveOptions() {
    var enabled = document.getElementById("enabled").checked;
    var hashtag = document.getElementById("hashtag").checked;
    var colorize = document.getElementById("colorize").checked;

    chrome.storage.sync.set({
        enabled: enabled,
        hashtag: hashtag,
        colorize: colorize
    });

    chrome.tabs.getSelected(null, function(tab) {
        if (tab.url.indexOf('twitter.com') > -1) {
            chrome.tabs.reload(tab.id)
        }
    });
}

function checkboxState() {
    var enabled = document.getElementById("enabled").checked;

    document.getElementById("hashtag").disabled = !enabled;
    document.getElementById("colorize").disabled = !enabled;
}

function loginTwitter() {
    var cb = new Codebird;
    cb.setConsumerKey(CONSUMER_KEY, CONSUMER_SECRET);

    cb.__call(
        "oauth_requestToken",
        {oauth_callback: "oob"},
        function (reply) {
            chrome.storage.sync.set({
                token: reply.oauth_token,
                secret: reply.oauth_token_secret
            });

            console.debug(reply.oauth_token);
            console.debug(reply.oauth_token_secret);

            // stores it
            cb.setToken(reply.oauth_token, reply.oauth_token_secret);

            // gets the authorize screen URL
            cb.__call(
                "oauth_authorize",
                {},
                function (auth_url) {
                    window.codebird_auth = window.open(auth_url);
                }
            );
        }
    );
}

function restoreOptions() {
    chrome.storage.sync.get({
        enabled: true,
        hashtag: true,
        colorize: true,
        token: null,
        secret: null
    }, function(items) {
        document.getElementById('enabled').checked = items.enabled;
        document.getElementById('hashtag').checked = items.hashtag;
        document.getElementById('colorize').checked = items.colorize;
    });

    document.getElementById('save').addEventListener('click', saveOptions);
    document.getElementById('enabled').addEventListener('click', checkboxState);
    document.getElementById('login').addEventListener('click', loginTwitter);
}

document.addEventListener('DOMContentLoaded', restoreOptions);

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
                    'Old value was "%s", new value is "%s".',
                    key,
                    namespace,
                    storageChange.oldValue,
                    storageChange.newValue);
    }
});

chrome.storage.sync.get({
    enabled: true,
    hashtag: true,
    colorize: true,
    token: null,
    secret: null
}, function(items) {
    for (key in items) {
        console.log(key);
    }
});