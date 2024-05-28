/** ********************************************* **\
 * Autores: Nicolas Vasconcelos & Emily Crepaldi
 * Versão: 1.0
 \** ******************************************** **/

/**
 * npm install prisma --save (realiza a conexão com o banco)
 * npm install @prisma/client --save (executa os scripts SQL)
 * npx prisma init
 */

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())
    next()

})

const bodyParserJSON = bodyParser.json()

app.use(bodyParserJSON)

/*******  Importando as controllers do projeto  *************/

const controllerUsuario = require('./controller/controller_usuario.js')

/********************************************************** */

app.post('/v2/petshop/usuario', cors(), bodyParserJSON, async(request, response, next) => {
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerUsuario.insertUser(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.get('/v2/petshop/usuario', cors(), async(request, response, next) => {
    let dadosUsuario = await controllerUsuario.selectUser()

    response.status(dadosUsuario.status_code)
    response.json(dadosUsuario)
})


console.log("API funcionando na porta 8080")
app.listen(8080, () => {})