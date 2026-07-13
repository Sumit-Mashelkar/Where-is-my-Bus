const button = document.getElementById("menu");
const title = document.getElementById("title");
const menuButton = document.getElementById("menu");
const sidePanel = document.getElementById("side-panel");


button.addEventListener("click", () => {
  const isOpen = button.classList.toggle("open");
  title.classList.toggle("visible", isOpen);
  button.setAttribute("aria-expanded", isOpen);
  button.textContent = isOpen ? "Close Menu" : "Open Menu";
});


      menuButton.addEventListener("click", () => {
        sidePanel.classList.toggle("open");
      });