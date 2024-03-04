// Função para verificar e aplicar os parâmetros de consulta da URL
function applyQueryParams() {
  chrome.storage.local.get(null, function (items) {
    let url = new URL(window.location.href);
    let hasChanged = false;
    let teste = [];
    for (let key in items) {
      let value = items[key];

      teste.push({ label: key, value: value });

      if (!url.searchParams.has(key)) {
        url.searchParams.set(key, value);
        hasChanged = true;
      }
    }

    if (hasChanged) {
      history.replaceState(null, null, url.toString());
      // Recarrega a página após aplicar os parâmetros de consulta
      location.reload();
    }

    let container = document.getElementById("queryContainer");

    teste.forEach((item) => {
      let inputKey = document.createElement("input");
      let inputValue = document.createElement("input");

      inputKey.setAttribute("type", "text");
      inputKey.setAttribute("id", item.key);
      inputKey.setAttribute("value", item.key);

      inputValue.setAttribute("type", "text");
      inputValue.setAttribute("id", item.value);
      inputValue.setAttribute("value", item.value);

      let container2 = document.createElement("div");
      container2.style.display = "flex";

      container2.appendChild(inputKey);
      container2.appendChild(inputValue);

      container.appendChild(container2);
    });
  });
}

// Aplicar os parâmetros de consulta ao iniciar a extensão
applyQueryParams();

// Listener para atualizar os parâmetros de consulta quando houver mudanças
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  let url = new URL(window.location.href);
  if (!url.searchParams.has(message.key)) {
    url.searchParams.set(message.key, message.value);
    history.replaceState(null, null, url.toString());
    // Recarrega a página após aplicar os parâmetros de consulta
    location.reload();
  }
});
