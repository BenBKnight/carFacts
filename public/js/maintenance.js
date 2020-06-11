$(document).ready(() => {
  const jobNames = $("#jobNames");

  $.ajax({
    url: "/api/maintenance",
    type: "GET"
  })
    .then(result => {
      // nameArray.push(result);

      result.forEach(index => {
        jobNames.append(`<li data-jobid= "${index.id}">${index.name}</li>`);
      });
    })
    .catch(err => console.log(err));

  $("ul").click(event => {
    location.pathname = `/maintenance/${event.target.dataset.jobid}`;
  });
}); //end document.ready
