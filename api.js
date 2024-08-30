import { NEW_DECK_URL, SHUFFLE_DECK_URL, DRAW_CARD_URL } from './constants.js';

export async function drawCards(count) {

    const response = await fetch(DRAW_CARD_URL + count);
    const cards = await response.json();
    return cards;
}

export async function shuffleDeck() {
    
    const response = await fetch(SHUFFLE_DECK_URL);
    const deck = await response.json();
    return deck;
}

export async function getNewDeck() {

    const response = await fetch(NEW_DECK_URL);
    const deck = await response.json();
    console.log(deck);
}