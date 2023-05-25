window.onload = () => {
    fetchContracts();
  };

var requestedContractsCount = 0;

let modal = $('#myModal'); // Change 'myModal' to the actual id of your modal

$(document).ready(function () {
  $("#closeModal").click(function () {
    $(modal).modal("hide");
  });
});
  function fetchContracts()
  {


    requestedContractsCount = 0; // reset count before fetching contracts
            fetch('../scripts/getContractsOfEmployee.php')
            .then(response => response.json())
            .then(data => {
                data.forEach(contract => {
                    createContractContainer(contract,contract.employeeid);
                });
            })
            .catch(error => console.log(error));
  }
  var requestedContracts = [];
  var requestedContractsCount = 0;
  
  function createContractContainer(contract, index) {
    var mainDiv = document.createElement("div");
    mainDiv.className = "contract-container";
    mainDiv.id = `contract-container-${index}`;
  
    var cardDiv = document.createElement("div");
    cardDiv.className = "contract-card";
    cardDiv.id = `contract-card-${index}`;
    mainDiv.appendChild(cardDiv);
  
    var cardHeader = document.createElement("div");
    cardHeader.className = "contract-header";
    cardHeader.id = `contract-header-${index}`;
    cardDiv.appendChild(cardHeader);
  
    var cardHeaderContent = document.createElement("div");
    cardHeaderContent.className = "card-header-content";
    cardHeader.appendChild(cardHeaderContent);
  
    var headerText = document.createElement("h5");
    headerText.textContent = contract.name + " " + contract.surname;
    cardHeaderContent.appendChild(headerText);
  
    var arrowButton = document.createElement("i");
    arrowButton.className = "bx bx-right-arrow-alt arrow-button";
    arrowButton.id = `arrow-button-${index}`;
    arrowButton.onclick = function () {
      cardBody.style.display = cardBody.style.display === "block" ? "none" : "block";
      this.className =
        this.className === "bx bx-right-arrow-alt arrow-button"
          ? "bx bx-down-arrow-alt arrow-button"
          : "bx bx-right-arrow-alt arrow-button";
    };
    cardHeaderContent.appendChild(arrowButton);
    console.log(contract.seen )

    if (contract.seen == 0) {
     
        console.log("brunooo")
      // Contract not seen by employee
      requestedContractsCount++;
      document.getElementById("badge").textContent = requestedContractsCount;
      return; // Skip adding the contract to DOM
    }
    else{
        
                if (contract.acceptedByEmployee == 2) {
            var acceptButton = document.createElement("button");
            acceptButton.type = "button";
            acceptButton.className = "btn btn-success accept-button";
            acceptButton.id = `accept-button-${index}`;
            acceptButton.textContent = "Accept";
            acceptButton.onclick = function () {
                acceptContract(contract.id,contract.date);
            };
            cardHeaderContent.appendChild(acceptButton);
        
            var declineButton = document.createElement("button");
            declineButton.type = "button";
            declineButton.className = "btn btn-danger decline-button";
            declineButton.id = `decline-button-${index}`;
            declineButton.textContent = "Decline";
            declineButton.onclick = function () {
                declineContract(contract.id,contract.date);
            };
            cardHeaderContent.appendChild(declineButton);
            } else if (contract.acceptedByEmployee == 0) {
            var declinedText = document.createElement("text");
            declinedText.textContent = "Declined";
            cardHeaderContent.appendChild(declinedText);
            }
            else if (contract.acceptedByEmployee == 1) {
                var AcceptedText = document.createElement("text");
                AcceptedText.textContent = "Accepted";
                AcceptedText.style.color="green";
                cardHeaderContent.appendChild(AcceptedText);
                }
            var statusText = document.createElement("text");
    statusText.id = `status-text-${index}`;
    if (contract.status == 0) {
      statusText.textContent = "Inactive";
      statusText.style.color = "red";
    } else if (contract.status == 1) {
      statusText.textContent = "Active";
      statusText.style.color = "green";
    }
    cardHeaderContent.appendChild(statusText);
  
    document.getElementById("Contract_Section").appendChild(mainDiv);
  
    var cardBody = document.createElement("div");
    cardBody.className = "contract-body";
    cardBody.id = `contract-body-${index}`;
    cardDiv.appendChild(cardBody);
  
    var contractInfoDiv = document.createElement("div");
    contractInfoDiv.className = "contract-info";
    contractInfoDiv.id = `contract-info-${index}`;
    cardBody.appendChild(contractInfoDiv);
  
    contractInfoDiv.innerHTML = `
    <div class="row" style="display:flex;width: 250%;>
    <div class="col-md-12" style="display:flex;width: 100%;>
        <div class="card mb-4"">
            <h5 class="card-header">Contract Agreement</h5>
            <div>
                <h6 id="invisible-error1" class="card-header" style="color: red;"></h6>
            </div>
            <hr class="my-0" />
            <div class="card-body" >
                <h6>Dear <label id="name">${contract.name}</label> <label id="surname">${contract.surname}</label>,</h6>
                <p>We are pleased to present you with an employment contract. Please review the terms and conditions below:</p>
                
                <div class="row">
                    <div class="mb-3 col-md-12">
                        <label for="paymentRate" class="form-label">Payment Rate</label>
                        <p id="paymentRate" name="paymentRate">${contract.ratePerHour}$</p>
                    </div>
                    <div class="mb-3 col-md-12">
                        <label for="hoursPerDay" class="form-label">Hours of Work per Day</label>
                        <p id="hoursPerDay" name="hoursPerDay">${contract.hoursPerDay} hours</p>
                    </div>
                    <div class="mb-3 col-md-12">
                        <label for="bonusRate" class="form-label">Bonus Payment Rate</label>
                        <p id="bonusRate" name="bonusRate">${contract.bonusRate}$</p>
                    </div>
                    <div class="mb-3 col-md-12">
                        <label for="bonusRate" class="form-label">Date</label>
                        <p id="date" name="bonusRate">${contract.date}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


      `;
        }
  
    
    
  }
  
  document
    .getElementById("notificationBox")
    .addEventListener("click", function () {
      // add requested contracts to DOM when notification box is clicked
      requestedContracts.forEach((contractDiv) => {
        document.getElementById("Contract_Section").appendChild(contractDiv);
      });
  
      // clear notification count
      requestedContractsCount = 0;
      document.getElementById("badge").textContent = requestedContractsCount;

      // add color fading effect
      var newTextElements = document.getElementsByClassName("new-text");
      for (let i = 0; i < newTextElements.length; i++) {
        newTextElements[i].style.transition = "color 2s";
        newTextElements[i].style.color = "transparent";
      }

      // Send HTTP request with boolean value true
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../scripts/seenNotification.php", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
        let response = JSON.parse(xhr.responseText);
    if (response == 200) {
      $(modal).modal("show");
      setTimeout(() => {
        $(modal).modal("hide");
        window.location.href = `../views/EmployeeContracts.php`;
      }, 1000);
    } else if (response.status == 500) {
      $(modal3).modal("hide");
      $(modal2).modal("show");
    } else {
      error.innerText = response;
    }
    }
  };
  let form = new FormData();

  form.append("Allow", 1);
  

    xhr.send(form);
  
      // clear requestedContracts array
      requestedContracts = [];
    });
  



function acceptContract(id,date){
    
      // Send HTTP request with boolean value true
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../scripts/Employee_accept_decline_Contract_.php", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
        let response = JSON.parse(xhr.responseText);
    if (response == 200) {
      $(modal).modal("show");
      setTimeout(() => {
        $(modal).modal("hide");
        window.location.href = `../views/EmployeeContracts.php`;
      }, 1000);
    } else if (response.status == 500) {
      $(modal3).modal("hide");
      $(modal2).modal("show");
    } else {
      error.innerText = response;
    }
    }
  };
  let form = new FormData();

  form.append("id", id);
  form.append("date", date);
  form.append("accepted_or_not", 1);

  
    xhr.send(form);
  

}

function declineContract(id,date){
    
    // Send HTTP request with boolean value true
var xhr = new XMLHttpRequest();
xhr.open("POST", "../scripts/Employee_accept_decline_Contract_.php", true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
      let response = JSON.parse(xhr.responseText);
  if (response == 200) {
    $(modal).modal("show");
    setTimeout(() => {
      $(modal).modal("hide");
      window.location.href = `../views/EmployeeContracts.php`;
    }, 1000);
  } else if (response.status == 500) {
    $(modal3).modal("hide");
    $(modal2).modal("show");
  } else {
    error.innerText = response;
  }
  }
};
let form = new FormData();

form.append("id", id);
form.append("date", date);
form.append("accepted_or_not", 0);


  xhr.send(form);


}




