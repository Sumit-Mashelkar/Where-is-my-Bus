const title = document.getElementById("title");//1
//const menuButton = document.getElementById("menu");//2
//const sidePanel = document.getElementById("side-panel");//3
const seachButton = document.getElementById("seach-button");//4
const handle = document.getElementById("handle");//5
//const button = document.getElementById("menu");//6


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
// seachButton.addEventListener("click",function (){
//   console.log("loading busses...");
//   document.getElementById("main").innerHTML=
// `
  
//   <div id="result">
//   <h1>no bus found</h1>
//   </div>

//   //window.location.href="Bus.html";
//   console.log("loaded bus page");
// `;  
// });

//modal to search the bus
const modal = document.getElementById("modal");

document.getElementById("openModal").addEventListener("click",function(){

    modal.classList.add("show");

});

document.getElementById("searchBtn").addEventListener("click",function(){

    modal.classList.remove("show");

});


//handle
handle.getElementById("click", function(){
    console.log("closing the modal");
})