// Efeito da barra de navegação
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Ativação do menu (Mobile)
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', function() {
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'linear-gradient(180deg, #2C3E50 0%, #1a252f 100%)';
        navLinks.style.padding = '1rem';
        navLinks.style.textAlign = 'center';
        navLinks.style.borderTop = '3px solid #FF6B35';
    }
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Fechar menu se tiver aberto (Mobile)
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de Faíscas de Solda
function createSparks() {
    const sparkContainer = document.getElementById('sparkContainer');
    if (!sparkContainer) return;
    
    // Criar faíscas iniciais
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createSpark(sparkContainer);
        }, i * 100);
    }
    
    // Continuamente criar novas faíscas
    setInterval(() => {
        createSpark(sparkContainer);
    }, 200);
}

function createSpark(container) {
    const spark = document.createElement('div');
    spark.classList.add('spark');
    
    // Posição inicial aleatória (centro-inferior)
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight * 0.6 + Math.random() * 100;
    
    // Direção e distância aleatória
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 200;
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance - Math.random() * 150;
    
    // Propriedades CSS para animação
    spark.style.left = startX + 'px';
    spark.style.top = startY + 'px';
    spark.style.setProperty('--spark-x', endX + 'px');
    spark.style.setProperty('--spark-y', endY + 'px');
    
    // Tamanho aleatório
    const size = 2 + Math.random() * 4;
    spark.style.width = size + 'px';
    spark.style.height = size + 'px';
    
    // Variações de cor
    const colors = ['#FF6B35', '#FF8C42', '#FFD700', '#FFA500'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    spark.style.background = color;
    spark.style.boxShadow = `0 0 ${size * 2}px ${size}px ${color}`;
    
    // Duração de animação aleatória
    spark.style.animationDuration = (1 + Math.random() * 1) + 's';
    
    // Atraso aleatório
    spark.style.animationDelay = (Math.random() * 0.5) + 's';
    
    container.appendChild(spark);
    
    // Remover faísca após animação
    setTimeout(() => {
        spark.remove();
    }, 2500);
}

// Iniciar faíscas quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    createSparks();
});

// Animação no Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animação nos cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Animação na galeria
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Animação na aba "contatos"
document.querySelectorAll('.contact-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease ${index * 0.2}s`;
    observer.observe(item);
});

// Formulário de validação (FUTURO)
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// WhatsApp Link
function openWhatsApp() {
    const phone = '5531991024773';
    const message = 'Olá, gostaria de saber mais sobre os serviços da Serralheria Atelier!';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Click event no botão do whatsapp
document.querySelectorAll('.btn-whatsapp').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // href agindo normalmente
    });
});

// Efeito de Faíscas sutis nos botões
function createButtonSparks() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        // Não adicionar efeito em links do menu
        if (btn.closest('.nav-links')) return;
        
        // Criar container de faíscas
        const sparkContainer = document.createElement('div');
        sparkContainer.classList.add('btn-spark-container');
        btn.appendChild(sparkContainer);
        
        let sparkInterval = null;
        
        // Função para criar uma faísca
        function createBtnSpark() {
            const spark = document.createElement('div');
            spark.classList.add('btn-spark');
            
            // Posição aleatória no botão
            const btnRect = btn.getBoundingClientRect();
            const startX = Math.random() * btnRect.width;
            const startY = Math.random() * btnRect.height;
            
            // Direção aleatória (preferencialmente para cima e para os lados)
            const angle = (Math.random() * Math.PI) - Math.PI; // -180° a 0°
            const distance = 20 + Math.random() * 40;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance - Math.random() * 20;
            
            spark.style.left = startX + 'px';
            spark.style.top = startY + 'px';
            spark.style.setProperty('--btn-spark-x', endX + 'px');
            spark.style.setProperty('--btn-spark-y', endY + 'px');
            
            // Variações de cor (tons de solda: dourado, laranja)
            const colors = ['#FFD700', '#FFA500', '#FF8C42', '#FF6B35'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            spark.style.background = color;
            spark.style.boxShadow = `0 0 3px 1px ${color}`;
            
            // Tamanho pequeno e bervariasi
            const size = 2 + Math.random() * 2;
            spark.style.width = size + 'px';
            spark.style.height = size + 'px';
            
            // Duração curta e rápida
            spark.style.animationDuration = (0.4 + Math.random() * 0.3) + 's';
            
            sparkContainer.appendChild(spark);
            
            // Remover faísca após animação
            setTimeout(() => {
                spark.remove();
            }, 700);
        }
        
        // Iniciar faíscas quando mouse entra
        btn.addEventListener('mouseenter', function() {
            // Criar algumas faíscas iniciais
            for (let i = 0; i < 3; i++) {
                setTimeout(createBtnSpark, i * 50);
            }
            
            // Continuar criando faíscas sutis
            sparkInterval = setInterval(() => {
                if (Math.random() > 0.5) { // 50% de chance para manter sutil
                    createBtnSpark();
                }
            }, 150);
        });
        
        // Parar faíscas quando mouse sai
        btn.addEventListener('mouseleave', function() {
            if (sparkInterval) {
                clearInterval(sparkInterval);
                sparkInterval = null;
            }
        });
    });
}

// Iniciar efeito nos botões
document.addEventListener('DOMContentLoaded', function() {
    createButtonSparks();
});

// =========================================
// Cursor Serra Personalizado com Faiscas
// =========================================

// Criar elementos do cursor
function createSawCursor() {
    // Container para faíscas
    const sparkContainer = document.createElement('div');
    sparkContainer.classList.add('cursor-spark-container');
    document.body.appendChild(sparkContainer);
    
    // Elemento da serra
    const sawCursor = document.createElement('div');
    sawCursor.classList.add('cursor-saw');
    
    // Disco central da serra
    const sawDisk = document.createElement('div');
    sawDisk.classList.add('saw-disk');
    
    // Dentes da serra
    const sawTeeth = document.createElement('div');
    sawTeeth.classList.add('saw-teeth');
    
    // Criar 8 dentes
    for (let i = 0; i < 8; i++) {
        const tooth = document.createElement('div');
        tooth.classList.add('saw-tooth');
        sawTeeth.appendChild(tooth);
    }
    
    // Centro da serra
    const sawCenter = document.createElement('div');
    sawCenter.classList.add('saw-center');
    
    // Montar a serra
    sawCursor.appendChild(sawTeeth);
    sawCursor.appendChild(sawDisk);
    sawCursor.appendChild(sawCenter);
    document.body.appendChild(sawCursor);
    
    return { sawCursor, sparkContainer };
}

// Inicializar cursor serra
let sawCursor, sparkContainer;
let isOverButton = false;
let cursorSparkInterval = null;

// Configurar eventos do cursor
function initSawCursor() {
    const elements = createSawCursor();
    sawCursor = elements.sawCursor;
    sparkContainer = elements.sparkContainer;
    
    // Rastrear posição do mouse
    document.addEventListener('mousemove', function(e) {
        if (isOverButton) {
            sawCursor.style.left = e.clientX + 'px';
            sawCursor.style.top = e.clientY + 'px';
        }
    });
    
    // Selecionar botões que devem ativar o cursor
    const targetButtons = document.querySelectorAll('.btn-primary, .btn-whatsapp, .btn-instagram');
    
    targetButtons.forEach(btn => {
        // Adicionar classe para identificar
        btn.classList.add('btn-saw-cursor');
        
        // Ao passar o mouse sobre o botão
        btn.addEventListener('mouseenter', function(e) {
            isOverButton = true;
            sawCursor.classList.add('visible');
            
            // Criar faíscas iniciais
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createCursorSpark(e.clientX, e.clientY);
                }, i * 30);
            }
            
            // Iniciar geração contínua de faíscas
            cursorSparkInterval = setInterval(() => {
                if (isOverButton) {
                    // Obter posição atual do cursor
                    const rect = sawCursor.getBoundingClientRect();
                    createCursorSpark(rect.left + rect.width/2, rect.top + rect.height/2);
                }
            }, 80);
        });
        
        // Ao sair do botão
        btn.addEventListener('mouseleave', function() {
            isOverButton = false;
            sawCursor.classList.remove('visible');
            
            if (cursorSparkInterval) {
                clearInterval(cursorSparkInterval);
                cursorSparkInterval = null;
            }
        });
    });
}

// Criar faísca na posição do cursor
function createCursorSpark(x, y) {
    const spark = document.createElement('div');
    spark.classList.add('cursor-spark');
    
    // Posicionar a faísca
    spark.style.left = x + 'px';
    spark.style.top = y + 'px';
    
    // Direção aleatória
    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 50;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    
    spark.style.setProperty('--spark-dx', dx + 'px');
    spark.style.setProperty('--spark-dy', dy + 'px');
    
    // Cor aleatória (tons de solda)
    const colors = ['#FFD700', '#FFA500', '#FF8C42', '#FF6B35', '#FFFACD'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    spark.style.background = color;
    spark.style.boxShadow = `0 0 6px 2px ${color}`;
    
    // Tamanho variável
    const size = 2 + Math.random() * 3;
    spark.style.width = size + 'px';
    spark.style.height = size + 'px';
    
    // Duração
    spark.style.animationDuration = (0.3 + Math.random() * 0.3) + 's';
    
    sparkContainer.appendChild(spark);
    
    // Remover após animação
    setTimeout(() => {
        spark.remove();
    }, 600);
}

// Iniciar cursor serra quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initSawCursor();
});
