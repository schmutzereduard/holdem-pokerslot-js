import * as cardActions from './cards.js';
import * as api from './api.js';

let gameStarted = false;
let deck;
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
    betButton.textContent = "Bet";
    form.appendChild(betButton);

    form.appendChild(document.createElement("br"));

    const button = document.createElement("button");
    button.textContent = "Change cards";
    document.getElementById("controls-container").appendChild(button);
    button.addEventListener("click", cardActions.changeCards);
    form.addEventListener("submit", (event) => {

        event.preventDefault();
        if (gameStarted)
            return;

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
}

async function start() {

    gameStarted = true;
    deck = await api.shuffleDeck();
    cardActions.dealPlayerCards();
    cardActions.dealGameCards();
    cardActions.changeCards();
}

export default controls;