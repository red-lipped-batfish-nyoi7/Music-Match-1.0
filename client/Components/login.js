//this is the user login page
//parent component: App (renders everything to the bundle)
//App passes state to these components - what do we need state for?

import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';

//components: login modal; login button; username input; password input
    //needs to capture input values for fetch request

//login box renders login modal
const LoginBox = () => { //do i need inputs?
    return (
        <div> 
            <h1>Please Log In</h1>
            <LoginModal />
        </div>
    )
}

//login modal renders two input boxes
const LoginModal = () => {
    return (
        <div className='login-wrapper'>
        <form>
            <label for="username">Username:</label>
            <input type='text' id='username'></input><br></br>
            <label for="password">Password:</label>
            <input type='password' id='password'></input><br></br>
            <input type="submit" value="Submit"></input>
        </form>
        </div>
    )
}

//EXPORT DEFAULTS HERE
export default LoginBox;

//*****this is just to see what the page looks like - delete this before pushing changes
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<LoginBox/>)