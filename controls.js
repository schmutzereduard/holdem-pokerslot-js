import * as cardActions from './cards.js';
import * as api from './api.js';

let gameStarted = false;
let funds = 50;
let bet = 0;

const controls = () => {

    const form = document.createElement("form");
    document.getElementById("controls-container").appendChild(form);

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
            bet += betValue;
            funds -= bet;
            document.getElementById("funds-value").textContent = funds + "$";
            start();
        }
    });

    const changeButton = document.createElement("button");
    changeButton.setAttribute("id", "change-button");
    changeButton.textContent = "Change cards";
    document.getElementById("controls-container").appendChild(changeButton);
    changeButton.addEventListener("click", cardActions.changeCards);

    const finishButton = document.createElement("button");
    finishButton.setAttribute("id", "finish-button");
    finishButton.textContent = "End game";
    document.getElementById("controls-container").appendChild(finishButton);
    finishButton.addEventListener("click", () => {

    
    });

    updateControls();
}

async function start() {

    gameStarted = true;
    updateControls();
    await api.shuffleDeck();
    cardActions.dealPlayerCards();
    cardActions.dealGameCards();
}

async function end() {

    gameStarted = false;
    updateControls();
    await api.shuffleDeck();
}

function updateControls() {

    const betButton = document.getElementById("bet-button");
    betButton.style.visibility = gameStarted ? "hidden" : "visible";

    const changeButton = document.getElementById("change-button");
    changeButton.style.visibility = gameStarted ? "visible" : "hidden";

    const finishButton = document.getElementById(("finish-button"));
    finishButton.style.visibility = gameStarted ? "visible" : "hidden";
}

export default controls;