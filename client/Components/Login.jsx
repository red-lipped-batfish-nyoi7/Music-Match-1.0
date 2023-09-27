
import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";


function Login() {
  const navigate = useNavigate(); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');



  const wsContact  = () => {
     const socket = new WebSocket('ws://localhost:3001/');

     socket.onopen = () => {
      console.log('websocket connection open')
     }

     socket.onmessage = (e) => {
      console.log('message recieved', e.data)
     }

  }


  useEffect(() => {
    wsContact();
  }, [])





    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login/verify', {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            })


            if (response.status === 200) {
                setMessage('Login successful!');
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

export default Login;