const db = require("../db.json");
const fs = require("fs");
const uuid = require("uuid");


module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
      res.send(db);
    });

    app.post("/api/notes", function(req, res){

      let noteId = uuid()
      let newNote = {
        id: noteId,
        title: req.body.title,
        text: req.body.text,

      }
      fs.readFile("../db.json", "utf8", (err,data)=>{
        if (err) throw err;
        const allNotes = JSON.parse(data)
        //what we are pushing to and then what we are pushing is second//
        allNotes.push(newNote)
// stringify does the opposit of parse// 2 optional parameters and 1 required, space for readability
        fs.writeFile("../db.json", JSON.stringify(allNotes,null,2), err=>{
          if (err) throw err;
          res.send(db)
          console.log  ("note created");
        })
      })
    })

  
  }
