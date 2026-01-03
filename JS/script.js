// menu
var ul = document.querySelector('nav ul');
var menuBtn = document.querySelector('.menu-btn i');
function menuShow() {
    if (ul.classList.contains('open')) {
        ul.classList.remove('open');
        document.body.classList.remove('no-scroll'); // libera scroll
    } else {
        ul.classList.add('open');
        document.body.classList.add('no-scroll'); // bloqueia scroll
    }
}

// carrossel
document.querySelectorAll(".carousel-card").forEach(card => {

    let didSlideChange = false;
    const slider = card.querySelector(".slider");
    const inner = card.querySelector(".inner");
    const slides = card.querySelectorAll(".slide");
    const title = card.querySelector(".carousel-title");
    const bullets = card.querySelectorAll(".bullets label");
    const radios = slider.querySelectorAll('input[type="radio"]');

    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let index = 1;
    let slideWidth = slider.offsetWidth;
    let isAnimating = false;

    function syncUIWithTiming(targetIndex) {
        const realIndex = (targetIndex - 1 + 4) % 4;

        // Atualiza bullets
        bullets.forEach((b, i) => {
            b.style.transform = i === realIndex ? "scale(1.2)" : "scale(1)";
            b.style.background = i === realIndex ? "#444" : "#ccc";
        });

        // Atualiza título apenas se for diferente
        const newText = slides[targetIndex].dataset.title;
        if (title.textContent !== newText) {
            title.style.opacity = 0;
            setTimeout(() => {
                title.textContent = newText;
                title.style.opacity = 1;
            }, 150);
        }
    }

    function moveToIndex(animate = true) {
        isAnimating = animate;
        inner.style.transition = animate
            ? "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)"
            : "none";
        inner.style.transform = `translateX(${-index * slideWidth}px)`;
    }

    function updateBulletsProgress(delta) {
        const progress = Math.min(Math.abs(delta) / slideWidth, 1);
        const direction = delta < 0 ? 1 : -1;
        const current = (index - 1 + 4) % 4;
        const next = (current + direction + 4) % 4;

        bullets.forEach((b, i) => {
            if (i === current) {
                b.style.transform = `scale(${1.2 - 0.2 * progress})`;
                b.style.background = "#444";
            } else if (i === next) {
                b.style.transform = `scale(${1 + 0.2 * progress})`;
                b.style.background = "#444";
            } else {
                b.style.transform = "scale(1)";
                b.style.background = "#ccc";
            }
        });
    }

    slider.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        inner.style.transition = "none";
    }, { passive: true });

    slider.addEventListener("touchmove", e => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const delta = (currentX - startX) * 0.35;
        inner.style.transform = `translateX(${-(index * slideWidth) + delta}px)`;
        updateBulletsProgress(currentX - startX);
    }, { passive: true });

    slider.addEventListener("touchend", () => {
        isDragging = false;
        const delta = currentX - startX;

        if (delta < -slideWidth / 4) index++;
        else if (delta > slideWidth / 4) index--;

        syncUIWithTiming(index);
        moveToIndex(true);
    });

    inner.addEventListener("transitionend", () => {
        if (index === slides.length - 1) index = 1;
        if (index === 0) index = slides.length - 2;
        moveToIndex(false);
        radios[index - 1].checked = true;
        syncUIWithTiming(index);
    });

    bullets.forEach((bullet, i) => {
        bullet.addEventListener("click", () => {
            index = i + 1;
            radios.forEach(r => r.checked = false);
            radios[i].checked = true;
            syncUIWithTiming(index);
            moveToIndex(true);
        });
    });

    syncUIWithTiming(index);
    moveToIndex(true);
});

/* Lógica para carrossel (teste) */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Dados dos Carrosséis (Mantenha a ordem desejada aqui)
    const galeriaTestemunhos = [
        { id: '1YEIazrOnmgm6hD-9uHCZE1x2DSOR-htU', titulo: 'Testemunho 1' },
        { id: '1YU7pc6K1Wc6l01OEVfi1p0YzlsUFVtva', titulo: 'Testemunho 2' },
        { id: '1t4FzbmS3mziOXwizn99shYt2L7SoSpy1', titulo: 'Testemunho 3' },
        { id: '196AAhq_P_BC0zv-69iaR8EnBw4chtluw', titulo: 'Testemunho 4' }
    ];

    // Exemplo de segunda galeria (Edite os IDs quando tiver)
    const galeriaEventos = [
        { id: 'ID_FOTO_1', titulo: 'Evento 1' },
        { id: 'ID_FOTO_2', titulo: 'Evento 2' },
        { id: 'ID_FOTO_3', titulo: 'Evento 3' },
        { id: 'ID_FOTO_4', titulo: 'Evento 4' }
    ];

    // 2. Função de Configuração
    function configurarCarrossel(dados, innerId, headerId, inputName) {
        const sliderInner = document.getElementById(innerId);
        const headerTitle = document.getElementById(headerId);
        const inputs = document.querySelectorAll(`input[name="${inputName}"]`);

        if (!sliderInner) return;

        // LIMPEZA: Remove as divs estáticas do HTML para não duplicar ou bugar a ordem
        sliderInner.innerHTML = '';

        // INJEÇÃO: Cria as fotos na ordem do Array
        dados.forEach((item, index) => {
            const slideDiv = document.createElement('div');
            // Mantém suas classes originais para o CSS funcionar
            slideDiv.className = `slide slide_${index + 1}`; 
            
            const imgUrl = `https://lh3.googleusercontent.com/d/${item.id}=w1000`;
            
            slideDiv.style.backgroundImage = `url('${imgUrl}')`;
            slideDiv.setAttribute('data-title', item.titulo);
            
            sliderInner.appendChild(slideDiv);
        });

        // TÍTULO INICIAL: Pega o título da primeira foto da lista
        if (headerTitle) headerTitle.innerText = dados[0].titulo;

        // CONTROLE: Sincroniza o clique com a mudança de título e posição
        inputs.forEach((input, index) => {
            input.addEventListener('change', () => {
                if (headerTitle) headerTitle.innerText = dados[index].titulo;
                
                // Move o container (25% para 4 slides)
                const deslocamento = index * -25;
                sliderInner.style.transform = `translateX(${deslocamento}%)`;
            });
        });
    }

    // 3. Inicialização (Repita para cada seção da sua página)
    configurarCarrossel(galeriaTestemunhos, 'slider-inner', 'carousel-header', 'slider1');
    // configurarCarrossel(galeriaEventos, 'slider-inner-2', 'carousel-header-2', 'slider2');
});