import React, { useState, useEffect } from "react";
import SignUp from "./signup";
import LoginBox from "./login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from "./mainpage"
import '../styles.scss';

const App = () => {


    // const isTrue = document.cookie;
    // const navigate  = useNavigate();
  
   
    // if(isTrue) {
    //     navigate('/main')
    //     return null;
    // }

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