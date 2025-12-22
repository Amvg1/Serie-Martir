const footerTemplate = document.createElement('template');

footerTemplate.innerHTML = `
    <style>
        .footer {
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