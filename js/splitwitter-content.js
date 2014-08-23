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
    //TODO: add code
}

function colorizeTwitter() {
    $(".bird-topbar-etched").css({ color : '#942686' });
    $(".js-tweet-btn").css({ backgroundColor : '#942686', background : 'rgba(148, 38, 134, 1)' });
    $(".tweet-btn").css({ backgroundColor : '#942686', background : 'rgba(148, 38, 134, 1)' });
    $(".dm-new-button").css({ backgroundColor : '#942686', background : 'rgba(148, 38, 134, 1)', border : 'none' });
}

$(document).ready(function() {
    chrome.storage.sync.get({
        enabled: true,
        hashtag: true,
        colorize: true
    }, function(items) {
        if (items.colorize && items.enabled) {
            colorizeTwitter();
        }
        if (items.enabled) {
            injectCode();
        }
    });
});