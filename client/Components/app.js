import React, { useState, useEffect } from "react";
import SignUp from "./signup";
import LoginBox from "./login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from "./mainpage"
import '../styles.scss';

const App = () => {

    return (
        <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<LoginBox />} />
          <Route path ='/main' element = {<MainPage />} />
        </Routes>
      </Router>
    )
}

export default App;

 // const isTrue = document.cookie;
    // const navigate  = useNavigate();
  
   
    // if(isTrue) {
    //     navigate('/main')
    //     return null;

    // }


    // const [user, setUser] = useState([]);


    //     fetch('http://localhost:3000/userprofile')
    //     .then((data) => data.json())
    //     .then((data) => {
    //       setUser(data)
          
    //       console.log('hello', user)

    //     })
        
    //     let array = [];
    //     array.push(user);

    //     let answer = [];
    //     for(let i = 0; i < array.length; i++){
    //       answer.push(
    //         <div>{array[i].userProfile}</div>
    //       )
    //     }

        
    
        // console.log('response' , data.userProfile)
        // console.log('response2' , data.matchesProfiles[0])
    
