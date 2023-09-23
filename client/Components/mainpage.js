import React, {useState, useEffect} from 'react';

//Main page should display:
    //your name
    //your age
    //your bio
    //your artists

const MainPage = () => {
    return (
        <div class='card-container'>
            <span class='pro'>
            <Profile/>
            </span>
            
        </div>
    )
}

const Profile = () => {
    const profileName = 'Tarik Bensalem or whoever you are';
    const profilePhoto = '';
        //I need to query/fetch the profile name and photo from the DB?
    return (
    <div>
        <h1>{profileName}</h1>
        <img class='round' src='https://ih1.redbubble.net/image.1530009255.8904/st,small,507x507-pad,600x600,f8f8f8.jpg'></img>
        <Bio/>
    </div>
    )
}

const Bio = () => {
    const userBio = 'Hello Hello Hello Hello'
        //i need to fetch this bio from the DB too
    return (
        <div>
            <p>{userBio}</p>
        </div>
    )
}

export default MainPage;
