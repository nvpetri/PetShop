import { getCategorias, postCategoria, deleteCategoria} from './categorias.js'


// Função para preencher a tabela com os categorias
async function preencherTabela() {
    const categorias = await getCategorias()
    const categoriasBody = document.getElementById('categoriasBody')

    categorias.forEach(categoria => {
        const tr = document.createElement('tr')

        const idTd = document.createElement('td')
        idTd.textContent = categoria.id
        tr.appendChild(idTd)

        const nomeTd = document.createElement('td')
        nomeTd.textContent = categoria.nome
        tr.appendChild(nomeTd)

        const editarTd = document.createElement('td')
        const editarIcon = document.createElement('i')
        editarIcon.classList.add('fa-solid', 'fa-pen-to-square')
        editarIcon.style.cursor = 'pointer'
        editarIcon.addEventListener('click', () => abrirModalEdicao(categoria)) 
        editarTd.appendChild(editarIcon)
        tr.appendChild(editarTd)

        const excluirTd = document.createElement('td')
        const excluirIcon = document.createElement('i')
        excluirIcon.classList.add('fa-solid', 'fa-trash-can')
        excluirIcon.style.cursor = 'pointer'
        excluirIcon.addEventListener('click', () => excluirCategoria(categoria.id))
        excluirTd.appendChild(excluirIcon)
        tr.appendChild(excluirTd)

        categoriasBody.appendChild(tr)
    })
}

// Função para abrir o modal de edição com os detalhes do categoria preenchidos
function abrirModalEdicao(categoria) {
    const modalEdicao = new bootstrap.Modal(document.getElementById('modalEdicaoCategoria'))
    
    document.getElementById('categoriaId').value = categoria.id
    document.getElementById('nomeEditar').value = categoria.nome
    document.getElementById('descricaoEditar').value = categoria.descricao
       
    modalEdicao.show()
}

// Função para atualizar um categoria
async function atualizarCategoria(event) {
    event.preventDefault() // Impede o envio do formulário
    const form = event.currentTarget

    // Coleta os dados do formulário de edição
    const formData = new FormData(form)
    const categoriaAtualizado = {}
    formData.forEach((value, key) => {
        categoriaAtualizado[key] = value
    })

    // Envia os dados para a API
    const sucesso = await putCategoria(categoriaAtualizado)
    if (sucesso) {
        console.log('categoria atualizado com sucesso!')
        // Fecha o modal de edição após a atualização
        const modalEdicao = bootstrap.Modal.getInstance(document.getElementById('modalEdicaoCategoria'))
        modalEdicao.hide()
        // Atualiza a tabela após a atualização
        location.reload()
    } else {
        console.error('Erro ao atualizar o categoria')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    preencherTabela()

    const btnSalvar = document.getElementById('btnSalvar')
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarNovaCategoria)
    } else {
        console.error('Elemento com ID btnSalvar não encontrado.')
    }

    const formEditarcategoria = document.getElementById('formEditarCategoria')
    if (formEditarcategoria) {
        formEditarcategoria.addEventListener('submit', atualizarCategoria)
    } else {
        console.error('Elemento com ID formEditarcategoria não encontrado.')
    }
})


// Função para salvar um novo categoria
async function salvarNovaCategoria() {
    console.log('Função salvarNovaCategoria() chamada.')
    // Coletar os dados do formulário
    const form = document.getElementById('formNovaCategoria')
    const formData = new FormData(form)
    const novaCategoria = {}
    formData.forEach((value, key) => {
        novaCategoria[key] = value
    })

    console.log('Novo categoria:', novaCategoria)

    // Enviar os dados para a API
    const sucesso = await postCategoria(novaCategoria)
    if (sucesso) {
        console.log('categoria adicionado com sucesso!')
        location.reload()
    } else {
        console.error('Erro ao salvar o categoria')
    }
}

// Função para excluir um categoria
async function excluirCategoria(id) {
    const modalConfirmacao = new bootstrap.Modal(document.getElementById('modalConfirmacaoExclusao'))
    modalConfirmacao.show()

    const btnConfirmarExclusao = document.getElementById('btnConfirmarExclusao')
    btnConfirmarExclusao.addEventListener('click', async () => {
        modalConfirmacao.hide()

        const sucesso = await deleteCategoria(id)
        if (sucesso) {
            console.log('categoria excluído com sucesso!')
            location.reload()
        } else {
            console.error('Erro ao excluir o categoria')
        }
    })
}
