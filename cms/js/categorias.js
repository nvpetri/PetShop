export async function getCategorias() {
    const url = 'http://localhost:8080/v1/petshop/produtos/categorias'

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    return data.categorias
}

export async function postCategoria(categorias) {
    const url = 'http://localhost:8080/v1/petshop/produtos/categorias'
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(categorias),
    }

    const response = await fetch(url, options)

    return response.ok

}

export async function deleteCategoria(id) {
    const url = `http://localhost:8080/v1/petshop/produtos/categoria/${id}`
    const options = {
        method: 'DELETE'
    }

    const response = await fetch(url, options)

    return response.ok

}