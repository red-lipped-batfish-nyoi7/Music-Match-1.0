import React, {useState, useEffect} from 'react';

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
        let response = await fetch('/api/userprofile');
        let data  = await response.json();
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
            <span className="profile"><Profile inf={user} /></span>
        </div>
        <img id = 'gif' src = 'https://media.tenor.com/Ez2x8MFvP0QAAAAC/heart-heartbeat.gif'/>
        <h1 id='matcher'> TWO PEAS IN A POD</h1>
        <div className="card right-card">
            <span className="matches"><MatchProfile inf={match} /></span>
        </div>
    </div>
    )
}

// const Matches = (props) => { //took out PROPS
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

const Profile =  (props) => {

    //I need to query/fetch the profile name and photo from the DB
    // const { username, name, age, bio, artists } = props.info;
    const profilePhoto = ''; //what is this coming back as? TBD
    let {name, age, bio, artists, images} = props.inf
    console.log(images)
    // let people = Object.keys(props.inf.artists).join(', ')    
    // console.log('arr', people)
    let people = ''
    for(let artist in artists){
        people = people + artist + " "
    }
    console.log('art', people)
    return (
    <div>
        

        {/* <h1>{name}</h1> */}
        <img className='round' src='https://play-lh.googleusercontent.com/TUtOJfxHm78ggM9Ssl2iAO2sDXeJ5rYauo_TTc9SiUsscHppl_TydsCwDoyZhfDv5qM'></img>
        <div id='profile'>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Favorite Artists: 
            {people}</p>
        <p>More About Myself: {bio}</p>
        </div>
        {/* <Bio text={bio}/> */}
        {/* <Bio /> */}
    </div>
    )
}

const MatchProfile =  (props) => {

    //I need to query/fetch the profile name and photo from the DB
    // const { username, name, age, bio, artists } = props.info;
    const profilePhoto = ''; //what is this coming back as? TBD
    let {name, age, bio, artists} = props.inf


    let people = ''
    for(let artist in artists){
        people = people + artist + "\n"
    }

    return (
    <div>
        

        {/* <h1>{name}</h1> */}
        <img className='round' src='https://png.pngtree.com/png-clipart/20220101/ourmid/pngtree-3d-apple-fruit-red-illustration-png-image_4147443.png'></img>
        <div id='profile'>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Favorite Artists: {people}</p>

        <p>More About Myself: {bio}</p>
        </div>
        {/* <Bio text={bio}/> */}
        {/* <Bio /> */}
    </div>
    )
}

//endpoints: /userprofile for user info, /matchesprofiles for matches (these are two separate requests)
const userBio = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

// const Bio = (props) => {
//     // const userBio = 'Hello Hello Hello Hello'
//         //i need to fetch this bio from the DB too
//     return (
//         <div id = 'text'>
//             {/* <p>{props.text}</p> */}
//             <p>{userBio}</p>
//         </div>
//     )
// }

export default MainPage;
