import React, { useEffect } from "react";
import SignUp from "./Signup.jsx";
import LoginBox from "./Login.jsx";
import MainPage from "./Mainpage.jsx"
import { Route, Routes } from 'react-router-dom';
import '../styles.scss';

const App = () => {


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

    return (
        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<LoginBox />} />
            <Route path ='/main' element = {<MainPage />} />
        </Routes>
    )
}

export default App;