async function listVehicleNames(){
  //Getting all vehicles
  const result = await $.ajax({
    url: "/api/allVehicles",
    type: "GET"
  });
  //Appending vehicle info to the dropdown menu
  result.forEach(vehicle => {
    $("#vehicle").append(`<option id=${vehicle.id}>${vehicle.make} ${vehicle.model} - ${vehicle.vin}</option>`)
  });
};

$(document).ready(() => {
  
  listVehicleNames();

  $("#submit").click(async function() {
    try {
      event.preventDefault();
      // Gathering information from the form
      const maint = {
        name: $("#jobName").val().trim(),
        description: $("#jobDescription").val().trim(),
        milage: parseInt($("#milage").val().trim()),
        parts: $("#parts").val().trim(),
        vehiclefk: 2,
      };
      
      // Sending information to the database
      const result = await $.ajax({
        url: "/api/maintenance",
        type: "POST",
        data: maint
      })

      // Re-directing user back to the maintenance page for the car
      location.pathname = "/maintenance";
    } catch (error) {
      if(error) throw error;
    } 
  });
}); //end doc ready