chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({"url": "https://opskins.com/?loc=shop_search&app=730_2"});
});