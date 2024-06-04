const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertFuncionario = async function(novosDados) {
    try {
        let sql = `INSERT INTO tbl_funcionarios (`

        const keys = Object.keys(novosDados)
        const values = Object.values(novosDados)
        let placeholders = ''
        keys.forEach((key, index) => {
            if (values[index] !== undefined && values[index] !== null) {
                sql += `${key}`
                placeholders += `?`
                if (index !== keys.length - 1) {
                    sql += `, `
                    placeholders += `, `
                }
            }
        })
        sql += `) VALUES (${placeholders})`

        let result = await prisma.$executeRawUnsafe(sql, values)

        if (result) return true
        else return false
    } catch (error) {
        return false
    }

}

const getId = async function() {
    try {
        const sqlGet = 'select cast(id as decimal) as id from tbl_funcionarios order by id desc limit 1'

        let resultGet = await prisma.$queryRawUnsafe(sqlGet)

        if (resultGet) {
            return resultGet
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectFuncionario = async function() {
    try {
        let sql = 'select * from tbl_funcionarios'

        let rsFuncionario = await prisma.$queryRawUnsafe(sql)

        return rsFuncionario


    } catch (error) {
        return false
    }
}

const validaFuncionario = async function(dados) {

    try {
        let sql = `select * from tbl_funcionarios where email = '${dados}'`

        let rsFuncionario = await prisma.$queryRawUnsafe(sql)

        return rsFuncionario

    } catch (error) {
        return false
    }

}

module.exports = {
    insertFuncionario,
    getId,
    selectFuncionario,
    validaFuncionario

}