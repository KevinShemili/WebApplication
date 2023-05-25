let usernameField = document.getElementById("username");
let emailField = document.getElementById("email");
let passField = document.getElementById("password");
let submitButton = document.getElementById("button");
let error = document.getElementById("invisible-error");
let modal = document.getElementById("exampleModalCenter");
let roleField = document.getElementById("roles");

const PASSWORD_REGEX = new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$");

let clearFields = () => {
  usernameField.value = "";
  emailField.value = "";
  passField.value = "";
};

window.addEventListener("pageshow", () => {
  clearFields();
});

submitButton.addEventListener("click", (ev) => {
  let username = usernameField.value;
  let email = emailField.value;
  let password = passField.value;
  let role = roleField.value;

  if (username == "" || email == "" || password == "") {
    error.innerText = "Fill in all fields.";
    return;
  } else if (!PASSWORD_REGEX.test(password)) {
    error.innerText =
      "Invalid password format.\nAt least 8 characters and 1 number.";
    return;
  } else {
    let http = new XMLHttpRequest();
    http.open("POST", "../scripts/signupScript.php", true);
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        let response = JSON.parse(http.responseText);
        if (response == 200) {
          $(modal).modal("show");
          setTimeout(() => {
            $(modal).modal("hide");
            window.location.href = "../views/signin.php";
          }, 3000);
        } else {
          error.innerText = response;
        }
      }
    };

    http.send(
      "username=" +
        username +
        "&email=" +
        email +
        "&password=" +
        password +
        "&role=" +
        role
    );
  }
});
