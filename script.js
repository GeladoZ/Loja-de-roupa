const produtos = [
    { id: 1, nome: "Camiseta Minimalista", preco: 89.90, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" },
    { id: 2, nome: "Jaqueta Bomber Navy", preco: 249.90, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500" },
    { id: 3, nome: "Calça Jeans Slim Fit", preco: 159.90, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500" },
    { id: 4, nome: "Moletom Oversized", preco: 199.00, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
    { id: 5, nome: "Tênis Urban Sport", preco: 299.90, img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500" },
    { id: 6, nome: "Boné Streetwear", preco: 59.90, img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500" }
];

let carrinho = [];

function init() {
    const grid = document.getElementById('grid-produtos');
    grid.innerHTML = produtos.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.nome}">
            <div class="product-info">
                <h3>${p.nome}</h3>
                <span class="price-tag">R$ ${p.preco.toFixed(2).replace('.', ',')}</span>
                <button class="add-btn" onclick="addToCart(${p.id})">ADICIONAR</button>
            </div>
        </div>
    `).join('');
}

function addToCart(id) {
    const p = produtos.find(item => item.id === id);
    carrinho.push(p);
    updateUI();
    if(!document.getElementById('cart-sidebar').classList.contains('open')) toggleCart();
}

function updateUI() {
    document.getElementById('cart-count').innerText = carrinho.length;
    const container = document.getElementById('cart-items-container');
    const totalElem = document.getElementById('total-value');

    if(carrinho.length === 0) {
        container.innerHTML = '<p class="empty-text">Seu carrinho está vazio.</p>';
        totalElem.innerText = "R$ 0,00";
        return;
    }

    container.innerHTML = carrinho.map((item, index) => `
        <div class="cart-item">
            <span>${item.nome}</span>
            <strong>R$ ${item.preco.toFixed(2)}</strong>
            <button onclick="removeItem(${index})" style="background:none; border:none; cursor:pointer;">✕</button>
        </div>
    `).join('');

    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    totalElem.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function removeItem(index) {
    carrinho.splice(index, 1);
    updateUI();
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
}

function checkoutZap() {
    if(carrinho.length === 0) return alert("Adicione itens primeiro!");
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    const texto = `Pedido Loja de Roupa:\n${carrinho.map(i => `- ${i.nome}`).join('\n')}\nTotal: R$ ${total.toFixed(2)}`;
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(texto)}`);
}

init();




