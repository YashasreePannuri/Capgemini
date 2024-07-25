const BASE_URL = "http://3.87.147.61:8090/";
// const BASE_URL = "http://localhost:8080/";

let username = localStorage.getItem("username");
document.getElementById("usernameText").innerHTML = username;

//Calls API to get current account data
const getCurrentData = () => {
  console.log(username);
  const options = { method: "GET" };
  const url = BASE_URL + "bank/account/" + username + "/1";
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
      printCurrentData(data);
    })
    .catch((error) => console.error("Fetch error:", error));
};

//Displays data for page
const printCurrentData = (data) => {
  document.getElementById("currentAccountNumber").innerHTML = data.accountNum;
  document.getElementById("currentSortCode").innerHTML = data.sortCode;
  document.getElementById("currentBalance").innerHTML = data.balance;
};

//Opens the transfer to savings block
function openTransferForm() {
  document.getElementById("transferForm").style.display = "block";
}

//Opens the transfer to payee block
function openTransferForm2() {
  document.getElementById("transferForm2").style.display = "block";
}

//Function for moving money from the current account to the savings account
function transferMoney() {
  const amountValue = document.getElementById("amount").value;
  const realVal = parseFloat(amountValue);
  const customerName = localStorage.getItem("username");
  const accountType = 1;
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

//Function for moving money from the current account to a different payee
function transferMoneyLocal() {
  const amountValue = document.getElementById("amount2").value;
  const realVal = parseFloat(amountValue);
  const customerName = localStorage.getItem("username");
  const clientName = document.getElementById("accountName").value;
  const accountType = 1;
  const requestBody = {
    customerName: customerName,
    accountType: accountType,
    balanceChange: realVal,
    clientName: clientName,
  };

  console.log(requestBody);
  const url = BASE_URL + "bank/moveLocal";

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

getCurrentData();
