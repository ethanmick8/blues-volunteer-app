# VMS Blues Volunteer App

This is a full stack web application that includes a Node.js/Express backend,  
a React frontend, and a PostgreSQL database using Sequelize as an ORM. The app  
allows users to register, log in, and update their profile information (currently).  

## Link to running application

The link to the running application isn't listed here for security reasons, it is  
provided in the email to the instructor.  

## Installation

Clone the repository and run `npm install` in both the root directory and the client  
directory.

Create a .env file in the root directory of the project and add the following variables:  
`DB_NAME=vms_db`  
`SESSION_SECRET=your_secret_here`  
`PORT=5001`  
`DB_USERNAME=your_db_username`  
`DB_PASSWORD=your_db_password`  
  
Start the backend server by running `npm start` in the root directory.  

Navigate to http://localhost:3000/ to view the app in your browser.  

## Usage

Note: This app is currently in development.  

* Click on the 'Register account' button to register a new account.  
* Click on the 'Log in' button to log in to an existing account.  
* Once logged in, click on the 'Update profile' button to update your profile information.  
* From home, you can also click on the 'Log out' button to log out of your account.  
* The Profile page allows you to change all of your profile information.  
