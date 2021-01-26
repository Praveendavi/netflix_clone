const mongoose = require('mongoose')

const googleSchema = new mongoose.Schema({
    googleId: { type: String, required: true }, 
    displayName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    photos: { type: String}
})

module.exports = mongoose.model("Auth", googleSchema)