const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertUser = async function(novosDados) {
    try {
        let sql = `INSERT INTO tbl_cliente (`

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
        const sqlGet = 'select cast(id as decimal) as id from tbl_cliente order by id desc limit 1'

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
        let sql = 'select * from tbl_cliente'

        let rsUser = await prisma.$queryRawUnsafe(sql)

        return rsUser

    } catch (error) {
        return false
    }
}

module.exports = {
    insertUser,
    getId,
    selectUser
}