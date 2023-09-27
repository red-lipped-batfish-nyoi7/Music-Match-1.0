//this is the user login page
//parent component: App (renders everything to the bundle)
//App passes state to these components - what do we need state for?
import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";


function Login() {
  const navigate = useNavigate(); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

    
    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:3001');

        newSocket.onopen = () => {
            console.log('WebSocket connection opened');
        };

        newSocket.onmessage = (event) => {
            console.log('WebSocket connection opened', event.data);
        };

        newSocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            newSocket.close();
        };
    }, []);


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
                // console.log('hello')
                navigate ('/main');
                // console.log("Login successful", response.body);
            }
            else {
                const errorData = await response.json();
                setMessage(`Login failed: ${errorData.err}`);
            }

        } catch (error) {
            // console.log('error login in')
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