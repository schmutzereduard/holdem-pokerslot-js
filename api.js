const DECK_ID = "3837i1bgeae2";

export async function drawCards(count) {

    const DRAW_CARD_URL = `https://www.deckofcardsapi.com/api/deck/${DECK_ID}/draw/?count=${count}`;
    const response = await fetch(DRAW_CARD_URL);
    const cards = await response.json();
    return cards;
}

export async function shuffleDeck() {
    
    const SHUFFLE_DECK_URL = `https://www.deckofcardsapi.com/api/deck/${DECK_ID}/shuffle/`;
    const response = await fetch(SHUFFLE_DECK_URL);
    const deck = await response.json();
    return deck;
}

export async function getNewDeck() {

    // const NEW_DECK_URL = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    // const response = await fetch(NEW_DECK_URL);
    // const deck = await response.json();
    // console.log(deck);
}