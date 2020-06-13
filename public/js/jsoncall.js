"use strict";
const request = new Request("../../db/testdata.json");
fetch(request)
  .then(resp => {
    return resp.json();
  })
  .then(data => {
    console.log(data);
  });
