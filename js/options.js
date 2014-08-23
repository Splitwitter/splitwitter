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

function save_options() {
    var enabled = document.getElementById("enabled").checked;
    var hashtag = document.getElementById("hashtag").checked;
    var colorize = document.getElementById("colorize").checked;

    chrome.storage.sync.set({
        enabled: enabled,
        hashtag: hashtag,
        colorize: colorize
    });
}

function restore_options() {
    chrome.storage.sync.get({
        enabled: true,
        hashtag: true,
        colorize: true
    }, function(items) {
        document.getElementById('enabled').checked = items.enabled;
        document.getElementById('hashtag').checked = items.hashtag;
        document.getElementById('colorize').checked = items.colorize;
    });

    document.getElementById('save').addEventListener('click', save_options);
}

document.addEventListener('DOMContentLoaded', restore_options);