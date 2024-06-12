const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertCategoria = async function(novosDados) {
    try {
        const columns = Object.keys(novosDados).filter(key => novosDados[key] !== undefined && novosDados[key] !== null)
        const values = Object.values(novosDados).filter(value => value !== undefined && value !== null)

        const columnNames = columns.join(', ')
        const valuePlaceholders = Array(values.length).fill('?').join(', ')

        const sql = `INSERT INTO tbl_categorias_produtos (${columnNames}) VALUES (${valuePlaceholders})`

        let result = await prisma.$executeRawUnsafe(sql, ...values)

        return !!result
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
        const columns = Object.keys(novosDados).filter(key => novosDados[key] !== undefined && novosDados[key] !== null)
        const values = Object.values(novosDados).filter(value => value !== undefined && value !== null)

        const columnNames = columns.join(', ')
        const valuePlaceholders = Array(values.length).fill('?').join(', ')

        const sql = `INSERT INTO tbl_produtos (${columnNames}) VALUES (${valuePlaceholders})`

        let result = await prisma.$executeRawUnsafe(sql, ...values)

        return !!result
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

const getCategoria = async function() {
    try {
        const sql = 'select * from tbl_categorias_produtos'

        let result = await prisma.$queryRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

const getProdutos = async function() {
    try {
        const sql = 'select * from tbl_produtos'

        let result = await prisma.$queryRawUnsafe(sql)

        return result
    } catch (error) {
        return false
    }
}

const excluirProduto = async function(id) {
    try {
        let sql = `delete from tbl_produtos where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) return true
        else return false

    } catch (error) {
        return false
    }
}

const excluirCategoria = async function(id) {
    try {
        let sql = `delete from tbl_categorias_produtos where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) return true
        else return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertCategoria,
    insertProduto,
    getId,
    getIdCategoria,
    getCategoria,
    getProdutos,
    excluirProduto,
    excluirCategoria
}