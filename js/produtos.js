export async function getProdutos() {
    const url = 'http://localhost:8080/v1/petshop/produtos'

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    return data.produtos
}