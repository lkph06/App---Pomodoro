let timeLeft = 50 * 60; // 50 minutos em segundos
let timerId = null;
let isWorkMode = false; // Changed to false to start in break mode
let isPaused = false;
const WORK_TIME = 50 * 60; // 50 minutos em segundos
const BREAK_TIME = 10 * 60; // 10 minutos em segundos

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const modeButton = document.getElementById('mode');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function toggleTimer() {
    if (timerId === null) {
        // Start timer
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timerId);
                timerId = null;
                alert('Tempo acabou!');
            }
        }, 1000);
        startButton.textContent = 'Pausar';
        startButton.classList.add('paused');
        isPaused = false;
    } else {
        // Pause timer
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Iniciar';
        startButton.classList.remove('paused');
        isPaused = true;
    }
}

function toggleMode() {
    isWorkMode = !isWorkMode;
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
    timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
    modeButton.textContent = `Modo: ${isWorkMode ? 'Trabalho' : 'Descanso'}`;
    modeButton.classList.toggle('break-mode', !isWorkMode);
    startButton.textContent = 'Iniciar';
    startButton.classList.remove('paused');
    isPaused = false;
    updateDisplay();
}

function resetTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
    timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
    startButton.textContent = 'Iniciar';
    startButton.classList.remove('paused');
    isPaused = false;
    updateDisplay();
}

startButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
modeButton.addEventListener('click', toggleMode);

// Inicializa o display
updateDisplay();
modeButton.textContent = `Modo: ${isWorkMode ? 'Trabalho' : 'Descanso'}`;
modeButton.classList.toggle('break-mode', !isWorkMode); 