// Exemplo básico de validação
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        const username = form.querySelector('#register-username').value;
        const password = form.querySelector('#register-password').value;

        if (!username || !password) {
            event.preventDefault();
            alert('Please fill in all fields.');
        }
    });
});
