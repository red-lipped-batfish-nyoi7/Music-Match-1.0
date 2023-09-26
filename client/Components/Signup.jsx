import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [newUserName, setnewUserName] = useState([]);
  const [newPassword, setnewPassword] = useState([]);

  const [newAge, setnewAge] = useState([]);
  const [newBio, setnewBio] = useState([]);
  const [newName, setnewName] = useState([]);
  const [newImages, setnewImages] = useState([]);

  const [newArtists, setnewArtists] = useState([]);

    async function handleClick(e) {
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
      
    }catch(err){
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

  function handleChangeNewArtists(e) {
    setnewArtists(e.target.value);
    console.log("pw", newPassword);
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
        <label htmlFor="createArtists" className="label">
          Who Are Your Favorite Artists?{" "}
        </label>
        <textarea
          id="createArtists"
          type="text"
          value={newArtists}
          onChange={handleChangeNewArtists}
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


      <button id="createAccount" type="submit" onClick={handleClick}>
        CREATE ACCOUNT
      </button>
    </div>
  );
};

export default SignUp;
