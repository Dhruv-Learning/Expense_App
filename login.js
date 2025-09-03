let form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let username1 = document.getElementById("username").value;
  let password1 = document.getElementById("password").value;

  if (
    username1 == localStorage.getItem("username") &&
    password1 == localStorage.getItem("password") 
  ) {
    alert("Login Successfully !");
    window.location.href = "dashbord.html";
  } else {
    alert(
      "Username and password is invalid ! , Please enter coorrect username and password."
    );
  }
});
