var url_list = [
    {
        original: /^http:\/\/static\.youku\.com\/.*?q?loader(_[^.]+)?\.swf/i,
        redirect: 'offline/loader.swf'
    }
];


chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var original_url = details.url;
        var redirect_url = original_url;

        var i;
        for (i = 0; i < url_list.length; i++) {
            redirect_url = redirect_url.replace(url_list[i].original, chrome.extension.getURL(url_list[i].redirect));
        }

        if (redirect_url !== original_url) {
            console.log('original url: ' + original_url);
            console.log('redirect url: ' + redirect_url);
            return {redirectUrl: redirect_url};
        }
        return {};
    }, {
        urls: [
            'http://static.youku.com/*',
        ]
    },
    ["blocking"]
);
