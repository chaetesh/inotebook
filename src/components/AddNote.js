import React,{ useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Notiflix from 'notiflix';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({
      title: "",
      description: "",
      author: "",
      bookID: "",
      quantity: "",
      borrower: "",
    });

    const onChange = (e)=>{
        // We are using spread (...) syntax, Spread syntax can be used when all elements from an object
        // or array need to be included in a new array or object
        setNote({...note,[e.target.name]:e.target.value})
    }

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.author,note.bookID,note.quantity,note.borrower);
        setNote({
          title: "",
          description: "",
          author: "",
          bookID: "",
          quantity: "",
          borrower: "",
        });
        Notiflix.Notify.success('Notes Added Succesfully  ');
    }
  return (
    <div>
      <h1 className="my-3">Add a Record</h1>
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
          <label htmlFor="author" className="form-label">
            author
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            onChange={onChange}
            value={note.author}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bookID" className="form-label">
            bookID
          </label>
          <input
            type="text"
            className="form-control"
            id="bookID"
            name="bookID"
            onChange={onChange}
            value={note.bookID}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            quantity
          </label>
          <input
            type="text"
            className="form-control"
            id="quantity"
            name="quantity"
            onChange={onChange}
            value={note.quantity}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="borrower" className="form-label">
            borrower
          </label>
          <input
            type="text"
            className="form-control"
            id="borrower"
            name="borrower"
            onChange={onChange}
            value={note.borrower}
          />
        </div>
        <button
          disabled={note.title.length < 3 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Record
        </button>
      </form>
    </div>
  );
};

export default AddNote;
