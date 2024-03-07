document.getElementById("save-button").addEventListener("click", function () {
  let domain = document.getElementById("domain");
  let key = document.getElementById("key");
  let value = document.getElementById("value");

  let obj = {};
  obj[domain.value] = { key: key.value, value: value.value };
  chrome.storage.local.set(obj, function () { });

  domain.value = "";
  key.value = "";
  value.value = "";

  updatePopup();
})

function updatePopup() {
  chrome.storage.local.get(null, function (items) {
    let container = document.getElementById("container-items");
    let message = document.getElementById("no-register-message");

    if (Object.keys(items).length > 0) message.style.display = "none";
    else message.style.display = "block";

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    for (let domain in items) {
      let key = items[domain].key;
      let value = items[domain].value;

      let inputDomain = document.createElement("input");
      let inputKey = document.createElement("input");
      let inputValue = document.createElement("input");
      let saveButton = document.createElement("button");
      let removeButton = document.createElement("button");

      saveButton.innerHTML = "Save";
      removeButton.innerHTML = "Remove";

      saveButton.addEventListener("click", function () {
        let obj = {};
        obj[domain] = { key: inputKey.value, value: inputValue.value };
        chrome.storage.local.set(obj, function () { });
      })

      removeButton.addEventListener("click", function () {
        chrome.storage.local.remove(domain, function () { });
        updatePopup();
      })

      inputDomain.setAttribute("type", "text");
      inputDomain.setAttribute("id", domain);
      inputDomain.setAttribute("value", domain);
      inputDomain.className = "field";

      inputKey.setAttribute("type", "text");
      inputKey.setAttribute("id", key);
      inputKey.setAttribute("value", key);
      inputKey.className = "field";

      inputValue.setAttribute("type", "text");
      inputValue.setAttribute("id", value);
      inputValue.setAttribute("value", value);
      inputValue.className = "field";

      let container2 = document.createElement("div");
      container2.className = "container-field";

      container2.appendChild(inputDomain);
      container2.appendChild(inputKey);
      container2.appendChild(inputValue);
      container2.appendChild(saveButton);
      container2.appendChild(removeButton);

      container.appendChild(container2);
    }
  });
}

updatePopup();

