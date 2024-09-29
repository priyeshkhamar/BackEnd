const UserModel = require('../models/UsersModel');

const userlist = async (req, res) => {
    let data = await UserModel.find();
    res.json({
        data: data,
        msg: "User List displayed successfully!"
    });
};

const adduser = async (req, res) => {
    const { userid, username, email, password, mobile } = req.body;

    let data;
    if (userid) {
        data = await UserModel.findByIdAndUpdate(userid, {
            username: username,
            email: email,
            mobile: mobile,
            password: password
        });
    } else {
        data = new UserModel({
            username: username,
            email: email,
            mobile: mobile,
            password: password
        });
        await data.save();
    }
    res.json({
        msg: userid ? "User updated successfully!" : "Added successfully",
        data: data
    });
};

const deleteuser = async (req, res) => {
    let id = req.params.id;
    let data = await UserModel.findByIdAndDelete(id);
    if (data) {
        res.json({ msg: "User deleted successfully!" });
    } else {
        res.status(404).json({ msg: "User not found!" });
    }
};

const edituser = async (req, res) => {
    let id = req.params.id;
    let data = await UserModel.findById(id);
    if (data) {
        res.json({ data: data, msg: "User fetched successfully!" });
    } else {
        res.status(404).json({ msg: "User not found!" });
    }
};

module.exports = { userlist, adduser, deleteuser, edituser };