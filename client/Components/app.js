import React, { useState, useEffect } from "react";
import SignUp from "./signup";
import LoginBox from "./login";
// import { Router } from "express";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import MainPage from "./mainpage"
import '../styles.scss';

const App = () => {

    return (

        // <div>
        //     <SignUp/>
        //     {/* <MainPage /> */}
        // </div>
        
        <Router>
            <Switch>
            {/* <Route path="/main" component={MainPage} /> */}
            <Route path ='/signup'> <SignUp/> </Route>

            <Route path ='/'> <LoginBox/> </Route>
            </Switch>
            
    </Router>
        
       
        
    )
}

export default App;