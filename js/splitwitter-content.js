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
    $('<link rel="stylesheet" type="text/css" href="' + cssLink + '" >').appendTo("head");
    
    $(".tweet-counter").removeClass( "tweet-counter" ).addClass( "tweet-counter2" );
    $(".tweet-counter2").html("&#8734;");
    
    $(".btn").removeAttr("disabled").removeClass("tweet-action").removeClass("disabled").addClass("splitwitter-action");
}

function colorizeTwitter() {
    var cssLink = chrome.extension.getURL("css/colorize.css");
    $('<link rel="stylesheet" type="text/css" href="' + cssLink + '" >').appendTo("head");
}

chrome.storage.sync.get({
    enabled: true,
    hashtag: true,
    colorize: true,
    token: null,
    secret: null
}, function(items) {
    if (items.enabled) {
        if (items.colorize) {
            colorizeTwitter();
        }
        injectCode();
    }
});