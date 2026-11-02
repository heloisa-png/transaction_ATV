const pool = require('../config/db');

const criar = async (pessoa_id, produto_id, quantidade, conexao_exclusiva = pool) => {
    const sql = `
        INSERT INTO pedidos (pessoa_id, produto_id, quantidade)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    const resultado = await conexao_exclusiva.query(sql, [
        pessoa_id, produto_id, quantidade
    ]);
    return resultado.rows[0];
};

module.exports = { criar };