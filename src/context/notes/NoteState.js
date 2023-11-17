import React from "react";
import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  let host = "http://localhost:5000";
  let notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get Notes
  const getNotes = async () => {
      // API CALL
    const response = await fetch(`${host}/api/notes/fetchallbooks`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a Note
  const addNote = async (
    title,
    description,
    author,
    bookID,
    quantity,
    borrower
  ) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
        author,
        bookID,
        quantity,
        borrower,
      }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });

    console.log(response);
    // Will returns the notes if id not equal only
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}) 
    });
    let json = response.json();

    // To store hardCopy of state, and update immediately in UI
    let newNotes = JSON.parse(JSON.stringify((notes)));
    console.log("new: ",newNotes)

    // Logic to edit from client side
    for(let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    // exporting state and update function
    <noteContext.Provider value={{getNotes, notes, addNote, deleteNote, editNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
