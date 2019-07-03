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

/*
const Unsplash = require("unsplash-js").default;
const unsplash = new Unsplash({
  applicationId:
    "66c0dd89cb807527e1a2131bfddcfb459902fc59acba9b0bca39a59223b9f17b",
  secret: "da794a4d8bfbe3ac98b166cdce174cec0afd185d52de15b589e1928291e71a4d"
});

unsplash.photos.getRandomPhoto({ collections: ["3178572"] }).then(r =>
  r.json().then(json => {
    document.body.style.backgroundImage = `url(${json.urls.regular})`;
    const description = `${
      json.description !== null ? json.description : json.alt_description
    }`;
    const user = `by <a href="${json.user.links.html}">${
      json.user.first_name
    }</a>`;
    const location = json.location ? `| ${json.location.name} ` : "";
    document.getElementById(
      "infos"
    ).innerHTML = `${description} ${location} <br/> ${user} `;
    document.getElementById("background-info").style.background = `${
      json.color
    }22`;
    document.getElementById("background-info").style.color =
      0xffffff ^ json.color;
  })
  );
 */
