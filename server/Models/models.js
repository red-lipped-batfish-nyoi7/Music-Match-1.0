const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: Number, required: true},
    bio: {type: String, required: true},
    artists: {type: Set, required: true}
})

//later: profileSchema.pre to hash password

module.exports = mongose.model('Profile', profileSchema);