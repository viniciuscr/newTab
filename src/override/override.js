import "uikit/dist/js/uikit";
import "uikit/dist/js/uikit-icons";
import "uikit/dist/css/uikit.min.css";
import "./override.css";

document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.local.get("bg", ({ bg }) => {
    if (bg) {
      document.body.style.backgroundImage = bg.backgroundImage;
      document.getElementById("infos").innerHTML = bg.backgroundInfo.infos;
      document.getElementById("background-info").style.background =
        bg.backgroundInfo.background;
      document.getElementById("background-info").style.color =
        bg.backgroundInfo.text;
    }
  });
  const searchBar = document.getElementById("searchBar");
  const engines = {
    google: "https://www.google.com/search?q=",
    duckduckgo: "https://duckduckgo.com/?q=",
    stackoverflow: "https://stackoverflow.com/search?q=",
    mdn: "https://developer.mozilla.org/en-US/search?q="
  };

  [...document.getElementsByClassName("search-button")].forEach(
    (element, index, array) => {
      element.addEventListener("click", e => {
        e.preventDefault();
        chrome.tabs.query({ active: true, currentWindow: true }, tab => {
          chrome.tabs.update(tab.id, {
            url: `${engines[element.innerHTML.trim().toLowerCase()]}${
              searchBar.value
            }`
          });
        });
      });
    }
  );
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(request.minuto, "text/html");

  document
    .getElementById("minuto")
    .appendChild(doc.getElementById("lista-instrucoes"));
});
