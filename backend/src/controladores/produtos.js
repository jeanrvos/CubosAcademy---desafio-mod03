const conexao = require('../conexao');

const listarProdutos = async (req, res) => {
    const { usuario } = req;
    const { categoria } = req.query;

    try {
        let query = 'select * from produtos where usuario_id = $1';
        const params =[usuario.id];

        if (categoria) {
            query += ' and categoria ilike $2';
            params.push(`%${categoria}%`);            
        }

        const { rows, rowCount: produtos } = await conexao.query(query, [...params]);

        if(produtos === 0) {
            return res.status(404).json('Não foi localizado nenhum produto para este usuário.');
        }

        return res.status(200).json(rows);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const obterProduto = async (req, res) => {
    const { id } = req.params;
    const { usuario } = req;

    try {
        const queryProdutoUsuario = 'select * from produtos where usuario_id = $1 and id = $2';
        const { rows: produtoEncontrado, rowCount: produtoProcurado } = await conexao.query(queryProdutoUsuario, [usuario.id, id]);

        if(produtoProcurado === 0) {
            return res.status(404).json('Este usuário não possui produto com o id informado.');
        }

        return res.status(200).json(produtoEncontrado[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const cadastrarProduto = async (req, res) => {
    const { usuario } = req;
    const { nome, estoque, categoria, preco, descricao, imagem} = req.body;

    if (!nome) {
        return res.status(400).json("O campo nome é obrigatório.");
    }

    if (!estoque) {
        return res.status(404).json("O campo estoque é obrigatório.");
    }
    
    if (!categoria) {
        return res.status(404).json("O campo categoria é obrigatório.");
    }

    if (!preco) {
        return res.status(404).json("O campo 'preco' é obrigatório.");
    }

    if (!descricao) {
        return res.status(404).json("O campo 'descrição' é obrigatório.");
    }

    if (!imagem) {
        return res.status(404).json("O campo 'imagem' é obrigatório.");
    }

    try {
        const query = 'insert into produtos (usuario_id, nome, estoque, categoria, preco, descricao, imagem) values ($1, $2, $3, $4, $5, $6, $7)';
        const { rowCount: novoProduto} = await conexao.query(query, [usuario.id, nome, estoque, categoria, preco, descricao, imagem]);

        if (novoProduto === 0) {
            return res.status(400).json('Não foi possivel cadastrar o produto');
        }

        return res.status(200).json('Produto cadastrado com sucesso.');

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const { usuario } = req;
    const { nome, estoque, categoria, preco, descricao, imagem} = req.body;

    if (!nome) {
        return res.status(400).json("O campo nome é obrigatório.");
    }

    if (!estoque) {
        return res.status(400).json("O campo estoque é obrigatório.");
    }
    
    if (!categoria) {
        return res.status(400).json("O campo categoria é obrigatório.");
    }

    if (!preco) {
        return res.status(400).json("O campo 'preco' é obrigatório.");
    }

    if (!descricao) {
        return res.status(400).json("O campo 'descrição' é obrigatório.");
    }

    if (!imagem) {
        return res.status(400).json("O campo 'imagem' é obrigatório.");
    }

    try {
        const query = 'select * from produtos where id = $1';
        const { rows, rowCount: produto } = await conexao.query(query, [id]);

        if (produto === 0) {
            return res.status(404).json("Produto não encontrado.");
        }

        const queryProdutoUsuario = 'select * from produtos where id = $1 and usuario_id = $2';
        const { rowCount: produtoProcurado } = await conexao.query(queryProdutoUsuario, [id, usuario.id]);

        if(produtoProcurado === 0) {
            return res.status(404).json('Este usuário não possui produto com o id informado.');
        }

        const queryAtualizarProduto = 'update produtos set nome = $1, estoque =$2, categoria = $3, preco = $4, descricao = $5, imagem = $6 where id = $7 and usuario_id = $8';
        const { rowCount: produtoAtualizado} = await conexao.query(queryAtualizarProduto, [nome, estoque, categoria, preco, descricao, imagem, id, usuario.id]);

        if (produtoAtualizado === 0) {
            return res.status(404).json('Não foi possível atualizar o produto do usuário.');
        }

        return res.status(200).json('Produto do usuário foi atualizado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const deletarProduto = async (req, res) => {
    const { id } = req.params;
    const { usuario } = req;

    try {
        const query = 'select * from produtos where id = $1';
        const { rowCount: produto } = await conexao.query(query, [id]);

        if (produto === 0) {
            return res.status(404).json("Produto não encontrado.");
        }

        const queryProdutoUsuario = 'select * from produtos where id = $1 and usuario_id = $2';
        const { rowCount: produtoProcurado } = await conexao.query(queryProdutoUsuario, [id, usuario.id]);

        if(produtoProcurado === 0) {
            return res.status(404).json('Este usuário não possui produto com o id informado.');
        }

        const queryDeletarProduto = 'delete from produtos where id = $1 and usuario_id = $2';
        const { rowCount: produtoExcluido } = await conexao.query(queryDeletarProduto, [id, usuario.id]);

        if (produtoExcluido === 0) {
            return res.status(404).json('Não foi possível excluir o produto');
        }

        return res.status(200).json('Produto foi excluido com sucesso.');

    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    listarProdutos,
    obterProduto,
    cadastrarProduto,
    atualizarProduto,
    deletarProduto
}