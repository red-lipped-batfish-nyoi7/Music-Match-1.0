const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
console.log('DATABASE TEST', MONGO_URI)

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: '65020df807624f7a95321280'
})
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.error('MongoDB Error: ', err))


const profileSchema = new Schema({
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: String, required: true},
    bio: {type: String, required: true},
    artists: {type: Object, required: true},
    images: {type: Object, required: true}
})

//later: profileSchema.pre to hash password

module.exports = mongoose.model('Profile', profileSchema);