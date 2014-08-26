chrome.storage.sync.get({
    enabled: true,
    hashtag: true,
    colorize: true,
    token: null,
    secret: null
}, function(items) {

    var cb = new Codebird;
    cb.setConsumerKey(CONSUMER_KEY, CONSUMER_SECRET);

    cb.setToken(items.token, items.secret);

    cb.__call(
        "oauth_accessToken",
        {oauth_verifier: document.getElementById("oauth_pin").innerHTML.split("<code>")[1].split("</code>")[0]},
        function (reply) {
            cb.setToken(reply.oauth_token, reply.oauth_token_secret);

            document.getElementById("oauth_pin").innerHTML = "<p>Splitwitter has been authorized with twitter you can close this tab now!</p>";

            chrome.storage.local.set({
                token: reply.oauth_token,
                secret: reply.oauth_token_secret,
                screenName: reply.screen_name
            });

            chrome.storage.sync.set({
                token: null,
                secret: null
            });
        }
    );
});