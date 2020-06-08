$(document).ready(() => {
    $.get("/api/allVehicles", function (data) {
        console.log(data);

        if (data.length !== 0) {

            for (var i = 0; i < data.length; i++) {

                var row = $("<div>");
                row.addClass("vehicle");

                row.append("<p>Type: " + data[i].type + "</p>");
                row.append("<p>Make: " + data[i].make + "</p>");
                row.append("<p>Model: " + data[i].model + "</p>");
                row.append("<p>Year: " + data[i].year + "</p>");
                row.append("<p>VIN: " + data[i].vin + "</p>");
                row.append("<p>Mileage: " + data[i].mileage + "</p>");

                $("#vehicle-area").prepend(row);

            }

        }

    });

    // Getting jQuery references to the post body, title, form, and category select
    var makeInput = $("#make");
    var modelInput = $("#model");
    var yearInput = $("#year");
    var vinInput = $("#vin");
    var mileageInput = $("#mileage");
    var vehicleForm = $("#vehicleForm");
    var type = $("#type");
    // Giving the type a default value
    // type.val("");
    // Adding an event listener for when the form is submitted
    $(vehicleForm).on("submit", function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the post if we are missing a body or a title
        if (!modelInput.val().trim() || !makeInput.val().trim()) {
            return;
        }
        // Constructing a newPost object to hand to the database
        var newVehicle = {
            type: type.val(),
            make: makeInput.val().trim(),
            model: modelInput.val().trim(),
            year: yearInput.val().trim(),
            vin: vinInput.val().trim(),
            mileage: mileageInput.val().trim(),
        };

        console.log(newVehicle);

            submitPost(newVehicle);
    });

    // Submits a new post and brings user to blog page upon completion
    function submitPost(vehicle) {
        $.post("/api/postVehicle", vehicle, function () {
            window.location.href = "/vehicles";
        });
    }

});
