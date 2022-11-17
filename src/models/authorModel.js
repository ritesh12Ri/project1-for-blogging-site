const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        Uppercase: false,
        Lowercase: true,
        match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'please fill the valid email address']
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('Author', authorSchema)