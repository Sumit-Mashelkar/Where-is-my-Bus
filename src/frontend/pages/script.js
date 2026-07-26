const searchButton = document.getElementById("searchBtn");

function goToResultsPage() {
  window.location.href = "results.html";
}

searchButton?.addEventListener("click", goToResultsPage);
