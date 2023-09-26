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
            artist += ' ';
            artist = artist.replaceAll('\n', ' ');
            artist = artist.replaceAll(', ', ' ');
            artist = artist.split(' ');
            const artistObj = {}
            for(const artists of artist){
                if(artists === ' ' || artists === '') continue;
                artistObj[artists.toLowerCase()] = true;
            }
    
            const newUser = { ...req.body, artists: artistObj}

            console.log("creating user", newUser)

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
    // console.log('made it to create cookie');
    // console.log(res.locals);

    const { _id } = res.locals.profile;
    
    res.cookie('login', _id);

    return next();
}

controller.findProfileAndMatches = async function(req, res, next){

    console.log("FIND PROFILE AND MATCHES");

    try{
        console.log("in try block")

        //get profile by _id which is in the cookie
        const profileId = req.cookies.login;
        console.log("profileId", profileId);
        const profile = await Profile.findOne({_id: profileId});
        console.log("profile", profile);

        //store only the info that the frontend needs in a variable
        const {username, name, age, bio, artists} = profile;
        const userProfile = {username, name, age, bio, artists};
       
        let matchesProfiles = [];

        const artistsArray = artists;

        console.log("artistsArray", artistsArray);

        //loop through artistsArray and find profiles that include these artists
        for (const artist in artistsArray){

            const newName = `artists.${artist}`;
            const query = {};
            query[newName] = { $exists: true };
            
            console.log("query", query);
            const newMatch = await Profile.find(query);
            console.log("newMatch", newMatch);
           
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

        console.log("pageinfo", res.locals.pageinfo);

        return next();

    }catch(err){
        return next({
            log: 'Error in findProfileAndMatches middleware function' + err,
            message: { err: 'Error in findProfileAndMatches middleware function' }
        })
    }
}

module.exports = controller;