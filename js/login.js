import { loginUsuario } from './usuario.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        const usuario = {
            email,
            password
        };

        const isLoggedIn = await loginUsuario(usuario);

        if (isLoggedIn) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '../pages/servicos.html';
        } else {
            alert('Email ou senha inválidos');
        }
    });
});
