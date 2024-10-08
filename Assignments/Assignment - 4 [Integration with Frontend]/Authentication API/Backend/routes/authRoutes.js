const express = require('express');
const { register, login, logout, logoutAll } = require('../controllers/authcontroller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.post('/logoutAll', authMiddleware, logoutAll);

module.exports = router;
