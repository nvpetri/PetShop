const clientesDAO = require('../model/DAO/usuario.js')
const ERROR_Messages = require('../model/DAO/config/config.js')

const insertUser = async function(dadosCliente, content) {
    try {
        if (String(content).toLowerCase() == 'application/json') {

            let novoUsuarioJson = {}

            if (!dadosUsuario.nome || dadosUsuario.nome.length === 0 || dadosUsuario.nome.length > 40 ||
                !dadosUsuario.email || dadosUsuario.email.length === 0 || dadosUsuario.email.length > 255 ||
                !dadosUsuario.senha || dadosUsuario.senha.length === 0 || dadosUsuario.senha.length > 80 ||
                (dadosUsuario.telefone && dadosUsuario.telefone.length > 14) ||
                (dadosUsuario.data_nascimento && !isValidDate(dadosUsuario.data_nascimento)) ||
                (dadosUsuario.foto_perfil && dadosUsuario.foto_perfil.length > 65535) ||
                isNaN(dadosUsuario.id_sexo)
            ) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS;
            } else {
                let novoUsuario = await clientesDAO.insertUser(dadosCliente)

                if (novoUsuario) {
                    let idUsuario = await clientesDAO.getId()

                    novoUsuarioJson.status = ERROR_Messages.SUCCESS_CREATED_ITEM.status
                    novoUsuarioJson.status_code = ERROR_Messages.SUCCESS_CREATED_ITEM.status_code
                    novoUsuarioJson.message = ERROR_Messages.SUCCESS_CREATED_ITEM.message
                    novoUsuarioJson.idNovoUsuario = idUsuario
                    novoUsuarioJson.Usuario = dadosUsuario

                    return novoUsuarioJson
                }
            }

        } else {
            return ERROR_Messages.ERROR_INVALID_FORMAT
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const selectUser = async function() {
    try {
        let usuarioJson = {}

        let dadosUsuario = await clientesDAO.selectUser()

        if (dadosUsuario) {
            if (dadosUsuario.length > 0) {
                usuarioJson.usuarios = dadosUsuario
                usuarioJson.quantidade = dadosUsuario.length
                usuarioJson.status_code = 200

                return usuarioJson
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

module.exports = {
    insertUser,
    selectUser
}