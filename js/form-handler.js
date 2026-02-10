// Contact Form Handler - Mailto Implementation
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;

            // Create mailto link
            const subject = encodeURIComponent(`Portfolio Message from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:puja.mankar.k@gmail.com?subject=${subject}&body=${body}`;

            // Open email client
            window.location.href = mailtoLink;

            // Show success message
            showSuccessMessage();

            // Reset form after a delay
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    }
});

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'form-success-message';
    message.innerHTML = '✓ Opening your email client...<br><small style="font-size: 0.9rem; font-weight: 400; margin-top: 0.5rem; display: block;">Complete the message in your email app.</small>';
    document.body.appendChild(message);

    // Auto-hide after 4 seconds
    setTimeout(() => {
        message.classList.add('fade-out');
        setTimeout(() => {
            message.remove();
        }, 500);
    }, 4000);
}
