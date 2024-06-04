const estoqueDAO = require('../model/DAO/estoque.js')
const ERROR_Messages = require('../model/DAO/config/config.js')

const insertCategoria = async function(dadosCategoria, content) {
    try {
        if (String(content).toLowerCase() == 'application/json') {

            let novaCategoriaJson = {}

            if (!dadosCategoria.nome || dadosCategoria.nome.length === 0 || dadosCategoria.nome.length > 50 ||
                (dadosCategoria.descricao && dadosCategoria.descricao.length > 255)
            ) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS;
            } else {
                let novaCategoria = await estoqueDAO.insertCategoria(dadosCategoria)

                if (novaCategoria) {
                    let idCategoria = await estoqueDAO.getIdCategoria()

                    novaCategoriaJson.status = ERROR_Messages.SUCCESS_CREATED_ITEM.status
                    novaCategoriaJson.status_code = ERROR_Messages.SUCCESS_CREATED_ITEM.status_code
                    novaCategoriaJson.message = ERROR_Messages.SUCCESS_CREATED_ITEM.message
                    novaCategoriaJson.idNovaCategoria = idCategoria
                    novaCategoriaJson.Categoria = dadosCategoria

                    return novaCategoriaJson
                }
            }

        } else {
            return ERROR_Messages.ERROR_INVALID_FORMAT
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const selectCategorias = async function() {
    try {
        let categoriaJson = {}

        let dadosCategoria = await estoqueDAO.getCategoria()

        if (dadosCategoria) {
            if (dadosCategoria.length > 0) {
                categoriaJson.categorias = dadosCategoria
                categoriaJson.quantidade = dadosCategoria.length
                categoriaJson.status_code = 200

                return categoriaJson
            } else {
                return ERROR_Messages.ERROR_NOTFOUND
            }
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}
const insertProduto = async function(dadosProduto, content) {
    try {
        if (String(content).toLowerCase() == 'application/json') {

            let novoProdutoJson = {}

            if (!dadosProduto.nome || dadosProduto.nome.length === 0 || dadosProduto.nome.length > 40 ||
                (dadosProduto.descricao && dadosProduto.descricao.length > 255) ||
                (dadosProduto.foto && dadosProduto.foto.length > 65535) ||
                isNaN(dadosProduto.quantidade) || dadosProduto.quantidade < 0 ||
                isNaN(dadosProduto.valor_unitario) || dadosProduto.valor_unitario <= 0 ||
                isNaN(dadosProduto.id_categoria)
            ) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS;
            } else {
                let novoProduto = await estoqueDAO.insertProduto(dadosProduto)

                if (novoProduto) {
                    let idProduto = await estoqueDAO.getId()

                    novoProdutoJson.status = ERROR_Messages.SUCCESS_CREATED_ITEM.status
                    novoProdutoJson.status_code = ERROR_Messages.SUCCESS_CREATED_ITEM.status_code
                    novoProdutoJson.message = ERROR_Messages.SUCCESS_CREATED_ITEM.message
                    novoProdutoJson.idNovoProduto = idProduto
                    novoProdutoJson.Produto = dadosProduto

                    return novoProdutoJson
                }
            }

        } else {
            return ERROR_Messages.ERROR_INVALID_FORMAT
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const selectProdutos = async function() {
    try {
        let produtoJson = {}

        let dadosProduto = await estoqueDAO.getProdutos()

        if (dadosProduto) {
            if (dadosProduto.length > 0) {
                produtoJson.produtos = dadosProduto
                produtoJson.quantidade = dadosProduto.length
                produtoJson.status_code = 200

                return produtoJson
            } else {
                return ERROR_Messages.ERROR_NOTFOUND
            }
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const deletarProduto = async function(id) {
    try {
        if (id == null || id == undefined || id == 1 || isNaN(id)) {
            ERROR_Messages.ERROR_INVALID_ID
        } else {
            const produtoExcluido = await estoqueDAO.excluirProduto(id)
            if (produtoExcluido) return ERROR_Messages.SUCCESS_DELETED_ITEM
            else return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const deletarCategoria = async function(id) {
    try {
        if (id == null || id == undefined || id == 1 || isNaN(id)) {
            ERROR_Messages.ERROR_INVALID_ID
        } else {
            const produtoExcluido = await estoqueDAO.excluirCategoria(id)
            if (produtoExcluido) return ERROR_Messages.SUCCESS_DELETED_ITEM
            else return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    selectCategorias,
    insertCategoria,
    selectProdutos,
    insertProduto,
    deletarProduto,
    deletarCategoria
}