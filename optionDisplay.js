// This file is responsible for displaying the "Display Tutor" and the "Select the Subjects you need help in!" buttons
const submitButton = document.querySelectorAll(".menu")[0];
const menuButton = document.querySelectorAll(".menu")[1];
const dropmenu = document.getElementById("dropdownMenu")

menuButton.addEventListener('click', function() {
        // If the dropdown menu is displayed, hide it. Otherwise, display it.
        dropmenu.style.display =  dropmenu.style.display=="block" ? "none" : "block";
})    

submitButton.addEventListener('click', function() {
        // If the submit button is pressed, hide the drop-down menu.
        dropmenu.style.display="none";
});

