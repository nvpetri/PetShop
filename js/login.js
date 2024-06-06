import { loginUsuario } from './usuario.js'

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm')

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault()

        const email = loginForm.querySelector('input[type="email"]').value
        const senha = loginForm.querySelector('input[type="password"]').value

        const usuario = {
            email,
            senha
        }

        console.log(usuario)

        const isLoggedIn = await loginUsuario(usuario)

        if (isLoggedIn) {
            localStorage.setItem('isLoggedIn', 'true')
            window.location.href = '../pages/servicos.html'
        } else {
            console.log(isLoggedIn)
            alert('Email ou senha inválidos')
        }
    })
})
