document.getElementById('searchBox').addEventListener('input', function() {
    var searchQuery = this.value.toLowerCase();
    var hotelItems = document.querySelectorAll('.hotel-item');

    hotelItems.forEach(function(item) {
        var hotelName = item.getAttribute('data-name').toLowerCase();
        var hotelLocation = item.getAttribute('data-location').toLowerCase();

        if (hotelName.includes(searchQuery) || hotelLocation.includes(searchQuery)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

function openSidebar() {
    document.getElementById("sidebar").style.width = "250px"; // Define the width of the sidebar
}
  
function closeSidebar() {
    document.getElementById("sidebar").style.width = "0"; // Set the width of the sidebar to 0
}
  
document.getElementById('openSidebarBtn').addEventListener('click', openSidebar);
document.getElementById('closeSidebarBtn').addEventListener('click', closeSidebar);
document.getElementById('closeSidebarBottomBtn').addEventListener('click', closeSidebar);

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.reserve-btn');
    const cartItemsList = document.getElementById('cart-items');
    let cartTotal = 0;
    const cart = []; // Array to hold cart items

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const hotelItem = button.closest('.hotel-item');
            const hotelName = hotelItem.querySelector('.card-title').textContent;
            const hotelLocation = hotelItem.querySelector('.card-text').textContent.split(': ')[1];
            const hotelPriceText = hotelItem.querySelector('.price').textContent;
            const hotelPrice = parseFloat(hotelPriceText.match(/Price: (\d+\.\d+)/)[1]);
            const hotelImage = hotelItem.style.backgroundImage.replace('url("', '').replace('")', ''); // Correctly extracting the image URL

            const cartItem = { name: hotelName, price: hotelPrice, type: "Alojamento", image: hotelImage };
            cart.push(cartItem); // Add item to the cart array

            const cartItemElement = document.createElement('li');
            cartItemElement.innerHTML = `
                <br>
                ${hotelName} - ${hotelLocation}
                <p>${hotelPrice} €</p>
                <button class="btn btn-danger btn-sm remove-item">Remove</button>
            `;
            cartItemsList.appendChild(cartItemElement);

            // Update cart total
            cartTotal += hotelPrice;
            document.getElementById('cart-total').textContent = cartTotal.toFixed(2) + ' €';
        });
    });

    cartItemsList.addEventListener('click', event => {
        if (event.target.classList.contains('remove-item')) {
            const removedItem = event.target.closest('li');
            const removedItemName = removedItem.textContent.split(' - ')[0];

            // Find item in the cart array and remove it
            const index = cart.findIndex(item => item.name === removedItemName);
            if (index !== -1) {
                // Update cart total
                cartTotal -= cart[index].price;
                document.getElementById('cart-total').textContent = cartTotal.toFixed(2) + ' €';

                cart.splice(index, 1);
            }

            removedItem.remove();
        }
    });

    // Event listener for the "Finalizar Compra" button
    document.querySelector('.finalizarCompra').addEventListener('click', () => {
        fetch('/finalizar_compra', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ items: cart }),
        }).then(response => {
            if (response.ok) {
                alert('Compra finalizada com sucesso!');
                cart.length = 0; // Clear the cart array
                cartItemsList.innerHTML = ''; // Clear the cart display
                document.getElementById('cart-total').textContent = '0.00 €';
            } else {
                alert('Ocorreu um erro ao finalizar a compra. Tente novamente.');
            }
        });
    });
});

function openSidebar() {
    document.getElementById("sidebar").style.width = "250px"; // Define the width of the sidebar
    document.getElementById("openSidebarBtn").style.display = "none"; // Hide the "Carrinho" button
}
  
function closeSidebar() {
    document.getElementById("sidebar").style.width = "0"; // Set the width of the sidebar to 0
    document.getElementById("openSidebarBtn").style.display = "block"; // Show the "Carrinho" button
}
