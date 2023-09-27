import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [newUserName, setnewUserName] = useState([]);
  const [newPassword, setnewPassword] = useState([]);

  const [newAge, setnewAge] = useState([]);
  const [newBio, setnewBio] = useState([]);
  const [newName, setnewName] = useState([]);
  const [newImages, setnewImages] = useState([]);

  const [artist, setArtist] = useState('');
  const [newArtists, setnewArtists] = useState([]);

    async function handleClick(e) {

        // RESTRICT if newArtists.length < 3, then you can't post

        e.preventDefault();
        try {
            const response = await fetch('/api/signup', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                username: newUserName,
                name: newName,
                password: newPassword,
                age: newAge, 
                bio: newBio,
                artist: newArtists,
                images: newImages
            }),
            })

            if(response.status === 200){
                console.log('hi')
                navigate ('/main');
            }
      
        } catch(err){
            console.log(err);
        }
  }

  function handleChangeUser(e) {
    setnewUserName(e.target.value);
    console.log("user", newUserName);
  }

  function handleChangePW(e) {
    setnewPassword(e.target.value);
    console.log("pw", newPassword);
  }

  function handleChangeAge(e) {
    setnewAge(e.target.value);
    console.log("pw", newPassword);
  }

  function handleChangeBio(e) {
    setnewBio(e.target.value);
    console.log("pw", newPassword);
  }

  function handleChangeName(e) {
    setnewName(e.target.value);
    console.log("pw", newPassword);
  }

    // here
  function handleChangeNewArtist(e) {
    // setnewArtists(prev => prev.push(e.target.value))
    setArtist(e.target.value);
  }

  function handleAddArtist() {
    if(!newArtists.includes(artist) && newArtists.length < 10) {
        setnewArtists(prev => [...prev, artist]);
    }
    setArtist('');
  }

  function handleClearArtists() {
    setnewArtists([])
  }

  function handleChangeImages(e) { // what even is this??
    const fileURL = URL.createObjectURL(e.target.files[0]);
    setnewImages(fileURL);
  }

  return (
    <div className="container">
    <h1 id="text-shadows-2">Music Match</h1>
      <div className="input-container">
        <label htmlFor="createUser" className="label">
          New Username:
        </label>
        <input
          id="createUser"
          type="text"
          value={newUserName}
          onChange={handleChangeUser}
        />
      </div>

      <div className="input-container">
        <label htmlFor="createPW" className="label">
          New Password:
        </label>
        <input
          id="createPW"
          type="password"
          value={newPassword}
          onChange={handleChangePW}
        />
      </div>

      <div className="input-container">
        <label htmlFor="createAge" className="label">
          Input Age:
        </label>
        <input
          id="createAge"
          type="number"
          value={newAge}
          onChange={handleChangeAge}
        />
      </div>

      <div className="input-container">
        <label htmlFor="createName" className="label">
          Name to Display on Your Profile:
        </label>
        <input
          id="createName"
          type="text"
          value={newName}
          onChange={handleChangeName}
        />
      </div>

      <div className="input-container">
        <label htmlFor="createBio" className="label">
          Let People Know About You!
        </label>
        <textarea
          id="createBio"
          type="text"
          value={newBio}
          onChange={handleChangeBio}
        />
      </div>

      <form className="input-container" method ="post" encType="multipart/form-data">
        <label htmlFor="createImages" className="label">
          Upload Photos of Yourself
        </label>
        <input
          id="createImage"
          type="file"
          multiple
          name="file[]"
          onChange={handleChangeImages}
        />
      </form>

      <div className="input-container">
        <label htmlFor="createArtists" className="label">
          Who Are Your Favorite Artists?{" "}
        </label>
        <textarea
          id="createArtists"
          type="text"
          value={artist}
          placeholder="Minimum 3, max 10 Artists (you can always add more later!)"
          onChange={handleChangeNewArtist}
        />
        <button onClick={handleAddArtist}>Add Artist</button>
        <button onClick={handleClearArtists}>Clear Artists</button>
      </div>
      
      <div>
        <span style={{ "fontWeight": "bold" }}>Favorite Artists: </span>
        {newArtists.map((a, indx) => {
            return (<span key={indx}>{a}{indx === newArtists.length-1 ? " " : ", "}</span>)
        })}
      </div>

      <button id="createAccount" type="submit" onClick={handleClick}>
        CREATE ACCOUNT
      </button>
    </div>
  );
};

export default SignUp;
