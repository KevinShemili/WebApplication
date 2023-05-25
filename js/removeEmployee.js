const removeButton = document.getElementById('Remove_employee');
const cancel = document.getElementById("Cancel_employee");

let modal = $('#myModal'); // Change 'myModal' to the actual id of your modal





function handleMouseover() {
    this.style.backgroundColor = 'rgba(255, 0, 0, 0.35)';
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
removeButton.addEventListener('click', function() {
  const cards = document.querySelectorAll('.employee-card');
  cancel.style.display = "inline-block";

  cards.forEach(card => {
        card.addEventListener('mouseover', handleMouseover);
        card.addEventListener('mouseout', handleMouseout);
    
    card.addEventListener('click', function() {
        const confirmation = confirm('Are you sure you want to delete this employee?');
        if(confirmation){


                    var http = new XMLHttpRequest();
                    http.open("POST", "../scripts/removeEmployee.php", true);

                    let form = new FormData();
                    let id=card.id;

                    form.append("id",card.id);
                 
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

