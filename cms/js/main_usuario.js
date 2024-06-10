import { getUsuarios, postUsuario } from './usuarios.js'
import { getSexos } from './sexo.js'

// Função para preencher a tabela com os Usuarios
async function preencherTabela() {
    const usuarios = await getUsuarios()
    const usuariosBody = document.getElementById('usuariosBody')

    usuarios.forEach(usuario => {
        const tr = document.createElement('tr')

        const idTd = document.createElement('td')
        idTd.textContent = usuario.id
        tr.appendChild(idTd)

        const nomeTd = document.createElement('td')
        nomeTd.textContent = usuario.nome
        tr.appendChild(nomeTd)

        const editarTd = document.createElement('td')
        const editarIcon = document.createElement('i')
        editarIcon.classList.add('fa-solid', 'fa-pen-to-square')
        editarIcon.style.cursor = 'pointer'
        editarIcon.addEventListener('click', () => abrirModalEdicao(usuario))
        editarTd.appendChild(editarIcon)
        tr.appendChild(editarTd)

        const excluirTd = document.createElement('td')
        const excluirIcon = document.createElement('i')
        excluirIcon.classList.add('fa-solid', 'fa-trash-can')
        excluirIcon.style.cursor = 'pointer'
        excluirIcon.addEventListener('click', () => excluirUsuario(usuario.id))
        excluirTd.appendChild(excluirIcon)
        tr.appendChild(excluirTd)

        usuariosBody.appendChild(tr)
    })
}

// Função para abrir o modal de edição com os detalhes do Usuario preenchidos
async function abrirModalEdicao(usuario) {
    console.log("Usuario:", usuario)
    const modalEdicao = new bootstrap.Modal(document.getElementById('modalEdicaoUsuario'))

    document.getElementById('usuarioId').value = usuario.id
    document.getElementById('nomeEditar').value = usuario.nome
    document.getElementById('emailEditar').value = usuario.email
    document.getElementById('senhaEditar').value = usuario.senha
    document.getElementById('telefoneEditar').value = usuario.telefone
    
    // Preencher as opções de sexo antes de abrir o modal
    await preencherOpcoesSexoEditar(usuario)

    // Verificar se a sexo do Usuario está sendo acessada corretamente
    console.log("ID da sexo selecionada:", usuario.id_sexo)

    // Exibir a sexo do Usuario selecionada
    const idSexoSelecionado = usuario.id_sexo // Supondo que a sexo seja a primeira da lista
    console.log("ID da sexo selecionada:", idSexoSelecionado)
    document.getElementById('sexoEditar').value = idSexoSelecionado

    modalEdicao.show()
}

async function preencherOpcoesSexoEditar() {
    const sexos = await getSexos()
    const selectSexo = document.getElementById('sexoEditar')
    selectSexo.innerHTML = '' // Limpa quaisquer opções anteriores

    sexos.forEach(sexo => {
        const option = document.createElement('option')
        option.value = sexo.id
        option.textContent = sexo.nome
        selectSexo.appendChild(option)
    })
}


// Função para atualizar um Usuario
async function atualizarSexo(event) {
    event.preventDefault() // Impede o envio do formulário
    const form = event.currentTarget

    // Coleta os dados do formulário de edição
    const formData = new FormData(form)
    const usuarioAtualizado = {}
    formData.forEach((value, key) => {
        usuarioAtualizado[key] = value
    })

    // Verificar os dados do Usuario atualizado
    console.log('Dados do Usuario atualizado:', usuarioAtualizado)

    // Envia os dados para a API
    const sucesso = await putUsuario(usuarioAtualizado)
    if (sucesso) {
        console.log('Usuario atualizado com sucesso!')
        // Fecha o modal de edição após a atualização
        const modalEdicao = bootstrap.Modal.getInstance(document.getElementById('modalEdicaoUsuario'))
        modalEdicao.hide()
        // Atualiza a tabela após a atualização
        location.reload()
    } else {
        console.error('Erro ao atualizar o Usuario')
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    preencherTabela()

    const btnSalvar = document.getElementById('btnSalvar')
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarNovoUsuario)
    } else {
        console.error('Elemento com ID btnSalvar não encontrado.')
    }

    const formEditarUsuario = document.getElementById('formEditarUsuario')
    if (formEditarUsuario) {
        formEditarUsuario.addEventListener('submit', atualizarSexo)
    } else {
        console.error('Elemento com ID formEditarUsuario não encontrado.')
    }

    // Preencher as opções de sexo quando o documento for carregado
    await preencherOpcoesSexo()
})


async function preencherOpcoesSexo() {
    const sexos = await getSexos()
    console.log('Sexos retornados:', sexos) // Adicionando o console.log aqui
    const selectSexo = document.getElementById('sexo')
    selectSexo.innerHTML = '' // Limpa quaisquer opções anteriores
    sexos.forEach(sexo => {
        const option = document.createElement('option')
        option.value = sexo.id
        option.textContent = sexo.nome
        selectSexo.appendChild(option)
    })
}



async function salvarNovoUsuario() {
    // Coletar os dados do formulário
    const form = document.getElementById('formNovoUsuario')
    const formData = new FormData(form)
    const novoUsuario = {}
    formData.forEach((value, key) => {
        novoUsuario[key] = value
    })
    
    // Obter o ID da sexo selecionada
    const idSexoSelecionado = formData.get('id_sexo')
    novoUsuario['id_sexo'] = idSexoSelecionado


    // Enviar os dados para a API
    const sucesso = await postUsuario(novoUsuario)
    if (sucesso) {
        console.log('Usuario adicionado com sucesso!')
        location.reload()
    } else {
        console.error('Erro ao salvar o Usuario')
    }
}

// Função para excluir um Usuario
async function excluirUsuario(id) {
    const modalConfirmacao = new bootstrap.Modal(document.getElementById('modalConfirmacaoExclusao'))
    modalConfirmacao.show()

    const btnConfirmarExclusao = document.getElementById('btnConfirmarExclusao')
    btnConfirmarExclusao.addEventListener('click', async () => {
        modalConfirmacao.hide()

        const sucesso = await deleteUsuario(id)
        if (sucesso) {
            console.log('Usuario excluído com sucesso!')
            location.reload()
        } else {
            console.error('Erro ao excluir o Usuario')
        }
    })
}
