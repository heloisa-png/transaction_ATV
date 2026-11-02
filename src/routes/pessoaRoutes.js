const express = require('express');
const router = express.Router();
const pessoaController = require('../controllers/pessoaController');

router.post('/login', pessoaController.login);

module.exports = router;