const express = require('express');
const authMiddleware = require('../middleware/auth');
const userController = require('../controllers/userController');
const router = new express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', authMiddleware, userController.logout);
router.post('/logoutAll', authMiddleware, userController.logoutAll);

module.exports = router;