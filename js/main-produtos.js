import { getProdutos } from './produtos.js';

document.addEventListener('DOMContentLoaded', async () => {
    const productCardsContainer = document.getElementById('product-cards');
    const produtos = await getProdutos();

    if (produtos && produtos.length > 0) {
        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <img src="${produto.foto}" class="card-img-top" alt="${produto.nome}">
                <div class="card-body">
                    <p class="card-text">${produto.nome}</p>
                    <h5 class="card-title">R$ ${produto.valor_unitario.toFixed(2)}</h5>
                </div>
            `;

            productCardsContainer.appendChild(card);
        });
    } else {
        productCardsContainer.innerHTML = '<p>Não há produtos disponíveis no momento.</p>';
    }
});
