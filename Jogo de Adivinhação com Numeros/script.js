// Variáveis globais de controle do jogo
let secretNumber;
const MAX_ATTEMPTS = 3; 
let attemptsLeft;
let gameActive = false; 

// Referências aos elementos do HTML (DOM)
const inputElement = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const messageElement = document.getElementById('message-display');
const attemptsElement = document.getElementById('attempts-left');
const resetButton = document.getElementById('reset-button');


/**
 * Inicializa um novo jogo: gera o número secreto e reseta as tentativas.
 */
function initGame() {
    // 1. Define as tentativas restantes e o estado do jogo
    attemptsLeft = MAX_ATTEMPTS;
    gameActive = true;
    
    // 2. GERAÇÃO DO NÚMERO SECRETO (entre 1 e 100)
    secretNumber = Math.floor(Math.random() * 100) + 1;
    
    // 3. Atualiza a exibição de tentativas restantes e limpa mensagens
    attemptsElement.textContent = attemptsLeft;
    messageElement.textContent = 'Insira seu primeiro palpite.';
    
    // 4. Reinicia o estado dos controles
    inputElement.value = ''; // Limpa o input
    inputElement.disabled = false;
    guessButton.disabled = false;
    resetButton.style.display = 'none';

    // Para fins de depuração
    console.log("Número secreto gerado para teste:", secretNumber); 
}

/**
 * Função para encerrar o jogo, bloqueando inputs e mostrando o botão de reset.
 * @param {string} message - A mensagem final a ser exibida.
 */
function endGame(message) {
    gameActive = false;
    inputElement.disabled = true;
    guessButton.disabled = true;
    resetButton.style.display = 'block';
    messageElement.textContent = message;
}

/**
 * Lida com a entrada do jogador, valida e compara com o número secreto.
 */
function checkGuess() {
    // 1. Verifica se o jogo está ativo
    if (!gameActive) {
        return;
    }

    // 2. Captura e converte o palpite. 
    const guess = parseInt(inputElement.value);

    // 3. Validação do palpite
    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageElement.textContent = 'ERRO: Por favor, insira um número válido entre 1 e 100.';
        return; // Sai da função sem contar a tentativa
    }

    // 4. Compara o palpite com o número secreto
    if (guess === secretNumber) {
        // VITÓRIA
        endGame(`Parabéns! Você acertou! O número secreto era ${secretNumber}.`);
    } else {
        // Dica
        attemptsLeft--; // Decrementa a tentativa
        attemptsElement.textContent = attemptsLeft;

        // Verifica se ainda há tentativas
        if (attemptsLeft === 0) {
            // DERROTA
            endGame(`Você perdeu! O número secreto era ${secretNumber}.`);
        } else {
            // Dá a dica
            const hint = (guess < secretNumber) ? 'MAIOR' : 'MENOR';
            messageElement.textContent = `Seu palpite (${guess}) está incorreto. O número secreto é ${hint}.`;
        }
    }

    // Limpa o input para o próximo palpite
    inputElement.value = ''; 
    inputElement.focus(); // Coloca o cursor de volta no campo
}

// ----------------------------------------------------
// Anexando os Listeners de Eventos (Obrigatório para o jogo funcionar)
// ----------------------------------------------------

// 1. Botão "Chutar"
guessButton.addEventListener('click', checkGuess);

// 2. Botão "Jogar Novamente"
resetButton.addEventListener('click', initGame);

// 3. Permite chutar pressionando 'Enter' no campo de input
inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkGuess();
    }
});


// Inicia o jogo ao carregar o script
initGame();