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

    allSlides.forEach(slide => {
        slide.addEventListener("click", () => {
            stopAutoplay();
        });
    });

    function stopAllCarouselVideos(card) {
        card.querySelectorAll("video").forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
    }

    if (isMissoes) {
        autoplayInterval = setInterval(() => {
            if (isDragging || isAnimating) return;
            stopAllCarouselVideos(card);
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

        stopAllCarouselVideos(card);

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
            stopAllCarouselVideos(card);
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
        stopAllCarouselVideos(card);
        index--;
        move(true);
        updateBullets();
        updateTitle();
    });

    right?.addEventListener("click", () => {
        stopAutoplay();
        if (isAnimating) return;
        stopAllCarouselVideos(card);
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
            "_blank", "noopener noreferrer"
        );
    });
});




// ===================================================
// CONTROLE ÚNICO E ESTÁVEL DE VÍDEOS (TESTEMUNHOS)
// ===================================================

// YouTube API helpers
function ytPlay(iframe) {
    iframe.contentWindow.postMessage(JSON.stringify({
        event: "command",
        func: "playVideo",
        args: []
    }), "*");
}

function ytPause(iframe) {
    iframe.contentWindow.postMessage(JSON.stringify({
        event: "command",
        func: "pauseVideo",
        args: []
    }), "*");
}

// Pausa todos os vídeos (SEM reset)
function stopAllTestemunhosVideos() {
    document.querySelectorAll('.testemunhos iframe').forEach(iframe => {
        ytPause(iframe);
    });

    document.querySelectorAll('.testemunhos .video-overlay').forEach(o => {
        o.classList.remove('hidden');
    });

    document.querySelectorAll('.testemunhos .slide').forEach(slide => {
        slide.dataset.playing = "false";
    });
}

// Controle play / pause por overlay
document.querySelectorAll('.testemunhos .slide').forEach(slide => {
    const iframe = slide.querySelector('iframe');
    const overlay = slide.querySelector('.video-overlay');
    if (!iframe || !overlay) return;

    slide.dataset.playing = "false";

    overlay.addEventListener('click', e => {
        e.stopPropagation();

        const playing = slide.dataset.playing === "true";

        if (!playing) {
            stopAllTestemunhosVideos();
            ytPlay(iframe);
            overlay.classList.add('hidden');
            slide.dataset.playing = "true";
        } else {
            ytPause(iframe);
            overlay.classList.remove('hidden');
            slide.dataset.playing = "false";
        }
    });
});

// Swipe → pausa (SEM piscar)
document.querySelectorAll('.testemunhos .slider').forEach(slider => {
    slider.addEventListener('touchstart', stopAllTestemunhosVideos, { passive: true });
});

// Setas
document.querySelectorAll('.testemunhos .carousel-arrow').forEach(btn => {
    btn.addEventListener('click', stopAllTestemunhosVideos);
});

// Bullets
document.querySelectorAll('.testemunhos .bullets label').forEach(bullet => {
    bullet.addEventListener('click', stopAllTestemunhosVideos);
});
