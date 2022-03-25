const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
    UserId: { type: String, required: true },
    Title: { type: String, required: true },
    Released: { type: String, required:true },
    Genre: { type: String, required:true },
    Director: { type: String, required:true }
}, { timestamps: true })


module.exports = mongoose.model('Movie', UserSchema)