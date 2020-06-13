let memberId;

async function getVehicles() {
  //console.log("working");
  const result = await $.ajax({
    url: `/vehiclefind/${memberId}`,
    method: "GET"
  });

  result.forEach(vehicle => {
    const vehicleName = vehicle.type;
    $("#vehicleDisplay").append(
      `<a href="/vehicles/${vehicle.id}" class="image is-is-5by4 mb-2 container is-clickable"><img id="vehicleButton"  src="images/${vehicleName.toLowerCase()}.png"></a>`
    );
  });
}

$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  const loginHide = $(".login-hide");
  const signupHide = $(".signup-hide");
  $(document).ready(() => {
    signupHide.hide();
  });
  $(document).ready(() => {
    loginHide.hide();
  });
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.firstName);
    //console.log(data.id);
    memberId = data.id;
    getVehicles();
  });
});
//console.log(memberId);

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
