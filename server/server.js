const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;
app.use(cors());
const mongoose = require("mongoose");
app.use(express.json());

//require controller
const controller = require('./Controllers/controller');

const cookieParser = require("cookie-parser");

app.use(cookieParser());



app.use('/build', express.static(path.join(__dirname, '../build')));


app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
});
//this is basic homepage with login and signup 
app.get('/signup', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
});

app.get('/userprofile', controller.findProfileAndMatches, (req, res) => {
  res.status(200).json(res.locals.profileInfo);
});



app.get('/main', controller.findProfileAndMatches, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
});

// app.get('/signup', (req, res) => {
//   res.status(200).send('hello this is signup')
// });
//verify user middleware chain
app.post('/login/verify', 
  controller.verifyUser, 
  controller.createLoginCookie,
  (req, res) => {
  res.status(200).json(res.locals.profile)
})

app.post('/signup', 
  controller.createUser, 
  controller.createLoginCookie, 
  (req, res) => {
  res.status(200).json(res.locals.profile)
})




app.use("*", (req, res, next) => {
    return next({
      log: "Endpoint does not exist",
      status: 404,
      message: { err: "Website does not exist! :(" },
    });
  });
  
  app.use((err, req, res, next) => {
    const defaultErr = {
      log: "Express error handler caught unknown middleware error",
      status: 500,
      message: { err: "An error occurred" },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

  app.listen(PORT, () => {
  console.log("Server running on port");
});