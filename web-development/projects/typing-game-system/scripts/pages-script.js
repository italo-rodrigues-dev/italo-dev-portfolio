// ========
// HEADER
// ========

const NAV_LINKS = [
  { label: "Home",        href: "index.html" },
  { label: "Login",       href: "login-page.php" },
  { label: "Tutorial",    href: "tutorial-page.html" },
  { label: "Game",        href: "game-page.html" },
  { label: "Score",       href: "score-page.php" },
  { label: "Logout",      href: "logout-script.php" },
];

// Get the current base path for navigation links
function getBasePath() {
  const path = location.pathname;
  return path.includes('/pages/') ? '../' : './';
}

// Resolve the correct href for navigation links
function getNavLink(href) {
  const base = getBasePath();
  const isScreensPage = location.pathname.includes('/pages/');
  const screenPages = NAV_LINKS.map(link => link.href).filter(href => href !== "index.html");

  if (isScreensPage) {
    if (screenPages.includes(href)) {
      return href;
    }
    return `${base}${href}`;
  }

  if (screenPages.includes(href)) {
    return `pages/${href}`;
  }

  return href;
}

// Inject the site header into the current page
function injectHeader() {
  const currentPage = location.pathname.split("/").pop() || "index.html";
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
      <a href="${getNavLink("index.html")}" class="header-logo">
        <div>
          <div class="header-logo-text">TADS Cafe</div>
          <div class="header-logo-sub">Games & Codes</div>
        </div>
      </a>
      <nav class="header-nav">
      ${NAV_LINKS.map(link => {
        const navHref = getNavLink(link.href);
        const activeClass = link.href === currentPage ? "active" : "";
        return `<a href="${navHref}" class="${activeClass}">${link.label}</a>`;
      }).join("")}
    </nav>
    <div class="header-right">
      <span class="header-badge">v0.1.0</span>
    </div>
  `;
  document.body.prepend(header);
}

window.addEventListener("DOMContentLoaded", () => {
  injectHeader();
});