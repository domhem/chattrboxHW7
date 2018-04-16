var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
//Websocket server is established and bound to port 3001
//do not need module.exports
var ws = new WebSocketServer({
  port: port
});
//array to hold server messages
var messages = [];
var topic = "";

console.log("websockets server started");

//callback for connection events on server
ws.on("connection", function(socket) {
  console.log("client connection established");

  //send the current topic
  socket.send("*** Topic is '" + topic + "'");

  //allow new users to see all previous messages
  messages.forEach(function(msg) {
    socket.send(msg);
  });

  //set up echo server, messages sent to server are repeated
  socket.on("message", function(data) {
    console.log("message received: " + data);

    //check if the sent message starts with /topic
    if (data.startsWith("/topic")) {
      //get the substring after /topic from the sent message
      topic = data.substr(7,data.length);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send("*** Topic has changed to '" + topic + "'");
      });

    } else {
      messages.push(data);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(data);
      });
    }
  });
});
