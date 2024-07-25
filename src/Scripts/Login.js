const BASE_URL = "http://3.87.147.61:8090";
// const BASE_URL = "http://localhost:8080";
var username = "";
var password = "";

//Calls API to check if username and password correct
const authenticUser = async () => {
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;

  const bodyPayload = { customerName: username, password: password };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyPayload),
  };
  fetch(BASE_URL + "/bank/login", options)
    .then((response) => {
      if (response.status == 200) {
        localStorage.setItem("username", username);
        window.location.href = "Dashboard.html";
      } else {
        alert("Invalid Username and/or Password");
      }
    })
    .catch((err) => alert("Error: " + err));
};

const showForgotPasswordAlert = () => {
  alert("Reset password");
};
