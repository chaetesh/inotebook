import React,{useState} from "react";
import { useNavigate } from "react-router-dom"
import Notiflix from 'notiflix';

const Signup = () => {
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({email:"",password:"",name:"",cpassword:""});

  const onChange = (e)=>{
    // We are using spread (...) syntax, Spread syntax can be used when all elements from an object
    // or array need to be included in a new array or object
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if(credentials.password.length < 5){
      Notiflix.Notify.warning('Password Must be atleast 5 Charecters!');
      return;
    }
    if(credentials.password !== credentials.cpassword){
      Notiflix.Notify.warning("Password Dosen't Match!!");
      return;
    }

    if(credentials.password === credentials.cpassword){
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const json = await response.json();
      console.log(json);
      if(json.success === true){
        navigate("/");
        Notiflix.Notify.success('SignUp Succesfull, please Login');
      }
    }
  }

  return (
    <div className="container">
      <form>
      <h2 className="my-4">SignUp to Continue iNotebook</h2>
        <div className="mb-3 my-4">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="mb-3 text-danger">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            minLength="5"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            minLength="5"
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
