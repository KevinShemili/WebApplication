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
      let row = `
      <tr>
        <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${project.name}</strong></td>
        <td>${project.client}</td>`;

      if (project.status == "active") {
        row += `<td><span class="badge bg-label-primary me-1">Active</span></td>
        <td>
        <div class="dropdown">
            <a class="btn btn-sm btn-primary" href="../views/viewProjectAdmin.php?projectId=${project.id}" self-id="${project.id}">Details</a>
                <a class="btn btn-sm btn-warning" href="../scripts/archiveProject.php?projectId=${project.id}" self-id="${project.id}">Archive</a>
        </div>
      </td>`;
      } else if (project.status == "completed") {
        row += `<td><span class="badge bg-label-success me-1">Completed</span></td>
        <td>
        <div class="dropdown">
            <a class="btn btn-sm btn-primary" href="../views/viewProjectAdmin.php?projectId=${project.id}" self-id="${project.id}">Details</a>
        </div>
      </td>`;
      } else {
        row += `<td><span class="badge bg-label-warning me-1">Canceled</span></td>`;
      }

      row += `
      
    </tr>`;

      tableBody.innerHTML += row;
    }
  } else {
    content.innerHTML += `<h3 style="color: crimson;">No analysis avaliable</h3>`;
  }
};
