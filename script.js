let timeLeft = 50 * 60; // 50 minutos em segundos
let timerId = null;
let isWorkMode = false; // Changed to false to start in break mode
const WORK_TIME = 50 * 60; // 50 minutos em segundos
const BREAK_TIME = 10 * 60; // 10 minutos em segundos

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeButton = document.getElementById('mode');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (timerId === null) {
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
    }
}

function pauseTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
}

function toggleMode() {
    isWorkMode = !isWorkMode;
    pauseTimer();
    timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
    modeButton.textContent = `Modo: ${isWorkMode ? 'Trabalho' : 'Descanso'}`;
    modeButton.classList.toggle('break-mode', !isWorkMode);
    updateDisplay();
}

function resetTimer() {
    pauseTimer();
    timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
modeButton.addEventListener('click', toggleMode);

// Inicializa o display
updateDisplay();
modeButton.textContent = `Modo: ${isWorkMode ? 'Trabalho' : 'Descanso'}`;
modeButton.classList.toggle('break-mode', !isWorkMode); 