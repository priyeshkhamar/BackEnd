const express = require('express');
const router = express.Router();

const { productlist, addproduct, deleteproduct, editproduct } = require('../controllers/ProductsController');

router.get('/', productlist);
router.post('/add', addproduct);
router.delete('/delete/:id', deleteproduct);
router.patch('/edit/:id', editproduct);

module.exports = router;