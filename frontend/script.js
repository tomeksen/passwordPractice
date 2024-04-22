import { hashPassword } from "./utils/encryptPass.js";


$("#add-account").on("submit", function (event) {
  event.preventDefault();
  const username = $("#username").val();
  let password = $("#password").val(); 
  // hashing the password to add it in the register
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
  cleanFilter()
});

$("#loginAccount").on("submit", function (event) {
  event.preventDefault();
  let usernameLogin = $("#usernameLogin").val();
  let passwordLogin = $("#passwordLogin").val();
  //function to hash the password before check in the log in
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
        body: JSON.stringify({ username, password }), 
      });
  
      const data = await response.json();
      if(data.message){
        alert(data.message)
      }else{
        alert('welcome '+ data.username)
      }
      return data;
    };
    loginAccount(usernameLogin , passwordLogin);
    cleanFilter()
  } else {
    alert("Please enter a usernameLogin");
  }
});

// show all accounts

$("#all-accounts").on("click", async function () {
  const URL = `http://localhost:3000/api/users`;
  const getAccounts = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  };
  addUsersToScreen(await getAccounts());
});
const addUsersToScreen = (data) =>
{
  $('#users').html('')
  data.forEach(element => {
    console.log(element)
    $('#users').append(`<code>{
      userId: ${element.userId},
      username: '${element.username}',
      password: '${element.password}'
    }
      </code><br>`)
  });
}
const cleanFilter = () =>{
  $("#usernameLogin").val("");
  $("#passwordLogin").val(""); 
}