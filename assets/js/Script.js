// Aguarda o documento HTML ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {

    // Função que anima o contador
    const animateCounter = (element) => {
        const goal = parseInt(element.dataset.goal, 10);
        // Pega o prefixo e o sufixo dos atributos data-*. Se não existirem, usa uma string vazia.
        const prefix = element.dataset.prefix || '';
        const suffix = element.dataset.suffix || '';

        const duration = 2000; // 2 segundos para a animação
        const stepTime = 20; // Atualiza a cada 20ms
        const totalSteps = duration / stepTime;
        const increment = goal / totalSteps;
        
        let currentNumber = 0;

        const timer = setInterval(() => {
            currentNumber += increment;

            if (currentNumber >= goal) {
                clearInterval(timer);
                // Monta o texto final com prefixo + número + sufixo
                element.innerText = prefix + goal.toLocaleString('pt-BR') + suffix;
            } else {
                // Monta o texto durante a animação com prefixo + número + sufixo
                element.innerText = prefix + Math.ceil(currentNumber).toLocaleString('pt-BR') + suffix;
            }
        }, stepTime);
    };

    // O "Vigia" que observa a seção
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se a seção estiver visível na tela
            if (entry.isIntersecting) {
                // Seleciona todos os contadores e inicia a animação para cada um
                const counters = document.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    // Adiciona uma verificação para não animar novamente
                    if (!counter.hasAttribute('data-animated')) {
                        animateCounter(counter);
                        counter.setAttribute('data-animated', 'true');
                    }
                });
                // Para de observar depois que a animação começou para todos os contadores
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