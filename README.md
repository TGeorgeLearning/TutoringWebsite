# TutoringWebsite
This project is a sample website designed for tutor sign-up and selection, streamlining the process of managing tutor applications and assignments.

# Project Demo
https://www.youtube.com/watch?v=rfR08tEuSFY 

# How to setup the website
In order to setup the website on a local server (for testing), you must ensure that all node modules are installed. To do this, run npm install in your terminal after navigating to the correct directory.
Make sure to setup a Gmail account, which will be where the server will send emails from. Once you get this account, you must also find its app password and include it in the server.js file.
How to get an app password: https://support.google.com/mail/answer/185833?hl=en

After this, you should need to set up MongoDB, as that is how the files are stored. Once you set up your database, you need to get the link for the database, which will then be used in the server.js file to connect 
to the database.

Then, load the tutorSignUp.html page once to initialise the creation of the user schema for the MongoDB. This only has to be done every time the server is rebooted.

After this, the setup of the website is complete.
