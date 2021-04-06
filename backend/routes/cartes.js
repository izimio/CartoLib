const express = require("express");
const router = express.Router();
// const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const db = require('../models');
const CartesCtrl = require('../controllers/cartes')

router.post('/',multer, CartesCtrl.createCarte);
router.get('/', CartesCtrl.getAllCartes);
router.get('/created', CartesCtrl.getAllCartesByCreation);
router.get('/:id', CartesCtrl.getOneCarte)
router.delete('/:id',multer, CartesCtrl.deleteCarte)
router.put('/:id',multer, CartesCtrl.updateCarte)
module.exports = router;