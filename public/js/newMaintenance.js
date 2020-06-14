async function listVehicleNames() {
  //Getting all vehicles
  const userId = await $.ajax({
    url: "/api/user_data",
    type: "GET"
  });
  // console.log(userId);
  const result = await $.ajax({
    url: `/vehiclefind/${userId.id}`,
    type: "GET"
  });
  //Appending vehicle info to the dropdown menu
  result.forEach(vehicle => {
    $("#vehicle").append(
      `<option value=${vehicle.id}>${vehicle.make} ${vehicle.model}: Vin-${vehicle.vin}</option>`
    );
  });
}

$(document).ready(() => {
  const loginHide = $(".login-hide");
  const signupHide = $(".signup-hide");
  
  signupHide.hide();
  loginHide.hide();
  listVehicleNames();


  $("#submit").click(async () => {
    try {
      event.preventDefault();
      // Gathering information from the form
      const maint = {
        name: $("#jobName")
          .val()
          .trim(),
        description: $("#jobDescription")
          .val()
          .trim(),
        milage: parseInt(
          $("#milage")
            .val()
            .trim()
        ),
        parts: $("#parts")
          .val()
          .trim(),
        VehicleId: $("#vehicle").val(),
        jobDate: `${$("#date-month").val()}-${$("#date-day").val()}-${$("#date-year").val()}`
      };

      // Sending information to the database
      await $.ajax({
        url: "/api/maintenance",
        type: "POST",
        data: maint
      });

      // Re-directing user back to the maintenance page for the car
      location.pathname = `/vehicles/${$("#vehicle").val()}`;
    } catch (error) {
      if (error) {
        throw error;
      }
    }
  });
}); //end doc ready
const logoutBtn = $(".logoutBtn");
logoutBtn.on("click", event => {
  event.preventDefault();
  window.location.replace("/logout");
});
