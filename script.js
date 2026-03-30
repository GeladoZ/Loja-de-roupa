
const produtos = [
    { id: 1, nome: "Camiseta Minimalista Branca", preco: 89.90, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" },
    { id: 2, nome: "Jaqueta Bomber Navy", preco: 249.90, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500" },
    { id: 3, nome: "Calça Jeans Slim Fit", preco: 159.90, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500" },
    { id: 4, nome: "Moletom Oversized Gray", preco: 199.00, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
    { id: 5, nome: "Tênis Urban Sport", preco: 299.90, img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500" },
    { id: 6, nome: "Boné Street Black", preco: 59.90, img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500" }
];

let carrinho = [];

function renderizarProdutos() {
    const grid = document.getElementById('produtos-grid');
    grid.innerHTML = produtos.map(p => `
        <div class="card">
            <img src="${p.img}" alt="${p.nome}">
            <div class="card-info">
                <h3>${p.nome}</h3>
                <span class="price">R$ ${p.preco.toFixed(2).replace('.', ',')}</span>
                <button class="btn-add" onclick="adicionar(${p.id})">ADICIONAR AO CARRINHO</button>
            </div>
        </div>
    `).join('');
}

function adicionar(id) {
    const p = produtos.find(item => item.id === id);
    carrinho.push(p);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const container = document.getElementById('itens-carrinho');
    const totalDisplay = document.getElementById('valor-total');
    
    if (carrinho.length === 0) {
        container.innerHTML = '<p class="empty-msg">O carrinho está vazio.</p>';
        totalDisplay.innerText = "R$ 0,00";
        return;
    }

    container.innerHTML = carrinho.map((item, index) => `
        <div class="item-row">
            <span>${item.nome}</span>
            <strong>R$ ${item.preco.toFixed(2)}</strong>
            <button style="border:none; background:none; cursor:pointer;" onclick="remover(${index})">✕</button>
        </div>
    `).join('');

    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    totalDisplay.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function remover(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Funções de Checkout
function abrirCheckout() { document.getElementById('modal-pagamento').style.display = 'block'; }
function fecharCheckout() { document.getElementById('modal-pagamento').style.display = 'none'; }

function finalizarZap() {
    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    const msg = `Olá! Quero finalizar meu pedido:\n${carrinho.map(i => `- ${i.nome}`).join('\n')}\n\nTotal: R$ ${total.toFixed(2)}`;
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`);
}

renderizarProdutos();
