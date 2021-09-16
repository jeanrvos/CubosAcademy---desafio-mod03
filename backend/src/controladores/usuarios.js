const conexao = require('../conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, nome_loja} = req.body;

    if (!nome) {
        return res.status(404).json("O campo nome é obrigatório.");
    }

    if (!email) {
        return res.status(404).json("O campo email é obrigatório.");
    }
    
    if (!senha) {
        return res.status(404).json("O campo senha é obrigatório.");
    }

    if (!nome_loja) {
        return res.status(404).json("O campo 'nome da loja' é obrigatório.");
    }

    try {
        const queryConsultaEmail = 'select * from usuarios where email = $1';
        const { rowCount: usuarios } = await conexao.query(queryConsultaEmail, [email]);

        if (usuarios > 0) {
            return res.status(400).json("Este email já foi cadastrado.");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const query = 'insert into usuarios (nome, email, senha, nome_loja) values ($1, $2, $3, $4)';
        const { rowCount: novoUsuario} = await conexao.query(query, [nome, email, senhaCriptografada, nome_loja]);

        if (novoUsuario === 0) {
            return res.status(400).json("Não foi possivel cadastrar o usuario");
        }

        return res.status(200).json("Usuário cadastrado com sucesso.");

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterPerfil = async (req, res) => {
    const { usuario } = req;

    return res.status(200).json(usuario);
}

const atualizarPerfil = async (req, res) => {
    const { usuario } = req;
    const { nome, email, senha, nome_loja } = req.body;

    if (!nome && !email && !senha && !nome_loja) {
        return res.status(404).json("É obrigatório informar ao menos um campo para atualização");
    }

    try {

        const body = {};
        const params = [];
        let n = 1;

        if (nome) {
            body.nome = nome;
            params.push(`nome = $${n}`);
            n++;
        }

        if (email) {
            if(email !== usuario.email ) {
                const queryConsultaEmail = 'select * from usuarios where email = $1';
                const { rowCount: emailUsuario } = await conexao.query(queryConsultaEmail, [email]);
    
                if (emailUsuario > 0) {
                    return res.status(400).json("Este email já foi cadastrado.");
                }
            }   
            body.email = email;
            params.push(`email = $${n}`);
            n++;
        }

        if (senha) {
            body.senha = await bcrypt.hash(senha, 10);
            params.push(`senha = $${n}`);
            n++;
        }
        
        if (nome_loja) {
            body.nome_loja = nome_loja;
            params.push(`nome_loja = $${n}`);
            n++;
        }         
        
        const valores = Object.values(body);

        const queryAtualizarPerfil = `update usuarios set ${params.join(', ')} where id = $${n}`;
        const { rowCount: perfilAtualizado} = await conexao.query(queryAtualizarPerfil, [...valores, usuario.id]);

        if (perfilAtualizado === 0) {
            return res.status(404).json('Não foi possível atualizar o perfil do usuário.');
        }

        return res.status(200).json('Perfil do usuário foi atualizado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarUsuario,
    obterPerfil,
    atualizarPerfil
}