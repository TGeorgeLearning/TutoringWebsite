// Handles the errors sent by the server.js file
let errorPop = document.getElementById("errorPop")

document.getElementById("usermake").addEventListener('submit', async function(event) {
    event.preventDefault(); 
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
  
    const response = await fetch('/post', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

        const result = await response.json();
        if (result.numID==1) {
          errorPop.style.display="block";

        } else if (result.numID==2) {
          errorPop.style.display="none";
          tutorPop.style.display="block";
        } else if (result.numID==4) {
        } else {
          tutorPop.style.display="none";
          alert("Thank you for filling out the form! You will be notified when a parent/teacher requests your services")
          window.location.reload();
        }
    });