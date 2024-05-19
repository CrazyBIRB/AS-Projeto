document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('show-register').addEventListener('click', () => {
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('register-form').classList.remove('hidden');
    });

    document.getElementById('show-login').addEventListener('click', () => {
        document.getElementById('register-form').classList.add('hidden');
        document.getElementById('login-form').classList.remove('hidden');
    });

    document.getElementById('login-button').addEventListener('click', () => {
        // Redirect to the desired page
        window.location.href = '../html/index-registered.html'; // Replace with your target URL
    });
});
