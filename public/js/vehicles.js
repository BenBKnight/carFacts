$(document).ready(() => {
  // Gets an optional query string from our url (i.e. ?post_id=23)
//   const url = window.location.search;
  let vehicleId;
  // Sets a flag for whether or not we're updating a vehicle to be false initially
  const updating = false;

  // blogContainer holds all of our posts
  const vehicleContainer = $("#vehicleContainer");
  const postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleVehicleDelete);
  $(document).on("click", "button.edit", handleVehicleEdit);
  postCategorySelect.on("change", handleTypeChange);
  let vehicles;

  // Getting jQuery references
  const makeInput = $("#make");
  const modelInput = $("#model");
  const yearInput = $("#year");
  const vinInput = $("#vin");
  const mileageInput = $("#mileage");
  const vehicleForm = $("#vehicleForm");
  const type = $("#type");

  // Adding an event listener for when the form is submitted
  $(vehicleForm).on("submit", event => {
    event.preventDefault();
    // Wont submit the vehicle if we are missing a body or a title
    if (!modelInput.val().trim() || !makeInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    const newVehicle = {
      type: type.val(),
      make: makeInput.val().trim(),
      model: modelInput.val().trim(),
      year: yearInput.val().trim(),
      vin: vinInput.val().trim(),
      mileage: mileageInput.val().trim()
    };

    console.log(newVehicle);

    // If we're updating a vehicle run updatePost to update a vehicle
    // Otherwise run submitPost to create a whole new vehicle
    if (updating) {
      newVehicle.id = vehicleId;
      updateVehicle(newVehicle);
    } else {
      submitVehicle(newVehicle);
    }
  });

  // This function grabs posts from the database and updates the view
  function getVehicles(type) {
    let typeString = type || "";
    if (typeString) {
      typeString = "/type/" + typeString;
    }
    $.get("/api/allVehicles" + typeString, data => {
      console.log("Vehicles", data);
      vehicles = data;
      if (!vehicles || !vehicles.length) {
        displayEmpty();
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deleteVehicle(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/vehicles/" + id
    }).then(() => {
      getVehicles(postCategorySelect.val());
    });
  }

  // Getting the initial list of vehicles
  getVehicles();
  // InitializeRows handles appending all of our constructed vehicle HTML inside
  // blogContainer
  function initializeRows() {
    vehicleContainer.empty();
    const vehiclesToAdd = [];
    for (let i = 0; i < vehicles.length; i++) {
      vehiclesToAdd.push(createNewRow(vehicles[i]));
    }
    vehicleContainer.append(vehiclesToAdd);
  }

  // This function constructs a vehicle's HTML
  function createNewRow(vehicle) {
    const newVehicleCard = $("<div>");
    newVehicleCard.addClass("card");
    const newVehicleCardHeading = $("<div>");
    newVehicleCardHeading.addClass("card-header");
    const deleteBtn = $("<button>");
    deleteBtn.css({
      float: "right",
      "font-weight": "700",
      "margin-top": "-15px"
    });
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    const editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    const newPostType = $("<h2>");

    const newPostCategory = $("<h5>");
    newPostCategory.text(vehicle.type);
    newPostCategory.css({
      float: "right",
      "font-weight": "700",
      "margin-top": "-15px"
    });
    const newVehicleCardBody = $("<div>");
    newVehicleCardBody.addClass("card-body");
    const newVehicleBody = $("<p>");
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
    const currentPost = $(this)
      .parent()
      .parent()
      .data("vehicle");
    deleteVehicle(currentPost.id);
  }

  // This function figures out which vehicle we want to edit and takes it to the
  // Appropriate url
  function handleVehicleEdit() {
    const currentPost = $(this)
      .parent()
      .parent()
      .data("vehicle");
    window.location.href = "/vehicles?vehicle_id=" + currentPost.id;
  }

  // This function handles reloading new posts when the category changes
  function handleTypeChange() {
    const newVehicleType = $(this).val();
    getVehicles(newVehicleType);
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    vehicleContainer.empty();
    const messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No vehicles yet for this type!");
    vehicleContainer.append(messageH2);
  }

  // Submits a new vehicle and brings user to blog page upon completion
  function submitVehicle(vehicle) {
    $.post("/api/postVehicle", vehicle, () => {
      window.location.href = "/vehicles";
    });
  }

  // Update a given vehicle, bring user to the blog page when done
  function updateVehicle(vehicle) {
    $.ajax({
      method: "PUT",
      url: "/api/vehicles",
      data: vehicle
    }).then(() => {
      window.location.href = "/vehicles";
    });
  }
});
