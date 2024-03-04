chrome.storage.local.get(null, function (items) {
  for (let key in items) {
    let value = items[key];
    let url = new URL(window.location.href);
    if (!url.search) {
      url.search = `?${key}=${value}`;
    } else {
      url.searchParams.set(key, value);
    }
    window.history.replaceState(null, null, url.toString());
  }
});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  let url = new URL(window.location.href);
  url.searchParams.set(message.key, message.value);
  window.history.replaceState(null, null, url.toString());
});
