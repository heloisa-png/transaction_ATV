const jwt = require('jsonwebtoken');

const autenticarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            mensagem: 'Acesso negado. Informe um token Bearer.'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario_id = payload.id;
        next();
    } catch (erro) {
        return res.status(401).json({
            mensagem: 'Token inválido ou expirado.'
        });
    }
};

module.exports = autenticarToken;