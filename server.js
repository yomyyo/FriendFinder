// Dependencies
var express = require("express");
var app = express();

// Port to either deploy to production or development
var PORT = process.env.PORT || 8080;

// midware functions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
require("./app/routing/apiRoutes")(app)
require("./app/routing/htmlRoutes")(app)

// start the server
app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });