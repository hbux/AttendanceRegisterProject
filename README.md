### Table of contents
1. [Setup Database](#setup-database)
2. [Setup Applications](#setup-applications)
    1. [Server Setup](#server-setup)
    2. [Client Setup](#client-setup)
3. [Run Applications](#run-applications)
    1. [Server](#server)
    2. [Client](#client)

## Setup Database
To setup the database correctly, follow these steps with the MongoDB GUI.

### Step 1:

<img src="https://github.com/hbux/AttendanceRegisterProject/blob/main/Documentation/Setup/step_1.png" />

---

### Step 2:

<img src="https://github.com/hbux/AttendanceRegisterProject/blob/main/Documentation/Setup/step_2.png" />

---

### Step 3:

<img src="https://github.com/hbux/AttendanceRegisterProject/blob/main/Documentation/Setup/step_3.png" />

---

### Step 4:

<img src="https://github.com/hbux/AttendanceRegisterProject/blob/main/Documentation/Setup/step_4.png" />

---

### Step 5:
:exclamation: **This step requires a file!**

The file can be found at `AttendanceRegisterProject > backend > config > usersData.json`

<img src="https://github.com/hbux/AttendanceRegisterProject/blob/main/Documentation/Setup/step_5.png" />

---

### Step 6:

<img src="https://github.com/hbux/AttendanceRegisterProject/blob/main/Documentation/Setup/step_6.png" />

---

### Step 7:

<img src="https://github.com/hbux/AttendanceRegisterProject/blob/main/Documentation/Setup/step_7.png" />

---

### Step 8:

<img src="https://github.com/hbux/AttendanceRegisterProject/blob/main/Documentation/Setup/step_8.png" />

---

### Step 9:
:exclamation: **This step requires a file!**

The file can be found at `AttendanceRegisterProject > backend > config > registersData.json`

<img src="https://github.com/hbux/AttendanceRegisterProject/blob/main/Documentation/Setup/step_9.png" />

---

## Setup Applications
To setup the server and client correctly, follow these steps:

### Server Setup

1. Open AttendanceRegisterProject in VS Code
2. View > Terminal 
3. Enter `cd backend` inside the terminal to navigate to the backend folder
    1. Enter `npm i package-lock.json` to install required dependencies
    
### Client Setup

1. Add a new terminal by clicking the plus icon in the top-right of the terminal
3. Enter `cd frontend` inside the new terminal to navigate to the frontend folder
    1. Enter `npm install package-lock.json` to install required dependencies

## Run Applications
To run the server and client correctly, follow these steps:

### Server

1. Select the backend terminal
    1. Enter `node app.js` to run the program
    
### Client

1. Select the frontend terminal
    1. Enter `npm run serve` to run the program
    2. Enter `localhost:8080` in the URL of the browser
