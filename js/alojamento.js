function adicionarAoCarrinho() {
    const tipoAlojamento = document.getElementById('tipo-alojamento').value;
    const dataInicio = document.getElementById('data-inicio').value;
    const dataFim = document.getElementById('data-fim').value;

    if (!dataInicio || !dataFim) {
        alert('Por favor, selecione as datas de início e fim.');
        return;
    }

    const itemCarrinho = `Alojamento: ${tipoAlojamento}, De: ${dataInicio}, Até: ${dataFim}`;
    const listaCarrinho = document.getElementById('lista-carrinho');
    
    const li = document.createElement('li');
    li.className = "list-group-item";
    li.textContent = itemCarrinho;
    listaCarrinho.appendChild(li);

    alert('Item adicionado ao carrinho!');
}

function finalizarCompra() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    if (listaCarrinho.children.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
    }

    alert('Compra finalizada com sucesso!');
    listaCarrinho.innerHTML = ''; // Limpa o carrinho após finalizar a compra
}
