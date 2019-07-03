chrome.tabs.onCreated.addListener(tab => {
  fetch(
    "https://intranet.corp.banrisul.com.br/bus/link/minuto_a_minuto_vazia.html",
    { cache: "force-cache" }
  ).then(r =>
    r.text().then(text => chrome.tabs.sendMessage(tab.id, { minuto: text }))
  );
});
//cache on startup chrome
chrome.windows.onCreated.addListener(() => {
  const Unsplash = require("unsplash-js").default;
  const unsplash = new Unsplash({
    applicationId:
      "~",
    secret: "~"
  });

  unsplash.photos.getRandomPhoto({ collections: ["3178572"] }).then(r =>
    r.json().then(json => {
      const backgroundImage = `url(${json.urls.regular})`;
      const description = `${
        json.description !== null ? json.description : json.alt_description
      }`;
      const user = `by <a href="${json.user.links.html}">${
        json.user.first_name
      }</a>`;
      const location = json.location ? `| ${json.location.name} ` : "";
      const infos = `${description} ${location} <br/> ${user} `;
      const background = `${json.color}22`;
      const text = 0xffffff ^ json.color;

      chrome.storage.local.set({
        bg: {
          backgroundInfo: { text, infos, background },
          backgroundImage
        }
      });
    })
  );
});
