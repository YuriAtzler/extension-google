document.getElementById("saveButton").addEventListener("click", function () {
  var key = document.getElementById("key").value;
  var value = document.getElementById("value").value;

  chrome.storage.local.set({ [key]: value }, function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { key: key, value: value });
    });
  });
});
