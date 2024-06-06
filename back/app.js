/** ********************************************* **\
 * Autores: Nicolas Vasconcelos & Emily Crepaldi
 * Versão: 1.0
 \** ******************************************** **/

/**
 * npm install express --save
 * npm install cors --save
 * npm install body-parser --save
 * npm install prisma --save (realiza a conexão com o banco)
 * npm install @prisma/client --save (executa os scripts SQL)
 * npx prisma init
 * npx prisma db pull
 * npx prisma generate
 */
/************************************************************************** *\
                    CONFIGURAÇÃO DO AMBIENTE
\*************************************************************************1 */
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

/*******  Importando as controllers do projeto  *****************************/

const controllerUsuario = require('./controller/controller_usuario.js')
const controllerEstoque = require('./controller/controller_estoque.js')
const sexoController = require('./controller/controller_sexo.js')
const controller_funcionario = require('./controller/controller_funcionarios.js')

/************************************************************************** *\
                    ENDPOINTS RELACIONADOS AO USUARIO
\*************************************************************************1 */
app.post('/v1/petshop/usuario', cors(), bodyParserJSON, async(request, response, next) => {
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerUsuario.insertUser(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.get('/v1/petshop/usuario', cors(), async(request, response, next) => {
    let dadosUsuario = await controllerUsuario.selectUser()

    response.status(dadosUsuario.status_code)
    response.json(dadosUsuario)
})

app.post('/v1/petshop/usuario/login', cors(), bodyParserJSON, async(request, response, next) => {
    let contentType = request.headers['content-type']

    let dadosUsuario = request.body

    let validacao = await controllerUsuario.validaUser(dadosUsuario, contentType)

    response.status(validacao.status_code)
    response.json(validacao)
})

/************************************************************************** *\
                    ENDPOINTS RELACIONADOS AO ESTOQUE
\*************************************************************************2 */

app.get('/v1/petshop/produtos', cors(), async(request, response, next) => {
    let dadosProduto = await controllerEstoque.selectProdutos()

    response.status(dadosProduto.status_code)
    response.json(dadosProduto)
})

app.get('/v1/petshop/produtos/categorias', cors(), async(request, response, next) => {
    let dadosCategoria = await controllerEstoque.selectCategorias()

    response.status(dadosCategoria.status_code)
    response.json(dadosCategoria)
})

app.post('/v1/petshop/produtos', cors(), bodyParserJSON, async(request, response, next) => {
    let contentType = request.headers['content-type']

    let dadosProdutos = request.body

    let resultDados = await controllerEstoque.insertProduto(dadosProdutos, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.post('/v1/petshop/produtos/categorias', cors(), bodyParserJSON, async(request, response, next) => {
    let contentType = request.headers['content-type']

    let dadosProdutos = request.body

    let resultDados = await controllerEstoque.insertCategoria(dadosProdutos, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v1/petshop/produtos/deletar/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await controllerEstoque.deletarProduto(id)

    response.status(resultDados.status_code).json(resultDados)
})

app.delete('/v1/petshop/produtos/categoria/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await controllerEstoque.deletarCategoria(id)

    response.status(resultDados.status_code).json(resultDados)
})

/************************************************************************** *\
                    ENDPOINTS RELACIONADOS AO SEXO
\*************************************************************************3 */

app.get('/v1/petshop/sexo', cors(), async(request, response, next) => {
    let dadosSexo = await sexoController.getListarSexos()

    if (dadosSexo) {
        response.status(dadosSexo.status_code).json(dadosSexo)
    } else {
        response.status(404).json({ message: 'Nenhum registro encontrado' })
    }
})

app.post('/v1/petshop/inserirSexo', cors(), bodyParser.json(), async(request, response, next) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await sexoController.setNovoSexo(dadosBody, contentType)

    response.status(resultDados.status_code).json(resultDados)
})

app.delete('/v1/petshop/deletarSexo/:id', cors(), async(request, response, next) => {
    const id = request.params.id

    let resultDados = await sexoController.setExcluirSexo(id)

    response.status(resultDados.status_code).json(resultDados)
})

/************************************************************************** *\
                    ENDPOINTS RELACIONADOS AO FUNCIONARIO   
\*************************************************************************4 */
app.post('/v1/petshop/funcionario', cors(), bodyParserJSON, async(request, response, next) => {
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controller_funcionario.insertFuncionario(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.get('/v1/petshop/funcionario', cors(), async(request, response, next) => {
    let dadosFuncionario = await controller_funcionario.selectFuncionario()

    response.status(dadosFuncionario.status_code)
    response.json(dadosFuncionario)
})

app.post('/v1/petshop/funcionario/login', cors(), bodyParserJSON, async(request, response, next) => {
    let contentType = request.headers['content-type']

    let dadosFuncionario = request.body

    let validacao = await controller_funcionario.validaFuncionario(dadosUsuario, contentType)

    response.status(validacao.status_code)
    response.json(validacao)
})

/*************************************************************************** *\
                    CONFIGURAÇÃO DE PORTA
 \* **************************************************************************/

console.log("API funcionando na porta 8080")
app.listen(8080, () => {})