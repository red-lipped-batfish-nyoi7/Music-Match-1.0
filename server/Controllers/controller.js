const Profile = require('../Models/models.js');

const controller = {};

controller.verifyUser = async function(req, res, next){

    const { username } = req.body;
    try{
        //find profile with same username 
        const profile = await Profile.findOne({ username: username });
        console.log('found profile?..', profile)

        //if profile not found OR incorrect password, take to signup page
        if (profile === null){
            return next({
                log: 'Incorrect username or password',
                status: 400,
                message: { err: 'Incorrect username or password' }
            });
        }

        if (profile.password !== req.body.password){
            // TO DO alert clinet pw was not correct
            return next({
                log: 'Incorrect username or password',
                status: 400,
                message: { err: 'Incorrect username or password' }
            });
        }
        //if everything is correct, send back the profile object
  
        res.locals.profile = profile;
        return next();
        
    } catch (err) {
        return next({
            log: 'Error in verifyUser middleware',
            message: { err: 'Error in verifyUser middleware' }
        })
    }   
}

// CREATING A USER, ALSO CHECKS IF USERNAME ALREADY EXISTS
controller.createUser = async function(req, res, next){
    try{
        const { username } = req.body;
        const { body } = req;

        const existingProfile = await Profile.findOne({username: username})

        if (existingProfile) {
            return next({
                  log: 'Username already exists',
                  status: 400, 
                  message: { err: 'Username already exists' }
                })
        }
        
        const newProfile = await Profile.create(body);
        res.locals.profile = newProfile;
        return next();

       } catch(err){
        //global error 
        console.log('ERROR FROM CATCH', err)
        return next({
            log: 'Error in createUser middleware function',
            message: { err: 'Error in createUser middleware function' }
        })
       }
}

controller.createLoginCookie = function (req, res, next) {
    const { _id } = res.locals.profile;
    res.cookie('login', _id);
    return next();
}

controller.findProfileAndMatches = async function(req, res, next){

    try{

        //get profile by _id which is in the cookie
        const profileId = req.cookies.login;
        console.log('profileId', profileId);
        const profile = await Profile.findOne({_id: profileId});
        console.log('profile', profile);

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
            
            console.log('query', query);
            const newMatch = await Profile.find(query);
            console.log('newMatch', newMatch);
           
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

        console.log('pageinfo', res.locals.pageinfo);

        return next();

    }catch(err){
        return next({
            log: 'Error in findProfileAndMatches middleware function' + err,
            message: { err: 'Error in findProfileAndMatches middleware function' }
        })
    }
}

module.exports = controller;