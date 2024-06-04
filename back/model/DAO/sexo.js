const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertSexo = async function(dadosSexo) {
    try {
        let sql = `insert into tbl_sexo (nome) values('${dadosSexo.nome}')`

        let resultDados = await prisma.$executeRawUnsafe(sql)

        if (resultDados) return true
        else return false

    } catch (error) {
        return false
    }
}

const getId = async function() {
    try {
        const sql = 'select cast(id as decimal) as id from tbl_sexo order by id desc limit 1'

        let result = await prisma.$queryRawUnsafe(sql)

        if (result) return result
        else return false

    } catch (error) {
        return false
    }
}

const deleteSexo = async function(id) {
    try {
        let sql = `delete from tbl_sexo where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) return true
        else return false

    } catch (error) {
        return false
    }
}

const selectSexo = async function() {
    try {
        let sql = 'select * from tbl_sexo'

        let rsSexo = await prisma.$queryRawUnsafe(sql)

        return rsSexo

    } catch (error) {

    }
}

module.exports = {
    insertSexo,
    getId,
    deleteSexo,
    selectSexo
}