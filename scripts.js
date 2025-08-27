// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');

mobileMenu.addEventListener('click', () => {
    const isExpanded = nav.classList.toggle('active');
    mobileMenu.setAttribute('aria-expanded', isExpanded);
});

// Form Submission
const form = document.getElementById('budget-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Coleta os dados do formulário
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const serviceSelect = document.getElementById('service');
        const serviceValue = serviceSelect.value;
        const serviceText = serviceValue ? serviceSelect.options[serviceSelect.selectedIndex].text : '';
        const message = document.getElementById('message').value;

        // Validação simples dos campos obrigatórios
        if (!name || !email || !phone || !serviceValue) {
            alert('Por favor, preencha todos os campos obrigatórios: Nome, E-mail, Telefone e Tipo de Serviço.');
            return; // Interrompe a execução se a validação falhar
        }
        
        // Número de WhatsApp para onde a mensagem será enviada
        const whatsappNumber = '5569999311586';

        // Monta a mensagem e a codifica para a URL
        const whatsappMessage = `Olá! Gostaria de solicitar um orçamento.\n\n*Nome:* ${name}\n*E-mail:* ${email}\n*Telefone:* ${phone}\n*Serviço:* ${serviceText}\n*Mensagem:* ${message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Cria a URL do WhatsApp e abre em uma nova aba
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        
        form.reset();
    });
}

// Handle "Solicitar agora" buttons in service cards
document.querySelectorAll('.service-card .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        // Find the parent service card
        const card = this.closest('.service-card');

        // Extract service details from the card
        const title = card.querySelector('h3').innerText;
        const price = card.querySelector('.service-price').innerText;
        const duration = card.querySelector('.service-price').nextElementSibling.innerText;

        // WhatsApp number
        const whatsappNumber = '5569999311586';

        // Create the message and encode it for the URL
        const whatsappMessage = `Olá! Tenho interesse no seguinte serviço:\n\n*Serviço:* ${title}\n*Preço:* ${price}\n*${duration}*\n\nGostaria de mais informações para contratar.`;
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Create the WhatsApp URL and open it in a new tab
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            nav.classList.remove('active');
        }
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = document.getElementById(button.getAttribute('aria-controls'));
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        
        button.classList.toggle('active');
        button.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0';
        }
    });
});

// Animation on Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});