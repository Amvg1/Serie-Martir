const headerTemplate = document.createElement('template');

headerTemplate.innerHTML = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
    .header {
        background: #f2f5f7;
        display: flex;
        align-items: center;
        padding: 0 3rem;
        border-bottom: .1rem solid rgba(117, 117, 117, 0.3);
        position: fixed;
        top: 0; left: 0; right: 0;
        z-index: 1000;
        line-height: 4.5rem;
    }
    .header .navbar {
        display: flex;
        justify-content: space-between;
        width: 100%;
        flex-wrap: wrap;
        align-items: center;
    }
    .header .navbar .logo {
        margin: 0;
        font-size: 2.6rem;
        color: #f2f5f7;
        padding-bottom: .5rem;
    }
    .header .navbar .logo img {
        padding-top: 18px;
    }
    .header .navbar ul {
        position: fixed;
        top: 80px;
        left: -100%;
        background-color: #f2f5f7;
        height: 100vh;
        width: 100%;
        text-align: center;
        display: block;
        transition: all 0.3s ease;
    }
    .header .navbar ul.open {
        left: 0;
        margin-top: .5rem;
    }
    .header .navbar ul li {
        width: 100%;
        margin: 50px 0;
    }
    .header .navbar ul li a {
        font-size: 23px;
        letter-spacing: .1rem;
        color: #282828;
        text-decoration: none;
        padding: 8px 15px;
        border-radius: 5px;
        transition: all 0.3s ease;
    }
    .header .navbar ul li a.active {
        background: none;
        color: #820101;
    }
    .header .navbar .menu-btn i {
        display: block;
        color: #282828;
        cursor: pointer;
        font-size: 20px;
    }
    
    body, html{
        overflow-x: hidden;
        width: 100%;
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
    <header class="header">
            <nav class="navbar">
                <a href="index.html" class="logo">
                    <img src="IMG/logo.png" alt="logo">
                </a>
                <div class="menu-btn">
                    <i class="fas fa-ellipsis-v"></i>
                </div>
                <ul>
                    <li><a href="index.html">Início</a></li>
                    <li><a href="sobre.html">Sobre</a></li>
                    <li><a href="inscricao.html">Inscrições Adultos</a></li>
                    <li><a href="#">Inscrições Desbravadores</a></li>
                    <li><a href="#">Contribuições</a></li>
                    <li><a href="galeria.html">Galeria</a></li>
                </ul>
            </nav>
    </header>
`;

/*class Header extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const shadowRoot = this.attachShadow({mode:'closed'});
        shadowRoot.appendChild(headerTemplate.content);
    }
}

customElements.define('header-component', Header);*/

class Header extends HTMLElement {
    constructor() {
        super();
        // Usamos 'open' para facilitar a depuração, mas o segredo está no encapsulamento
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // 1. Clonar o conteúdo do template (importNode garante que funcione em múltiplas instâncias)
        this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));

        // 2. Selecionar os elementos de dentro do Shadow DOM
        const btn = this.shadowRoot.querySelector('.menu-btn i');
        const menu = this.shadowRoot.querySelector('ul');

        // 3. Adicionar o evento diretamente aqui (Substitui o onclick do HTML)
        if (btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('open');
            });
        }
    }
}

customElements.define('header-component', Header);