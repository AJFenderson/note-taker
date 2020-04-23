var express = require("express");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))
//app is the variable our express server is stored in, so we need to call the variable. need to be below the middleware//
require ("./routes/htmlRoutes") (app)
require ("./routes/apiRoutes") (app)

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
