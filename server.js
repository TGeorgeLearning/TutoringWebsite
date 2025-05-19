// This is the server file
let flag=true;
let subjectNamesArray=[]
let Users;
let userSchema;
let subjectDictionary;

const express = require('express')
const mongoose = require('mongoose')
const port = 1436
const nodemailer = require("nodemailer");
const app = express()

const transporter = nodemailer.createTransport({ // Sends the emails
  service: 'gmail',
  auth: {
    user: "insertemail@gmail.com", // Here, the email that the school wants to send tutoring requests from should be put.
    pass: "abcd efgh ijkl mnop", // Here, an app password from Google should be put (16-character passcode)
    },
});

app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))
app.use(express.json());

// Connects to my MongoDB
mongoose.connect('mongodb+srv://(username is here):(password is here)@cluster0.28rfbne.mongodb.net/(Database name)') // Add your MongoDB connection url
const db = mongoose.connection
db.once('open',()=>{
    console.log("mongose")
})

// This loads the dictionary and subject names array from the masterDoc.js file, which allows for the userSchema to be updated
app.post('/api/save-data', (req, res) => {
  subjectNamesArray = req.body.subjNamesArr;
  subjectDictionary=req.body.subjDict;
    if (subjectNamesArray.length!=0) {
      const baseSchema = {
        studentFirstName:String,
        studentLastName:String,
        studentEmail:String,
        available:Boolean,
        parentEmail:String
      }
      subjectNamesArray.forEach(subject=>{
        baseSchema[subject]=[{topic:String,honors:Boolean, ap:Boolean}]
      })
      if (flag) {
        // A flag is utilised to ensure that the userSchema and model are only created one. Otherwise, an error occurs.
        userSchema = new mongoose.Schema(baseSchema,{collection: 'parents'}); // Parents is the collection name I used to store all the data during testing. 
        Users = mongoose.model("parents", userSchema)
        console.log("Initiated the moose")
        flag=false;
        res.status(200)
      }
    }
});

app.post('/post', async(req,res)=>{
  let errorFlag = true; // if true, there is no error to report
  const{studentFirstName,studentLastName,studentTutorEmail}=req.body
  const user ={
    studentFirstName,
    studentLastName,
    studentEmail:studentTutorEmail,
    available:true,
    parentEmail:""
  };

  subjectNamesArray.forEach(x=>{
    user[x]=[]
  })

  let count=0;
  if (studentFirstName===''||studentLastName===''||studentTutorEmail==="") {
    errorFlag=false;
    res.status(200).send({numID:1}) // The student has left a text field blank

  } else {
    Object.entries(subjectDictionary).forEach(([key, value]) =>{
      value.forEach(subj => {
        if (req.body[subj[0]]) {
          user[key].push({
            topic: subj[0], 
            honors: req.body[`${subj[0]}_honors`] === "true",
            ap: req.body[`${subj[0]}_ap`] === "true"
          });
        }
      });
      if (user[key].length!=0) {
        count++;
      }
    })

    if (count==0) {
      res.status(200).send({numID:2}) // The student has not selected a subject to tutor in
      errorFlag=false;

    } else {
      const users = await Users.find({studentEmail:studentTutorEmail});

      if (users.length>1) {
        res.status(200).send({numID:4}) // The student has not selected a subject to tutor in
        errorFlag=false;
      }

      if (errorFlag) {
        await Users.create(user)
        res.status(200).send({numID:3}) // Success
      }
    }
  }
})

app.listen(port,()=>{
    console.log("Starting Server " + port)
})

// Searches for tutors as per the given parameters, which hold the subjects the tutee needs help in
app.get('/api/users', async (req, res) => { 
  if (!(JSON.stringify(req.query).length===2)) {
    let searchArr = []
    subjectNamesArray.forEach(subjName => {
      searchArr.push({[`${subjName}.topic`]: {$in:req.query[subjName]}})
    })
    const users = await Users.find({
      $and: [
      {available:true},
      {$or: searchArr}
      ]
    });
    res.json(users);  

  } else { // If there are no parameters, display all users.
    const users = await Users.find({available:true});
    res.json(users);  
  }
});

// Sends the email to the tutor
app.post('/post-t', async(req,res)=>{
  const {parentMail, to, subject, text} = req.body
  const filter = {studentEmail:to}
  const update = {
    $set: {
      available: false,
      parentEmail:parentMail
    }
  }
  await db.collection('parents').updateOne(filter, update);
 
  await transporter.sendMail({
    from: "rubycatcorp@gmail.com", // Here, the email that the school wants to send tutoring requests from should be put.
    to: to, // Sends the email to the tutor selected by the parent
    subject: subject,
    text: text,
  });

  res.send('The tutor has been notified of your request! They will respond when possible.');
});

app.post('/posts', async(req,res)=>{
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pattern to check for a valid email address

  const {tuteeEmail, tutorEmail} = req.body

  if (tutorEmail===''&&tuteeEmail==='') {
    res.status(200).send({numID:1})
  } else if (tutorEmail===''){
    res.status(200).send({numID:2})
  } else if (tuteeEmail===''){
    res.status(200).send({numID:3})
  }else if ((!pattern.test(tutorEmail))&&(!pattern.test(tuteeEmail))) {
    res.status(200).send({numID:4}) 
  } else if(!(pattern.test(tutorEmail))){
    res.status(200).send({numID:5}) 
  } else if(!(pattern.test(tuteeEmail))) {
    res.status(200).send({numID:6}) 
  }else {
    const users = await Users.find({studentEmail:tutorEmail});
    if (users.length===0||users[0]['parentEmail']!=tuteeEmail) {
      res.status(200).send({numID:7})
    } else {
      const filter = {_id:users[0]["_id"]}
      const update = {
        $set: {
          available: true,
          parentEmail:""
        }
      }
      await db.collection('parents').updateOne(filter, update);
      await transporter.sendMail({
        from: "", // Here, the email that the school wants to send tutoring requests from should be put.
        to: tutorEmail, tuteeEmail, // Sends the email to the tutor selected by the parent
        subject: "NHS Tutoring Service Update",
        text: `Dear Parent/Teacher,\nThis email is to inform you that ${users[0]['studentFirstName']} will no longer be tutoring your child. Please make another tutoring request if you still need tutoring!`,
      });
      res.status(200).send({numID:8})      
    }
  }
});





