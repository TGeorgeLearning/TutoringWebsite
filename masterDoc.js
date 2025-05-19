// This is the master document to be edited by the school officials when new topics or subjects are added to the curriculum

// These are the subjects taught at the school. An underscore must be used if the subject is two words (Social Science -> Social_Science
var subjectNamesArray = ["Math", "English", "Social_Science", "Science"]

// The subjects and their corresponding topics. Enter new topics in the following format: ["Class Name" (String), Does the class have an honors level? (Boolean), Does the class have an AP level (Boolean)]
var mathArr = [["Geometry", true,false],["Algebra 1", true,false],["Algebra 2", true,false],["Precalculus", true,false],["AP Calculus AB", false,false],["AP Calculus BC", false,false],["Honors Multivariable Calculus", false,false]]
var englishArr = [["English 9", true,false], ["English 10",true,false], ["English 11", true, true]]
var socialScienceArr = [["US History 1", true,false],["US History 2", false, true], ["World History", false, true], ["Psychology", false,true]]
var scienceArr = [["Biology", true, true], ["Chemistry", true, true], ["Physics 1", false, true], ["Physics 2", false, true], ["AP Physics C", false, false]]

// Store the subjects and their corresponding arrays in this dictionary, in the same order as the subjectNamesArray
var subjectDictionary = {
  "Math":mathArr,
  "English":englishArr,
  "Social_Science":socialScienceArr,
  "Science": scienceArr
}

// Sends the subject dictionary and subjectNamesArray to the server.js file
fetch('/api/save-data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    subjNamesArr: subjectNamesArray,
    subjDict:subjectDictionary
  })
});