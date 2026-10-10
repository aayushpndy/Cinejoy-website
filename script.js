/* ============================================================
   CONFIGURATION — edit these values before publishing
   ============================================================ */
const CONFIG = {
  APP_NAME: "Cinejoy",
  APP_VERSION: "1.0.0",
  APK_DOWNLOAD_URL:
    "https://github.com/aayushpndy/Cinejoy-download/releases/download/V1.0.0/Cinejoy.apk", // <- replace with your real APK link
  APP_ICON_PATH: "assets/app-icon.png",

  // Hero poster wall. Add images you have the rights to use, e.g.
  // { src: "assets/posters/poster-1.jpg", title: "Movie title" }
  // Leave empty to show neutral placeholder tiles. Use 2:3 portrait images.
  POSTERS: [
    { src: "assets/posters/poster-1.jpg", title: "First title" },
    { src: "assets/posters/poster-2.jpg", title: "Second title" },
    { src: "assets/posters/poster-3.jpg", title: "Third title" },
    { src: "assets/posters/poster-4.jpg", title: "Fourth title" },
    { src: "assets/posters/poster-5.jpg", title: "Fifth title" },
    { src: "assets/posters/poster-6.jpg", title: "Sixth title" },
    { src: "assets/posters/poster-7.jpg", title: "Seventh title" },
    { src: "assets/posters/poster-8.jpg", title: "Eighth title" },
    { src: "assets/posters/poster-9.jpg", title: "Ninth title" },
  ],
};
/* ============================================================ */

(function () {
  const $$ = (s) => document.querySelectorAll(s);

  // Apply config
  document.title = CONFIG.APP_NAME + " — Download for Android";
  $$("[data-app-name]").forEach((el) => (el.textContent = CONFIG.APP_NAME));
  $$("[data-version]").forEach((el) => (el.textContent = CONFIG.APP_VERSION));
  $$("[data-icon]").forEach((el) => (el.src = CONFIG.APP_ICON_PATH));
  $$("[data-year]").forEach(
    (el) => (el.textContent = new Date().getFullYear()),
  );
  $$("[data-apk]").forEach((el) => {
    el.href = CONFIG.APK_DOWNLOAD_URL;
    el.setAttribute("download", "");
    el.setAttribute("rel", "noopener");
  });
  if (CONFIG.APK_DOWNLOAD_URL === "YOUR_APK_DOWNLOAD_URL") {
    console.warn(
      "Cinejoy: set APK_DOWNLOAD_URL in script.js before publishing.",
    );
  }

  // File size (shown only if the host allows it; otherwise the default text stays)
  const sizeEl = document.querySelector("[data-size]");
  if (sizeEl && /^https?:\/\//.test(CONFIG.APK_DOWNLOAD_URL)) {
    fetch(CONFIG.APK_DOWNLOAD_URL, { method: "HEAD" })
      .then((r) => {
        const bytes = parseInt(r.headers.get("content-length"), 10);
        if (r.ok && bytes > 0)
          sizeEl.textContent = (bytes / 1048576).toFixed(1) + " MB";
      })
      .catch(() => {});
  }

  // Poster wall
  const wall = document.getElementById("poster-wall");
  if (wall) {
    const filmIcon =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4.5" width="18" height="15" rx="3"/><path d="M10 9.5v5l4.2-2.5z"/></svg>';
    const placeholder = () => {
      const d = document.createElement("div");
      d.className = "tile ph";
      d.setAttribute("aria-hidden", "true");
      d.innerHTML = filmIcon;
      return d;
    };
    const tile = (p, hidden) => {
      if (!p || !p.src) return placeholder();
      const d = document.createElement("div");
      d.className = "tile";
      const img = new Image();
      img.src = p.src;
      img.alt = hidden ? "" : p.title || "";
      img.loading = "lazy";
      img.decoding = "async";
      img.width = 200;
      img.height = 300;
      img.onerror = () => d.replaceWith(placeholder());
      d.appendChild(img);
      return d;
    };
    const COLS = 4,
      PER_COL = 6,
      list = CONFIG.POSTERS || [];
    for (let c = 0; c < COLS; c++) {
      const col = document.createElement("div");
      col.className = "wall-col";
      const track = document.createElement("div");
      track.className = "wall-track";
      for (let loop = 0; loop < 2; loop++) {
        // duplicate for a seamless loop
        for (let i = 0; i < PER_COL; i++) {
          const p = list.length ? list[(c * PER_COL + i) % list.length] : null;
          const t = tile(p, loop === 1);
          if (loop === 1) t.setAttribute("aria-hidden", "true");
          track.appendChild(t);
        }
      }
      col.appendChild(track);
      wall.appendChild(col);
    }
  }

  // Mobile menu
  const btn = document.querySelector(".menu-btn");
  const nav = document.getElementById("nav-links");
  const setMenu = (open) => {
    btn.setAttribute("aria-expanded", open);
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("open", open);
  };
  btn.addEventListener("click", () =>
    setMenu(btn.getAttribute("aria-expanded") !== "true"),
  );
  nav
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setMenu(false);
      btn.focus();
    }
  });

  // FAQ: keep one answer open at a time
  const items = $$(".faq details");
  items.forEach((d) =>
    d.addEventListener("toggle", () => {
      if (d.open) items.forEach((o) => o !== d && (o.open = false));
    }),
  );
})();
