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

function injectCode() {
    var cssLink = chrome.extension.getURL("css/inject.css");
    $("<link rel='stylesheet' type='text/css' href='" + cssLink + "'>").appendTo('head');

    $(".tweet-counter").removeClass("tweet-counter").addClass("tweet-counter2");
    $(".tweet-counter2").html("&#8734;");

    $(".btn").removeAttr("disabled").removeClass("tweet-action").removeClass("disabled");
    $(".toolbar .tweet-button .btn").addClass("splitwitter-action");
    $(".btn").removeAttr("type");

    // Bind on click to the tweet button
    $(".splitwitter-action").on("click", function() {
        getTweet();
    });
}

function colorizeTwitter() {
    var cssLink = chrome.extension.getURL("css/colorize.css");
    $("<link rel='stylesheet' type='text/css' href='" + cssLink + "'>").appendTo('head');
}

function getTweet() {
    // Get the tweet text
    splitTweet(document.getElementById("tweet-box-mini-home-profile").innerHTML.replace(/<div>/g,"").replace(/<em>/g,"").replace(/<\/em>/g,"").replace(/<\/div>/g,""));
}

function splitTweet(text) {
    // Split here and call send tweet for every part
    // TODO: Spit the tweet
    sendTweet(text);
}

function sendTweet(text) {
    // Initialize Codebird and set our applications keys
    var cb = new Codebird;
    cb.setConsumerKey(CONSUMER_KEY, CONSUMER_SECRET);

    // Get our local storage
    chrome.storage.local.get({
        token: null,
        secret: null,
        screenName: null
    }, function(items) {
        // Set the user token
        cb.setToken(items.token, items.secret);

        cb.__call(
            "statuses_update",
            {"status": encodeURIComponent(text)},
            function (reply) {
                console.log(reply);
                // Empty the Tweet box
                alert("Jeej");
                document.getElementById("tweet-box-mini-home-profile").innerHTML = "<div></div>";
            }
        );
    });
}

// Get our local settings
chrome.storage.local.get({
    token: null,
    secret: null,
    screenName: null
}, function(item) {
    // If item token isn't empty the user is logged in
    if (item.token != null) {
        chrome.storage.sync.get({
            enabled: true,
            hashtag: true,
            colorize: true,
            token: null,
            secret: null
        }, function(items) {
            // If Splitwitter is enabled inject our code
            if (items.enabled) {
                // If colorize is enabled inject our css
                if (items.colorize) {
                    colorizeTwitter();
                }
                injectCode();
            }
        });
    }
});


