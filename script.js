let carrinho = [];
let total = 0;

function adicionar(id, nome, preco) {
    carrinho.push({ id, nome, preco });
    atualizarCarrinho();
    // Efeito visual simples
    alert(`${nome} adicionado!`);
}

function atualizarCarrinho() {
    const lista = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total-price');
    const countDisplay = document.getElementById('cart-count');
    
    lista.innerHTML = "";
    total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco;
        lista.innerHTML += `
            <div class="item-carrinho">
                <p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>
                <button onclick="remover(${index})">remover</button>
            </div>
        `;
    });

    totalDisplay.innerText = total.toFixed(2).replace('.', ',');
    countDisplay.innerText = carrinho.length;
}

function remover(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function toggleCarrinho() {
    const sidebar = document.getElementById('sidebar-cart');
    sidebar.classList.toggle('active');
}

function finalizarPedido() {
    if (carrinho.length === 0) return alert("Carrinho vazio!");

    let mensagem = "Olá! Gostaria de encomendar:\n\n";
    carrinho.forEach(item => {
        mensagem += `- ${item.nome}: R$ ${item.preco.toFixed(2)}\n`;
    });
    mensagem += `\n*Total: R$ ${total.toFixed(2)}*`;

    const numeroZap = "5511999999999"; // COLOQUE SEU NÚMERO AQUI
    const link = `https://wa.me/${numeroZap}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(link, '_blank');
}
