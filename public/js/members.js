$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.firstName);
  });
});
const logoutBtn = $(".logoutBtn");
logoutBtn.on("click", event => {
  event.preventDefault();
  window.location.replace("/logout");
});

// CLick Listener for vehicle button
const vehicleBtn = $("#vehicleButton");
vehicleBtn.on("click", () => {
  console.log("button clicked");
  window.location.replace("/vehicles");
  // If there's an error, handle it by throwing up a bootstrap alert
  console.log("changed pages");
});
