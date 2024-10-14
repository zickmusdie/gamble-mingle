// Utility function to display alerts with a smooth animation
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.textContent = message;
    alertDiv.className = `alert ${type}`;
    document.body.appendChild(alertDiv);

    // Auto-remove the alert after 3 seconds
    setTimeout(() => alertDiv.remove(), 3000);
}

// Form submission event for top-up
document.getElementById('topUpForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page refresh

    const gcashNumber = "09651526992"; // Fixed GCash number
    const username = document.getElementById('username').value;
    const gemAmount = document.getElementById('gemAmount').value;

    const button = event.target.querySelector('button');
    button.disabled = true;
    button.textContent = 'Processing...';

    // Simulate payment processing
    setTimeout(() => {
        fetch('/process-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gcashNumber, username, gemAmount }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showAlert(`Payment Successful! ${gemAmount} gems added to ${username}.`, 'success');
                    window.location.href = 'success.html';
                } else {
                    showAlert('Payment failed. Please try again.', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('There was a problem processing the payment.', 'error');
            })
            .finally(() => {
                button.disabled = false;
                button.textContent = 'Proceed to Pay';
            });
    }, 1500); // Simulate 1.5s processing delay
});
