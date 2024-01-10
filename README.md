# Messaging app :speech_balloon:

This is a web application for sending and receiving messages.

## Clone this repository

1. Clone this repository in a folder. For example in `/Documents`

`cd Documents`

`git clone https://github.com/magush27/messaging-app.git `

2. Now you can enter `/messaging-app` folder
`cd messaging-app`

3.  There you will see the backend folder and the frontend folder. This is the basic project structure:

```
- messaging-app
  - backend
    - server.js
    - package.json
    - ...
  - frontend
    - src
      - components
        - LoginForm.js
        - RegistrationForm.js
        - ChatWindow.js
      - App.js
      - ...
    - package.json
    - ...
```



## Backend
Messaging-app backend made using Node.js server that exposes RESTful APIs.

### Instructions to run locally

1. Enter the backend folder.
`cd /name-of-the-folder-where-you-cloned-the-repository/messaging-app/backend`

2. Instal backend dependencies using npm
`npm install`

3. Run the server
`npm start`


## Frontend

React messaging-app frontend.

### Instructions to run locally
1. Enter the frontend folder
`cd /name-of-the-folder-where-you-cloned-the-repository/messaging-app/frontend`

2. Install frontend dependencies using npm
`npm install`

3. Run the frontend
`npm start`

4. Now you can enter your localhost to test this app, put this URL in your browser:
`http://localhost:3000/`


### Instructions to navigate the frontend
1. You will see a Login. You need to press "Sign up" button to register your user and password.
2. Once you press it, you will be redirected to the sign up form.
3. After you complete it, you have to press de "Sign up" button and this will redirect you again to the Login site.
4. Login with the username and password you already registered. This will redirect you to the chat window.
5. Now you can chat with the registered users. If you want to test with your own users