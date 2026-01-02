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