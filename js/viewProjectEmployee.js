let projectNameField = document.getElementById("projectName");
let clientNameField = document.getElementById("clientName");
let clientEmailField = document.getElementById("email");
let countryField = document.getElementById("country");
let descriptionField = document.getElementById("description");

let publishButton = document.getElementById("publish");
let cancelButton = document.getElementById("cancel");

let error = document.getElementById("invisible-error1");

let editModal = document.getElementById("modal2");

let content = document.getElementById("content");

const urlParams = new URLSearchParams(window.location.search);

window.onload = () => {
  const id = urlParams.get("projectId");

  let http = new XMLHttpRequest();
  http.open("GET", "../scripts/getProject.php?id=" + id, true);

  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      // Hide the spinner
      document.getElementById("spinner").style.display = "none";

      let response = JSON.parse(http.responseText);
      if (response == "empty") {
        error.innerText = "Server Error.";
      } else {
        // Show the form fields
        content.style.display = "block";

        projectNameField.value = response.name;
        clientNameField.value = response.client;
        clientEmailField.value = response.clientEmail;
        countryField.value = response.country;
        descriptionField.value = response.description;

        projectNameField.readOnly = true;
        clientNameField.readOnly = true;
        clientEmailField.readOnly = true;
        countryField.readOnly = true;
        descriptionField.readOnly = true;
      }
    }
  };

  http.send();
};

publishButton.addEventListener("click", () => {
  const id = urlParams.get("projectId");

  var xhr = new XMLHttpRequest();

  xhr.open("POST", "../scripts/applyToProject.php", true);

  var form = new FormData();

  form.append("projectId", id);

  xhr.send(form);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      if (response == 200) {
        $(editModal).modal("show");
        setTimeout(() => {
          $(editModal).modal("hide");
          location.reload();
        }, 3000);
      } else {
        error.innerText = response;
      }
    }
  };
});

cancelButton.addEventListener("click", () => {
  window.location.href = `../views/EmployeeMain.php`;
});
