const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// for Websockets / Messaging
const http = require('http');
const socketIo = require('socket.io');


//require controller
const controller = require('./Controllers/controller');

const PORT = 3000;


// ALSO for Websockets / Messaging
const app = express();
const server = http.createServer(app);
const io = socketIo(server);


// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/build', express.static(path.join(__dirname, '../build')));


app.get('/api/userprofile', controller.findProfileAndMatches, (req, res) => {
  res.status(200).json(res.locals.pageinfo);
});

app.post('/api/login/verify', 
  controller.verifyUser, 
  controller.createLoginCookie,
  (req, res) => {
  res.status(200).json(res.locals.profile)
})

app.post('/api/signup', 
  controller.createUser, 
  controller.createLoginCookie, 
  (req, res) => {
  res.status(200).json(res.locals.profile)
})



// ERROR HANDLING
app.use('*', (req, res, next) => {
    return next({
      log: 'Endpoint does not exist',
      status: 404,
      message: { err: 'Website does not exist! :(' },
    });
  });
  
  app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

  app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});