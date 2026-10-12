
const startBtn = document.querySelector("#startBtn");
const timeInput = document.querySelector("#timeInput");
const timerText = document.querySelector("#timer");
const gameArea = document.querySelector("#gameArea");
const scoreText = document.querySelector("#score");


let timeLeft = 0;
let score = 0;
let timerInterval;
let gameStarted = false;

function createFigure() {
    gameArea.innerHTML = "";

    const figure = document.createElement("div");

    let size = Math.floor(Math.random() * 31) + 10;

    let colors = ["red", "lime", "blue", "yellow", "orange", "purple", "pink", "cyan"];
    let color = colors[Math.floor(Math.random() * colors.length)];

    let shapes = ["circle", "square", "triangle"];
    let shape = shapes[Math.floor(Math.random() * shapes.length)];

    figure.style.position = "absolute";

    if (shape == "triangle") {
        figure.style.width = "0";
        figure.style.height = "0";
        figure.style.borderLeft = size / 2 + "px solid transparent";
        figure.style.borderRight = size / 2 + "px solid transparent";
        figure.style.borderBottom = size + "px solid " + color;
    } else {
        figure.style.width = size + "px";
        figure.style.height = size + "px";
        figure.style.background = color;

        if (shape == "circle") {
            figure.style.borderRadius = "50%";
        }
    }

    figure.style.left = Math.random() * (gameArea.clientWidth - size - 6) + "px";
    figure.style.top = Math.random() * (gameArea.clientHeight - size - 6) + "px";

    gameArea.appendChild(figure);

  figure.addEventListener("click", function () {
    if (gameStarted && timeLeft > 0) {
        score++;
        scoreText.textContent = score;

        createFigure();
    }
});
}

startBtn.addEventListener("click", function () {
    let time = Number(timeInput.value);

    if (timeInput.value == "" || time < 1 || !Number.isFinite(time)) {
        alert("Укажите время больше 0!");
        return;
    }

    clearInterval(timerInterval);

    gameArea.innerHTML = "";

  timeLeft = Math.floor(time);
timerText.textContent = timeLeft;

score = 0;
scoreText.textContent = score;

gameStarted = true;

    createFigure();

    timerInterval = setInterval(function () {
        timeLeft--;

        timerText.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);

            gameStarted = false;
            gameArea.innerHTML = "";
            timerText.textContent = "00";
        }
    }, 1000);
});