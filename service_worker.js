var callback = function(details) {
    let url = new URL(details.url);
    let domain = url.hostname;

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {domain: domain});
    });

    return {cancel: false};
};

var filter = {
    urls: ["<all_urls>"]
};

var opt_extraInfoSpec = [];

chrome.webRequest.onBeforeRequest.addListener(
    callback, filter, opt_extraInfoSpec
);
