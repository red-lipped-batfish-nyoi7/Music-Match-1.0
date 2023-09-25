import React, {useState, useEffect} from 'react';

//Main page should display:
    //your name
    //your age
    //your bio
    //your artists



const MainPage = () => {
    // try{
    //     const response = await fetch('/userprofile');
    //     const userAndMatches = await response.json();
    //     // .then(response => response.json())
    // }catch(err){
    //     console.error("An error occurred:", err);
    //     setMessage("An error occurred while fetching profile info.");
    // }



    return (
        <div class='card-container'>
            <span class='profile'>
            <Profile/>
            {/* <Profile info={userAndMatches.userProfile}/> */}
            </span>
            {/* <span class='matches'>
            <Matches/>
            <Matches info={userAndMatches.matchesProfiles}/>
            </span> */}
        </div>
    )
}

// const Matches = () => { //took out PROPS
//     //props is an array of objects of matches for the user
//         //this array could have 0 things or many things!
//     const matchContent = [];

//     //loop thru props array, add matches to the conent array
//         //for each object in the array
//     for(const profile of props.info){
//         matchContent.push(
//             // <MatchingProfile info={profile}/>

//         )
//     }

//     return(
//         <div>
//             {matchContent}
//         </div> 
//     );
// }

// const MatchingProfile = (props) => {
//     return (
//         <div>
//             <h5>{props.info.name}</h5>
//         </div>
//     )
// }

const Profile =  () => {

    //I need to query/fetch the profile name and photo from the DB
    // const { username, name, age, bio, artists } = props.info;
    const profilePhoto = ''; //what is this coming back as? TBD
    
    return (
    <div>
        {/* <h1>{name}</h1> */}
        <img class='round' src='https://ih1.redbubble.net/image.1530009255.8904/st,small,507x507-pad,600x600,f8f8f8.jpg'></img>
        {/* <Bio text={bio}/> */}
        <Bio />
    </div>
    )
}

//endpoints: /userprofile for user info, /matchesprofiles for matches (these are two separate requests)
const userBio = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

const Bio = () => {
    // const userBio = 'Hello Hello Hello Hello'
        //i need to fetch this bio from the DB too
    return (
        <div id = 'text'>
            {/* <p>{props.text}</p> */}
            <p>{userBio}</p>
        </div>
    )
}

export default MainPage;
