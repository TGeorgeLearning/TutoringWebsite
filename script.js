// Container holds the data for the individual tutors and the subjects that they can tutor in
const container = document.getElementById("container");
//Lists all available tutors, or tutors that can teach certain subjects as specific by the parent


function fetchUsers() {
  container.innerHTML=""; // Resets the users listed in container.
  
  let count=0; // Keeps track of the amount of subjects that a parent has not requested
  let parameters;
  const params = new URLSearchParams();
  subjectNamesArray.forEach(subjName =>{
     const checkBox = document.querySelectorAll(`input[name=${subjName}]:checked`)
     if (checkBox.length==0) {
         count=count+1;
     }
     checkBox.forEach(subject => params.append(`${subjName}`, subject.value)); // Appends every subject that the parent is requesting to a parameter object
  })

  if (count===subjectNamesArray.length) { // If no subjects were requested, the paramter is an empty string
    parameters=""
  } else {
    parameters = params.toString()
  }

  const baseTable = document.getElementById("user-table-template"); // The template table for all the users
  fetch('/api/users?'+parameters) // Makes a request to the server to fetch the tutors who meet the given criteria
  .then(response => response.json())
  .then(users => {
    users.forEach(user => {
      const tableClone = baseTable.cloneNode(true);
      tableClone.style.display = "table"; // make it visible
      tableClone.classList.add("studentTableDesign");
      const tbody = tableClone.querySelector("tbody");
      const textHead = tableClone.querySelectorAll("th");
      textHead[0].textContent = user.studentFirstName + " " + user.studentLastName;
      textHead[1].textContent = user.studentEmail;
      const subj = subjectNamesArray
        
      subj.forEach(x =>{
        const row = document.createElement("tr");
        const subjectsCell = document.createElement("td");
        const subjectsArray = (user[x] || []).map(subj => {
          return `${subj.topic}${subj.honors ? ' (Honors)' : ''}${subj.ap ? ' (AP)' : ''}`; 
          });
        if (subjectsArray.length!=0) {
          subjectsCell.textContent = x.replace("_", " ") + " Subject" + (subjectsArray.length!=1 ? "s: " : ": ") + subjectsArray.join(", ");
          row.appendChild(subjectsCell);
          tbody.appendChild(row);
          }
        })
    
      const button = document.createElement("button");
      button.type = "button"
      button.textContent = "Request Tutor";
      // When the "Request Tutor" button is clicked, the student's information is sent as a parameter to the "loadOverlay" function to display the student's information in the overlay
      button.onclick=() => loadOverlay(user)
      tableClone.appendChild(button)
      container.appendChild(tableClone);
    });
  })
  container.classList.add("container");
}


function loadOverlay(user) {
  document.getElementById("overlay").style.display = "block";
  localStorage.setItem("mail", user.studentEmail)
  localStorage.setItem("name", user.studentFirstName) 
  const contain = document.getElementById("containChoice")
  const containT = document.getElementById("containChoiceText")
  containT.innerText="Select the subjects you want " + user.studentFirstName + " " + user.studentLastName+ " to tutor";
  let subjCount=0;
  const totalSubj=[]

  subjectNamesArray.forEach(subjName=>{
    totalSubj.push(user[subjName].map(e=> {
      const tags=[];
      let topicName = e.topic
      if (e.honors) {
        tags.push("Honors")
      }
      if (e.ap){
        tags.push("AP")
      }
      if (tags.length>0) {
        topicName +=` (${tags.join(", ")})`
      }
      return topicName

    }))
  })

  subjectNamesArray.forEach(sName =>{
    if (totalSubj[subjCount].length==0) {
      subjCount++;
      return;
    }

    const containDiv = document.createElement("div");
    containDiv.id="containDiv"
    const subjDivName = document.createElement("div")
    subjDivName.innerHTML=sName.replace("_"," ")
    subjDivName.classList.add("header")
    containDiv.appendChild(subjDivName)

    totalSubj[subjCount].forEach(subjs =>{
      const divs = document.createElement("div"); // This div is for each group of topics and checkboxes 
      const checkbox = document.createElement("input");
      checkbox.type="checkbox";
      checkbox.value=subjs;
      checkbox.name="subjects";
      checkbox.id=subjs;
      
      const label = document.createElement("label");
      label.htmlFor = subjs;
      label.textContent = subjs;

      divs.appendChild(checkbox)
      divs.appendChild(label)
      containDiv.appendChild(divs)
      containDiv.style.marginLeft=-1*subjCount+'px';
    })
    subjCount++;
    contain.appendChild(containDiv) // Contains each group of topics and checkboxes for each subject
  })
}


function sendMailRequest() {
  //Find out where to send the data and get it from. Email stored in localstorage, need to check mongodb for emails.
  const studentEmail = localStorage.getItem("mail")
  const checkBoxes = document.querySelectorAll('input[name=subjects]:checked');
  const studentName = localStorage.getItem("name")
  const parentEmail = document.getElementById("parentEmail").value;
  const child = document.getElementById("overlayStudentFirstName").value + " " + document.getElementById("overlayStudentLastName").value;

  fetch('/post-t', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      parentMail: parentEmail,
      to: studentEmail,
      subject: 'NHS Tutoring Match',
      text: `Hello ${studentName},\n${child} is looking for a tutor in these subjects: ${Array.from(checkBoxes).map(x=>x.value).join(", ")}.\nContact the parent at ${parentEmail} to connect with the student!`,
    }),
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg)
    window.location.reload()
});
  document.getElementById("overlay").style.display = "none";
}


function exitOverlay(){
  document.getElementById("overlay").style.display="none";
  document.getElementById("containChoice").innerHTML="";
}




