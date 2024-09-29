const express = require('express');
const router = express.Router();

const { orderlist, addorder, deleteorder, editorder } = require('../controllers/OrdersController');

router.get('/', orderlist);
router.post('/add', addorder);
router.delete('/delete/:id', deleteorder);
router.patch('/edit/:id', editorder);

module.exports = router;