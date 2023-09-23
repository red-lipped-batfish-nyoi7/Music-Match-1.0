const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MONGO_URI = "mongodb+srv://swAPP:CodesmithU10@cluster0.qzanrz5.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'red-lipped-batfish'
})
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.log('MongoDB error: ', err))


const profileSchema = new Schema({
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: Number, required: true},
    bio: {type: String, required: true},
    artists: {type: Object, required: true}
})

//later: profileSchema.pre to hash password

module.exports = mongoose.model('Profile', profileSchema);