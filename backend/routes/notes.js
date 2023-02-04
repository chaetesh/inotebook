const express = require("express");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
const { findByIdAndUpdate } = require("../models/User");
const router = express.Router();

// Will send response of all the notes related to the specific user
// GET localhost:5000/api/notes/fetchallnotes (to get all the notes)
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

// POST localhost:5000/api/notes/addnote (to create new notes)
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a Valid tittle").isLength({ min: 3 }),
    body("description", "description atleast 5 Charecters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // if there are errors return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Creating new object from model
      const notes = new Notes({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        // we are getting userid from middleware
        user: req.user.id,
      });
      const savedNote = await notes.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error");
    }
  }
);

// PUT localhost:5000/api/notes/updatenote (Update the notes)
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Not found");
    }

    // When a user is trying to change other users notes
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // updating the notes
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }
});

// DELETE localhost:5000/api/notes/deletenote (delete the notes) (login required)
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Not found");
    }

    // When a user is trying to delete other users notes
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // deleting the notes
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }
});

module.exports = router;
