const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const autenticarToken = require('../middlewares/authMiddleware');

router.post('/', autenticarToken, pedidoController.criarPedido);

module.exports = router;