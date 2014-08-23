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
    $(".tweet-counter").removeClass( "tweet-counter" ).addClass( "tweet-counter2" );
    $(".tweet-counter2").html("&#8734;");
    $(".tweet-counter2").css({ 'background-color' : 'transparent', 'color' : '#8899a6', 'display' : 'inline-block', 'width' : '35px', 'border' : '0', 'padding' : '0 3px', 'position' : 'relative', 'vertical-align' : 'top', 'top' : '7px', 'text-align' : 'right', 'font-size' : '20px', 'text-shadow' : '0 1px 1px rgba(255,255,255,.75', 'font-weight' : '300' });
}

function colorizeTwitter() {
    $(".bird-topbar-etched").css({ 'color' : '#942686' });
    $(".js-tweet-btn").css({ 'backgroundColor ': '#942686', 'background' : 'rgba(148, 38, 134, 1)' });
    $(".tweet-btn").css({ 'backgroundColor' : '#942686', 'background' : 'rgba(148, 38, 134, 1)' });
    $(".dm-new-button").css({ 'backgroundColor' : '#942686', 'background' : 'rgba(148, 38, 134, 1)', 'border' : 'none' });
}

chrome.storage.sync.get({
    enabled: true,
    hashtag: true,
    colorize: true
}, function(items) {
    if (items.enabled) {
        if (items.colorize) {
            colorizeTwitter();
        }
        injectCode();
    }
});