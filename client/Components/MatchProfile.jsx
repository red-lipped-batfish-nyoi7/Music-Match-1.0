import React from 'react';

const MatchProfile = ({profileData, matchList, setMatch, matchPointer, matchIncrement}) => { // presentational component

    const {name, age, bio, artists = [], images} = profileData;

    function nextClick() {
        matchIncrement(matchPointer + 1);
        setMatch(matchList[matchPointer]);
    }

    return (
    <div>
        <img className='round' src='https://musicmatchiteration.s3.amazonaws.com/e29bbb317787562e47583b3c1464908758baef11920b4ece10717c67f69c5959'></img>
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