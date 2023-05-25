let emailField = document.getElementById("email");
let passField = document.getElementById("password");
let submitButton = document.getElementById("button");
let error = document.getElementById("invisible-error");

let clearFields = () => {
  emailField.value = "";
  passField.value = "";
};

window.addEventListener("pageshow", () => {
  clearFields();
});

submitButton.addEventListener("click", (ev) => {
  let email = emailField.value;
  let password = passField.value;

  if (email == "" || password == "") {
    error.innerText = "Fill in all fields.";
    return;
  } else {
    let http = new XMLHttpRequest();
    http.open("POST", "../scripts/signinScript.php");
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        let response = JSON.parse(http.responseText);
        if (response.status == 200) {
          if (response.role == "admin")
            window.location.href = "../views/adminMain.php";
          else if (response.role == "hr")
            window.location.href = "../views/hrMain.php";
          else window.location.href = "../views/EmployeeMain.php";
        } else {
          error.innerText = response;
        }
      }
    };

    http.send("email=" + email + "&password=" + password);
  }
});
