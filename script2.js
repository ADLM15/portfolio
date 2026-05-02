const nav = document.getElementById("nav");
const centerButton = nav.querySelector(".nav-item.center");
const buttons = nav.querySelectorAll(".nav-item");

function setMenu(open) {
  nav.classList.toggle("active", open);
  centerButton.setAttribute("aria-expanded", String(open));
  centerButton.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
}

centerButton.addEventListener("click", (event) => {
  event.stopPropagation();
  setMenu(!nav.classList.contains("active"));
});

buttons.forEach((button) => {
  if (button === centerButton) return;

  button.addEventListener("click", (event) => {
    event.stopPropagation();

    buttons.forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
  });
});

document.addEventListener("click", (event) => {
  if (!nav.contains(event.target)) {
    setMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
    centerButton.focus();
  }
});