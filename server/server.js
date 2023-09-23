const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;
app.use(cors());
const mongoose = require("mongoose");
app.use(express.json());


//this is basic homepage with login and signup 
app.use('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
});











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