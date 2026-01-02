const footerTemplate = document.createElement('template');

footerTemplate.innerHTML = `
    <style>
        .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #282828;
        padding: 2rem;
    }
    .footer .icon {
        text-align: right;
        margin: 0;
        padding: 0;
    }
    .footer .icon a {
        height: 2rem;
        width: 2rem;
        font-size: 2rem;
        color: #f2f5f7;
        margin-right: .9rem;
    }
    .footer .text {
        font-size: 1.5rem;
        text-align: left;
        letter-spacing: .1rem;
        padding-bottom: 2rem;
    }
    .footer .text p {
        text-transform: none;
        color: #f2f5f7;
        margin-left: .9rem;
    }
    .footer .copyright {
        font-size: 1.2rem;
        color: #f2f5f7;
        font-weight: lighter;
        letter-spacing: .2rem;
        text-align: center;
        text-transform: none;
    }

    @media (min-width: 768px) {

    section {
        padding: 2rem 7%;
    }

    .header {
        padding: 1rem 7%;
    }
    .header .navbar .logo {
        padding: 0;
    }
    .header .navbar .menu-btn {
        display: none;
    }
    .header .navbar ul {
        position: static;
        display: flex;
        align-items: center;
        gap: 2.5rem;
        height: auto;
        width: auto;
        background: transparent;
        list-style: none;
        left: 0;
        top: 0;
        transition: none;
    }
    .header .navbar ul li {
        margin: 0;
        width: auto;
    }
    .header .navbar ul li a {
        font-size: 1.5rem;
        letter-spacing: .1rem;
        color: #282828;
        padding: 8px 15px;
        border-radius: 5px;
        transition: 0.3s ease;
    }
    .header .navbar ul li a:hover,
    .header .navbar ul li a.active {
        background: #820101;
        color: #fff;
    }

    .inicio {
        min-height: calc(100dvh - 10rem);
        margin-top: 10.4rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 7%;
    }
    .inicio .content {
        max-width: 55rem;
        text-align: right;
    }
    .inicio .content h1 {
        font-size: 6rem;
        line-height: 1.15;
    }
    .inicio .content p {
        font-size: 4rem;
        margin-top: 1rem;
    }
    .inicio hr {
        width: 50rem;
        height: .7rem;
        margin: 1.5rem 0 1rem 5.2rem;
    }

    .container .box .content p {
        font-size: 2rem;
        text-align: justify;
    }

    .footer {
        padding: 2rem 7%;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: auto auto;
        column-gap: 2rem;
        align-items: start; /* topo */
    }
    .footer .text {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        text-align: left;
    }
    .footer .text br {
        display: none;
    }
    .footer .text p {
        margin: 0;
        font-size: 1.8rem;
        line-height: 1.6;
        padding-top: 1.2rem;
    }
    .footer .icon {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
    }
    .footer .icon a {
        height: 5rem;
        width: 5rem;
        line-height: 5rem;
        font-size: 2rem;
        color: #f2f5f7;
        border: .1rem solid rgba(117, 117, 117, 0.3);
        border-radius: 50%;
        text-align: center;
    }
    .footer .icon a:hover {
        background-color: #820101;
    }
    .footer .copyright {
        grid-column: 1 / -1;
        grid-row: 2 / 3;
        margin-top: 1.5rem;
        text-align: center;
        font-size: 1.5rem;
        font-weight: lighter;
        letter-spacing: .2rem;
        white-space: nowrap;
    }
}

    </style>
    <footer class="footer">
            <div class="icon">
                <a class="fab fa-whatsapp"></a>
                <a class="fab fa-telegram"></a>
                <a class="fab fa-instagram"></a>
            </div>
            <div class="text">
                <p>Siga-nos nas redes sociais
                    <br>e para mais informações 
                    <br>entre em contato conosco.
                </p>
            </div>
            <div class="copyright">© 2025 - Todos os direitos reservados - <span>Série Mártir</span></div>
        </footer>
`;

class Footer extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        const fontAwesome = document.querySelector('link[href*="font-awesome"]');
        const shadowRoot = this.attachShadow({mode: 'closed'});

        if(fontAwesome){
            shadowRoot.appendChild(fontAwesome.cloneNode());
        }

        shadowRoot.appendChild(footerTemplate.content);
    }
}

customElements.define('footer-component', Footer);