//this is the user login page
//parent component: App (renders everything to the bundle)
//App passes state to these components - what do we need state for?

import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
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
    )
}

//container component 
function LoginModal() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/login/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                setMessage('Login successful!');
                // history.push('/main');
                console.log('Login successful', response.body);
            } else {
                const errorData = await response.json();
                setMessage(`Login failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setMessage('An error occurred while logging in.');
        }
    };

    return (
        <form className='login-wrapper'>
            <h2>Please Log In</h2>
            <div>
                <label>Username:
                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)} />
                </label>
            </div>
            <div>
                <label>Password:
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} />
                </label>
            </div>
            <button onClick={handleLogin}>Submit</button>
            <div>{message}</div>
        </form>
    );
}

//EXPORT DEFAULTS HERE
export default LoginBox;

