/* Knightcott Self Storage cookie consent -> Google Analytics.

   Analytics cookies may only be set with permission, so nothing Google-related
   loads until the visitor clicks Accept. The choice is remembered in
   localStorage (storing the choice itself is strictly necessary, so it needs no
   consent) and can be changed later via the "Cookie settings" link this script
   adds to the footer.

   Rejecting is exactly as easy as accepting, and both buttons look the same.
   Closing the page without choosing counts as no consent: nothing is loaded. */
(function () {
  // Google Analytics property for www.knightcottselfstorage.uk.
  // Sits alongside the KSS property in the same Analytics account.
  var MEASUREMENT_ID = "G-G6120Y38L5";

  var KEY = "kss-analytics-consent";

  function choice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function remember(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* private browsing */ }
  }

  function loadAnalytics() {
    if (!MEASUREMENT_ID || MEASUREMENT_ID.indexOf("__") === 0) return;
    if (window.__analyticsLoaded) return;
    window.__analyticsLoaded = true;

    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID);
  }

  function styles() {
    if (document.getElementById("consent-styles")) return;
    var css = document.createElement("style");
    css.id = "consent-styles";
    css.textContent =
      ".consent-bar{position:fixed;left:0;right:0;bottom:0;z-index:200;" +
        "background:#123a66;color:#e8eef6;padding:16px 24px;" +
        "box-shadow:0 -4px 18px rgba(0,0,0,.25);font-size:.9rem;line-height:1.5;}" +
      ".consent-bar .inner{max-width:1120px;margin:0 auto;display:flex;gap:18px;" +
        "align-items:center;justify-content:space-between;flex-wrap:wrap;}" +
      ".consent-bar p{margin:0;max-width:64ch;}" +
      ".consent-bar a{color:#f2b134;}" +
      ".consent-bar .buttons{display:flex;gap:10px;flex-shrink:0;}" +
      ".consent-bar button{font:inherit;font-weight:600;padding:10px 20px;border-radius:6px;" +
        "border:2px solid #f2b134;background:transparent;color:#fff;cursor:pointer;}" +
      ".consent-bar button:hover{background:rgba(242,177,52,.18);}" +
      ".consent-link{background:none;border:0;color:inherit;font:inherit;" +
        "text-decoration:underline;cursor:pointer;padding:0;}" +
      "@media (max-width:880px){.consent-bar{bottom:52px;padding:14px 18px;}" +
        ".consent-bar .inner{gap:12px;}.consent-bar .buttons{width:100%;}" +
        ".consent-bar button{flex:1;}}";
    document.head.appendChild(css);
  }

  function hide() {
    var bar = document.getElementById("consent-bar");
    if (bar) bar.parentNode.removeChild(bar);
  }

  function show() {
    if (document.getElementById("consent-bar")) return;
    styles();
    var bar = document.createElement("div");
    bar.className = "consent-bar";
    bar.id = "consent-bar";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Cookies");
    bar.innerHTML =
      '<div class="inner">' +
        "<p>We would like to count visits to this site using Google Analytics, which " +
        "sets cookies. It is entirely your choice, and the site works exactly the same " +
        'either way. <a href="privacy-policy.html">Read our privacy policy</a>.</p>' +
        '<div class="buttons">' +
          '<button type="button" id="consent-no">No thanks</button>' +
          '<button type="button" id="consent-yes">Accept</button>' +
        "</div>" +
      "</div>";
    document.body.appendChild(bar);

    document.getElementById("consent-yes").addEventListener("click", function () {
      remember("yes"); hide(); loadAnalytics();
    });
    document.getElementById("consent-no").addEventListener("click", function () {
      remember("no"); hide();
    });
  }

  // "Cookie settings" in the footer, so the choice can always be changed.
  function footerLink() {
    var wrap = document.querySelector("footer .wrap");
    if (!wrap) return;
    var span = document.createElement("span");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "consent-link";
    btn.textContent = "Cookie settings";
    btn.addEventListener("click", function () { styles(); show(); });
    span.appendChild(btn);
    wrap.appendChild(span);
  }

  function start() {
    footerLink();
    var made = choice();
    if (made === "yes") loadAnalytics();
    else if (made !== "no") { styles(); show(); }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
