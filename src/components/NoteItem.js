import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <p className="card-title fw-bold" style={{fontSize: '1.3rem'}}>Title</p>
          <p className="card-title">{note.title}</p>
          <p className="card-title fw-bold" style={{fontSize: '1.3rem'}}>Description</p>
          <p className="card-title">{note.description}</p>
          <p className="card-title fw-bold" style={{fontSize: '1.3rem'}}>Author</p>
          <p className="card-title">{note.author}</p>
          <p className="card-title fw-bold" style={{fontSize: '1.3rem'}}>BookID</p>
          <p className="card-title">{note.bookID}</p>
          <p className="card-title fw-bold" style={{fontSize: '1.3rem'}}>Quantity</p>
          <p className="card-title">{note.quantity}</p>
          <p className="card-title fw-bold" style={{fontSize: '1.3rem'}}>Borrower</p>
          <p className="card-title">{note.borrower}</p>
          <i
            className="fa-solid fa-trash"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
