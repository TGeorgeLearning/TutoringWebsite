// Handles the errors sent by the server.js file
let errorPop = document.getElementById("errorPop")
let emailPop = document.getElementById("emailPop")
let foundPop = document.getElementById("foundPop")
let tuteeInput = document.getElementById("tuteeEmail")
let tutorInput = document.getElementById("tutorEmail")
let tuteeBox = document.getElementById("tuteeEmailHold")
let tutorBox = document.getElementById("tutorEmailHold")

tuteeInput.addEventListener('input', () => {
  tuteeBox.style.borderColor = "#b1c5d7"
});

tutorInput.addEventListener('input', () => {
  tutorBox.style.borderColor = "#b1c5d7"
});

document.getElementById("cancelCheck").addEventListener('submit', async function(event) {
  event.preventDefault(); 
    
  const form = event.target; // you could also set a variable equal to document get element by id, then just do FormData(var)
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries()); // conveniently stores sends all in the form of an array

  const response = await fetch('/posts', {  
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  if (result.numID==1) { // No text in both input boxes
    tutorBox.style.borderColor='#b90404';
    tuteeBox.style.borderColor='#b90404';
    foundPop.style.display="none";
    emailPop.style.display="none";
    errorPop.style.display="block";
  } else if (result.numID==2) { // No text in tutor email box
    tutorBox.style.borderColor='#b90404';
    foundPop.style.display="none";
    emailPop.style.display="none";
    errorPop.style.display="block";
  } else if (result.numID==3) { // No text in tutee email box
    tuteeBox.style.borderColor='#b90404';
    foundPop.style.display="none";
    emailPop.style.display="none";
    errorPop.style.display="block";
  } else if (result.numID==4) { // No valid emails in both input boxes
    tutorBox.style.borderColor='#b90404';
    tuteeBox.style.borderColor='#b90404';
    foundPop.style.display="none";
    emailPop.style.display="block";
    errorPop.style.display="none";
  }else if (result.numID==5) { // No valid emails in tutor input box
    tutorBox.style.borderColor='#b90404';
    foundPop.style.display="none";
    emailPop.style.display="block";
    errorPop.style.display="none";
  } else if (result.numID==6){ // No valid emails in tutee input box
    tuteeBox.style.borderColor='#b90404';
    foundPop.style.display="none";
    emailPop.style.display="block";
    errorPop.style.display="none";
  } else if (result.numID==7) { // No tutor found with the corresponding tutee email stored
    tutorBox.style.borderColor='#b90404';
    tuteeBox.style.borderColor='#b90404';
    foundPop.style.display="block";
    emailPop.style.display="none";
    errorPop.style.display="none";
  } else { // Success
    tutorBox.style.borderColor='#84ff86';
    tuteeBox.style.borderColor='#84ff86';
    foundPop.style.display="none";
    emailPop.style.display="none";
    errorPop.style.display="none";
    alert("The tutoring assignment has been canceled, and an email has been sent to both the tutor and the parent.")
    window.location.reload();
  }        
});