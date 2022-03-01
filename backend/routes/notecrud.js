const express = require('express');
const app = express();
const router = express.Router();
const Note = require('../schema/Notes');
const fetchUser = require('../middleware/fetchuser');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//create a note.login required
router.post("/addnote", fetchUser, async (req, res) => {
    try {
        const note = new Note({
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            user:req.user.id
        });
        let savednote=await note.save();
        res.json(savednote);
    } catch (error) {
        res.status(400).send("some error occured")
        console.log(error);
    }

})
//fetch all notes.login required
router.get("/getnotes", fetchUser, async (req, res) => {
    try {
        let notes=await Note.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        res.status(400).send("some error occured")
        console.log(error);
    }

})
//delete note.login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
    let note=await Note.findById(req.params.id)
    note=await Note.findByIdAndDelete(req.params.id);
    res.json({"success":"note has been deleted",note:note});
})

//update notes.login required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
    const newNote={};
    if(req.body.title)
    newNote.title=req.body.title
    if(req.body.description)
    newNote.description=req.body.description
    if(req.body.tag)
    newNote.tag=req.body.tag
    let note=await Note.findById(req.params.id);
    if(!note)
     return res.status(404).send("note not found");
    // if(note.user.toString() !== req.params.id) 
    //  return res.status(401).send("note allowed");
    note=await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true});
    res.json({note});
})
module.exports = router;
