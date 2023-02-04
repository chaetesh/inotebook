import React,{useState} from "react";
import { useNavigate } from "react-router-dom"
import Notiflix from 'notiflix';

const Login = () => {
    const navigate = useNavigate()
    // Using State variables for getting email&pass
    const [credentials, setCredentials] = useState({email:"",password:""})

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });
          const json = await response.json();
          console.log(json);
          if (json.success) {
            // save the authtoken and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            Notiflix.Notify.success('Login Succesfull');
          }
          else{
            Notiflix.Notify.failure('Invalid Credentails!');
          }
    }

    const onChange = (e)=>{
        // We are using spread (...) syntax, Spread syntax can be used when all elements from an object
        // or array need to be included in a new array or object
        setCredentials({...credentials,[e.target.name]:e.target.value})
      }
    
  return (
    <div>
      <form>
        <h2 className="my-4">Login to Continue iNotebook</h2>
        <div className="mb-3 my-4">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
