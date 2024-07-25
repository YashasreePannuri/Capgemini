const BASE_URL = "http://3.87.147.61:8090/";
// const BASE_URL = "http://localhost:8080/";

let username = localStorage.getItem("username");
document.getElementById("usernameText").innerHTML = username;

//Calls API to get dashboard data
const getCustomerDashboard = () => {
  const options = { method: "GET" };
  const url = BASE_URL + "bank/dashboard/" + username;
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
      printcustomerData2(data);
    })
    .catch((error) => console.error("Fetch error:", error));
};

//Formats and prints the data for the page
const printcustomerData2 = (data) => {
  document.getElementById("CurrentAccountBalance").innerHTML =
    "£" + data.bankAccounts.current;
  document.getElementById("SavingAccountBalance").innerHTML =
    "£" + data.bankAccounts.savings;

  const totalBalance = data.bankAccounts.current + data.bankAccounts.savings;
  document.getElementById("totalBalance").textContent = "£" + totalBalance;

  // Populate recent payees list
  const payeesList = document.getElementById("payeesList");
  data.recentPayees.forEach((payee) => {
    const li = document.createElement("li");
    li.textContent = payee;
    payeesList.appendChild(li);
  });

  const transactionsList = document.getElementById("transactionsList");

  // Assuming you have the data.transactions array
  data.recentTransactions.forEach((transaction) => {
    // Create a div for each transaction
    const div = document.createElement("div");
    div.className = "text-box";

    // Create a div for the date
    const dateDiv = document.createElement("div");
    dateDiv.className = "date-box";
    const h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.textContent = transaction.date;
    dateDiv.appendChild(h5);
    div.appendChild(dateDiv);

    // Create a div for the transaction detailsteElement("div");
    const detailsDiv = document.createElement("div");
    const p = document.createElement("p");
    p.textContent = `${transaction.transactionName}: £${transaction.transactionAmount}`;
    detailsDiv.appendChild(p);
    div.appendChild(detailsDiv);

    // Append the div to the transactionsList
    transactionsList.appendChild(div);
  });
};

getCustomerDashboard();
