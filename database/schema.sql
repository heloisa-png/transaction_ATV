CREATE TABLE IF NOT EXISTS pessoas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    quantidade_estoque INT NOT NULL DEFAULT 0 CHECK (quantidade_estoque >= 0)
);

CREATE TABLE IF NOT EXISTS pedidos (
    id SERIAL PRIMARY KEY,
    pessoa_id INT NOT NULL REFERENCES pessoas(id),
    produto_id INT NOT NULL REFERENCES produtos(id),
    quantidade INT NOT NULL CHECK (quantidade > 0),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conta de teste indicada no tutorial (senha: admin123).
INSERT INTO pessoas (nome, email, senha_hash)
VALUES (
    'Admin',
    'admin@empresa.com',
    '$2b$10$eO1v0TGBkX8jC/8c950GIOi1L9B0s8M8/Z641H0S6993c8.9958gC'
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO produtos (nome, quantidade_estoque)
SELECT 'Papel A4', 50
WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome = 'Papel A4');

INSERT INTO produtos (nome, quantidade_estoque)
SELECT 'Caneta Azul', 10
WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE nome = 'Caneta Azul');