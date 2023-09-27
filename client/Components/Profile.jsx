import React from 'react';

const Profile =  ({ profileData }) => { // presentational component
    const profilePhoto = ''; //what is this coming back as? TBD
    let {name, age, bio, artists, images} = profileData;

    // console.log(profileData);

    // console.log(images)

    // let people = Object.keys(props.inf.artists).join(', ')    
    // console.log('arr', people)

    let people = ''
    for(let artist in artists){
        people = people + artist + " "
    }

    // console.log('art', people)

    return (
    <div>    
        <img className='round' src='https://play-lh.googleusercontent.com/TUtOJfxHm78ggM9Ssl2iAO2sDXeJ5rYauo_TTc9SiUsscHppl_TydsCwDoyZhfDv5qM'></img>
        <div id='profile'>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Favorite Artists: 
                {people}</p>
            <p>More About Myself: {bio}</p>
        </div>
    </div>
    )
}

export default Profile;