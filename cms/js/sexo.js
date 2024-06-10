export async function getSexos() {
    const url = 'http://localhost:8080/v1/petshop/sexo'

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    return data.sexo
}
