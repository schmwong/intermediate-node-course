/*
By default, MongoDB doesn’t allow remote connections, except localhost (127.0.0.1)

if you want other IPs connect to this server, go and edit mongod.conf file, comment out (put # in front of the line) the line looks like this

bindIp: 127.0.0.1
*/

// Start MongoDB Shell in Mac OS 10.13.6
// brew services start mongodb-community@4.4

// https://github.com/schmwong/intermediate-node-course/issues/2

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 8000;
const app = express();

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});

// "POST" route is different than the others because
// mongoDB automatically creates an ID for each document when it is created
// CREATE
app.post("/users", (req, res) => {
  // User.create()
});

// route chaining as a shorthand for the "get", "put", and "delete" routes,
// since they all use the '/users/:id' endpoint
app
  .route("/users/:id")
  // READ
  .get((req, res) => {
    // User.findById()
  })
  // UPDATE
  .put((req, res) => {
    // User.findByIdAndUpdate()
  })
  // DELETE
  .delete((req, res) => {
    // User.findByIdAndDelete()
  });
