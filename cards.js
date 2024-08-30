import * as api from "./api.js";

const CARD_BACK = "https://www.deckofcardsapi.com/static/img/back.png";
const CHANGE_CARDS_MAX = 2;
const MAX_SELECTED_CARDS = 3;

let changeCardsCounter = 0;

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

    if (gameCards && changeCardsCounter < CHANGE_CARDS_MAX) {

        changeCardsCounter += 1;

        const selectedCards = gameCards["cards"].filter(card => card.isSelected);
        const cardsToDraw = selectedCards.length;

        if (cardsToDraw > 0) {

            let cardsReplacement = await api.drawCards(cardsToDraw);

            selectedCards.forEach((card, index) => {
                const cardIndex = gameCards["cards"].findIndex(c => c === card);
                gameCards["cards"][cardIndex] = cardsReplacement.cards[index];
                gameCards["cards"][cardIndex].isSelected = false;
                document.getElementById("cards-container").innerHTML = "";
                displayCards();
            });
        }
    }
}

function displayCards() {

    selectedCards = 0;
    gameCards["cards"].forEach(card => {
        card.isSelected = false;
        const cardElement = document.createElement("img");
        cardElement.src = card["image"];
        document.getElementById("cards-container").appendChild(cardElement);
        cardElement.addEventListener("click", (event) => {
            if (changeCardsCounter < CHANGE_CARDS_MAX) {
                if (event.target.src === card["image"] && selectedCards < MAX_SELECTED_CARDS) {
                    event.target.src = CARD_BACK;
                    card.isSelected = true;
                    selectedCards += 1;
                } else if (event.target.src === CARD_BACK) {
                    event.target.src = card["image"];
                    card.isSelected = false;
                    selectedCards -= 1;
                }
            }
        });
    });
}