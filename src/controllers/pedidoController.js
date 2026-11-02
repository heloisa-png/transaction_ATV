const pool = require('../config/db');
const produtoRepository = require('../repositories/produtoRepository');
const pedidoRepository = require('../repositories/pedidoRepository');

const criarPedido = async (req, res) => {
    const pessoa_id = req.usuario_id;
    const { produto_id, quantidade_solicitada } = req.body;

    if (!produto_id || !Number.isInteger(Number(produto_id)) ||
        !Number.isInteger(quantidade_solicitada) || quantidade_solicitada <= 0) {
        return res.status(400).json({
            mensagem: 'Informe um produto_id válido e uma quantidade inteira maior que zero.'
        });
    }

    const conexao_exclusiva = await pool.connect();

    try {
        await conexao_exclusiva.query('BEGIN');

        const produto = await produtoRepository.buscarPorId(
            produto_id, conexao_exclusiva
        );

        if (!produto) {
            throw new Error('Produto não encontrado.');
        }

        if (produto.quantidade_estoque < quantidade_solicitada) {
            throw new Error('Estoque insuficiente.');
        }

        await produtoRepository.atualizarEstoque(
            produto_id, quantidade_solicitada, conexao_exclusiva
        );

        // Para testar o ROLLBACK, descomente a linha abaixo:
        // throw new Error('Falha simulada no banco de dados!');

        const novoPedido = await pedidoRepository.criar(
            pessoa_id, produto_id, quantidade_solicitada, conexao_exclusiva
        );

        await conexao_exclusiva.query('COMMIT');

        return res.status(201).json({
            mensagem: 'Pedido realizado com sucesso!',
            pedido: novoPedido
        });
    } catch (erro) {
        try {
            await conexao_exclusiva.query('ROLLBACK');
        } catch (erroRollback) {
            console.error('Erro ao executar ROLLBACK:', erroRollback);
        }

        return res.status(400).json({ erro: erro.message });
    } finally {
        conexao_exclusiva.release();
    }
};

module.exports = { criarPedido };