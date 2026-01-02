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
    const dadosGaleria = [
        { id: '1YEIazrOnmgm6hD-9uHCZE1x2DSOR-htU', titulo: 'Testemunho 1' },
        { id: '1YU7pc6K1Wc6l01OEVfi1p0YzlsUFVtva', titulo: 'Testemunho 2' },
        { id: '1t4FzbmS3mziOXwizn99shYt2L7SoSpy1', titulo: 'Testemunho 3' },
        { id: '1tvIh4RZTzTXSEL2bmTGGquWdGAvul_vo', titulo: 'Testemunho 4' }
    ];

    const sliderInner = document.getElementById('slider-inner');
    const titleElement = document.getElementById('carousel-title');

    // Limpa o conteúdo antes de inserir (evita duplicatas)
    if (sliderInner) sliderInner.innerHTML = '';

    // 2. CRIAR OS SLIDES
    dadosGaleria.forEach((item) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        
        // NOVO FORMATO DE LINK (Mais estável e em alta resolução)
        // O parâmetro =w1000 garante que a imagem venha com boa qualidade
        const urlImagem = `https://lh3.googleusercontent.com/d/${item.id}=w1000`;
        
        slide.style.backgroundImage = `url('${urlImagem}')`;
        sliderInner.appendChild(slide);
    });

    // 3. LOGICA DOS INPUTS
    const inputs = document.querySelectorAll('input[name="slider1"]');
    if (titleElement && dadosGaleria[0]) {
        titleElement.innerText = dadosGaleria[0].titulo;
    }

    inputs.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            if (titleElement) titleElement.innerText = dadosGaleria[index].titulo;
            
            // O movimento deve ser baseado na largura do slide individual
            const deslocamento = index * -25; 
            sliderInner.style.transform = `translateX(${deslocamento}%)`;
        });
    });
});