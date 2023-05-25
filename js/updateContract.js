const receivedData = JSON.parse(localStorage.getItem('data2'));
let Name = document.getElementById("name");
let Surname= document.getElementById("surname");
let paymentRate= document.getElementById("paymentRate");
let hoursPerDay= document.getElementById("hoursPerDay");
let bonusRate= document.getElementById("bonusRate");
console.log(Name)

paymentRate
let modal = $('#myModal'); // Change 'myModal' to the actual id of your modal
let error = document.getElementById("invisible-error1");

$(document).ready(function () {
  $("#closeModal").click(function () {
    $(modal).modal("hide");
  });
});
window.onload = () => {
    Name.textContent = receivedData.name;
    Surname.textContent = receivedData.surname;
    paymentRate.value = receivedData.rateperhour;
    hoursPerDay.value = receivedData.hoursperday;
    bonusRate.value = receivedData.bonusrate;

    

  };
  document.getElementById('sendContract').addEventListener('click', function(e) {
    e.preventDefault();
  
    let paymentRate = document.getElementById('paymentRate').value;
    let hoursPerDay = document.getElementById('hoursPerDay').value;
    let bonusRate = document.getElementById('bonusRate').value;
  
    let isPaymentRateValid = !isNaN(parseFloat(paymentRate)) && isFinite(paymentRate) && paymentRate > 0;
    let isHoursPerDayValid = Number.isInteger(parseFloat(hoursPerDay)) && hoursPerDay > 0;
    let isBonusRateValid = !isNaN(parseFloat(bonusRate)) && isFinite(bonusRate) && bonusRate >= 0;
  
    if (!paymentRate || !hoursPerDay || !bonusRate) {
      document.getElementById('invisible-error1').innerText = 'Please fill all the fields';
      document.getElementById('invisible-error1').style.display = "block";
    } else if (!isPaymentRateValid || !isHoursPerDayValid || !isBonusRateValid) {
      document.getElementById('invisible-error1').innerText = 'Input values are incorrect';
      document.getElementById('invisible-error1').style.display = "block";
    } else if (parseFloat(bonusRate) <= parseFloat(paymentRate)) {
      document.getElementById('invisible-error1').innerText = 'Bonus rate must be greater than the rate per hour';
      document.getElementById('invisible-error1').style.display = "block";
    } else {
      document.getElementById('invisible-error1').style.display = "none";
      let formData = new FormData();
      formData.append('id', receivedData.id);
      formData.append('bonusRate', bonusRate);
      formData.append('paymentRate', paymentRate);
      formData.append('hours', hoursPerDay);
      formData.append('date', receivedData.date);


      // Create a new XMLHttpRequest
      let xhr = new XMLHttpRequest();
      xhr.open('POST', '../scripts/newContractScript.php', true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            let response = JSON.parse(xhr.responseText);
        if (response == 200) {
          $(modal).modal("show");
          setTimeout(() => {
            $(modal).modal("hide");
            window.location.href = `../views/Contracts.php`;
          }, 1000);
        } else if (response.status == 500) {
          $(modal3).modal("hide");
          $(modal2).modal("show");
        } else {
          error.innerText = response;
        }
        }
      };
              xhr.send(formData);  
 }   

  });
  

