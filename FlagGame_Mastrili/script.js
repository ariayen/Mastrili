const flags = {
    easy: [
        { name: "Australia", image: "flags/aus.jpg", options: ["Australia", "Canada", "Mexico", "Brazil"] },
        { name: "Brazil", image: "flags/bra.jpg", options: ["Brazil", "Germany", "France", "Italy"] },
        { name: "Canada", image: "flags/canada.jpg", options: ["Canada", "Spain", "Portugal", "Belgium"] },
        { name: "China", image: "flags/china.jpg", options: ["Malaysia", "Spain", "China", "Belgium"] },
        { name: "England", image: "flags/england.jpg", options: ["Brazil", "France", "Portugal", "Australia"] },
        { name: "France", image: "flags/france.jpg", options: ["Canada", "Brazil", "France", "China"] }
    ],
    medium: [
        { name: "Germany", image: "flags/germany.jpg", options: ["Germany", "Italy", "Japan", "Korea"] },
        { name: "Italy", image: "flags/italy.jpg", options: ["Australia", "Turkey", "Italy", "Brazil"] },
        { name: "Japan", image: "flags/japan.jpg", options: ["China", "Korea", "Mexico", "Japan"] },
        { name: "South Korea", image: "flags/kor.jpg", options: ["South Korea", "North Korea", "Japan", "Philippines"] },
        { name: "Philippines", image: "flags/ph.jpg", options: ["Russia", "Canada", "Philippines", "Brazil"] },
        { name: "Sweden", image: "flags/swed.jpg", options: ["Australia", "Sweden", "Mexico", "Brazil"] }
    ],
    hard: [
        { name: "Czech Republic", image: "flags/czec.jpg", options: ["Czech Republic", "Dominican Republic", "Malaysia", "Ireland"] },
        { name: "Spain", image: "flags/spain.jpg", options: ["Italy", "Spain", "Japan", "Korea"] },
        { name: "Sweden", image: "flags/swed.jpg", options: ["Sweden", "Germany", "Italy", "Russia"] },
        { name: "Thailand", image: "flags/thai.jpg", options: ["Thailand", "Philippines", "Malaysia", "Korea"] },
        { name: "Turkey", image: "flags/turkey.jpg", options: ["Turkey", "Italy", "Russia", "Sweden"] },
        { name: "UAE", image: "flags/uae.jpg", options: ["Germany", "Thailand", "UAE", "India"] }
    ]
};

let currentFlagIndex = 0;
let timerInterval;
let time = 0;
let points = 0;
let countdown = 0;

function startGame() {
    currentFlagIndex = 0;
    points = 0;
    time = 0;
    clearInterval(timerInterval);
    countdown = getDifficultyCountdown();
    displayFlag();
    startTimer();
}

function getDifficultyCountdown() {
    const difficulty = document.getElementById("difficulty").value;
    switch (difficulty) {
        case "easy":
            return 30;
        case "medium":
            return 20;
        case "hard":
            return 10;
        default:
            return 30;
    }
}

function displayFlag() {
    const difficulty = document.getElementById("difficulty").value;
    const flag = flags[difficulty][currentFlagIndex];
    document.getElementById("flag-image").src = flag.image;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    flag.options.forEach(option => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "options";
        radio.value = option;
        radio.addEventListener("click", checkGuess);
        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        label.appendChild(document.createElement("br"));
        optionsDiv.appendChild(label);
    });
}

function startTimer() {
    timerInterval = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Game Over. Final Score: " + points);
        } else {
            document.getElementById("time").innerText = countdown;
        }
    }, 1000);
}

function checkGuess() {
    const selectedOption = document.querySelector('input[name="options"]:checked');
    if (!selectedOption) {
        alert("Please select an option.");
        return;
    }

    const guess = selectedOption.value.toLowerCase();
    const correctAnswer = flags[document.getElementById("difficulty").value][currentFlagIndex].name.toLowerCase();

    const messageDiv = document.getElementById("message");
    messageDiv.innerText = guess === correctAnswer ? "Correct!" : "Incorrect!";
    messageDiv.style.color = guess === correctAnswer ? "#008000" : "#FF0000";

    if (guess === correctAnswer) {
        points++;
        document.getElementById("points").innerText = points;
    }

    currentFlagIndex++;
    if (currentFlagIndex < flags[document.getElementById("difficulty").value].length) {
        displayFlag();
    } else {
        clearInterval(timerInterval);
        alert("Game Over! Final Score: " + points);
    }
}

document.getElementById("difficulty").addEventListener("change", startGame);

startGame();
