window.onload = () => {
    fetchEmployees(false);

  };

  

function fetchEmployees(showall_clicked) {
    fetch('../scripts/getEmployees.php')
      .then(response => response.json())
      .then(data => {
        let container = document.getElementById('employee-grid');
        container.innerHTML = "";  // Clear the container
        data.forEach(employee => {
          
          
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
                `;
              container.appendChild(card);
        
          }
            
          
        });
      })
      .catch(error => console.log(error));
  }

  
  const selectEmployee = document.getElementById('Select_Employee');
  const cancel = document.getElementById("Cancel_employee");
  
  let modal = $('#myModal'); // Change 'myModal' to the actual id of your modal
  
  
  
  
  
  function handleMouseover() {
    this.style.backgroundColor = 'rgba(144, 238, 144, 0.35)';
    console.log("not removed");
    }
    
    function handleMouseout() {
      this.style.backgroundColor = '';
    }
  $(document).ready(function () {
    $("#closeModal").click(function () {
      $(modal).modal("hide");
    });
  });
  selectEmployee.addEventListener('click', function() {
    const cards = document.querySelectorAll('.employee-card');
    cancel.style.display = "inline-block";
  
    cards.forEach(card => {
          card.addEventListener('mouseover', handleMouseover);
          card.addEventListener('mouseout', handleMouseout);
          card.addEventListener('click', function() {
            const confirmation = confirm('Are you sure you want to select this employee?');
            if(confirmation){
                let nameSurname = card.querySelector('#name_surname').textContent;
                let splitName = nameSurname.split(" "); // split the name and surname
                let name = splitName[0];
                let surname = splitName[1];
          
                let data1 = {
                    id: card.id,
                    name: name,
                    surname: surname
                };
                console.log(data1)
                localStorage.setItem('data1', JSON.stringify(data1));
                window.location.href = `../views/newContract.php`;
            }
          });
  
      card.classList.add('shake-animation');
    });
  });
  
  cancel.addEventListener('click', function() {
    const cards = document.querySelectorAll('.employee-card');
    cancel.style.display = "none";
  
    cards.forEach(card => {
      card.removeEventListener('mouseover', handleMouseover);
      card.removeEventListener('mouseout', handleMouseout);
  
      card.classList.remove('shake-animation');
      card.style.backgroundColor = 'white';
  
  
    });
  });
  
  
  

