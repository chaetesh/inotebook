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

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

              {/* Add Note form */}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                // Using this ref to click close via ref, when user clicks updateNote
                ref={refClose}
                >
                Close
              </button>
              <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>{notes.length === 0 ? 'No Notes to Display': 'Your Notes'}</h2>
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
