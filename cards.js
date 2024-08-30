import * as api from "./api.js";
import { MAX_CARDS_CHANGE, MAX_CARDS_TO_CHANGE, CARD_BACK_URL } from "./constants.js";

let cardsChangeCounter = 0;
let gameCards;
let playerCards;
let selectedCards;

export async function dealGameCards() {

    gameCards = await api.drawCards(5);
    displayCards();
}

export async function dealPlayerCards() {

    playerCards = await api.drawCards(2)

    playerCards["cards"].forEach(card => {
        const cardElement = document.createElement("img");
        cardElement.src = card["image"];
        document.getElementById("player-cards-container").appendChild(cardElement);
    });
}

export async function changeCards() {

    const selectedCards = gameCards["cards"].filter(card => card.isSelected);
    const cardsToDraw = selectedCards.length;

    if (cardsToDraw > 0 && cardsChangeCounter < MAX_CARDS_CHANGE) {

        cardsChangeCounter += 1;
        let cardsReplacement = await api.drawCards(cardsToDraw);

        selectedCards.forEach((card, index) => {
            const cardIndex = gameCards["cards"].findIndex(c => c === card);
            gameCards["cards"][cardIndex] = cardsReplacement.cards[index];
            gameCards["cards"][cardIndex].isSelected = false;
            document.getElementById("game-cards-container").innerHTML = "";
            displayCards();
        });
    }
}

function displayCards() {

    selectedCards = 0;
    gameCards["cards"].forEach(card => {
        card.isSelected = false;
        const cardElement = document.createElement("img");
        cardElement.src = card["image"];
        document.getElementById("game-cards-container").appendChild(cardElement);
        cardElement.addEventListener("click", (event) => {
            if (cardsChangeCounter < MAX_CARDS_CHANGE) {
                if (event.target.src === card["image"] && selectedCards < MAX_CARDS_TO_CHANGE) {
                    event.target.src = CARD_BACK_URL;
                    card.isSelected = true;
                    selectedCards += 1;
                } else if (event.target.src === CARD_BACK_URL) {
                    event.target.src = card["image"];
                    card.isSelected = false;
                    selectedCards -= 1;
                }
            }
        });
    });
}