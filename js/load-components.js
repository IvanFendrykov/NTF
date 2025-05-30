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

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("#nav", "./components/nav.html");
  loadComponent("#header", "./components/header.html");
  loadComponent("#footer", "./components/footer.html");

  const mainSections = [
    "./components/sections/Trending.html",
    "./components/sections/Creators.html",
    "./components/sections/Categories.html",
    "./components/sections/Discover.html",
    "./components/sections/Mashrooms.html",
    "./components/sections/HowWorks.html",
    "./components/sections/Join.html",
  ];
  const marketMain = document.querySelector("#marketMain");
  if (marketMain) {
    loadComponent("#marketHeader", "./components/marketHeader.html", "append");
    loadComponent("#marketMain", "./components/market.html", "append");
  }
  const singmain = document.querySelector("#singIn");
  if (singmain) {
    loadComponent("#singIn", "./components/sections/Sing.html", "append");
  }

  mainSections.forEach((path) => {
    loadComponent("#main", path, "append");
  });
});
