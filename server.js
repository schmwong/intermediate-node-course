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

const User = require("./models/User");
mongoose.connect("mongodb://localhost/userData");

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});

// Refactor code by defining a function to handle responses returned by all routes
function sendResponse(res, err, data) {
  if (err) {
    res.json({
      success: false,
      message: err,
    });
  } else if (!data) {
    res.json({
      success: false,
      message: "Not Found",
    });
  } else {
    res.json({
      success: true,
      data: data,
    });
  }
}

// "POST" route is different than the others because
// mongoDB automatically creates an ID for each document when it is created
// CREATE
app.post("/users", (req, res) => {
  // User.create()
  /*
  When you want to make a new document in MongoDB, you can simply call 
  the "create" method on your mongoose model. The first argument is 
  an object containing the values for the new document (stored in req.body). 
  The next argument is a callback function, which handles the response (res) from the database.
  */
  User.create(
    // {
    //   name: req.body.newData.name,
    //   email: req.body.newData.email,
    //   password: req.body.newData.password,
    // }

    // Use spread syntax
    { ...req.body.newData },
    (err, data) => {
      sendResponse(res, err, data);
    }
  );
});

// route chaining as a shorthand for the "get", "put", and "delete" routes,
// since they all use the '/users/:id' endpoint
app
  .route("/users/:id")
  // READ
  .get((req, res) => {
    // User.findById()
    User.findById(req.params.id, (err, data) => {
      sendResponse(res, err, data);
    });
  })
  // UPDATE
  .put((req, res) => {
    // User.findByIdAndUpdate()
    User.findByIdAndUpdate(
      req.params.id,
      { ...req.body.newData },
      {
        new: true,
      },
      (err, data) => {
        sendResponse(res, err, data);
      }
    );
  })
  // DELETE
  .delete((req, res) => {
    // User.findByIdAndDelete()
    User.findByIdAndDelete(req.params.id, (err, data) => {
      sendResponse(res, err, data);
    });
  });
