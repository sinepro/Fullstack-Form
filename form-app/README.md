# Assignment for Ligas Consulting

## How to Run the Application
1. Download the github repository.
2. Open terminal in the downloaded repository.
3. In the terminal, run *npm install* command and wait for all modules to install.
4. Open terminal in the subfolder *functions* of the downloaded repository.
5. In the terminal run *node server.js*, which will start the localhost server.
6. Open new terminal in the main folder of the downloaded repository.
7. In the terminal run *npm start*, which will start a local client in the browser tab.

## About the Application
This application performs simple communication between web client and localhost server.
Client dynamically renders form, which structure is defined in the backend file.
This form can be submitted and its data will be send to server and stored.
After submission, client requests submitted form data and displays it.

Server files are defined in the subfolder *functions*.
File *server.js* contains all the code neccessary to run simple server.
File *definition.json* contains the definition of form in JSON format and can be changed appropriatelly.
File *formData.json* is used to store the data sent from client to server after the form is submitted.

Client files are defined in the subfolder *src*. 
Folder *src* has a subfolder *components*, which contains component files.
There are two functional components: Form and Table. 
Form component takes care of retrieving form definition and sending form data to server, 
controlling the input from user and displaying the whole form. 
Table component takes care of retrieving form data, which was sent to server
and displaying the data.

## Used Technologies
Frontend:
- ReactJS
- CSS
- HTML
- JavaScript
- JSX

Backend:
- NodeJS
- Express.js

