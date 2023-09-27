// const { createServer } = require('http');
// const path = require('path');
// const express = require('express');
// const ws = require('ws')


// //make weboscket run on 

// const ws = new WebSocket.Server({ port: 3001 });


// ws.on('connection', () => {
//     console.log('web socket connected...')
// })

// ws.on('message', (data) => {
//     console.log('received message', data);
//   });

// Import required modules
const { WebSocket, WebSocketServer } = require('ws');
const http = require('http');
const uuidv4 = require('uuid').v4;

// Create an HTTP server and a WebSocket server
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;

// Start the WebSocket server
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});