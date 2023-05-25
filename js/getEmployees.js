window.onload = () => {
    fetchEmployees(false);

  };

const showall=document.getElementById("Archive_Employee");
let  showall_clicked=false;
showall.addEventListener('click', function() {

      if(showall_clicked==false){  
        showall.textContent="Active Employees Only"
        showall_clicked=true
      }
    else{
      showall_clicked=false;
      showall.textContent="Show All"


    }
    fetchEmployees(showall_clicked);




});


function fetchEmployees(showall_clicked) {
    fetch('../scripts/getEmployees.php')
      .then(response => response.json())
      .then(data => {
        let container = document.getElementById('employee-grid');
        container.innerHTML = "";  // Clear the container
        data.forEach(employee => {
          if(showall_clicked){
                  if(employee.Active!=0){
                    let card = document.createElement('div');
              card.style.overflow = 'hidden';

              card.className = 'employee-card';
              card.id=`${employee.id}`;
        
              card.innerHTML = `
                <img id="img" src="${employee.image}" alt="Employee Image">
                <h2 id="name_surname">${employee.name} ${employee.surname}</h2>
                <p id="email">${employee.email}</p>
                <p id="username">${employee.username}</p>
                <button onclick="updateEmployee(${employee.id},'${employee.image}','${employee.name}','${employee.surname}','${employee.email}','${employee.username}')">Update</button>
                `;
              container.appendChild(card);
            }
            else{
              let card = document.createElement('div');
              card.style.overflow = 'hidden';

              card.className = 'employee-card';
              card.id=`${employee.id}`;
        
              card.innerHTML = `
                <img id="img" src="${employee.image}" alt="Employee Image">
                <h2 id="name_surname">${employee.name} ${employee.surname}</h2>
                <p id="email">${employee.email}</p>
                <p id="username">${employee.username}</p>
                <button id="Add_employee" onclick="Reactivate(${employee.id})">Reactivate</button>
                `;
              container.appendChild(card);

            }

          }
          else{
                if(employee.Active!=0){
                    let card = document.createElement('div');
              card.style.overflow = 'hidden';

              card.className = 'employee-card';
              card.id=`${employee.id}`;
        
              card.innerHTML = `
                <img id="img" src="${employee.image}" alt="Employee Image">
                <h2 id="name_surname">${employee.name} ${employee.surname}</h2>
                <p id="email">${employee.email}</p>
                <p id="username">${employee.username}</p>
                <button onclick="updateEmployee(${employee.id},'${employee.image}','${employee.name}','${employee.surname}','${employee.email}','${employee.username}')">Update</button>
                `;
              container.appendChild(card);
        }
          }
            
          
        });
      })
      .catch(error => console.log(error));
  }

  function updateEmployee(id,image,name,surname,email,username){
    const Image=image;
    const data = {
        id: id,
        image: Image.substring(7),
        name: name,
        surname: surname,
        email: email,
        username: username
      };
      localStorage.setItem('data', JSON.stringify(data));

      window.location.href = 'updateEmployee.php';

  }

  function Reactivate(id){
    var http = new XMLHttpRequest();
    http.open("POST", "../scripts/ReactivateEmployee.php", true);
  
    let form = new FormData();
  
    form.append("id", id);
   
  
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
          error.innerText = response;
        }
      }
    };
  }


