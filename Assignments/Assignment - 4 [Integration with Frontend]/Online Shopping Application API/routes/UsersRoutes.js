const express = require('express');
const router = express.Router();

const { userlist, adduser, deleteuser, edituser } = require('../controllers/UsersController');

router.get('/', userlist);
router.post('/add', adduser);
router.delete('/delete/:id', deleteuser);
router.patch('/edit/:id', edituser);

module.exports = router;