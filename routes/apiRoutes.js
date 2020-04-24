const db = require("../db.json");
const fs = require("fs");
const uuid = require("uuid/v4");


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
      

      fs.readFile("./db.json", "utf8", (err,data)=>{
        if (err) throw err;
        const allNotes = JSON.parse(data)
        //what we are pushing to and then what we are pushing is second//
        allNotes.push(newNote)
// stringify does the opposit of parse// 2 optional parameters and 1 required, space for readability
        fs.writeFile("./db.json", JSON.stringify(allNotes,null,2), err=>{
          if (err) throw err;
          res.send(db)
          console.log  ("note created");
        })
      })
    })
    //id is the placeholder for the id of the note that we want to delete
    app.delete("/api/notes/:id", function(req, res) {
      let noteId = req.params.id;

      fs.readFile("./db.json", "utf8", (err,data)=>{
        if (err) throw err;
        const allNotes = JSON.parse(data)
        //. filter is going to look at all of notes and compare the id passed in the route(line 35) and find the specific note with that id and delete that note
        //note - is looking at the note element in .json
        const updatedNotes = allNotes.filter(note=>note.id!= noteId)

        fs.writeFile("./db.json", JSON.stringify(updatedNotes,null,2), err=>{
          if (err) throw err;
          res.send(db)
          console.log  ("note deleted");
        })
      })
    })
  }
