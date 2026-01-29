// menu
var ul = document.querySelector('nav ul');
var menuBtn = document.querySelector('.menu-btn i');
function menuShow() {
    if (ul.classList.contains('open')) {
        ul.classList.remove('open');
        document.body.classList.remove('no-scroll');
    } else {
        ul.classList.add('open');
        document.body.classList.add('no-scroll');
    }
}

// carrossel
document.querySelectorAll(".carousel-card").forEach(card => {
    const slider = card.querySelector(".slider");
    const inner = card.querySelector(".inner");
    const allSlides = card.querySelectorAll(".slide");
    const title = card.querySelector(".carousel-title");
    const bullets = card.querySelectorAll(".bullets label");

    const realSlidesCount = bullets.length;
    let index = 1;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let isAnimating = false;

    const isMissoes = card.closest(".missoes");
    let autoplayInterval = null;

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    if (isMissoes) {
        autoplayInterval = setInterval(() => {
            if (isDragging || isAnimating) return;
            index++;
            move(true);
            updateBullets();
            updateTitle();
        }, 8000);
    }

    function slideWidth() {
        return slider.offsetWidth;
    }

    function normalize(i) {
        return (i - 1 + realSlidesCount) % realSlidesCount;
    }

    let lastTitleIndex = null;

    function updateTitle() {
        const realIndex = normalize(index);
        const newText = allSlides[index].dataset.title || "";

        if (lastTitleIndex !== realIndex) {
            title.style.opacity = 0;

            setTimeout(() => {
                title.textContent = newText;
                title.style.opacity = 1;
            }, 150);

            lastTitleIndex = realIndex;
        }
    }

    function updateBullets() {
        const real = normalize(index);
        bullets.forEach((b, i) => {
            const active = i === real;
            b.style.transform = active ? "scale(1.2)" : "scale(1)";
            b.style.background = active ? "#444" : "#ccc";
        });
    }

    function move(animate = true) {
        isAnimating = animate;
        inner.style.transition = animate
            ? "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)"
            : "none";
        inner.style.transform = `translateX(${-index * slideWidth()}px)`;
    }

    slider.addEventListener("touchstart", e => {
        stopAutoplay();
        startX = e.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        inner.style.transition = "none";
    }, { passive: true });

    slider.addEventListener("touchmove", e => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const delta = (currentX - startX) * 0.35;
        inner.style.transform =
            `translateX(${-(index * slideWidth()) + delta}px)`;
    }, { passive: true });

    slider.addEventListener("touchend", () => {
        isDragging = false;
        const delta = currentX - startX;

        if (delta < -slideWidth() / 4) index++;
        else if (delta > slideWidth() / 4) index--;

        move(true);
        updateBullets();
        updateTitle();
    });

    inner.addEventListener("transitionend", () => {
        if (index === allSlides.length - 1) index = 1;
        if (index === 0) index = allSlides.length - 2;
        move(false);
        updateBullets();
        updateTitle();
        isAnimating = false;
    });

    bullets.forEach((b, i) => {
        b.addEventListener("click", () => {
            stopAutoplay();
            index = i + 1;
            move(true);
            updateBullets();
            updateTitle();
        });
    });

    const left = card.querySelector(".carousel-arrow.left");
    const right = card.querySelector(".carousel-arrow.right");

    left?.addEventListener("click", () => {
        stopAutoplay();
        if (isAnimating) return;
        index--;
        move(true);
        updateBullets();
        updateTitle();
    });

    right?.addEventListener("click", () => {
        stopAutoplay();
        if (isAnimating) return;
        index++;
        move(true);
        updateBullets();
        updateTitle();
    });

    move(false);
    updateBullets();
    updateTitle();
});


document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".termos-toggle");
    const accordion = document.querySelector(".termos-accordion");

    if (toggle && accordion) {
        toggle.addEventListener("click", () => {
            accordion.classList.toggle("ativo");
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("aceite-termos");
    const btnInscricao = document.getElementById("btn-inscricao");

    btnInscricao.disabled = true;

    checkbox.addEventListener("change", () => {
        btnInscricao.disabled = !checkbox.checked;
    });

    btnInscricao.addEventListener("click", (e) => {
        e.preventDefault();

        if (!checkbox.checked) return;

        window.open(
            "https://forms.gle/KgvdPqASqyxni4Ho9",
            "_blank"
        );
    });
});

// ===== Controle estável de vídeos (Testemunhos) ===== 
document.querySelectorAll('.testemunhos .slide').forEach(slide => { 
    const iframe = slide.querySelector('iframe'); 
    if (!iframe) return; 
    
    const baseSrc = iframe.src; 
    // Tap inicia o vídeo 
    slide.addEventListener('click', () => {
        iframe.classList.add('ativo');

        if (!iframe.src.includes('autoplay=1')) {
            iframe.src = baseSrc + '&autoplay=1';
        }
    }); 
}); 

// Sempre que o carrossel mover → parar vídeos 
document.querySelectorAll('.testemunhos .slider').forEach(slider => { 
    slider.addEventListener('touchstart', () => { 
        document.querySelectorAll('.testemunhos iframe').forEach(iframe => { 
            iframe.src = iframe.src.split('&autoplay')[0]; 
        }); 
    }, { passive: true }); 
}); 

// ===== Parar vídeos ao trocar slide (desktop e mobile) ===== 
function stopAllTestemunhosVideos() {
    document.querySelectorAll('.testemunhos iframe').forEach(iframe => {
        iframe.src = iframe.src.split('&autoplay')[0];
        iframe.classList.remove('ativo'); // 🔑 devolve swipe ao carrossel
    });
}

// Setas (desktop) 
document.querySelectorAll('.testemunhos .carousel-arrow').forEach(arrow => { 
    arrow.addEventListener('click', stopAllTestemunhosVideos); 
}); 

// Bullets 
document.querySelectorAll('.testemunhos .bullets label').forEach(bullet => { 
    bullet.addEventListener('click', stopAllTestemunhosVideos); 
});