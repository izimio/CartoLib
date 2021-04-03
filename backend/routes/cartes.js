const express = require("express");
const router = express.Router();
// const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const db = require('../models');
const CartesCtrl = require('../controllers/cartes')

router.post('/',multer, CartesCtrl.createCarte);
router.get('/', CartesCtrl.getAllCartes);
router.get('/:id', CartesCtrl.getOneCarte)
router.delete('/:id',multer, CartesCtrl.deleteCarte)
module.exports = router;