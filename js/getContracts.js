window.onload = () => {
    fetchContracts();
  };



  function fetchContracts()
  {


            fetch('../scripts/getContractsScript.php')
            .then(response => response.json())
            .then(data => {
                data.forEach(contract => {
                    createContractContainer(contract,contract.id);
                });
            })
            .catch(error => console.error(error));
  }

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
    arrowButton.className = 'bx bx-right-arrow-alt arrow-button';
    arrowButton.id = `arrow-button-${index}`;
    arrowButton.onclick = function() {
        // Toggle contract info visibility
        cardBody.style.display = cardBody.style.display === "none" ? "block" : "none";
        // Change arrow direction
        this.className = this.className === 'bx bx-right-arrow-alt arrow-button' ? 'bx bx-down-arrow-alt arrow-button' : 'bx bx-right-arrow-alt arrow-button';
    }
    cardHeaderContent.appendChild(arrowButton);

    // Create status text
    var AcceptedByEmployeeText = document.createElement("text");
    AcceptedByEmployeeText.id = `AcceptedByEmployeeText-text-${index}`;
    if(contract.acceptedByEmployee==0){  
        AcceptedByEmployeeText.textContent = "Declined";
        AcceptedByEmployeeText.style.color = "red";
    } else if(contract.acceptedByEmployee==1){
        AcceptedByEmployeeText.textContent = "Accepted";
        AcceptedByEmployeeText.style.color = "green";
    } else if(contract.acceptedByEmployee==2){
        AcceptedByEmployeeText.textContent = "Requested";
        AcceptedByEmployeeText.style.color = "#FFA500"; // or any color between yellow and orange
    }
    cardHeaderContent.appendChild(AcceptedByEmployeeText);
    var statusText = document.createElement("text");
    statusText.id = `status-text-${index}`;
    if(contract.status==0){  
        statusText.textContent = "Inactive";
        statusText.style.color = "red";
    } else if(contract.status==1){
        statusText.textContent = "Active";
        statusText.style.color = "green";
    } 
    cardHeaderContent.appendChild(statusText);

    var updateButton = document.createElement("button");
    updateButton.type = "button";
    updateButton.className = "btn btn-primary update-button";
    updateButton.id = `update-button-${index}`;
    updateButton.textContent = "Update";
    updateButton.onclick = function() {
        // Call your update function here
        updateContract(contract.id,contract.name,contract.surname,contract.ratePerHour,contract.hoursPerDay,contract.bonusRate,contract.date);
    }
    cardHeaderContent.appendChild(updateButton);

    var cardBody = document.createElement("div");
    cardBody.className = "contract-body";
    cardBody.id = `contract-body-${index}`;
    cardBody.style.display = "none";
    cardDiv.appendChild(cardBody);

    var contractInfoDiv = document.createElement("div");
    contractInfoDiv.className = "contract-info";
    contractInfoDiv.id = `contract-info-${index}`;
    cardBody.appendChild(contractInfoDiv);

    contractInfoDiv.innerHTML = `
        <div class="contract-rate">
            <label for="ratePerHour" class="contract-label">Rate Per Hour</label>
            <p class="contract-value">${contract.ratePerHour}$</p>
        </div>
        <div class="contract-hours">
            <label for="hoursPerDay" class="contract-label">Hours Per Day</label>
            <p class="contract-value">${contract.hoursPerDay} hours</p>
        </div>
        <div class="contract-bonus">
            <label for="bonusRate" class="contract-label">Bonus Rate</label>
            <p class="contract-value">${contract.bonusRate}$</p>
        </div>
        <div class="contract-datetime">
            <label for="contractDateTime" class="contract-label">Date and Time</label>
            <p class="contract-value">${contract.date}</p>
        </div>
    `;

    document.getElementById("Contract_Section").appendChild(mainDiv);
}

function updateContract(contractId,contractName,contractSurname,contractRatePerHour,contractHoursPerDay,contractBonusRate,contractDate) {

    const data2 = {
        id: contractId,
        name: contractName,
        surname: contractSurname,
        rateperhour:contractRatePerHour,
        hoursperday:contractHoursPerDay,
        bonusrate:contractBonusRate,
        date:contractDate
     
      };
      localStorage.setItem('data2', JSON.stringify(data2));

      window.location.href = 'updateContract.php';
}


// Get the search input element
// Get the search input element
let searchInput = document.getElementById("searchInput");
console.log(searchInput)
// Add event listener to the search input
searchInput.addEventListener('input', function() {
  var searchValue = this.value.toLowerCase(); // Get the entered search value

  // Get all contract cards
  var contractCards = document.querySelectorAll('.contract-card');

  // Iterate through each contract card
  contractCards.forEach(function(card) {
    var headerText = card.querySelector('.card-header-content h5').textContent.toLowerCase();
    // Show or hide the contract card based on the search value
    if (headerText.includes(searchValue)) {
      card.style.display = 'block'; // Show the card if the search value matches
    } else {
      card.style.display = 'none'; // Hide the card if the search value does not match
    }
  });
});
