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
    // Get checkbox state
    var enabled = document.getElementById("enabled").checked;
    var hashtag = document.getElementById("hashtag").checked;
    var colorize = document.getElementById("colorize").checked;

    // Store the options
    chrome.storage.sync.set({
        enabled: enabled,
        hashtag: hashtag,
        colorize: colorize
    });

    // If the user is on twitter reload the tab
    chrome.tabs.getSelected(null, function(tab) {
        if (tab.url.indexOf("twitter.com") > -1) {
            chrome.tabs.reload(tab.id)
        }
    });
}

function checkboxState() {
    // Get checkbox state
    var enabled = document.getElementById("enabled").checked;

    // Disable the other checkboxes if Splitwitter is not enabled
    document.getElementById("hashtag").disabled = !enabled;
    document.getElementById("colorize").disabled = !enabled;
}

function disableCheckboxes() {
    // Set all checkboxes disabled if the user isn't logged in
    document.getElementById("enabled").disabled = true;
    document.getElementById("hashtag").disabled = true;
    document.getElementById("colorize").disabled = true;
}

function loginTwitter() {
    // Codebird call to get request token
    cb.__call(
        "oauth_requestToken",
        {oauth_callback: "oob"},
        function (reply) {
            // Save the temp token since we need it in authKey.js
            chrome.storage.sync.set({
                token: reply.oauth_token,
                secret: reply.oauth_token_secret
            });
            // Set the token
            cb.setToken(reply.oauth_token, reply.oauth_token_secret);
            // Codebird call to open twitter for authorize
            cb.__call(
                "oauth_authorize",
                {},
                function (auth_url) {
                    chrome.tabs.getSelected(null, function(tab) {
                        if (tab.url.indexOf("twitter.com") > -1) {
                            // If user is using the popup open a new tab
                            window.codebird_auth = window.open(auth_url);
                        } else {
                            // If user is using the options screen don't open a new tab
                            window.codebird_auth = window.location.replace(auth_url);
                        }
                    });
                }
            );
        }
    );
}

function restoreOptions() {
    // Get our local option
    chrome.storage.local.get({
        token: null,
        secret: null,
        screenName: null
    }, function(items) {
        if (items.token != null) {
            $("#loggedIn").show();
            // If logged in set the user token
            cb.setToken(items.token, items.secret);
            // Verify Credentials
            cb.__call(
                "account_verifyCredentials",
                {},
                function (reply) {
                    // If the saved username doesn't match the current name the user has changed the username save it to our storage
                    if (items.screenName != reply.screen_name) {
                        chrome.storage.local.set({
                            screenName: reply.screen_name
                        });
                        // Change login button text to logged in as + username
                        $("#login").html("Logged in as " + reply.screen_name)
                    } else {
                        // Change login button text to logged in as + username
                        $("#login").html("Logged in as " + items.screenName)
                    }
                }
            );
        } else {
            // Not logged in disable the checkboxes and show the not logged in message
            disableCheckboxes();
            $("#notLoggedIn").show();
        }
    });

    // Get our sync options
    chrome.storage.sync.get({
        enabled: true,
        hashtag: true,
        colorize: true,
        token: null,
        secret: null
    }, function(items) {
        // Check the checkboxes
        document.getElementById("enabled").checked = items.enabled;
        document.getElementById("hashtag").checked = items.hashtag;
        document.getElementById("colorize").checked = items.colorize;
    });

    // Add on click listeners on the button
    document.getElementById("save").addEventListener("click", saveOptions);
    document.getElementById("enabled").addEventListener("click", checkboxState);
    document.getElementById("login").addEventListener("click", loginTwitter);
}
// Initialize Codebird and set our applications keys
var cb = new Codebird;
cb.setConsumerKey(CONSUMER_KEY, CONSUMER_SECRET);

// Add on document ready function
document.addEventListener("DOMContentLoaded", restoreOptions);