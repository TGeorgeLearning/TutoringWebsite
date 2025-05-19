// This file is responsible for loading the options that the tutor can select to tutor in

let subjectContainer = document.getElementById("containSubjects")

Object.entries(subjectDictionary).forEach(([subj,subjs]) => {
    let subjectDiv = document.createElement("div")
    subjectDiv.classList.add("subject")
    let headDiv = document.createElement("div")
    headDiv.classList.add("headDiv")
    headDiv.innerHTML = subj.replace("_"," ");
    subjectDiv.appendChild(headDiv)
    subjs.forEach(topic =>{
        let div = document.createElement("div");
        let label=document.createElement("label")
        let label2=document.createElement("label")
        let label3=document.createElement("label")
        let checkbox = document.createElement("input")
        let checkbox2 = document.createElement("input")
        let checkbox3 = document.createElement("input")
        checkbox.type = "checkbox";
        checkbox.value="true"
        checkbox.name=topic[0];
        div.appendChild(label)
        label.appendChild(checkbox)
        label.appendChild(document.createTextNode(topic[0]));
        // Checks to see if the associated subject has an honors tag (Boolean)
        if (topic[1]) { 
            checkbox2.type="checkbox"
            checkbox2.value="true"
            checkbox2.name=topic[0]+"_honors";
            checkbox2.classList.add("htrigger")
            checkbox.classList.add("hdepen")
            label2.appendChild(checkbox2)
            label2.appendChild(document.createTextNode("Honors"))
        }
        if (topic[2]) { 
            checkbox3.type="checkbox"
            checkbox3.value="true"
            checkbox3.name=topic[0]+"_ap";
            checkbox3.classList.add("aptrigger")
            checkbox.classList.add("apdepen")
            label3.appendChild(checkbox3)
            label3.appendChild(document.createTextNode("AP"))
        }

        div.appendChild(label)
        div.appendChild(label2)
        div.appendChild(label3)
        subjectDiv.appendChild(div)
    });
    subjectContainer.appendChild(subjectDiv)
});
