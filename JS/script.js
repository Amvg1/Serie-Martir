var ul = document.querySelector('nav ul');
var menuBtn = document.querySelector('.menu-btn i');
function menuShow() {
    if (ul.classList.contains('open')) {
        ul.classList.remove('open');
    } else {
        ul.classList.add('open');
    }
}

let didSlideChange = false;
const slider = document.getElementById("slider");
const inner = document.querySelector("#slides .inner");
const slides = document.querySelectorAll(".slide");
const title = document.querySelector(".carousel-title");
const bullets = document.querySelectorAll("#bullets label");

let startX = 0;
let currentX = 0;
let isDragging = false;
let index = 1; // primeiro slide real
let slideWidth = slider.offsetWidth;
let isAnimating = false;

const TRANSITION_TIME = 700; // agora bate com o CSS

/* ---------- UI com timing suave ---------- */
function syncUIWithTiming(targetIndex) {
    const realIndex = (targetIndex - 1 + 4) % 4;

    /* ---------- bullets ---------- */
    bullets.forEach((b, i) => {
        b.style.transition = "transform 0.35s ease, background-color 0.35s ease";
        b.style.transform = i === realIndex ? "scale(1.2)" : "scale(1)";
        b.style.background = i === realIndex ? "#444" : "#ccc";
    });

    /* ---------- legenda (crossfade real) ---------- */
    title.style.opacity = 0;

    setTimeout(() => {
        title.textContent = slides[targetIndex].dataset.title;
        title.style.opacity = 1;
    }, 150); // pequeno atraso perceptível
}


/* ---------- movimento ---------- */
function moveToIndex(animate = true) {
    isAnimating = animate;

    inner.style.transition = animate
        ? "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)"
        : "none";

    inner.style.transform = `translateX(${-index * slideWidth}px)`;
}

/* ---------- swipe ---------- */
slider.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
    inner.style.transition = "none";
}, { passive: true });

slider.addEventListener("touchmove", e => {
    if (!isDragging) return;

    currentX = e.touches[0].clientX;
    const rawDelta = currentX - startX;
    const delta = rawDelta * 0.35;

    inner.style.transform =
        `translateX(${-(index * slideWidth) + delta}px)`;

    // bullets acompanham o swipe
    updateBulletsProgress(rawDelta);
}, { passive: true });

slider.addEventListener("touchend", () => {
    isDragging = false;

    const delta = currentX - startX;
    didSlideChange = false;

    if (delta < -slideWidth / 4) {
        index++;
        didSlideChange = true;
    } 
    else if (delta > slideWidth / 4) {
        index--;
        didSlideChange = true;
    }

    /* SOMENTE se houve troca real */
    if (didSlideChange) {
        syncUIWithTiming(index);
        moveToIndex(true);
    } 
    else {
        /* volta suavemente para o slide atual, sem UI */
        inner.style.transition =
            "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)";
        inner.style.transform =
            `translateX(${-index * slideWidth}px)`;
    }
});

/* ---------- loop infinito invisível ---------- */
inner.addEventListener("transitionend", () => {
    if (!isAnimating) return;

    let jumped = false;

    if (index === slides.length - 1) {
        index = 1;
        jumped = true;
    }

    if (index === 0) {
        index = slides.length - 2;
        jumped = true;
    }

    if (jumped) {
        moveToIndex(false);
    }

    isAnimating = false;
});

/* ---------- resize ---------- */
window.addEventListener("resize", () => {
    slideWidth = slider.offsetWidth;
    moveToIndex(false);
});

/* ---------- init ---------- */
syncUIWithTiming(index);
moveToIndex(true);

function updateBulletsProgress(delta) {
    const progress = Math.min(Math.abs(delta) / slideWidth, 1);
    const direction = delta < 0 ? 1 : -1;

    const current = (index - 1 + 4) % 4;
    const next = (current + direction + 4) % 4;

    bullets.forEach((b, i) => {
        if (i === current) {
            b.style.transform = `scale(${1.2 - 0.2 * progress})`;
            b.style.background = "#444";
        } 
        else if (i === next) {
            b.style.transform = `scale(${1 + 0.2 * progress})`;
            b.style.background = "#444";
        } 
        else {
            b.style.transform = "scale(1)";
            b.style.background = "#ccc";
        }
    });
}