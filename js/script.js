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
const strengthMeter = document.getElementById('strengthMeter');
const strengthFill = document.getElementById('strengthFill');
const rememberMe = document.getElementById('rememberMe');
const forgotPassword = document.getElementById('forgotPassword');
const registerLink = document.getElementById('registerLink');

const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalIcon = document.getElementById('modalIcon');
const modalClose = document.getElementById('modalClose');
const modalButton = document.getElementById('modalButton');

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

function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;

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

    setInterval(nextSlide, 5000);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

window.addEventListener('load', () => {
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberMe.checked = true;
    }
});

togglePassword.addEventListener('click', function() {
    if (passwordInput.getAttribute('type') === 'password') {
        passwordInput.setAttribute('type', 'text');
        this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
    } else {
        passwordInput.setAttribute('type', 'password');
        this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    }
});

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    
    if (password.length === 0) {
        strengthMeter.classList.remove('show');
        return;
    }

    strengthMeter.classList.add('show');
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    strengthFill.className = 'strength-meter-fill';
    
    if (strength <= 2) {
        strengthFill.classList.add('strength-weak');
    } else if (strength <= 3) {
        strengthFill.classList.add('strength-medium');
    } else {
        strengthFill.classList.add('strength-strong');
    }
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

    await new Promise(resolve => setTimeout(resolve, 1500));

    if (validUsers[username] && validUsers[username] === password) {
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
        
        if (rememberMe.checked) {
            localStorage.setItem('savedUsername', username);
        } else {
            localStorage.removeItem('savedUsername');
        }

        showModal(
            'success',
            'Login realizado com sucesso!',
            'Bem-vindo ao BancoCaio. Em um sistema real, vce seria redirecionado para sua área do cliente.'
        );
        
        const resetForm = () => {
            loginForm.reset();
            strengthMeter.classList.remove('show');
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
            usernameError.textContent = 'Usuário não encontrado';
            usernameError.classList.add('show');
        } else {
            passwordInput.classList.add('error');
            passwordError.textContent = 'Senha incorreta';
            passwordError.classList.add('show');
        }
    }
});

forgotPassword.addEventListener('click', (e) => {
    e.preventDefault();
    showModal(
        'info',
        'Recuperação de Senha',
        'Em um sistema real, voce receberia instruções por e-mail.'
    );
});

registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    showModal(
        'info',
        'Abertura de Conta',
        'Em um sistema real, você seria direcionado para o formulário de cadastro. Use as credenciais de teste fornecidas para explorar o sistema.'
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