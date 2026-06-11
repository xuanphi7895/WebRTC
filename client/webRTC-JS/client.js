const WebSocket = require(`ws`);
const wss = new WebSocket(`ws://localhost:3000`);

wss.onmessage = function (e) {
  console.log("I'm client")
  let message = JSON.parse(e.data);
  console.log(message);
};
