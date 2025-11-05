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
    // Math.random() retorna [0, 1), multiplicamos por 100 para obter [0, 100).
    // Math.floor arredonda para baixo ([0, 99]). Somamos 1 para obter [1, 100].
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

// Inicia o jogo ao carregar o script
initGame();