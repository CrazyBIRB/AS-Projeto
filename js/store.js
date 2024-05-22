
function openSidebar() {
    document.getElementById("sidebar").style.width = "250px"; // Define a largura do sidebar
  }
  
  // Função para fechar o sidebar
  function closeSidebar() {
    document.getElementById("sidebar").style.width = "0"; // Define a largura do sidebar para 0
  }
  
  // Event listeners para os botões
  document.getElementById('openSidebarBtn').addEventListener('click', openSidebar);
  document.getElementById('closeSidebarBtn').addEventListener('click', closeSidebar);


  document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.btn');
    const cartItemsList = document.getElementById('cart-items');
    let cartTotal = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            const productName = product.querySelector('h2').textContent;
            const productPrice = parseFloat(product.querySelector('.price').textContent.slice(0));

            // For simplicity, I'm using an array here:
            const cartItem = { name: productName, price: productPrice };
            // You can also add more properties like quantity, product ID, etc.

            // Update the cart total price by adding the price of the selected product
            cartTotal += productPrice;

            // Display the cart item in the sidebar
            const cartItemElement = document.createElement('li');
            cartItemElement.innerHTML = `
                ${productName} - ${productPrice.toFixed(2)} €
                <button class="remove-item">Remove</button>
            `;
            cartItemsList.appendChild(cartItemElement);

            // Update the total price display
            document.getElementById('cart-total').textContent = `${cartTotal.toFixed(2)} €`;
        });
    });

    // Add event listener for removing items from the cart
    cartItemsList.addEventListener('click', event => {
        if (event.target.classList.contains('remove-item')) {
            const removedItem = event.target.closest('li');
            const removedPrice = parseFloat(removedItem.textContent.split(' - ')[1].slice(0));
            cartTotal -= removedPrice;

            // Remove the item from the cart
            removedItem.remove();

            // Update the total price display
            document.getElementById('cart-total').textContent = `${cartTotal.toFixed(2)}€`;
        }
    });
});