const mongoose = require('mongoose');

const schema = mongoose.Schema;

const UserSchema = new schema({
    username: String,
    email: String,
    mobile: Number,
    password: String
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;