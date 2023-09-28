import React, { useState, useEffect } from 'react';
import Profile from "./Profile.jsx";
import MatchProfile from "./MatchProfile.jsx";
    
const MainPage = () => {

    const [user, setUser] = useState([]);
    const [match, setMatch] = useState([]);
    const [matchList, loadMatches] = useState([]);
    const [matchPointer, matchIncrement] = useState(0);
    
    useEffect(() => { 
        
        async function effectFunc() {

            try {
                const response = await fetch('/api/userprofile');
                const data  = await response.json();

                setUser(data.userProfile);
                loadMatches(data.matchesProfiles);
                setMatch(data.matchesProfiles[0])
            }

            catch (err) {
                console.log(err);
            }

        }

        effectFunc();

    }, []);

    return (
    <div className="card-container">
        <div className="card left-card">
            <span className="profile">
                <Profile profileData = {user}/>
            </span>
        </div>
        <img id = 'gif' src = 'https://media.tenor.com/Ez2x8MFvP0QAAAAC/heart-heartbeat.gif'/>
        <h1 id='matcher'> TWO PEAS IN A POD</h1>
        <div className="card right-card">
            <span className="matches">
                <MatchProfile 
                    profileData={match}
                    matchList={matchList}
                    setMatch={setMatch}
                    matchPointer={matchPointer}
                    matchIncrement={matchIncrement}
                />
            </span>
        </div>
    </div>
    )
}

export default MainPage;
