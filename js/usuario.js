export async function loginUsuario(usuario) {
    const url = 'http://localhost:8080/v1/petshop/usuario/login';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    };

    const response = await fetch(url, options)
    console.log(response)
    return response.ok;
}
