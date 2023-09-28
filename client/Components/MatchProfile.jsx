import React from 'react';

const MatchProfile = ({profileData, matchList, setMatch, matchPointer, matchIncrement}) => { // presentational component

    const {name, age, bio, artists = []} = profileData;


    function nextClick() {
        matchIncrement(matchPointer + 1);
        setMatch(matchList[matchPointer]);

    }

    return (
    <div>
        <img className='round' src='https://png.pngtree.com/png-clipart/20220101/ourmid/pngtree-3d-apple-fruit-red-illustration-png-image_4147443.png'></img>
        <div id='profile'>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Favorite Artists: {artists.join(', ')}</p>
            <p>More About Myself: {bio}</p>
        </div>
        <button className="cardButton">Chat with {name}</button> <button className="cardButton" onClick={nextClick}>Load New Match</button>
    </div>
    )
}

export default MatchProfile;