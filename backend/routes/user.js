// Ajout des packages suplémentaires
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// Toutes les toutes des API
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;