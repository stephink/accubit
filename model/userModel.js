const mongoose = require("mongoose");
const { USER_MODEL } = require("../config/env.config");
const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        age: {
            type: Number,
        },
    },
    { timestamps: true }
);
const User = mongoose.model(USER_MODEL, UserSchema);
module.exports = User