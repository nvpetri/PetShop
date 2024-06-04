const funcionariosDAO = require('../model/DAO/funcionario.js')
const ERROR_Messages = require('../model/DAO/config/config.js')

const insertFuncionario = async function(dadosFuncionario, content) {
    try {
        if (String(content).toLowerCase() == 'application/json') {

            let novoFuncionarioJson = {}

            if (!dadosFuncionario.nome || dadosFuncionario.nome.length === 0 || dadosFuncionario.nome.length > 40 ||
                !dadosFuncionario.email || dadosFuncionario.email.length === 0 || dadosFuncionario.email.length > 255 ||
                !dadosFuncionario.senha || dadosFuncionario.senha.length === 0 || dadosFuncionario.senha.length > 80 ||
                (dadosFuncionario.telefone && dadosFuncionario.telefone.length > 14) ||
                (dadosFuncionario.data_nascimento && !isValidDate(dadosFuncionario.data_nascimento)) ||
                (dadosFuncionario.foto_perfil && dadosFuncionario.foto_perfil.length > 65535) ||
                isNaN(dadosFuncionario.id_sexo)
            ) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS;
            } else {
                let novoFuncionario = await funcionariosDAO.insertFuncionario(dadosFuncionario)

                if (novoFuncionario) {
                    let idFuncionario = await funcionariosDAO.getId()

                    novoFuncionarioJson.status = ERROR_Messages.SUCCESS_CREATED_ITEM.status
                    novoFuncionarioJson.status_code = ERROR_Messages.SUCCESS_CREATED_ITEM.status_code
                    novoFuncionarioJson.message = ERROR_Messages.SUCCESS_CREATED_ITEM.message
                    novoFuncionarioJson.idNovoFuncionario = idFuncionario
                    novoFuncionarioJson.Funcionario = dadosFuncionario

                    return novoFuncionarioJson
                }
            }

        } else {
            return ERROR_Messages.ERROR_INVALID_FORMAT
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const selectFuncionario = async function() {
    try {
        let funcionarioJson = {}

        let dadosFuncionario = await funcionariosDAO.selectFuncionario()

        if (dadosFuncionario) {
            if (dadosFuncionario.length > 0) {
                funcionarioJson.Funcionarios = dadosFuncionario
                funcionarioJson.quantidade = dadosFuncionario.length
                funcionarioJson.status_code = 200

                return funcionarioJson
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

const validaFuncionario = async function(dados, content) {
    try {
        if (String(content).toLowerCase() == 'application/json') {

            if (dados.email != null || dados.email != undefined || dados.email != "" ||
                dados.senha != null || dados.senha != undefined || dados.senha != ""
            ) {

                let jsonValidado = {}

                let validacao = await funcionariosDAO.validaFuncionario(dados.email)

                if (validacao[0].senha == dados.senha) {

                    jsonValidado.nome = validacao[0].nome
                    jsonValidado.email = validacao[0].email
                    jsonValidado.foto_perfil = validacao[0].foto_perfil
                    jsonValidado.id_sexo = validacao[0].id_sexo
                    jsonValidado.telefone = validacao[0].telefone
                    jsonValidado.data_nascimento = validacao[0].data_nascimento
                    jsonValidado.status_code = 200

                    return jsonValidado
                } else {
                    return ERROR_Messages.ERROR_NOTFOUND
                }
            } else {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS
            }
        } else {
            return ERROR_Messages.ERROR_INVALID_FORMAT
        }
    } catch (error) {

    }
}

module.exports = {
    insertFuncionario,
    selectFuncionario,
    validaFuncionario

}