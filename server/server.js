const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

//require controller
const controller = require('./Controllers/controller');

const PORT = 3000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
});
//this is basic homepage with login and signup 
app.get('/signup', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
});

app.get('/main', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
});

// app.get('/userprofile', (req, res) => { //hardcoded version for frontend testing, blocks the subsequent router
//   res.status(200).json({
//       userProfile: {
//         username: 'iLikeTarik', name: 'Tarik', age: '99', bio: 'at codesmith rn', artists: ['Drakeo', 'Greedo']
//       },
//       matchesProfiles: [{username: 'iLikeTarik2', name: 'Tarik2', age: '98', bio: 'at codesmith rn', artists: ['Drakeo', 'Greedo']}]
//   });
// });
app.get('/userprofile', controller.findProfileAndMatches, (req, res) => {
  res.status(200).json(res.locals.pageinfo);
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