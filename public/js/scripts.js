document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulated simple authentication logic
    if (username === 'admin' && password === 'password') {
        alert('Login successful!');
        // Redirect to admin dashboard or other protected page
        window.location.href = '/dashboard'; // Update this URL as needed
    } else {
        alert('Invalid username or password');
    }
});
