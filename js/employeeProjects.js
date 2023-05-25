let tableBody = document.getElementById("table-body");

window.onload = () => {
  getAnalyses((projects) => {
    prepareContent(projects);
  });
};

let getAnalyses = (callback) => {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "../scripts/getProjects.php", true);

  xhr.send();

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

let prepareContent = (projects) => {
  tableBody.innerHTML = "";
  if (projects) {
    for (let project of projects) {
      if (project.status == "active") {
        let row = `
      <tr>
        <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${project.name}</strong></td>
        <td>${project.client}</td>
        <td>
          <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-xs pull-up" title="Lilian Fuller">
              <img src="../assets/img/profiles/default.png" alt="Avatar" class="rounded-circle" />
            </li>
            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-xs pull-up" title="Sophia Wilkerson">
              <img src="../assets/img/profiles/default.png" alt="Avatar" class="rounded-circle" />
            </li>
            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-xs pull-up" title="Christina Parker">
              <img src="../assets/img/profiles/default.png" alt="Avatar" class="rounded-circle" />
            </li>
          </ul>
        </td>`;

        if (project.status == "active") {
          row += `<td><span class="badge bg-label-primary me-1">Active</span></td>`;
        }
        row += `
      <td>
        <div class="dropdown">
            <a class="btn btn-sm btn-primary" href="../views/viewProjectEmployee.php?projectId=${project.id}" self-id="${project.id}">Details</a>
        </div>
      </td>
    </tr>`;

        tableBody.innerHTML += row;
      }
    }
  } else {
    content.innerHTML += `<h3 style="color: crimson;">No analysis avaliable</h3>`;
  }
};
