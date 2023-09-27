const Profile = require('../Models/models.js');
const bcrypt = require('bcrypt');

const controller = {};

controller.verifyUser = async function(req, res, next){

    try {

        const foundProfile = await Profile.findOne({username: req.body.username });

        if (foundProfile === null) return next({
            log: 'At verifyUser: profile not found.',
            status: 400,
            message: { err: `Incorrect username or password.` }
        }); 

        await foundProfile.bcryptVerify(req.body.password, function(err, verified) {
                
            if (err) return next({
                log: `Error at verifyUser: uncaught error in profile.bcryptVerify: ${err}`,
                status: 500,
                message: { err: `Encountered unknown error at login` }
            });

            else if (verified === false) return next({
                log: 'At verifyUser: incorrect password.',
                status: 400,
                message: { err: 'Incorrect username or password.' }
            });

            else {
                res.locals.profile = foundProfile;
                return next();
            }

        });
    }
    
    catch(err) {
        
        return next({
            log: `Error at controller.verifyUser: uncaught error in try/catch block: ${err}`,
            status: 500,
            message: { err: `Encountered unknown error at login.` }
        });

    }
    
}

controller.createUser = async function(req, res, next){
    
    try {
        
        const { username } = req.body;
        const { body } = req;

        const existingProfile = await Profile.findOne({username: username})

        if (existingProfile) return next({
            log: 'At controller.createUser: user already exists.',
            status: 400, 
            message: { err: 'Username already exists.' }
        });

        try {
            const newProfile = new Profile(body);
            await newProfile.save();
            res.locals.profile = newProfile;
            return next();
        }

        catch(err) {
            
            return next({
                log: 'Error at controller.createUser: uncaught error in nested try/catch block.',
                status: 500, 
                message: { err: 'Unknown error at signup.' }
            });

        }
    } 

    catch(err) {

        return next({
            log: 'Error at controller.createUser: uncaught error in try/catch block.',
            status: 500,
            message: { err: 'Unknown error at signup.' }
        });

    }

}

controller.createLoginCookie = function (req, res, next) {
    const { _id } = res.locals.profile;
    res.cookie('login', _id);
    return next();
}

controller.findProfileAndMatches = async function(req, res, next){

    try {
        //get profile by _id which is in the cookie
        const profileId = req.cookies.login;
        // console.log('profileId', profileId);
        const profile = await Profile.findOne({_id: profileId});
        // console.log('profile', profile);

        //store only the info that the frontend needs in a variable
        const {username, name, age, bio, artists} = profile;
        const userProfile = {username, name, age, bio, artists};
       
        let matchesProfiles = [];

        const artistsArray = artists;

        //loop through artistsArray and find profiles that include these artists
        for (const artist in artistsArray){

            const newName = `artists.${artist}`;
            const query = {};
            query[newName] = { $exists: true };
            
            const newMatch = await Profile.find(query);           
            matchesProfiles = matchesProfiles.concat(newMatch);

        };

        //remove duplicates from matchesProfiles
        const matchCache = {};
        const filteredMatches = [];
        for(const match of matchesProfiles){
            if(!matchCache.hasOwnProperty(match.username) && match.username !== username){
                matchCache[match.username] = true;
                filteredMatches.push(match);
            }
        }

        res.locals.pageinfo = {userProfile, matchesProfiles: filteredMatches}

        return next();

    }
    catch(err) {
        return next({
            log: 'Error in findProfileAndMatches middleware function' + err,
            message: { err: 'Error in findProfileAndMatches middleware function' }
        })
    }
}

module.exports = controller;