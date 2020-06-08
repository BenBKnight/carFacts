$(document).ready(() => {
    // Gets an optional query string from our url (i.e. ?post_id=23)
    var url = window.location.search;
    var vehicleId;
    // Sets a flag for whether or not we're updating a vehicle to be false initially
    var updating = false;

    // blogContainer holds all of our posts
    var vehicleContainer = $("#vehicleContainer");
    var postCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handleVehicleDelete);
    $(document).on("click", "button.edit", handleVehicleEdit);
    postCategorySelect.on("change", handleTypeChange);
    var vehicles;


    // Getting jQuery references 
    var makeInput = $("#make");
    var modelInput = $("#model");
    var yearInput = $("#year");
    var vinInput = $("#vin");
    var mileageInput = $("#mileage");
    var vehicleForm = $("#vehicleForm");
    var type = $("#type");

    // Adding an event listener for when the form is submitted
    $(vehicleForm).on("submit", function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the vehicle if we are missing a body or a title
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

        // If we're updating a vehicle run updatePost to update a vehicle
        // Otherwise run submitPost to create a whole new vehicle
        if (updating) {
            newVehicle.id = vehicleId;
            updateVehicle(newVehicle);
        }
        else {
            submitVehicle(newVehicle);
        }
    });

    // This function grabs posts from the database and updates the view
    function getVehicles(type) {
        var typeString = type || "";
        if (typeString) {
            typeString = "/type/" + typeString;
        }
        $.get("/api/allVehicles" + typeString, function (data) {
            console.log("Vehicles", data);
            vehicles = data;
            if (!vehicles || !vehicles.length) {
                displayEmpty();
            }
            else {
                initializeRows();
            }
        });
    }

    // This function does an API call to delete posts
    function deleteVehicle(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/vehicles/" + id
        })
            .then(function () {
                getVehicles(postCategorySelect.val());
            });
    }

    // Getting the initial list of vehicles
    getVehicles();
    // InitializeRows handles appending all of our constructed vehicle HTML inside
    // blogContainer
    function initializeRows() {
        vehicleContainer.empty();
        var vehiclesToAdd = [];
        for (var i = 0; i < vehicles.length; i++) {
            vehiclesToAdd.push(createNewRow(vehicles[i]));
        }
        vehicleContainer.append(vehiclesToAdd);
    }


    // This function constructs a vehicle's HTML
    function createNewRow(vehicle) {
        var newVehicleCard = $("<div>"); newVehicleCard.addClass("card");
        var newVehicleCardHeading = $("<div>");
        newVehicleCardHeading.addClass("card-header");
        var deleteBtn = $("<button>");
        deleteBtn.css({
            float: "right",
            "font-weight": "700",
            "margin-top":
                "-15px"
        });
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");
        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit btn btn-default");
        var newPostType = $("<h2>");

        var newPostCategory = $("<h5>");
        newPostCategory.text(vehicle.type);
        newPostCategory.css({
            float: "right",
            "font-weight": "700",
            "margin-top":
                "-15px"
        });
        var newVehicleCardBody = $("<div>");
        newVehicleCardBody.addClass("card-body");
        var newVehicleBody = $("<p>");
        newPostType.text(vehicle.make + " ");
        newVehicleBody.text(vehicle.model);

        newVehicleCardHeading.append(newPostType);
        //newVehicleCardHeading.append(newPostCategory);
        newVehicleCardHeading.append(newVehicleBody);
        newVehicleCardBody.append(deleteBtn);
        //newVehicleCardHeading.append(editBtn);
        newVehicleCard.append(newVehicleCardHeading);
        newVehicleCard.append(newVehicleCardBody);
        newVehicleCard.data("vehicle", vehicle);
        return newVehicleCard;
    }

    // This function figures out which vehicle we want to delete and then calls
    // deletePost
    function handleVehicleDelete() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("vehicle");
        deleteVehicle(currentPost.id);
    }

    // This function figures out which vehicle we want to edit and takes it to the
    // Appropriate url
    function handleVehicleEdit() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("vehicle");
        window.location.href = "/vehicles?vehicle_id=" + currentPost.id;
    }

    // This function handles reloading new posts when the category changes
    function handleTypeChange() {
        var newVehicleType = $(this).val();
        getVehicles(newVehicleType);
    }


    // This function displays a message when there are no posts
    function displayEmpty() {
        vehicleContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No vehicles yet for this type!");
        vehicleContainer.append(messageH2);
    }

    // Submits a new vehicle and brings user to blog page upon completion
    function submitVehicle(vehicle) {
        $.post("/api/postVehicle", vehicle, function () {
            window.location.href = "/vehicles";
        });
    }

    // Update a given vehicle, bring user to the blog page when done
    function updateVehicle(vehicle) {
        $.ajax({
            method: "PUT",
            url: "/api/vehicles",
            data: vehicle
        })
            .then(function () {
                window.location.href = "/vehicles";
            });
    }

});
