//http module provides tools for working with http requests/responses
var http = require("http");
//for files
var fs = require("fs");
var extract = require("./extract");
var mime = require("mime");
var wss = require("./websockets-server");
var errorPath = "app/error.html";

//displays error.html page for non-existing paths
var handleError = function(err, res) {
  res.writeHead(404);
  fs.readFile(errorPath, function(err, data) {
    res.end(data);
    return;
  });
};

var server = http.createServer(function(req, res) {
  console.log("Responding to a request.");
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      //set media type of a file
      res.setHeader("Content-Type", mime.getType(filePath));
      res.end(data);
    }
  });
});
//bind to port 3000
server.listen(3000);
