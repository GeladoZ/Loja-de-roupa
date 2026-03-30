const produtos = [
    { id: 1, nome: "Camiseta Minimalista", preco: 89.90, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
    { id: 2, nome: "Jaqueta Bomber", preco: 249.90, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400" },
    { id: 3, nome: "Calça Jeans Slim", preco: 159.90, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400" },
    { id: 4, nome: "Moletom Oversized", preco: 199.00, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
    { id: 5, nome: "Tênis Urban", preco: 299.90, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
    { id: 6, nome: "Boné Street", preco: 59.90, img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400" }
];

let carrinho = [];

// Carrega os produtos na tela
const vitrine = document.getElementById('vitrine');
produtos.forEach(p => {
    vitrine.innerHTML += `
        <div class="card">
            <img src="${p.img}" alt="${p.nome}">
            <div class="card-info">
                <h3>${p.nome}</h3>
                <p class="price">R$ ${p.preco.toFixed(2).replace('.', ',')}</p>
                <button class="btn-add" onclick="adicionar(${p.id})">ADICIONAR</button>
            </div>
        </div>
    `;
});

function adicionar(id) {
    const produto = produtos.find(p => p.id === id);
    carrinho.push(produto);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total-price');
    document.getElementById('cart-count').innerText = carrinho.length;
    
    lista.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco;
        lista.innerHTML += `
            <div class="item-carrinho">
                <span>${item.nome}</span>
                <strong>R$ ${item.preco.toFixed(2)}</strong>
                <button onclick="remover(${index})">x</button>
            </div>
        `;
    });
    totalDisplay.innerText = total.toFixed(2).replace('.', ',');
}

function remover(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function toggleCarrinho() {
    document.getElementById('sidebar-cart').classList.toggle('active');
}

function abrirCheckout() {
    if(carrinho.length === 0) return alert("Carrinho vazio!");
    document.getElementById('payment-modal').style.display = 'flex';
}

function fecharCheckout() {
    document.getElementById('payment-modal').style.display = 'none';
}

function finalizar(metodo) {
    const total = document.getElementById('total-price').innerText;
    if (metodo === 'WhatsApp') {
        let msg = `Pedido Loja de Roupa:\n` + carrinho.map(i => `- ${i.nome}`).join('\n') + `\nTotal: R$ ${total}`;
        window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`);
    } else {
        alert(`Processando pagamento via ${metodo} no valor de R$ ${total}... (Simulação de Checkout Direto)`);
        carrinho = [];
        atualizarCarrinho();
        fecharCheckout();
        alert("Compra realizada com sucesso direto na loja!");
    }
}
