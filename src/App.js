import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <>
    {/* State variable will be available on all of the components inside it */}
    <NoteState>
    <Router>
    <Navbar></Navbar>
    <div className="container">
    <Routes>
      <Route exact path="/" element={<Home></Home>} />
      <Route exact path="/About" element={<About></About>} />
      <Route exact path="/login" element={<Login></Login>} />
      <Route exact path="/signup" element={<Signup></Signup>} />
    </Routes>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
