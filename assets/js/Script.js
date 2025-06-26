// Aguarda o documento HTML ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {

    // ==============================================
    // =     CÓDIGO PARA O MENU SANDUÍCHE           =
    // ==============================================
    const menuHamburguer = document.querySelector('.menu-hamburguer');
    const navMenu = document.querySelector('.header-nav');
    const navLinks = document.querySelectorAll('.header-nav a');

    // Função que abre ou fecha o menu
    function toggleMenu() {
        menuHamburguer.classList.toggle('menu-aberto');
        navMenu.classList.toggle('menu-aberto');
    }

    // Adiciona o evento de clique ao botão do hambúrguer
    if (menuHamburguer) {
        menuHamburguer.addEventListener('click', toggleMenu);
    }

    // Fecha o menu quando um link é clicado
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('menu-aberto')) {
                toggleMenu();
            }
        });
    });


    // ==============================================
    // =     CÓDIGO PARA O CONTADOR ANIMADO         =
    // ==============================================
    // (Seu código original continua aqui)

    // Função que anima o contador
    const animateCounter = (element) => {
        const goal = parseInt(element.dataset.goal, 10);
        const prefix = element.dataset.prefix || '';
        const suffix = element.dataset.suffix || '';
        const duration = 2000;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = goal / totalSteps;
        let currentNumber = 0;

        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= goal) {
                clearInterval(timer);
                element.innerText = prefix + goal.toLocaleString('pt-BR') + suffix;
            } else {
                element.innerText = prefix + Math.ceil(currentNumber).toLocaleString('pt-BR') + suffix;
            }
        }, stepTime);
    };

    // O "Vigia" que observa a seção
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = document.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    if (!counter.hasAttribute('data-animated')) {
                        animateCounter(counter);
                        counter.setAttribute('data-animated', 'true');
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // A animação começa quando 50% da seção estiver visível
    });

    // Pede ao vigia para observar a nossa seção de resultados
    const resultsSection = document.querySelector('.results-section');
    if (resultsSection) {
        observer.observe(resultsSection);
    }

});