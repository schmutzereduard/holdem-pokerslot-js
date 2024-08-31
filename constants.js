const DECK_ID = "3837i1bgeae2";
export const NEW_DECK_URL = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
export const SHUFFLE_DECK_URL = `https://www.deckofcardsapi.com/api/deck/${DECK_ID}/shuffle/`;
export const DRAW_CARD_URL = `https://www.deckofcardsapi.com/api/deck/${DECK_ID}/draw/?count=`;
export const CARD_BACK_URL = "https://www.deckofcardsapi.com/static/img/back.png";

export const STARTING_FUNDS = 50;
export const MULTIPLIER = 1;

export const MAX_CARDS_CHANGE = 2;
export const MAX_CARDS_TO_CHANGE = 3;


class Hand {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

export const HIGH_CARD = new Hand("High card", 1);
export const ONE_PAIR = new Hand("One pair", 2);
export const TWO_PAIR = new Hand("Two pair", 3);
export const THREE_OF_A_KIND = new Hand("Three of a kind", 4);
export const STRAIGHT = new Hand("Straight", 5);
export const FLUSH = new Hand("Flush", 6);
export const FULL_HOUSE = new Hand("Full house", 7);
export const FOUR_OF_A_KIND = new Hand("Four of a kind", 8);
export const ROYAL_FLUSH = new Hand("Royal flush", 9);

export const HANDS = [HIGH_CARD, ONE_PAIR, TWO_PAIR, THREE_OF_A_KIND, STRAIGHT, FLUSH, FULL_HOUSE, FOUR_OF_A_KIND, ROYAL_FLUSH ];