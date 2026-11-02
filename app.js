const express = require('express');
const pessoaRoutes = require('./src/routes/pessoaRoutes');
const pedidoRoutes = require('./src/routes/pedidoRoutes');

const app = express();

app.use(express.json());

app.use('/pessoas', pessoaRoutes);
app.use('/pedidos', pedidoRoutes);

module.exports = app;