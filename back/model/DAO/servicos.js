const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const novoServico = async function(novosDados) {
    try {
        let sql = 'INSERT INTO tbl_serviços ('

        const keys = Object.keys(novosDados)
        const values = Object.values(novosDados)
        let placeholders = ``
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
    } catch (error) {

    }
}

module.exports = {
    novoServico
}