// Get our sync settings
chrome.storage.sync.get({
    enabled: true,
    hashtag: true,
    colorize: true,
    token: null,
    secret: null
}, function(items) {
    // Initialize Codebird
    var cb = new Codebird;
    // Set the application keys
    cb.setConsumerKey(CONSUMER_KEY, CONSUMER_SECRET);

    // Set the temp keys we generated in options.js
    cb.setToken(items.token, items.secret);

    // Call the autorize function (Using PIN)
    cb.__call(
        "oauth_accessToken",
        // Fetch the pin code from the twitter screen
        {oauth_verifier: document.getElementById("oauth_pin").innerHTML.split("<code>")[1].split("</code>")[0]},
        function (reply) {
            // SUCCESS! Set the final token
            cb.setToken(reply.oauth_token, reply.oauth_token_secret);

            // Replace the PIN text so the user knows his account has been autorized
            document.getElementById("oauth_pin").innerHTML = "<p>Splitwitter has been authorized with twitter you can close this tab now!</p>";

            // Save the final keys and the username
            chrome.storage.local.set({
                token: reply.oauth_token,
                secret: reply.oauth_token_secret,
                screenName: reply.screen_name
            });

            // Remove the temp keys since we don't need those anymore
            chrome.storage.sync.set({
                token: null,
                secret: null
            });
        }
    );
});