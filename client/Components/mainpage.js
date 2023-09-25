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

const userBio = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

const Bio = () => {
    // const userBio = 'Hello Hello Hello Hello'
        //i need to fetch this bio from the DB too
    return (
        <div>
            <p>{userBio}</p>
        </div>
    )
}

export default MainPage;
