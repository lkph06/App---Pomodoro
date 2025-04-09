let timeLeft = 50 * 60; // 50 minutos em segundos
let timerId = null;
let isWorkMode = false; // Changed to false to start in break mode
let isPaused = false;
const WORK_TIME = 50 * 60; // 50 minutos em segundos
const BREAK_TIME = 10 * 60; // 10 minutos em segundos
const ADD_TIME = 10 * 60; // 10 minutos em segundos

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const modeButton = document.getElementById('mode');
const addTimeButton = document.getElementById('addTime');
const darkModeToggle = document.getElementById('darkModeToggle');
const tickSound = document.getElementById('tickSound');
const alarmSound = document.getElementById('alarmSound');
// const quotesBox = document.querySelector('.quotes-box');
const toggleQuotes = document.querySelector('.toggle-quotes');

// Verifica se há preferência de tema salva
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateDarkModeButton();
}

function updateDarkModeButton() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
}

function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateDarkModeButton();
}

function playTickSound() {
    if (tickSound) {
        tickSound.currentTime = 0;
        tickSound.volume = 0.1; // Volume baixo para o tick
        tickSound.play().catch(e => console.log('Erro ao reproduzir som:', e));
    }
}

function playAlarmSound() {
    if (alarmSound) {
        alarmSound.currentTime = 0;
        alarmSound.volume = 0.5;
        alarmSound.play().catch(e => console.log('Erro ao reproduzir alarme:', e));
    }
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    minutesDisplay.textContent = formattedMinutes;
    secondsDisplay.textContent = formattedSeconds;
    
    // Update page title with current time
    document.title = `${formattedMinutes}:${formattedSeconds} - Pomodoro Timer`;
}

function addTime() {
    timeLeft += ADD_TIME;
    updateDisplay();
}

function toggleTimer() {
    if (timerId === null) {
        // Start timer
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
                playTickSound();
            } else {
                clearInterval(timerId);
                timerId = null;
                document.title = 'Pomodoro Timer';
                playAlarmSound();
                alert('Tempo acabou!');
            }
        }, 1000);
        startButton.textContent = 'Pausar';
        startButton.classList.add('paused');
        addTimeButton.classList.remove('hidden');
        isPaused = false;
    } else {
        // Pause timer
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Iniciar';
        startButton.classList.remove('paused');
        addTimeButton.classList.add('hidden');
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
    addTimeButton.classList.add('hidden');
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
    addTimeButton.classList.add('hidden');
    isPaused = false;
    updateDisplay();
}

startButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
modeButton.addEventListener('click', toggleMode);
addTimeButton.addEventListener('click', addTime);
darkModeToggle.addEventListener('click', toggleDarkMode);

toggleQuotes.addEventListener('click', () => {
    quotesBox.classList.toggle('collapsed');
});

// Inicializa o display
updateDisplay();
modeButton.textContent = `Modo: ${isWorkMode ? 'Trabalho' : 'Descanso'}`;
modeButton.classList.toggle('break-mode', !isWorkMode); 