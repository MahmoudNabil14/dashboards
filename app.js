(function () {
  const grid = document.getElementById("grid");
  const homeView = document.getElementById("homeView");
  const viewerView = document.getElementById("viewerView");
  const viewerFrame = document.getElementById("viewerFrame");
  const viewerTitle = document.getElementById("viewerTitle");
  const backBtn = document.getElementById("backBtn");
  const siteFooter = document.getElementById("siteFooter");
  const dashboards = (window.DASHBOARDS || []).filter((d) => d.link);

  function showHome() {
    homeView.classList.remove("hidden");
    viewerView.classList.add("hidden");
    backBtn.classList.add("hidden");
    siteFooter.classList.remove("hidden");
    document.body.classList.remove("viewer-open");
    viewerFrame.src = "about:blank";
    document.title = "silk links — Dashboards";
  }

  function openDashboard(dashboard) {
    viewerTitle.textContent = dashboard.name;
    viewerFrame.src = dashboard.link;
    homeView.classList.add("hidden");
    viewerView.classList.remove("hidden");
    backBtn.classList.remove("hidden");
    siteFooter.classList.add("hidden");
    document.body.classList.add("viewer-open");
    document.title = dashboard.name + " — silk links";
    window.scrollTo(0, 0);
  }

  grid.innerHTML = dashboards
    .map(
      (d, i) => `
      <article class="card" style="animation-delay:${i * 0.04}s">
        <h2>${d.name}</h2>
        <button type="button" class="btn" data-id="${d.id}">
          Open dashboard
        </button>
      </article>
    `
    )
    .join("");

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-id]");
    if (!btn) return;
    const dashboard = dashboards.find((d) => String(d.id) === btn.dataset.id);
    if (dashboard) openDashboard(dashboard);
  });

  backBtn.addEventListener("click", showHome);
})();
