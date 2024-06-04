const sexoDAO = require('../model/DAO/sexo.js')
const ERROR_Messages = require('../model/DAO/config/config.js')

const setNovoSexo = async function(dadosSexo, content) {
    try {
        if (String(content).toLowerCase() == 'application/json') {
            if (dadosSexo.nome == '' || dadosSexo.nome == undefined || dadosSexo.nome == null || dadosSexo.nome.length > 50) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS
            } else {
                let novoSexo = await sexoDAO.insertSexo(dadosSexo)
                if (novoSexo) {
                    let idSexo = await sexoDAO.getId()
                    let novoSexoJson = {
                        status: ERROR_Messages.SUCCESS_CREATED_ITEM.status,
                        status_code: ERROR_Messages.SUCCESS_CREATED_ITEM.status_code,
                        message: ERROR_Messages.SUCCESS_CREATED_ITEM.message,
                        idNovoSexo: idSexo,
                        sexo: dadosSexo
                    }
                    return novoSexoJson
                } else {
                    return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
                }
            }
        } else {
            return ERROR_Messages.ERROR_INVALID_FORMAT
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}


const setExcluirSexo = async function(id) {
    try {
        if (id == '' || id == undefined || isNaN(id)) {
            return ERROR_Messages.ERROR_INVALID_ID
        } else {
            const sexoExcluido = await sexoDAO.deleteSexo(id)
            if (sexoExcluido) {
                return ERROR_Messages.SUCCESS_DELETED_ITEM
            } else {
                return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const getListarSexos = async function() {
    try {
        let sexosJson = {}
        let dadosSexos = await sexoDAO.selectSexo()
        if (dadosSexos) {
            if (dadosSexos.length > 0) {
                sexosJson.sexos = dadosSexos
                sexosJson.quantidade = dadosSexos.length
                sexosJson.status_code = 200
                return sexosJson
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
    setNovoSexo,
    setExcluirSexo,
    getListarSexos
}