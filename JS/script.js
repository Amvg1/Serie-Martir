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


        // só anima se o slide REAL mudou
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

    /* --------- TOUCH --------- */
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

    /* --------- LOOP INFINITO --------- */
    inner.addEventListener("transitionend", () => {
        if (index === allSlides.length - 1) index = 1;
        if (index === 0) index = allSlides.length - 2;
        move(false);
        updateBullets();
        updateTitle();
        isAnimating = false;
    });

    /* --------- BULLETS --------- */
    bullets.forEach((b, i) => {
        b.addEventListener("click", () => {
            stopAutoplay();
            index = i + 1;
            move(true);
            updateBullets();
            updateTitle();
        });
    });

    /* --------- SETAS --------- */
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

    /* INIT */
    move(false);
    updateBullets();
    updateTitle();
});

document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("aceite-termos");
    const btnInscricao = document.getElementById("btn-inscricao");
    const etapaFormulario = document.getElementById("etapa-formulario");
    const etapaPagamento = document.getElementById("etapa-pagamento");
    const form = document.getElementById("form-inscricao");

    // Botão começa desabilitado
    btnInscricao.disabled = true;

    // Habilitar botão ao aceitar termos
    checkbox.addEventListener("change", () => {
        btnInscricao.disabled = !checkbox.checked;
    });

    // Clique no botão "Realizar inscrição"
    btnInscricao.addEventListener("click", (e) => {
        e.preventDefault();

        etapaFormulario.style.display = "block";
        etapaFormulario.scrollIntoView({ behavior: "smooth" });
    });

    // Envio do formulário → mostrar pagamento
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Esconde formulário e mostra etapa de pagamento
        etapaFormulario.style.display = "none";
        etapaPagamento.style.display = "block";

        // Descobre a forma de pagamento escolhida
        const pagamentoSelecionado = document.querySelector(
            'input[name="pagamento"]:checked'
        ).value;

        // Esconde todas as opções
        document.querySelectorAll(".pagamento-opcao").forEach(opcao => {
            opcao.style.display = "none";
        });

        // Mostra a opção correta
        if (pagamentoSelecionado === "PIX") {
            document.getElementById("pagamento-pix").style.display = "block";
        } else if (pagamentoSelecionado === "Cartão de crédito") {
            document.getElementById("pagamento-cartao").style.display = "block";
        } else if (pagamentoSelecionado === "Boleto") {
            document.getElementById("pagamento-boleto").style.display = "block";
        }

        etapaPagamento.scrollIntoView({ behavior: "smooth" });
    });
});
