// This file is responsible for selecting a subject's checkbox if its corresponding honors and/or AP checkbox (if it exists) is selected. 
// This makes it so that a student can simply select the "honors" or "AP" checkbox correlating to a subject without selectin the subject itself.

const htriggers = document.querySelectorAll('.htrigger'); // This is the checkboxes with honors
const aptriggers = document.querySelectorAll('.aptrigger'); // This is the checkboxes with honors
const hdependents = document.querySelectorAll('.hdepen'); // This is the associated subject with the "honors" checkbox
const apdependents = document.querySelectorAll('.apdepen'); // This is the associated subject with the "honors" checkbox

// For example, for "English 9 Honors", "English 9" would be the dependent, "Honors" would be the trigger.


for (let x=0; x<hdependents.length; x++) { 
    const htrigger = htriggers[x]; 
    const hdependent = hdependents[x];
  
    // If the trigger is selected, then select the checkbox of the associated dependent.
    htrigger.addEventListener('change', function() {
        if (this.checked) {
            hdependent.checked = true;  
        }
    });
    hdependent.addEventListener('change', function() {
        if (!this.checked) {
            htrigger.checked = false; 
        }
    });
}

for (let z=0; z<apdependents.length; z++) { 
    const apdependent = apdependents[z];
    const aptrigger = aptriggers[z]; 

    aptrigger.addEventListener('change', function() {
        if (this.checked) {
            apdependent.checked = true;  
        }
    });

    // If the dependent is unselected, and the trigger is checked, then unselect the trigger.
    apdependent.addEventListener('change', function() {
        if (!this.checked) {
            aptrigger.checked=false;
        }
    });
}