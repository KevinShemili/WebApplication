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
let tableBody = document.getElementById("table-body");

const urlParams = new URLSearchParams(window.location.search);

let getApplicants = (callback) => {
  const id = urlParams.get("projectId");
  var xhr = new XMLHttpRequest();

  let form = new FormData();

  form.append("projectId", id);

  xhr.open("POST", "../scripts/getApplicants.php", true);

  xhr.send(form);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      if (response.status == 200) {
        callback(response.data);
      } else {
        error.innerText = response.error;
      }
    }
  };
};

let prepareContent = (applicants) => {
  const id = urlParams.get("projectId");

  tableBody.innerHTML = "";
  if (applicants) {
    for (let applicant of applicants) {
      let row = `
      <tr>
        <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${applicant.username}</strong></td>
        <td>${applicant.appliedOn}</td>`;

      if (applicant.status == 0) {
        row += `<td><span class="badge bg-label-warning me-1">Pending</span></td>
        <td>
        <a href="../scripts/acceptApplicant.php?projectId=${id}&user_id=${applicant.id}"><button type="button" class="btn btn-success btn-sm">Accept</button></a>
        <a href="../scripts/declineApplicant.php?projectId=${id}&user_id=${applicant.id}"><button type="button" class="btn btn-danger btn-sm">Decline</button></a>
      </td>`;
      } else if (applicant.status == -1) {
        row += `<td><span class="badge bg-label-danger me-1">Declined</span></td>
        <td>
        <a href="../scripts/acceptApplicant.php?projectId=${id}&user_id=${applicant.id}"><button type="button" class="btn btn-success btn-sm">Accept</button></a>
      </td>`;
      } else {
        row += `<td><span class="badge bg-label-success me-1">Accepted</span></td>
        <td>
        <a href="../scripts/declineApplicant.php?projectId=${id}&user_id=${applicant.id}"><button type="button" class="btn btn-danger btn-sm">Decline</button></a>
      </td>`;
      }

      tableBody.innerHTML += row;
    }
  } else {
    content.innerHTML += `<h3 style="color: crimson;">No analysis avaliable</h3>`;
  }
};

window.onload = () => {
  const id = urlParams.get("projectId");

  let http = new XMLHttpRequest();
  http.open("GET", "../scripts/getProject.php?id=" + id, true);

  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      // Hide the spinner
      document.getElementById("spinner").style.display = "none";

      getApplicants((applicants) => {
        prepareContent(applicants);
      });

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
      }
    }
  };

  http.send();
};

publishButton.addEventListener("click", () => {
  const id = urlParams.get("projectId");

  var xhr = new XMLHttpRequest();

  xhr.open("POST", "../scripts/updateProject.php", true);

  var form = new FormData();

  form.append("id", id);

  if (projectNameField.value == "" || projectNameField.value == null) {
    error.innerText = "Fill in all fields.";
    return;
  } else {
    form.append("projectName", projectNameField.value);
  }

  if (clientNameField.value == "" || clientNameField.value == null) {
    error.innerText = "Fill in all fields.";
    return;
  } else {
    form.append("clientName", clientNameField.value);
  }

  if (clientEmailField.value == "" || clientEmailField.value == null) {
    error.innerText = "Fill in all fields.";
    return;
  } else {
    form.append("clientEmail", clientEmailField.value);
  }

  if (countryField.value == "" || countryField.value == null) {
    error.innerText = "Fill in all fields.";
    return;
  } else {
    form.append("country", countryField.value);
  }

  if (descriptionField.value != descriptionField.value) {
    error.innerText = "Fill in all fields.";
    return;
  } else {
    form.append("description", descriptionField.value);
  }

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
  window.location.href = `../views/adminProjects.php`;
});

$(document).ready(function () {
  $("#modalCancel").click(function () {
    $(editModal).modal("hide");
  });
});
