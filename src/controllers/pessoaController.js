const pessoaRepository = require('../repositories/pessoaRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: 'Informe o email e a senha.'
            });
        }

        const pessoa = await pessoaRepository.buscarPorEmail(email);

        if (!pessoa || !(await bcrypt.compare(senha, pessoa.senha_hash))) {
            return res.status(401).json({
                mensagem: 'Credenciais inválidas.'
            });
        }

        const token = jwt.sign(
            { id: pessoa.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso',
            token
        });
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro interno no servidor.'
        });
    }
};

module.exports = { login };