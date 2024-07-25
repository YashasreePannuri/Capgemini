const BASE_URL = "http://3.87.147.61:8090/";
// const BASE_URL = "http://localhost:8080/";

let username = localStorage.getItem("username");
document.getElementById("usernameText").innerHTML = username;

//Calls API to get Profile data
const getCustomerProfile = () => {
  console.log(username);
  const options = { method: "GET" };
  const url = BASE_URL + "bank/" + username;
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response error");
      }
    })
    .then((data) => {
      console.log(data);
      printProfileData(data);
    })
    .catch((error) => console.error("Fetch error:", error));
};

//Populates sections of page with data
const printProfileData = (data) => {
  document.getElementById("name").innerHTML = data.customerName;
  document.getElementById("phoneNo").innerHTML = data.customerPhoneNumber;
  document.getElementById("email").innerHTML = data.customerEmail;
  document.getElementById("address").innerHTML = data.customerResidentialAddress;
  document.getElementById("occupation").innerHTML = data.customerOccupation;
};

getCustomerProfile();
