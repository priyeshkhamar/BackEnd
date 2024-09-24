const express = require('express');
const router = express.Router();

const { tasklist, addtask, edittask, deletetask } = require('../Controllers/ApiController');

router.get('/tasks', tasklist);
router.post('/add', addtask);
router.delete('/delete/:id', deletetask);
router.patch('/edit/:id', edittask);

module.exports = router;