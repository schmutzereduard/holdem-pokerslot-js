import * as cardActions from './cards.js';
import * as api from './api.js';

let gameStarted = false;
let funds = 50;
let bet = 0;
let round = 0;

const controls = () => {

    const form = document.createElement("form");
    document.getElementById("controls-container").appendChild(form);

    const controlsHeader = document.createElement("h2");
    controlsHeader.textContent = "Controls";
    form.appendChild(controlsHeader);

    const roundHeader = document.createElement("h2");
    roundHeader.setAttribute("id", "round-number");
    const cardsSection = document.getElementById("cards-section");
    cardsSection.insertBefore(roundHeader, cardsSection.firstChild);

    const fundsLabel = document.createElement("label");
    fundsLabel.textContent = "Funds: ";
    form.appendChild(fundsLabel);

    const fundsValue = document.createElement("span");
    fundsValue.textContent = funds + "$";
    fundsValue.setAttribute("id", "funds-value");
    form.appendChild(fundsValue);

    form.appendChild(document.createElement("br"));

    const betLabel = document.createElement("label");
    betLabel.textContent = "Bet: ";
    form.appendChild(betLabel);

    const betInput = document.createElement("input");
    betInput.setAttribute("type", "number");
    betInput.setAttribute("id", "bet-value");
    form.appendChild(betInput);

    const betButton = document.createElement("button");
    betButton.setAttribute("id", "bet-button");
    betButton.textContent = "Bet";
    form.appendChild(betButton);

    form.appendChild(document.createElement("br"));

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        let betValue = event.target.elements["bet-value"].value;
        if (!betValue) {
            alert("Please insert a bet !");
        } else if (betValue > funds) {
            alert("Inssuficient funds!");
        } else {
            bet = betValue;
            funds -= bet;
            start();
        }
    });

    const changeButton = document.createElement("button");
    changeButton.setAttribute("id", "change-button");
    changeButton.textContent = "Change cards";
    document.getElementById("controls-container").appendChild(changeButton);
    changeButton.addEventListener("click", async () => {
        const anyCards = await cardActions.changeCards();
        if (anyCards)
            round++;
        updateControls();
    });

    const endButton = document.createElement("button");
    endButton.setAttribute("id", "end-button");
    endButton.textContent = "End game";
    document.getElementById("controls-container").appendChild(endButton);
    endButton.addEventListener("click", () => {

        end();
    });

    updateControls();
}

async function start() {

    gameStarted = true;
    round++;
    updateControls();
    await api.shuffleDeck();
    cardActions.dealPlayerCards();
    cardActions.dealGameCards();
}

async function end() {

    gameStarted = false;
    round = 0;
    updateControls();
    await api.shuffleDeck();
    document.getElementById("game-cards-container").innerHTML = "";
    document.getElementById("player-cards-container").innerHTML = "";
    document.getElementById("round-number").textContent = "";
}

function updateControls() {

    if (gameStarted) {
        document.getElementById("funds-value").textContent = funds + "$";
        document.getElementById("round-number").textContent = "Round " + round;
    }

    const betValue = document.getElementById("bet-value");
    betValue.disabled = gameStarted ? true : false;

    const betButton = document.getElementById("bet-button");
    betButton.style.visibility = gameStarted ? "hidden" : "visible";

    const changeButton = document.getElementById("change-button");
    changeButton.style.visibility = gameStarted ? "visible" : "hidden";

    const finishButton = document.getElementById(("end-button"));
    finishButton.style.visibility = gameStarted ? "visible" : "hidden";

    if (round === 3)
        end();
}

export default controls;