// Usuários que podem entrar
const validUsers = {
    'marcos': 'marcos',
    '123': '123',
    'admin': 'admin'
};

const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const loginBtn = document.getElementById('loginBtn');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const forgotPassword = document.getElementById('forgotPassword');
const registerLink = document.getElementById('registerLink');

const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalIcon = document.getElementById('modalIcon');
const modalClose = document.getElementById('modalClose');
const modalButton = document.getElementById('modalButton');

// Funções de MOdal
function showModal(type, title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    
    modalIcon.className = 'modal-icon ' + type;
    
    let iconHTML = '';
    if (type === 'success') {
        iconHTML = '<i data-lucide="check-circle"></i>';
    } else if (type === 'error') {
        iconHTML = '<i data-lucide="alert-circle"></i>';
    } else if (type === 'info') {
        iconHTML = '<i data-lucide="info"></i>';
    }
    
    modalIcon.innerHTML = iconHTML;
    modalOverlay.classList.add('show');
    
    lucide.createIcons();
}

function closeModal() {
    modalOverlay.classList.remove('show');
}

modalClose.addEventListener('click', closeModal);
modalButton.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initCarousel();
});

// Carrousel 
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let autoplayInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    startAutoplay();

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopAutoplay();
            startAutoplay(); 
        });
    });

    const carouselSection = document.querySelector('.carousel-section');
    if (carouselSection) {
        carouselSection.addEventListener('mouseenter', stopAutoplay);
        carouselSection.addEventListener('mouseleave', startAutoplay);
    }
}

togglePassword.addEventListener('click', function() {
    const eyeIcon = this.querySelector('i');
    
    if (passwordInput.getAttribute('type') === 'password') {
        passwordInput.setAttribute('type', 'text');
        eyeIcon.setAttribute('data-lucide', 'eye-off');
    } else {
        passwordInput.setAttribute('type', 'password');
        eyeIcon.setAttribute('data-lucide', 'eye');
    }
    
    lucide.createIcons();
});

usernameInput.addEventListener('input', () => {
    if (usernameInput.value.trim()) {
        usernameInput.classList.remove('error');
        usernameInput.classList.add('success');
        usernameError.classList.remove('show');
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.value) {
        passwordInput.classList.remove('error');
        passwordInput.classList.add('success');
        passwordError.classList.remove('show');
    }
});

function validateForm() {
    let isValid = true;

    if (!usernameInput.value.trim()) {
        usernameInput.classList.add('error');
        usernameError.textContent = 'Por favor, digite seu CPF ou usuário';
        usernameError.classList.add('show');
        isValid = false;
    } else {
        usernameInput.classList.remove('error');
        usernameError.classList.remove('show');
    }

    if (!passwordInput.value) {
        passwordInput.classList.add('error');
        passwordError.textContent = 'Por favor, digite sua senha';
        passwordError.classList.add('show');
        isValid = false;
    } else {
        passwordInput.classList.remove('error');
        passwordError.classList.remove('show');
    }

    return isValid;
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    loginBtn.classList.add('loading');
    loginBtn.disabled = true;

    // Fingir API Call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (validUsers[username] && validUsers[username] === password) {
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
        
        localStorage.setItem('lastUsername', username);

        showModal(
            'success',
            'Login realizado com sucesso!',
            'Bem-vindo ao BancoCaio Empresas. Você será redirecionado para sua área do cliente.'
        );
        
        const resetForm = () => {
            loginForm.reset();
            usernameInput.classList.remove('success');
            passwordInput.classList.remove('success');
        };
        
        const closeHandler = () => {
            resetForm();
            modalButton.removeEventListener('click', closeHandler);
            modalClose.removeEventListener('click', closeHandler);
        };
        
        modalButton.addEventListener('click', closeHandler);
        modalClose.addEventListener('click', closeHandler);
    } else {
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;

        if (!validUsers[username]) {
            usernameInput.classList.add('error');
            usernameError.textContent = 'CPF não encontrado';
            usernameError.classList.add('show');
        } else {
            passwordInput.classList.add('error');
            passwordError.textContent = 'Senha incorreta';
            passwordError.classList.add('show');
        }

        showModal(
            'error',
            'Erro no login',
            'Verifique suas credenciais e tente novamente.'
        );
    }
});

forgotPassword.addEventListener('click', (e) => {
    e.preventDefault();
    showModal(
        'info',
        'Recuperação de Senha',
        'Você receberia um link de recuperação no e-mail cadastrado.'
    );
});

registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    showModal(
        'info',
        'Abertura de Conta',
        'Redirecionamento para Registro...'
    );
});

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !loginBtn.disabled && !modalOverlay.classList.contains('show')) {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
        closeModal();
    }
});

window.addEventListener('load', () => {
    const savedUsername = localStorage.getItem('lastUsername');
    if (savedUsername) {
        usernameInput.value = savedUsername;
    }
});