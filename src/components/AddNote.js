import React,{ useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Notiflix from 'notiflix';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"",description:"",tag:""});

    const onChange = (e)=>{
        // We are using spread (...) syntax, Spread syntax can be used when all elements from an object
        // or array need to be included in a new array or object
        setNote({...note,[e.target.name]:e.target.value})
    }

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        Notiflix.Notify.success('Notes Added Succesfully  ');
    }
  return (
    <div>
      <h1 className="my-3">Add a Note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"    
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            value={note.description}
          />  
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
          />  
        </div>
        <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
