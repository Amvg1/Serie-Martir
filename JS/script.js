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

    // 1. DADOS DOS CARROSSEIS
    const galeria1 = [
        { id: '1YEIazrOnmgm6hD-9uHCZE1x2DSOR-htU', titulo: 'Testemunho 1' },
        { id: '1YU7pc6K1Wc6l01OEVfi1p0YzlsUFVtva', titulo: 'Testemunho 2' },
        { id: '1t4FzbmS3mziOXwizn99shYt2L7SoSpy1', titulo: 'Testemunho 3' },
        { id: '196AAhq_P_BC0zv-69iaR8EnBw4chtluw', titulo: 'Testemunho 4' }
    ];

    const galeria2 = [
        { id: '1YEIazrOnmgm6hD-9uHCZE1x2DSOR-htU', titulo: 'Registro 1' }, // Substitua pelos IDs reais
        { id: '1YU7pc6K1Wc6l01OEVfi1p0YzlsUFVtva', titulo: 'Registro 2' },
        { id: '1t4FzbmS3mziOXwizn99shYt2L7SoSpy1', titulo: 'Registro 3' },
        { id: '196AAhq_P_BC0zv-69iaR8EnBw4chtluw', titulo: 'Registro 4' }
    ];

    // 2. FUNÇÃO REUTILIZÁVEL MELHORADA
    function configurarCarrossel(dados, innerId, titleId, inputName) {
        const sliderInner = document.getElementById(innerId);
        const titleElement = document.getElementById(titleId);
        const inputs = document.querySelectorAll(`input[name="${inputName}"]`);

        if (!sliderInner) {
            console.error(`Erro: Elemento #${innerId} não encontrado!`);
            return;
        }

        // Limpa o container
        sliderInner.innerHTML = '';

        // Cria os slides
        dados.forEach((item, index) => {
            const slide = document.createElement('div');
            // IMPORTANTE: Adicionamos a classe 'slide' que tem o seu CSS
            slide.classList.add('slide');
            slide.classList.add(`slide_${index + 1}`);
            
            // NOVO LINK: Testado e mais estável
            const urlImagem = `https://lh3.googleusercontent.com/u/0/d/${item.id}`;
            
            slide.style.backgroundImage = `url('${urlImagem}')`;
            // Garantimos que o slide apareça
            slide.style.width = "25%"; 
            slide.style.height = "100%";
            
            sliderInner.appendChild(slide);
        });

        // Título Inicial
        if (titleElement) titleElement.innerText = dados[0].titulo;

        // Movimento
        inputs.forEach((radio, index) => {
            radio.addEventListener('change', () => {
                if (titleElement) titleElement.innerText = dados[index].titulo;
                const deslocamento = index * -25;
                sliderInner.style.transform = `translateX(${deslocamento}%)`;
            });
        });
    }

    // 3. INICIALIZAÇÃO (Confira se os IDs batem com o seu HTML!)
    configurarCarrossel(galeria1, 'slider-inner', 'carousel-header', 'slider1');
    configurarCarrossel(galeria2, 'slide-inner2', 'title-registros', 'slider2');
});