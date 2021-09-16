const conexao = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret');

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(404).json("Email e senha são obrigatórios.");
    }
    
    try {
        const queryConsultaEmail = 'select * from usuarios where email = $1';
        const { rows, rowCount: usuarios } = await conexao.query(queryConsultaEmail, [email]);

        if (usuarios === 0) {
            return res.status(404).json("Usuário não encontrado.");
        }

        const usuario = rows[0];

        const senhaValidada = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValidada) {
            return res.status(400).json("Email ou senha incorretos.");
        }
        
        const token = jwt.sign({ id: usuario.id }, jwtSecret, { expiresIn: '2h' });

        const { senha: senhaUsuarioVerificado, ...detalhesUsuario } = usuario;

        return res.status(200).json({
            usuario: detalhesUsuario,
            token
        });

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    login
}