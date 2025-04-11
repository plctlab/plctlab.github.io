document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("js-navbar-toggle");
  const menu = document.getElementById("js-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.toggle("open");
    });
  }
});
