chrome.tabs.onCreated.addListener(tab => {
  fetch(
    "https://intranet.corp.banrisul.com.br/bus/link/minuto_a_minuto_vazia.html",
    { cache: "force-cache" }
  ).then(r =>
    r.text().then(text => chrome.tabs.sendMessage(tab.id, { minuto: text }))
  );
});
//cache on startup chrome
chrome.runtime.onStartup.addListener(() => {
  fetch("https://source.unsplash.com/daily", { cache: "force-cache" })
    .then(response => response.blob({ type: "image/jpg" }))
    .then(img => {
      var reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onloadend = function() {
        base64data = reader.result;
        chrome.storage.local.set({ img: base64data });
      };
    });
});
const Unsplash = require("unsplash-js").default;
const unsplash = new Unsplash({
  applicationId:
    "~",
  secret: "~"
});

unsplash.photos
  .getRandomPhoto()
  .then(r => r.json().then(json => console.log(json)));
