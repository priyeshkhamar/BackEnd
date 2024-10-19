const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

const generateAuthToken = async (user) => {
    const token = jwt.sign({ _id: user._id.toString() }, SECRET_KEY);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

exports.register = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await generateAuthToken(user);
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send('Invalid login credentials');
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid login credentials');
        }
        const token = await generateAuthToken(user);
        res.send({ user, token });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tokenObj) => {
            return tokenObj.token !== req.token;
        });
        await req.user.save();
        res.send('Logged out from current device');
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.logoutAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send('Logged out from all devices');
    } catch (error) {
        res.status(500).send(error);
    }
};
