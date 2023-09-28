const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    // ws.id = Math.floor(Math.random() * 100)
    console.log('hopefully these are protocal', ws.protocol[0])
    // ws.id = ws.protocol
    // console.log('idddddd', ws.id)
   ws.send('i sent something')
  console.log('A new client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    
    // Broadcast the message to all connected clients
    // console.log('theese are client', wss.clients)
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(3001, () => {
    console.log('Websocket Server Running on port', 3001);
});

