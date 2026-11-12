/* EcoRide · selector de tema de color
   Material Community només porta el commutador clar/fosc, així que els temes
   de color (Bosc, Elèctric, Posta de sol) es gestionen ací. */

(function () {
  var STORAGE_KEY = "eco-theme";
  var DEFAULT_THEME = "bosc";

  var THEMES = [
    { id: "bosc", names: { ca: "Bosc", es: "Bosque", en: "Forest" } },
    { id: "electric", names: { ca: "Elèctric", es: "Eléctrico", en: "Electric" } },
    { id: "sunset", names: { ca: "Posta de sol", es: "Puesta de sol", en: "Sunset" } }
  ];

  var TEXT = {
    ca: { label: "Tema de color" },
    es: { label: "Tema de color" },
    en: { label: "Color theme" }
  };

  function locale() {
    var lang = (document.documentElement.lang || "ca").slice(0, 2);
    return TEXT[lang] ? lang : "ca";
  }

  function readTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
    } catch (error) {
      return DEFAULT_THEME;
    }
  }

  function writeTheme(id) {
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch (error) {
      /* mode privat: el tema només dura la sessió */
    }
  }

  function syncMenu() {
    var active = document.documentElement.getAttribute("data-eco-theme");
    var items = document.querySelectorAll(".eco-palette__item");
    for (var i = 0; i < items.length; i += 1) {
      items[i].setAttribute("aria-checked", String(items[i].dataset.theme === active));
    }
  }

  function applyTheme(id) {
    // Material posa data-md-color-scheme al <body>, així que el tema s'aplica
    // als dos elements perquè les regles scheme + theme coincidisquen.
    document.documentElement.setAttribute("data-eco-theme", id);
    if (document.body) {
      document.body.setAttribute("data-eco-theme", id);
    }
    writeTheme(id);
    syncMenu();
  }

  var ICON =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M12 2a10 10 0 0 0 0 20c1.11 0 2-.89 2-2 0-.5-.19-1-.5-1.39-.31-.4-.5-.89-.5-1.36 0-1.1.9-2 2-2h2.31A5.69 5.69 0 0 0 22 9.56C21.73 5.26 17.35 2 12 2M6.5 11A1.5 1.5 0 1 1 8 9.5 1.5 1.5 0 0 1 6.5 11m3-4A1.5 1.5 0 1 1 11 5.5 1.5 1.5 0 0 1 9.5 7m5 0A1.5 1.5 0 1 1 16 5.5 1.5 1.5 0 0 1 14.5 7m3 4A1.5 1.5 0 1 1 19 9.5 1.5 1.5 0 0 1 17.5 11Z"/>' +
    "</svg>";

  var CHECK =
    '<svg class="eco-palette__check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M21 7 9 19l-5.5-5.5 1.4-1.4L9 16.2 19.6 5.6Z"/></svg>';

  function closeMenu(wrapper) {
    var menu = wrapper.querySelector(".eco-palette__menu");
    var button = wrapper.querySelector(".eco-palette__toggle");
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
  }

  function mountSwitcher() {
    var header = document.querySelector(".md-header__inner");
    if (!header) {
      return;
    }

    var labels = TEXT[locale()];
    var wrapper = header.querySelector(".eco-palette");
    var button;

    if (wrapper) {
      // El botó ja ve renderitzat des del servidor: només cal el menú, perquè
      // la capçalera no canvie de disposició en carregar el JavaScript.
      button = wrapper.querySelector(".eco-palette__toggle");
      if (!button) {
        return;
      }
      button.setAttribute("aria-label", labels.label);
      button.title = labels.label;
      if (wrapper.querySelector(".eco-palette__menu")) {
        syncMenu();
        return;
      }
    } else {
      wrapper = document.createElement("div");
      wrapper.className = "eco-palette";

      button = document.createElement("button");
      button.type = "button";
      button.className = "md-header__button md-icon eco-palette__toggle";
      button.innerHTML = ICON;

      wrapper.appendChild(button);
      var search = header.querySelector(".md-search");
      header.insertBefore(wrapper, search || null);
    }

    button.setAttribute("aria-haspopup", "true");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", labels.label);
    button.title = labels.label;

    var menu = document.createElement("div");
    menu.className = "eco-palette__menu";
    menu.setAttribute("role", "menu");
    menu.hidden = true;

    var title = document.createElement("p");
    title.className = "eco-palette__label";
    title.textContent = labels.label;
    menu.appendChild(title);

    THEMES.forEach(function (theme) {
      var item = document.createElement("button");
      item.type = "button";
      item.className = "eco-palette__item";
      item.dataset.theme = theme.id;
      item.setAttribute("role", "menuitemradio");
      item.setAttribute("aria-checked", "false");
      item.innerHTML =
        '<span class="eco-palette__dot eco-palette__dot--' + theme.id + '"></span>' +
        "<span>" + theme.names[locale()] + "</span>" +
        CHECK;
      item.addEventListener("click", function () {
        applyTheme(theme.id);
        closeMenu(wrapper);
        button.focus();
      });
      menu.appendChild(item);
    });

    button.addEventListener("click", function (event) {
      event.stopPropagation();
      var open = menu.hidden;
      menu.hidden = !open;
      button.setAttribute("aria-expanded", String(open));
      if (open) {
        var checked = menu.querySelector('[aria-checked="true"]') || menu.querySelector(".eco-palette__item");
        if (checked) {
          checked.focus();
        }
      }
    });

    wrapper.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu(wrapper);
        button.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!wrapper.contains(event.target)) {
        closeMenu(wrapper);
      }
    });

    wrapper.appendChild(menu);
    syncMenu();
  }

  // Mou les pestanyes de navegació a la capçalera perquè buscador, selector
  // d'idioma, paleta i commutador clar/fosc quedin a la seua alçada.
  function inlineTabs() {
    var header = document.querySelector(".md-header");
    var inner = document.querySelector(".md-header__inner");
    var tabs = document.querySelector(".md-tabs");
    if (!header || !inner || !tabs) {
      return;
    }
    if (tabs.parentElement !== inner) {
      inner.insertBefore(tabs, inner.querySelector(".md-search"));
    }
    // Material oculta les pestanyes en inicialitzar; dins de la capçalera
    // han de continuar visibles i amb clic actiu.
    tabs.removeAttribute("hidden");
    header.classList.add("md-header--inline");
  }

  // Aplica el tema abans de pintar per a evitar un flaix de color.
  applyTheme(readTheme());

  document.addEventListener("DOMContentLoaded", function () {
    inlineTabs();
    mountSwitcher();
  });

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(function () {
      inlineTabs();
      mountSwitcher();
    });
  }
})();
