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

    var cb = new Codebird;
    cb.setConsumerKey(CONSUMER_KEY, CONSUMER_SECRET);

    cb.setToken(items.token, items.secret);

    console.log(document.getElementById("oauth_pin").innerHTML.split("<code>")[1].split("</code>")[0]);

    cb.__call(
        "oauth_accessToken",
        {oauth_verifier: document.getElementById("oauth_pin").innerHTML.split("<code>")[1].split("</code>")[0]},
        function (reply) {
            cb.setToken(reply.oauth_token, reply.oauth_token_secret);

            chrome.storage.local.set({
                token: reply.oauth_token,
                secret: reply.oauth_token_secret
            });
        }
    );
});