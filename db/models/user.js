const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true,'Please provide username'],
        unique: true
        },
    password: {
            type: String,
            required: [true,'Please provide password'],
            unique: true
            },
    Full_Name: {
                type: String,
                required: [true,'Please provide Full Name'],
                unique: true
                },
    Email: {
                    type: String,
                    required: [true,'Please provide Email'],
                    unique: true
                    },
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash
    next()
    })
    })

const User = mongoose.model('User',UserSchema);
module.exports = User