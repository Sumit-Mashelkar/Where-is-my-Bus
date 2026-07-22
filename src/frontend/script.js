//const button = document.getElementById("menu");
const title = document.getElementById("title");
//const menuButton = document.getElementById("menu");
//const sidePanel = document.getElementById("side-panel");
const seachButton = document.getElementById("seach-button");

//inner HTML to replace search form with bus results


//menu button
// button.addEventListener("click", () => {
//   const isOpen = button.classList.toggle("open");
//   title.classList.toggle("visible", isOpen);
//   button.setAttribute("aria-expanded", isOpen);
//   button.textContent = isOpen ? "Close Menu" : "Open Menu";
// });

//   menuButton.addEventListener("click", () => {
//   sidePanel.classList.toggle("open");
//   });


//search button operation
seachButton.addEventListener("click",function (){
  console.log("loading busses...");
  document.getElementById("main").innerHTML=
'<link rel="stylesheet" href="Bustyle.css"/><div id="title">Where is my Bus</div>';
  //window.location.href="Bus.html";
  console.log("loaded bus page");
});
