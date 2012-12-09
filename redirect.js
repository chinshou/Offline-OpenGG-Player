var url_list = [
    {
        original: /^http:\/\/static\.youku\.com\/.*?q?(player|loader)(_[^.]+)?\.swf/i,
        redirect: 'offline/loader.swf'
    }, {
        original: /^http:\/\/js\.tudouui\.com\/.*?\/TudouYoukuPlayer_Homer[^.]*?\.swf/i,
        redirect: 'offline/TudouYoukuPlayer_Homer_9.swf'
    }, {
        original: /^http:\/\/js\.tudouui\.com\/.*?\/TudouVideoPlayer_Homer_[^.]*?.swf/i,
        redirect: 'offline/TudouVideoPlayer_Homer_238.swf'
    }, {
        original: /^http:\/\/dp\.tudou\.com\/nplayer[^.]*?\.swf|http:\/\/js\.tudouui\.com\/doupao\/nplayer[^.]*?\.swf/i,
        redirect: 'offline/nplayer.swf'
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
            'http://js.tudouui.com/*',
            'http://dp.tudou.com/*'
        ]
    },
    ["blocking"]
);


chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        return {redirectUrl: chrome.extension.getURL('offline/crossdomain.xml')};
    }, {
        urls: [
            'http://v.youku.com/crossdomain.xml'
        ]
    },
    ['blocking']
);
