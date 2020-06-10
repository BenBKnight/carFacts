async function getVehicles(){
  const result = await $.ajax({
    url: "/api/allVehicles",
    type: "GET"
  });
  console.log(result);
  return result;
};

$(document).ready(() => {
  
  getVehicles();
  $("#submit").click(async function() {
    try {
      event.preventDefault();

      // Gathering information from the form
      const maint = {
        name: $("#jobName").val().trim(),
        description: $("#jobDescription").val().trim(),
        milage: parseInt($("#milage").val().trim()),
        parts: $("#parts").val().trim(),
        vehicle: $("#vehicle").val(),
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