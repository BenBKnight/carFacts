const id = window.location.href.split("/")

id[id.length-1]

$(document).ready(() => {
  $.ajax({
    url: `/maintenancefind/${id[id.length-1]}`,
    type: "GET"
  })
    .then(result => {
      console.log(result[0].name);
      $("#jobName").append(result[0].name);
      $("#jobDate").append(`(${result[0].jobDate})`);
      $("#milage").append(`${result[0].milage}`);
      $("#description").append(`${result[0].description}`);
      $("#parts").append(`${result[0].parts}`);
    })
    .catch(err => console.log(err));

  
}); //end document.ready
