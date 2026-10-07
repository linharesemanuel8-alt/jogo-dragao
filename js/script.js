document.addEventListener('DOMContentLoaded', () => {
    const personagem = document.getElementById('personagem');
    const potCura = document.getElementById('potCura');
    const potMana = document.getElementById('potMana');
    const escudo = document.getElementById('escudo');
    const bau = document.getElementById('bau');
    const morte = document.querySelector('.morte');
    const vitoria = document.querySelector('.vitoria'); 
    const dragao = document.querySelector('.dragao');

    const itens = [potCura, potMana, escudo];

    let posX = window.innerWidth * 0.07;
    let posY = window.innerHeight * 0.425;
    const velocidade = 18;
    const teclas = {};
    let jogoAcabou = false;


    document.addEventListener("keydown", function(evento){
        if (jogoAcabou) return;

        evento.preventDefault();

        if (evento.key ==="ArrowRight") {
            posX += velocidade;
            personagem.style.transform = 'translate(-50%, -50%) scaleX(1)';
        }
        if (evento.key ==="ArrowLeft") {
            posX -= velocidade;
            personagem.style.transform = 'translate(-50%, -50%) scaleX(-1)';
        }
        if (evento.key ==="ArrowUp") {
            posY -= velocidade;
        }
        if (evento.key ==="ArrowDown") {
            posY += velocidade;
        }
    });

    function testarColisao(elem1, elem2, margem = 45) {

        const img1 = elem1.querySelector('img') || elem1;
        const img2 = elem2.querySelector('img') || elem2;

        const a = img1.getBoundingClientRect();
        const b = img2.getBoundingClientRect();

        return (
            (a.left + margem) < (b.right - margem) &&
            (a.right - margem) > (b.left + margem) &&
            (a.top + margem) < (b.bottom - margem) &&
            (a.bottom - margem) > (b.top + margem)
        );
    }

    function loopJogo() {
        if (jogoAcabou) return;

        let direcaoX = 0;

        if (teclas['ArrowLeft']) {
            posX -= velocidade;
            direcaoX = -1;
        }
        if (teclas['ArrowRight']) {
            posX += velocidade;
            direcaoX = 1;
        }
        if (teclas['ArrowUp']) {
            posY -= velocidade;
        }
        if (teclas['ArrowDown']) {
            posY += velocidade;
        }

        const largura = personagem.offsetWidth;
        const altura = personagem.offsetHeight;

        if (posX < 0) posX = 0;
        if (posX > window.innerWidth - largura + 100) posX = window.innerWidth - largura + 100;
        if (posY < 0) posY = 0;
        if (posY > window.innerHeight - altura + 80) posY = window.innerHeight - altura + 80;

        personagem.style.left = posX + 'px';
        personagem.style.top = posY + 'px';

        itens.forEach((item) => {
            if (item && item.style.visibility != 'hidden' && testarColisao(personagem, item, 45)) {
                item.style.visibility = 'hidden';
            }
        });

        if (bau && bau.style.visibility != 'hidden' && testarColisao(personagem, bau, 45)) {
            jogoAcabou = true;
            bau.style.visibility = 'hidden';
            if (vitoria) vitoria.style.display = 'block';
        }

        if (dragao && testarColisao(personagem, dragao, 110)) {
            jogoAcabou = true;
            if (morte) morte.style.display = 'block';
        }

        requestAnimationFrame(loopJogo);
    }

    const btnReiniciar = document.querySelector('.btnReiniciar');

    const posInicialX = posX;
    const posInicialY = posY;

    function reiniciarJogo() {
        posX = posInicialX;
        posY = posInicialY;
        jogoAcabou = false;

        personagem.style.left = posX + 'px';
        personagem.style.top = posY + 'px';
        personagem.style.transform = 'translate(-50%, -50%) scaleX(1)';

        if (morte) morte.style.display = 'none';
        if (vitoria) vitoria.style.display = 'none';

        if (bau) bau.style.visibility = 'visible';
        itens.forEach(item => {
            if (item) item.style.visibility = 'visible';
        });

        loopJogo();
    }

    if (btnReiniciar) {
        btnReiniciar.addEventListener('click', reiniciarJogo);
    }

    loopJogo();
});