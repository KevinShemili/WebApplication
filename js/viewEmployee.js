const receivedData = JSON.parse(localStorage.getItem('data'));

let nameField = document.getElementById("name");
let surnameField = document.getElementById("surname");
let emailField = document.getElementById("email");
let usernameField = document.getElementById("username");
let passwordField = document.getElementById("password");
let imageField = document.getElementById("image");

let error = document.getElementById("invisible-error1");

let confirmButton = document.getElementById("confirm");
let cancelButton = document.getElementById("cancel");

window.onload = () => {
    nameField.value = receivedData.name;
    surnameField.value = receivedData.surname;
    emailField.value = receivedData.email;
    usernameField.value = receivedData.username;
    passwordField.value = "";

  };

  let modal = $('#myModal'); // Change 'myModal' to the actual id of your modal

$(document).ready(function () {
  $("#closeModal").click(function () {
    $(modal).modal("hide");
  });
});

confirmButton.addEventListener("click", () => {
  if (nameField.value == "" || surnameField.value == "" || emailField.value == "" || usernameField.value == "" || passwordField.value == ""|| imageField.files.length == 0) {
    error.innerText = "Fill in all fields.";
    return;
  }

  var http = new XMLHttpRequest();
  http.open("POST", "../scripts/UpdateEmployee.php", true);

  let form = new FormData();

  form.append("id",receivedData.id)
  form.append("name", nameField.value);
  form.append("surname", surnameField.value);
  form.append("email", emailField.value);
  form.append("username", usernameField.value);
  form.append("password", passwordField.value);
  form.append("image", imageField.files[0]); 

  http.send(form);

  http.onreadystatechange = function () {
    if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            console.log(http.responseText);
          let response = JSON.parse(http.responseText);
      if (response == 200) {
        $(modal).modal("show");
        setTimeout(() => {
          $(modal).modal("hide");
          window.location.href = `../views/Admin_Employee_Section.php`;
        }, 1000);
      } else if (response.status == 500) {
        $(modal3).modal("hide");
        $(modal2).modal("show");
      } else {
        console.log("brunoooooooo");
        error.innerText = response;
      }
    }
  };
});

cancelButton.addEventListener("click", () => {
  window.location.href = `../views/Admin_Employee_Section.php`;
});
