// This file is responsible for loading the Drop-down menu for the parents to select the subjects their child needs tutoring in

subjectContainer = document.getElementById("tableShow") // HTML element which holds the entire drop-down menu
//Sorts the subject dictionary so that the longest subject lists are presented first in the drop-down menu.
let sortedDictionary = Object.fromEntries(Object.entries(subjectDictionary).sort(([, a],[, b])=>b.length - a.length)) 
//Tracks the length of the longest subject list for styling purposes
let track = 0;
//Tracks the last subject list added for styling purposes
let lastOne;
//Counts the amount of subject lists added for animation purposes
let count = 0;
Object.entries(sortedDictionary).forEach(([key, value]) => {
    //Options refers to an individual subject list (Math, Science, English, etc)
    options = document.createElement("div")
    options.classList.add("options")
    subjectHeads = document.createElement("div")
    subjectHeads.classList.add("subjectHeads")
    subjectHeads.innerText = key;
    options.appendChild(subjectHeads)
    //topic refers to the individual topics (Physics, AP Calculus BC, English 9, etc)
    value.forEach(topic => {
        label=document.createElement("label")
        checkbox = document.createElement("input")
        checkbox.type = "checkbox";
        checkbox.name=key
        checkbox.value = topic[0]
        label.appendChild(checkbox)
        label.appendChild(document.createTextNode(topic[0]));
        options.appendChild(label)
    })
    if (count==0) {
        track = value.length;
        count++;
    }

    if (track===value.length) {
        options.style.borderBottom='0px'
    }
    lastOne=options
    options.style.animationDelay = `${count*0.2}s`
    options.style.animationName='slide'
    options.style.animationDuration=`0.6s`
    options.style.opacity='0'
    options.style.transform="translateY(20%)"
    options.style.animationFillMode='forwards'
    subjectContainer.appendChild(options)
    count++;
});
lastOne.style.borderRight = '0px'





