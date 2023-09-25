const Profile = require('../Models/models.js');

const controller = {};


controller.verifyUser = async function(req, res, next){
    try{
        //find profile with same username 
        const profile = await Profile.findOne({username: req.body.username});

        console.log('found profile?..', profile)

        

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
            res.locals.profile = profile;
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

        let { username, artist } = req.body;

        console.log('input', req.body)
        const existingProfile = await Profile.findOne({username: username})

        
        //if it doesn't add user
        if (existingProfile === null){
            console.log('we are in existingprofile')
            //format artists from request body
            artist = artist.replace('\n', ' ');
            artist = artist.replace(', ', ' ');
            artist = artist.split(' ');
            const artistObj = {}
            for(const artists of artist){
                artistObj[artists.toLowerCase()] = true;
            }
    
            const newUser = { ...req.body, artists: artistObj}
            // console.log("creating user", newUser)
            // console.log(req.body);
            const newProfile = await Profile.create(newUser);
            console.log('await new profile', newProfile)
            res.locals.profile = newProfile;
            return next();
        }
        
        //username already exists
        else return next({
            log: 'Username already exists' + err,
            status: 400, 
            message: { err: 'Username already exists' }
        

        })

    } catch(err){
        //global error
        
        return next({
            log: 'Error in createUser middleware function',
            message: { err: 'Error in createUser middleware function' }
        })

    }

}

controller.createLoginCookie = function (req, res, next) {
    console.log('made it to create cookie');
    console.log(res.locals);

    const { _id } = res.locals.profile;
    
    res.cookie('login', _id);

    return next();
}

controller.findProfileAndMatches = async function(req, res, next){

    try{

        //get profile by _id which is in the cookie
        const profileId = req.cookies.login;
        const profile = await Profile.findOne({_id: profileId});

        //store only the info that the frontend needs in a variable
        const {username, name, age, bio, artists} = profile;
        const profileInfo = {username, name, age, bio, artists};
       
        const arrayOfMatches = [];

        const artistsArray = req.body.artists;

        //loop through artistsArray and find profiles that include these artists
        for (let i = 0; i < artistsArray.length; i++){

            const newMatch = await Profile.find({'artists.Nickelback': { $exists: true }}, (err, profiles) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(profiles);
                }
            });

            arrayOfMatches.push(newMatch)

        }

        

        


    } catch(err){

        return next({
            log: 'Error in findProfile middleware function',
            message: { err: 'Error in findProfile middleware function' }
        })
    }

}


module.exports = controller;