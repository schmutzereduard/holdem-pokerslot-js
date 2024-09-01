import * as api from "./api.js";
import { MAX_CARDS_CHANGE, MAX_CARDS_TO_CHANGE, CARD_BACK_URL } from "./constants.js";
import { HIGH_CARD, ONE_PAIR, TWO_PAIR, THREE_OF_A_KIND, STRAIGHT, FLUSH, FULL_HOUSE, FOUR_OF_A_KIND, STRAIGHT_FLUSH, ROYAL_FLUSH } from "./constants.js";

let cardsChangeCounter = 0;
let gameCards;
let playerCards;
let selectedCards;

export async function dealGameCards() {

    cardsChangeCounter = 0;
    gameCards = await api.drawCards(5);
    displayCards("game-cards-container");
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
            displayCards("game-cards-container");
        });

        return true;
    }

    return false;
}

function displayCards(container) {

    selectedCards = 0;
    let cardsToDisplay = "game-cards-container" === container ? gameCards["cards"] : [...gameCards["cards"], ...playerCards["cards"]];
    cardsToDisplay.forEach(card => {
        card.isSelected = false;
        const cardElement = document.createElement("img");
        cardElement.src = card["image"];
        document.getElementById(container).appendChild(cardElement);
        if ("game-cards-container" === container) {
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
        }
    });
}

//Implementation by ChatGPT
export function checkCards() {
    const allCards = [...gameCards["cards"], ...playerCards["cards"]];
    const rankCount = {};
    const suitCount = {};
    const ranks = [];
    const suits = [];

    // Group cards by rank and suit
    allCards.forEach(card => {
        const rank = card.value;
        const suit = card.suit;

        // Counting occurrences of each rank
        if (rankCount[rank]) {
            rankCount[rank]++;
        } else {
            rankCount[rank] = 1;
        }

        // Counting occurrences of each suit
        if (suitCount[suit]) {
            suitCount[suit]++;
        } else {
            suitCount[suit] = 1;
        }

        ranks.push(rank);
        suits.push(suit);
    });

    // Sort ranks for easier straight detection
    const sortedRanks = ranks.map(rank => rankToValue(rank)).sort((a, b) => a - b);

    const lastGameCardsContainer = document.getElementById("last-cards-container");
    while (lastGameCardsContainer.children.length > 1) {
        lastGameCardsContainer.removeChild(lastGameCardsContainer.lastChild);
    }
    displayCards("last-cards-container");

    // Checking for specific hands starting from highest to lowest
    if (isRoyalFlush(sortedRanks, suitCount)) return ROYAL_FLUSH;
    if (isStraightFlush(sortedRanks, suitCount)) return STRAIGHT_FLUSH;
    if (isFourOfAKind(rankCount)) return FOUR_OF_A_KIND;
    if (isFullHouse(rankCount)) return FULL_HOUSE;
    if (isFlush(suitCount)) return FLUSH;
    if (isStraight(sortedRanks)) return STRAIGHT;
    if (isThreeOfAKind(rankCount)) return THREE_OF_A_KIND;
    if (isTwoPair(rankCount)) return TWO_PAIR;
    if (isOnePair(rankCount)) return ONE_PAIR;

    return HIGH_CARD;
}

// Helper functions
function rankToValue(rank) {
    const rankValues = {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'JACK': 11,
        'QUEEN': 12,
        'KING': 13,
        'ACE': 14
    };
    return rankValues[rank];
}

function isRoyalFlush(sortedRanks, suitCount) {
    const royalFlushRanks = [10, 11, 12, 13, 14];
    return Object.values(suitCount).includes(5) &&
        royalFlushRanks.every(rank => sortedRanks.includes(rank));
}

function isStraightFlush(sortedRanks, suitCount) {
    return isFlush(suitCount) && isStraight(sortedRanks);
}

function isFourOfAKind(rankCount) {
    return Object.values(rankCount).includes(4);
}

function isFullHouse(rankCount) {
    return Object.values(rankCount).includes(3) && Object.values(rankCount).includes(2);
}

function isFlush(suitCount) {
    return Object.values(suitCount).includes(5);
}

function isStraight(sortedRanks) {
    // Check for regular straight
    for (let i = 0; i <= sortedRanks.length - 5; i++) {
        if (
            sortedRanks[i + 4] - sortedRanks[i] === 4 &&
            new Set(sortedRanks.slice(i, i + 5)).size === 5
        ) {
            return true;
        }
    }

    // Check for straight with low Ace (A-2-3-4-5)
    const lowAceStraight = [14, 2, 3, 4, 5];
    if (lowAceStraight.every(rank => sortedRanks.includes(rank))) {
        return true;
    }

    return false;
}

function isThreeOfAKind(rankCount) {
    return Object.values(rankCount).includes(3);
}

function isTwoPair(rankCount) {
    return Object.values(rankCount).filter(count => count === 2).length === 2;
}

function isOnePair(rankCount) {
    return Object.values(rankCount).includes(2);
}
