let projectNameField = document.getElementById("projectName");
let clientEmailField = document.getElementById("email");
let clientNameField = document.getElementById("clientName");
let descriptionField = document.getElementById("description");
let countryField = document.getElementById("country");

let error = document.getElementById("invisible-error1");

let publishButton = document.getElementById("publish");
let cancelButton = document.getElementById("cancel");

window.onload = () => {
  projectNameField.value = "";
  clientEmailField.value = "";
  clientNameField.value = "";
  countryField.value = "";
  descriptionField.value = "";
};

$(document).ready(function () {
  $("#closeModal").click(function () {
    $(modal).modal("hide");
  });
});

publishButton.addEventListener("click", () => {
  if (projectNameField.value == "" || projectNameField.value == null) {
    error.innerText = "Fill in all fields.";
    return;
  }

  if (clientEmailField.value == "" || clientEmailField.value == null) {
    error.innerText = "Fill in all fields.";
    return;
  }

  if (clientNameField.value == "" || clientNameField.value == null) {
    error.innerText = "Fill in all fields.";
    return;
  }

  if (descriptionField.value == "" || descriptionField.value == null) {
    error.innerText = "Fill in all fields.";
    return;
  }

  if (countryField.value == "" || countryField.value == null) {
    error.innerText = "Fill in all fields.";
    return;
  }

  var http = new XMLHttpRequest();
  http.open("POST", "../scripts/newProject.php", true);

  let form = new FormData();

  form.append("projectName", projectNameField.value);
  form.append("clientName", clientNameField.value);
  form.append("clientEmail", clientEmailField.value);
  form.append("description", descriptionField.value);
  form.append("country", countryField.value);

  http.send(form);

  http.onreadystatechange = function () {
    if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
      let response = JSON.parse(http.responseText);
      if (response == 200) {
        $(modal).modal("show");
        setTimeout(() => {
          $(modal).modal("hide");
          window.location.href = `../views/adminProjects.php`;
        }, 1000);
      } else if (response.status == 500) {
        $(modal3).modal("hide");
        $(modal2).modal("show");
      } else {
        error.innerText = response;
      }
    }
  };
});

cancelButton.addEventListener("click", () => {
  window.location.href = `../views/adminProjects.php`;
});
