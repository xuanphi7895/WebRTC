// const WebSocket = require('ws');

// // const wss = new WebSocket.Server({ port: 8080 });
// var wss = new WebSocket('ws://localhost:9090');
// let clients = [];

// wss.on('connection', ws => {
//   clients.push(ws);

//   ws.on('message', msg => {
//     clients.forEach(c => c !== ws && c.send(msg));
//   });

//   ws.on('close', () => {
//     clients = clients.filter(c => c !== ws);
//   });
// });

console.log('WebSocket signaling running on ws://localhost:9090');


// import WebSocket, { WebSocketServer } from 'ws';

// const wss = new WebSocketServer({ port: 8080 });

// wss.on('connection', function connection(ws) {
//   ws.on('error', console.error);

//   ws.on('message', function message(data, isBinary) {
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(data, { binary: isBinary });
//       }
//     });
//   });
// });

// websocket.addEventListener("open", () => {
//   log("CONNECTED");
//   pingInterval = setInterval(() => {
//     log(`SENT: ping: ${counter}`);
//     websocket.send("ping");
//   }, 1000);
// });
const WebSocket = require(`ws`);
const wss = new WebSocket.Server({ port: 3000 });

// wss.on("connection", (ws) => {
//   console.log("I'm server")
//   let msg = "Connection Established!. M2C!";
//   ws.send(JSON.stringify(msg));
// });

let clients = [];

wss.on('connection', ws => {
  clients.push(ws);

  ws.on('message', msg => {
    clients.forEach(c => c !== ws && c.send(msg));
  });

  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
  });
});
