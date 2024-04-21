import { hashPassword } from "./utils/encryptPass.js";


$("#add-account").on("submit", function (event) {
  event.preventDefault();
  const username = $("#username").val();
  let password = $("#password").val(); // Get the password from the form
  hashPassword(password).then(hash => {
    console.log(hash);
  });

  const URL = `http://localhost:3000/api/users`;

  const addAccount = async (username, password) => {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }), // Send the password to the server
    });

    const data = await response.json();
    console.log(data);
    return data;
  };

  addAccount(username, password);
  $("#username").val("");
  $("#password").val(""); // Clear the password field
});

$("#loginAccount").on("submit", function (event) {
  event.preventDefault();
  let usernameLogin = $("#usernameLogin").val();
  let passwordLogin = $("#passwordLogin").val(); // Get the password from the form
  hashPassword(passwordLogin).then(hash => {
    console.log(hash);
  });
  if (usernameLogin.trim()) {
    const URL = `http://localhost:3000/api/usersLogin`;

    const loginAccount = async (username, password) => {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Send the password to the server
      });
  
      const data = await response.json();
      console.log(data);
      return data;
    };
    loginAccount(usernameLogin , passwordLogin);
    $("#usernameLogin").val("");
    $("#passwordLogin").val(""); // Clear the password field
  } else {
    alert("Please enter a usernameLogin");
  }
});

// show all accounts

$("#all-accounts").on("click", function () {
  const URL = `http://localhost:3000/api/users`;
  const getAccounts = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
  };
  getAccounts();
});
