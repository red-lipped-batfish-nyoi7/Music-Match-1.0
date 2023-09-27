import React, { useState, useEffect } from 'react';
import Profile from "./Profile.jsx";
import MatchProfile from "./MatchProfile.jsx";

//Main page should display:
    //your name
    //your age
    //your bio
    //your artists
    
const MainPage = () => {    
    const [user, setUser] = useState([]);
    const [match, setMatch] = useState([]);

    const effectFunc = async () => {
        try {
            const response = await fetch('/api/userprofile');
            const data  = await response.json();
            setUser(data.userProfile)
            setMatch(data.matchesProfiles[0])
        } catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        effectFunc();
    }, [])

    return (
    <div className="card-container">
        <div className="card left-card">
            <span className="profile"><Profile profileData={user} /></span>
        </div>
        <img id = 'gif' src = 'https://media.tenor.com/Ez2x8MFvP0QAAAAC/heart-heartbeat.gif'/>
        <h1 id='matcher'> TWO PEAS IN A POD</h1>
        <div className="card right-card">
            <span className="matches"><MatchProfile profileData={match} /></span>
        </div>
    </div>
    )
}

export default MainPage;
