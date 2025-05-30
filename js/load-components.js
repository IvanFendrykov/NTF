const loadComponent = async (selector, path, insert = "replace") => {
  const container = document.querySelector(selector);
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();

    if (insert === "append") {
      container.insertAdjacentHTML("beforeend", html);
    } else {
      container.innerHTML = html;
    }
  } catch (err) {
    console.error(err);
    container.insertAdjacentHTML(
      "beforeend",
      `<p style="color:red;">Error loading ${path}</p>`
    );
  }
};
const basePath = window.location.pathname.includes(
  "https://ivanfendrykov.github.io/NTF/"
)
  ? "https://ivanfendrykov.github.io/NTF/"
  : "";
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("#nav", `${basePath}/components/nav.html`);
  loadComponent("#header", `${basePath}/components/header.html`);
  loadComponent("#footer", `${basePath}/components/footer.html`);

  const mainSections = [
    `${basePath}/components/sections/Trending.html`,
    `${basePath}/components/sections/Creators.html`,
    `${basePath}/components/sections/Categories.html`,
    `${basePath}/components/sections/Discover.html`,
    `${basePath}/components/sections/Mashrooms.html`,
    `${basePath}/components/sections/HowWorks.html`,
    `${basePath}/components/sections/Join.html`,
  ];
  const marketMain = document.querySelector("#marketMain");
  if (marketMain) {
    loadComponent(
      "#marketHeader",
      `${basePath}/components/marketHeader.html`,
      "append"
    );
    loadComponent(
      "#marketMain",
      `${basePath}/components/market.html`,
      "append"
    );
  }
  const singmain = document.querySelector("#singIn");
  if (singmain) {
    loadComponent(
      "#singIn",
      `${basePath}/components/sections/Sing.html`,
      "append"
    );
  }

  mainSections.forEach((path) => {
    loadComponent("#main", path, "append");
  });
});
