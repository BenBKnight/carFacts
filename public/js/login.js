$(document).ready(() => {
  const navbar = $(".nav-hide");
  const logoutHide = $(".logoutHide");
  const loginHide = $(".login-hide");
  $(document).ready(() => {
    loginHide.hide();
  });
  $(document).ready(() => {
    logoutHide.hide();
  });
  $(document).ready(() => {
    navbar.hide();
  });
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });
  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(() => {
        // console.log("hit");
        window.location.assign("/members");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }
});
const signup = $(".signup-hide");
signup.on("click", event => {
  event.preventDefault();
  window.location.assign("/signup");
});
