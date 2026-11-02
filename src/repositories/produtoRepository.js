const pool = require('../config/db');

const buscarPorId = async (id, conexao_exclusiva = pool) => {
    const sql = 'SELECT * FROM produtos WHERE id = $1';
    const resultado = await conexao_exclusiva.query(sql, [id]);
    return resultado.rows[0];
};

const atualizarEstoque = async (id, quantidade, conexao_exclusiva = pool) => {
    const sql = `
        UPDATE produtos
        SET quantidade_estoque = quantidade_estoque - $1
        WHERE id = $2
        RETURNING *
    `;
    const resultado = await conexao_exclusiva.query(sql, [quantidade, id]);
    return resultado.rows[0];
};

module.exports = { buscarPorId, atualizarEstoque };