export async function getProdutos() {
    const url = 'http://localhost:8080/v1/petshop/produtos'
    
    const response = await fetch(url)
    const data = await response.json()
    
    return data.produtos
}

export async function postProduto (produto) {
    const url = 'http://localhost:8080/v1/petshop/produtos'
    const options = {
        method: 'POST',
        headers: {
            'Content-type':'application/json'
        },
        body: JSON.stringify(produto),
    }

    const response = await fetch (url, options)

    return response.ok

}

export async function deleteProduto (id) {
    const url = `http://localhost:8080/v1/petshop/produtos/deletar/${id}`
    const options = {
        method: 'DELETE'
    }

    const response = await fetch (url, options)

    return response.ok

}