const BASE_URL = "http://3.87.147.61:8090/";
// const BASE_URL = "http://localhost:8080/";

let username = localStorage.getItem("username");
document.getElementById("usernameText").innerHTML = username;

//Calls API to get savings account data
const getSavingData = () => {
  console.log(username);
  const options = { method: "GET" };
  const url = BASE_URL + "bank/account/" + username + "/2";
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parse the data as JSON
      } else {
        throw new Error("Network response error");
      }
    })
    .then((data) => {
      console.log(data);
      printSavingData(data);
    })
    .catch((error) => console.error("Fetch error:", error));
};

//Displays data for page
const printSavingData = (data) => {
  document.getElementById("savingAccountNumber").innerHTML = data.accountNum;
  document.getElementById("savingSortCode").innerHTML = data.sortCode;
  document.getElementById("SavingAccountBalance").innerHTML = data.balance;
};

//Opens the transfer to payee block
function openTransferForm() {
  document.getElementById("transferForm").style.display = "block";
}

//Function for moving money from the savings account to the current account
function transferMoney() {
  const amountValue = document.getElementById("amount").value;
  const realVal = parseFloat(amountValue);
  const customerName = localStorage.getItem("username");
  const accountType = 2;
  const requestBody = {
    customerName: customerName,
    accountType: accountType,
    balanceChange: realVal,
  };

  console.log(requestBody);
  const url = BASE_URL + "bank/move";

  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Transfer successful!");
        window.location.reload();
      } else {
        console.error("Transfer failed.");
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

getSavingData();
