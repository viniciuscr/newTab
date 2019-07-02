import "uikit/dist/js/uikit";
import "uikit/dist/js/uikit-icons";
import "uikit/dist/css/uikit.min.css"
import "./override.css";

document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.local.get(
    "img",
    r => (document.body.style.backgroundImage = `url(${r.img})`)
  );
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

function isItDark(imageSrc, callback) {
  var fuzzy = 0.1;
  var img = document.createElement("img");
  img.src = imageSrc;
  img.style.display = "none";
  document.body.appendChild(img);

  img.onload = function() {
    // create canvas
    var canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(this, 0, 0);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    var r, g, b, max_rgb;
    var light = 0,
      dark = 0;

    for (var x = 0, len = data.length; x < len; x += 4) {
      r = data[x];
      g = data[x + 1];
      b = data[x + 2];

      max_rgb = Math.max(Math.max(r, g), b);
      if (max_rgb < 128) dark++;
      else light++;
    }

    var dl_diff = (light - dark) / (this.width * this.height);
    if (dl_diff + fuzzy < 0) callback(true);
    /* Dark. */ else callback(false); /* Not dark. */
  };
}
chrome.storage.local.get(
  "img",
  r => (document.body.style.backgroundImage = `url(${r})`)
);
