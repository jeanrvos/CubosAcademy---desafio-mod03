const express = require('express');
const usuarios = require('./src/controladores/usuarios');
const produtos = require('./src/controladores/produtos');
const login = require('./src/controladores/login');
const validarLogin = require('./src/middlewares/validarLogin');

const rotas = express();

// cadastro de usuario
rotas.post('/cadastro', usuarios.cadastrarUsuario);

// login
rotas.post('/login', login.login);

// filtro para verificar usuario logado
rotas.use(validarLogin);

// obter e atualizar perfil do usuario logado
rotas.get('/perfil', usuarios.obterPerfil);
rotas.put('/perfil', usuarios.atualizarPerfil);

// crud de produtos
rotas.get('/produtos', produtos.listarProdutos);
rotas.get('/produtos/:id', produtos.obterProduto);
rotas.post('/produtos', produtos.cadastrarProduto);
rotas.put('/produtos/:id', produtos.atualizarProduto);
rotas.delete('/produtos/:id', produtos.deletarProduto);


module.exports = rotas;