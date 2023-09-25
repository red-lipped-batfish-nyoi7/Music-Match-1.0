//this is the user login page
//parent component: App (renders everything to the bundle)
//App passes state to these components - what do we need state for?
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';

import React, { useState, useEffect } from "react";
// import ReactDOM from 'react-dom/client';
// import App from "./app.js"

//components: login box; login modal
//input boxes need to capture input values for fetch request

//LoginBox is a presentational component which renders LoginModal (child component)

//username: iLikeTarik
//password: iAmNine

const LoginBox = () => {
  return (
    <div>
      <LoginModal />
    </div>
  );
};

//container component
function LoginModal() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // const history = useHistory();

  const handleLogin = async (e) => {
    // const navigate = useNavigate();

    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })


      if (response.status === 200) {
        setMessage("Login successful!");
        // history.push('/main');
          console.log('hello')
        navigate ('/main');
       
        
        console.log("Login successful", response.body);
      }
      else {
            const errorData = await response.json();
            setMessage(`Login failed: ${errorData.message}`);
          }


    } catch (error) {
      console.log('error login in')
      console.error("An error occurred:", error);
      setMessage("An error occurred while logging in.");
    }
  };

  return (
    <form className="login-wrapper">
      <div>
        <h1 id="text-shadows">Music Match</h1>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <button className="loginButton" onClick={handleLogin}>
        Submit
      </button>
      <div>{message}</div>
      <li>
        <Link to="/signup">Sign Up!</Link>
      </li>
    </form>
  );
}

//EXPORT DEFAULTS HERE
export default LoginBox;
