const Profile = require('../Models/models');

const controller = {};

controller.verifyUser = async function(req, res, next){
    try{
        //find profile with same username 
        const profile = await Profile.findOne({username: req.body.username});

        console.log('found profile', profile)

        

        //if profile not found OR incorrect password, take to signup page
        if (profile === null || profile.password !== req.body.password){
            return next({
                log: 'Incorrect username or password',
                status: 400,
                message: { err: 'Incorrect username or password' }
            });
        }
        //if everything is correct, send back the profile object
        else{
            res.locals.profile = req.body;
            return next();
        }
    } catch{
        return next({
            log: 'Error in verifyUser middleware',
            message: { err: 'Error in verifyUser middleware' }
        })
    }   
}

controller.createUser = async function(req, res, next){

    try{
        console.log("in the createUser try block")
        //make sure user doesn't exist in database
        const existingProfile = await Profile.findOne({username: req.body.username})

        //if it doesn't add user
        if (existingProfile === null){
            console.log("creating user")
            console.log(req.body);
            const newProfile = await Profile.create(req.body);
            res.locals.newProfile = newProfile;
            return next();
        }

        //username already exists
        else return next({
            log: 'Username already exists',
            status: 400,
            message: { err: 'Username already exists' }

        })

    } catch{
        //global error
        
        return next({
            log: 'Error in createUser middleware function',
            message: { err: 'Error in createUser middleware function' }
        })

    }

}

module.exports = controller;