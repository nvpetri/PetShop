import { getProdutos, postProduto, deleteProduto} from './produtos.js'
import { getCategorias } from './categorias.js'

// Função para preencher a tabela com os produtos
async function preencherTabela() {
    const produtos = await getProdutos()
    const produtosBody = document.getElementById('produtosBody')

    produtos.forEach(produto => {
        const tr = document.createElement('tr')

        const idTd = document.createElement('td')
        idTd.textContent = produto.id
        tr.appendChild(idTd)

        const nomeTd = document.createElement('td')
        nomeTd.textContent = produto.nome
        tr.appendChild(nomeTd)

        const editarTd = document.createElement('td')
        const editarIcon = document.createElement('i')
        editarIcon.classList.add('fa-solid', 'fa-pen-to-square')
        editarIcon.style.cursor = 'pointer'
        editarIcon.addEventListener('click', () => abrirModalEdicao(produto))
        editarTd.appendChild(editarIcon)
        tr.appendChild(editarTd)

        const excluirTd = document.createElement('td')
        const excluirIcon = document.createElement('i')
        excluirIcon.classList.add('fa-solid', 'fa-trash-can')
        excluirIcon.style.cursor = 'pointer'
        excluirIcon.addEventListener('click', () => excluirProduto(produto.id))
        excluirTd.appendChild(excluirIcon)
        tr.appendChild(excluirTd)

        produtosBody.appendChild(tr)
    })
}

// Função para abrir o modal de edição com os detalhes do produto preenchidos
async function abrirModalEdicao(produto) {
    console.log("produto:", produto)

    document.getElementById('produtoId').value = produto.id
    document.getElementById('nomeEditar').value = produto.nome
    document.getElementById('descricaoEditar').value = produto.descricao
    document.getElementById('quantidadeEditar').value = produto.quantidade
    document.getElementById('fotoEditar').value = produto.foto
    document.getElementById('valor_unitarioEditar').value = produto.valor_unitario

    // Preencher as opções de classificação antes de abrir o modal
    await preencherOpcoesCategoriaEditar(produto)

    // Verificar se a classificação do produto está sendo acessada corretamente
    console.log("ID da classificação selecionada:", produto.id_categoria)

    // Exibir a classificação do produto selecionada
    const idCategoriaSelecionada = produto.id_categoria // Supondo que a classificação seja a primeira da lista
    console.log("ID da classificação selecionada:", idCategoriaSelecionada)
    document.getElementById('categoriaEditar').value = idCategoriaSelecionada

    modalEdicao.show()
}

async function preencherOpcoesCategoriaEditar() {
    const classificacoes = await getCategorias()
    const selectCategoria = document.getElementById('categoriaEditar')
    selectCategoria.innerHTML = '' // Limpa quaisquer opções anteriores

    classificacoes.forEach(categoria => {
        const option = document.createElement('option')
        option.value = categoria.id
        option.textContent = categoria.nome
        selectCategoria.appendChild(option)
    })
}

document.addEventListener('DOMContentLoaded', async () => {
    preencherTabela()

    const btnSalvar = document.getElementById('btnSalvar')
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarNovoProduto)
    } else {
        console.error('Elemento com ID btnSalvar não encontrado.')
    }

    const formEditarproduto = document.getElementById('formEditarproduto')
    if (formEditarproduto) {
        formEditarproduto.addEventListener('submit', atualizarProduto)
    } else {
        console.error('Elemento com ID formEditarproduto não encontrado.')
    }

    // Preencher as opções de classificação quando o documento for carregado
    await preencherOpcoesCategoria()
})


async function preencherOpcoesCategoria() {
    const classificacoes = await getCategorias()
    const selectCategoria = document.getElementById('categoria')
    selectCategoria.innerHTML = '' // Limpa quaisquer opções anteriores
    classificacoes.forEach(categoria => {
        const option = document.createElement('option')
        option.value = categoria.id
        option.textContent = categoria.nome
        selectCategoria.appendChild(option)
    })
}


async function salvarNovoProduto() {
    // Coletar os dados do formulário
    const form = document.getElementById('formNovoProduto')
    const formData = new FormData(form)
    const novoProduto = {}
    formData.forEach((value, key) => {
        novoProduto[key] = value
    })


    // Obter o ID da classificação selecionada
    const idCategoriaSelecionada = formData.get('id_categoria')
    novoProduto['id_categoria'] = idCategoriaSelecionada


    // Enviar os dados para a API
    const sucesso = await postProduto(novoProduto)
    if (sucesso) {
        console.log('produto adicionado com sucesso!')
        location.reload()
    } else {
        console.error('Erro ao salvar o produto')
    }
}

// Função para excluir um produto
async function excluirProduto(id) {
    const modalConfirmacao = new bootstrap.Modal(document.getElementById('modalConfirmacaoExclusao'))
    modalConfirmacao.show()

    const btnConfirmarExclusao = document.getElementById('btnConfirmarExclusao')
    btnConfirmarExclusao.addEventListener('click', async () => {
        modalConfirmacao.hide()

        const sucesso = await deleteProduto(id)
        if (sucesso) {
            console.log('produto excluído com sucesso!')
            location.reload()
        } else {
            console.error('Erro ao excluir o produto')
        }
    })
}
