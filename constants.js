const DECK_ID = "3837i1bgeae2";
export const NEW_DECK_URL = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
export const SHUFFLE_DECK_URL = `https://www.deckofcardsapi.com/api/deck/${DECK_ID}/shuffle/`;
export const DRAW_CARD_URL = `https://www.deckofcardsapi.com/api/deck/${DECK_ID}/draw/?count=`;
export const CARD_BACK_URL = "https://www.deckofcardsapi.com/static/img/back.png";

export const STARTING_FUNDS = 50;
export const MULTIPLIER = 10;

export const MAX_CARDS_CHANGE = 2;
export const MAX_CARDS_TO_CHANGE = 3;


class Hand {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

const HIGH_CARD = new Hand("High card", 1);
const ONE_PAIR = new Hand("One pair", 2);
const TWO_PAIR = new Hand("Two pair", 3);
const THREE_OF_A_KIND = new Hand("Three of a kind", 4);
const STRAIGHT = new Hand("Straight", 5);
const FLUSH = new Hand("Flush", 6);
const FULL_HOUSE = new Hand("Full house", 7);
const FOUR_OF_A_KIND = new Hand("Four of a kind", 8);
const ROYAL_FLUSH = new Hand("Royal flush", 9);
const FIVE_OF_A_KIND = new Hand("Five of a kind", 10);

export const HANDS = [HIGH_CARD, ONE_PAIR, TWO_PAIR, THREE_OF_A_KIND, STRAIGHT, FLUSH, FULL_HOUSE, FOUR_OF_A_KIND, ROYAL_FLUSH, FIVE_OF_A_KIND];