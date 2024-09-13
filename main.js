// VARIÁVEIS
let secret_number = getSecretNumber();
let tentativas = 0;
const MAX_TENTATIVAS = 5;  // Definindo o limite de tentativas

// FUNÇÕES
function getSecretNumber() {
    return Math.floor((Math.random() * 10) + 1);
}

function exibeTextoTag(tag, texto) {
    let varTag = document.querySelector(tag);
    varTag.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", { pitch: 1 });
}

function atualizarTentativasRestantes() {
    const tentativasRestantes = MAX_TENTATIVAS - tentativas;
    exibeTextoTag('p', `Tentativas restantes: ${tentativasRestantes}`);
}

function inicializaTexto() {
    exibeTextoTag('h1', 'Vamos testar sua sorte?');
    exibeTextoTag('p', 'Vamos ver se você é bom mesmo, escolha entre 1 e 10');

    // Mostrar o botão "Vamos de novo" desativado na tela inicial
    document.getElementById('reiniciar').style.display = 'block';
    document.getElementById('reiniciar').disabled = true;
    document.getElementById('botao-reiniciar-feliz').style.display = 'none';
    document.getElementById('botao-reiniciar-hack').style.display = 'none';
}

function verificarChute() {
    let guess = document.querySelector('input').value;

    // Desabilitar o input se o número máximo de tentativas for atingido
    if (tentativas >= MAX_TENTATIVAS) {
        document.querySelector('input').disabled = true;
        document.querySelector('.container__botao').style.display = 'none';  // Ocultar o botão "Aposte"
        exibeTextoTag('p', `Você atingiu o número máximo de tentativas (${MAX_TENTATIVAS}). O número secreto era ${secret_number}.`);
        mostrarBotaoReiniciar();  // Mostrar botão de reinício
        return;  // Não permitir mais tentativas
    }



    if (guess == secret_number) {
        document.getElementById('conteudo-jogo').style.display = 'none';
        if (tentativas === 1) {
            document.getElementById('ta-de-hack').style.display = 'block';
            let mensagem = `Você acertou em ${tentativas} tentativa? Tá de hack "né pussivi"!`;
            document.getElementById('mensagem-hack').innerText = mensagem;
        } else {
            document.getElementById('will-feliz').style.display = 'block';
            let mensagem = `Você acertou em ${tentativas} tentativas! Malou zé! Quer ir de novo?`;
            document.getElementById('mensagem-vitoria').innerText = mensagem;
        }
        document.querySelector('input').disabled = true;  // Desabilitar o input após acerto
        mostrarBotaoReiniciar();  // Mostrar botão de reinício
    } else {
        if (guess < secret_number) {
            exibeTextoTag('p', 'Meu Deus como é mula! O número é maior');
        } else {
            exibeTextoTag('p', 'Não pô, o número é menor');
        }
        tentativas++;
        atualizarTentativasRestantes();  // Atualizar o número de tentativas restantes
    }

    limpainput();
}

function limpainput() {
    document.querySelector('input').value = '';
}

function reiniciarJogo() {
    tentativas = 0;
    secret_number = getSecretNumber();
    inicializaTexto();

    // Mostrar a área do jogo e esconder imagens de resultado do jogo
    document.getElementById('conteudo-jogo').style.display = 'block';
    document.getElementById('ta-de-hack').style.display = 'none';
    document.getElementById('will-feliz').style.display = 'none';
    document.querySelector('input').disabled = false;  // Habilitar o input
    limpainput();

    // Mostrar o botão "Aposte" e esconder o botão de reinício
    document.querySelector('.container__botao').style.display = 'block';
    esconderBotaoReiniciar();
    atualizarTentativasRestantes();  // Mostrar tentativas restantes na reinicialização
}

function mostrarBotaoReiniciar() {
    document.getElementById('reiniciar').style.display = 'block';
    document.getElementById('reiniciar').disabled = false;
    document.getElementById('botao-reiniciar-feliz').style.display = 'block';
    document.getElementById('botao-reiniciar-hack').style.display = 'block';
}

function esconderBotaoReiniciar() {
    document.getElementById('reiniciar').style.display = 'none';
    document.getElementById('botao-reiniciar-feliz').style.display = 'none';
    document.getElementById('botao-reiniciar-hack').style.display = 'none';
}

// Adicionar evento ao botão de reinício
document.getElementById('reiniciar').addEventListener('click', reiniciarJogo);
document.getElementById('botao-reiniciar-feliz').addEventListener('click', reiniciarJogo);
document.getElementById('botao-reiniciar-hack').addEventListener('click', reiniciarJogo);

// Inicializar o texto ao carregar a página
window.onload = inicializaTexto;
