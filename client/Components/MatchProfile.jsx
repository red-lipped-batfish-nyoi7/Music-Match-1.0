import React from 'react';

const MatchProfile = ({ profileData }) => { // presentational component
    // console.log(profileData);

    const profilePhoto = ''; //what is this coming back as? TBD
    let {name, age, bio, artists} = profileData;

    console.log('this is match profile data', profileData)

    let people = ''
    for(let artist in artists){
        people = people + artist + "\n"
    }

    return (
    <div>
        <img className='round' src='https://png.pngtree.com/png-clipart/20220101/ourmid/pngtree-3d-apple-fruit-red-illustration-png-image_4147443.png'></img>
        <div id='profile'>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Favorite Artists: {people}</p>

            <p>More About Myself: {bio}</p>
        </div>
    </div>
    )
}

export default MatchProfile;