const ROUTES = {
  "": "overview",
  "population": "population",
  "economy": "economy",
  "prices-jobs": "prices-jobs",
  "living": "living",
  "trade": "trade",
  "sources": "sources",
};

const RENDER = {
  "overview": "renderOverview",
  "population": "renderPopulation",
  "economy": "renderEconomy",
  "prices-jobs": "renderPricesJobs",
  "living": "renderLiving",
  "trade": "renderTrade",
  "sources": "renderSources",
};

function currentRoute() {
  const hash = location.hash.replace(/^#\/?/, "").split("?")[0];
  return ROUTES[hash] ? hash : "";
}

async function render() {
  const route = currentRoute();
  const view = document.querySelector("#view");
  document.querySelectorAll(".main-nav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.route === route);
  });
  const name = ROUTES[route];
  const mod = await import(`./views/${name}.js`);
  await mod[RENDER[name]](view);
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
render();
