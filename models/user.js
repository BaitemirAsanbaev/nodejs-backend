const {Schema, model} = require("mongoose")

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User' // You can set the default role here
    }
})

module.exports = model("User", UserSchema)