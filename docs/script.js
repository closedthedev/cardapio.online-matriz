const cart = []; // Array para armazenar itens do carrinho

// Função para adicionar um item ao carrinho
function addItem(name, price, quantity) {
    const cartItem = {
        name,
        price,
        quantity: parseInt(quantity) // Converter quantidade para inteiro
    };
    cart.push(cartItem); // Adicionar item ao carrinho
    updateCart(); // Atualizar a exibição do carrinho

    // Mudar a cor do botão e exibir "Adicionado"
    const button = event.target; // Obter o botão clicado
    button.classList.add('added'); // Adicionar classe 'added' ao botão

    // Remover a classe após 2 segundos
    setTimeout(() => {
        button.classList.remove('added'); // Remover classe 'added'
    }, 2000);
}

// Função para atualizar a exibição do carrinho
function updateCart() {
    const cartItems = document.getElementById('cart-items'); // Obter a lista de itens do carrinho
    cartItems.innerHTML = ''; // Limpar a lista antes de atualizá-la

    // Iterar sobre os itens do carrinho e adicioná-los à lista
    cart.forEach(item => {
        const li = document.createElement('li'); // Criar um novo elemento <li>
        li.textContent = `${item.quantity} x ${item.name} - R$ ${item.price * item.quantity}`; // Definir o texto do item
        cartItems.appendChild(li); // Adicionar o item à lista
    });
}

// Função para fechar o modal do carrinho
function closeCartModal() {
    const modal = document.getElementById('cartModal'); // Obter o modal do carrinho
    modal.style.display = 'none'; // Ocultar o modal
}

// Função para abrir o modal do carrinho
function openCartModal() {
    const modal = document.getElementById('cartModal'); // Obter o modal do carrinho
    modal.style.display = 'block'; // Exibir o modal
}

// Função para enviar o pedido via WhatsApp
function sendOrder() {
    // Calcula o valor total do pedido
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Cria a mensagem do pedido incluindo a quantidade, nome, preço e valor total
    const orderText = cart.map(item => `${item.quantity} x ${item.name} - R$ ${item.price * item.quantity}`).join('\n');
    const orderMessage = `${orderText}\nTotal: R$ ${totalPrice.toFixed(2)}`; // Adiciona o valor total ao final da mensagem

    // Cria o URL do WhatsApp com a mensagem
    const whatsappURL = `https://wa.me/+5521966454694?text=${encodeURIComponent(orderMessage)}`;
    
    // Abre o WhatsApp com a mensagem
    window.open(whatsappURL);
}

// Evento de clique no botão "Ver Carrinho"
document.getElementById('cartBtn').addEventListener('click', openCartModal);

// Evento de clique no botão de fechar o modal do carrinho
document.getElementsByClassName('close')[0].addEventListener('click', closeCartModal);
