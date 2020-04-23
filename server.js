var express = require("express");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))

require ("./routes/htmlRoutes") (app)

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});