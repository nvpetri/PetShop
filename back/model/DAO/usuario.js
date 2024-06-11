const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertUser = async function(novosDados) {
    try {
        const columns = Object.keys(novosDados).filter(key => novosDados[key] !== undefined && novosDados[key] !== null)
        const values = Object.values(novosDados).filter(value => value !== undefined && value !== null)

        const columnNames = columns.join(', ')
        const valuePlaceholders = Array(values.length).fill('?').join(', ')

        const sql = `INSERT INTO tbl_usuario (${columnNames}) VALUES (${valuePlaceholders})`

        let result = await prisma.$executeRawUnsafe(sql, ...values)

        return !!result
    } catch (error) {
        return false
    }
}



const getId = async function() {
    try {
        const sqlGet = 'select cast(id as decimal) as id from tbl_usuario order by id desc limit 1'

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

const selectUser = async function() {
    try {
        let sql = 'select * from tbl_usuario'

        let rsUser = await prisma.$queryRawUnsafe(sql)

        return rsUser

    } catch (error) {
        return false
    }
}

const validaUser = async function(dados) {

    try {
        let sql = `select * from tbl_usuario where email = '${dados}'`

        let rsUser = await prisma.$queryRawUnsafe(sql)

        return rsUser
    } catch (error) {
        return false
    }

}

// const deleteUser = async

module.exports = {
    insertUser,
    getId,
    selectUser,
    validaUser
}