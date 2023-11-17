import React from "react";
import { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Notiflix from 'notiflix';
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom"
 
const Notes = () => {
  const navigate = useNavigate()
  // The useRef is a hook that allows to directly create a reference to the DOM element in the functional component.
  // The useRef returns a mutable ref object. This object has a property called .current.
  const ref = useRef(null);
  const refClose = useRef(null);

  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""});

  const updateNote = (currentNote) => {
    // We are getting previous notes values
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    ref.current.click();
  };
  
  const onChange = (e)=>{
    // We are using spread (...) syntax, Spread syntax can be used when all elements from an object
    // or array need to be included in a new array or object
    setNote({...note,[e.target.name]:e.target.value})
  }
  
  const handleClick = (e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    Notiflix.Notify.success('Notes Updated Succesfully');
  }

  return (
    <>
      <AddNote></AddNote>
      <div className="row my-3">
        <h2>{notes.length === 0 ? 'No Notes to Display': 'Your Records'}</h2>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note.id}
              updateNote={updateNote}
              note={note}
            ></NoteItem>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
