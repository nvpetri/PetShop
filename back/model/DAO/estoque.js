const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertCategoria = async function(novosDados) {
    try {
        let sql = `INSERT INTO tbl_categorias_produtos(`

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

const getIdCategoria = async function() {
    try {
        const sql = 'select cast(id as decimal) as id from tbl_categorias_produtos order by id desc limit 1'

        let resultGet = await prisma.$queryRawUnsafe(sql)

        if (resultGet) return resultGet
        else return false

    } catch (error) {
        return false
    }
}

const insertProduto = async function(novosDados) {
    try {
        let sql = `INSERT INTO tbl_produtos(`

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
        const sql = 'select cast(id as decimal) as id from tbl_produtos order by id desc limit 1'

        let result = await prisma.$queryRawUnsafe(sql)

        if (result) return result
        else return false
    } catch (error) {

    }
}

module.exports = {
    insertCategoria,
    insertProduto,
    getId,
    getIdCategoria,

}