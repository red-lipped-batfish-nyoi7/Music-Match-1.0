import React, { useState, useEffect } from "react";
import SignUp from "./signup";
import '../styles.scss'
// import { Router } from "express";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import MainPage from "./mainpage"

const App = () => {

    return (

        <div>
            <SignUp/>
        </div>
        
    //     <Router>
    //         <Switch>
    //         {/* <Route path="/main" component={MainPage} /> */}
    //         <Route path ='/signup'> <SignUp/> </Route>
    //         </Switch>
            
    // </Router>
        
       
        
    )
}

export default App;