export async function getUsuarios() {
    const url = 'http://localhost:8080/v1/petshop/usuario'

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    return data.usuarios
}

export async function postUsuario(usuarios) {
    const url = 'http://localhost:8080/v1/petshop/usuario'
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(usuarios),
    }

    const response = await fetch(url, options)

    return response.ok

}