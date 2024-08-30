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

const hands = [HIGH_CARD, ONE_PAIR, TWO_PAIR, THREE_OF_A_KIND, STRAIGHT, FLUSH, FULL_HOUSE, FOUR_OF_A_KIND, ROYAL_FLUSH, FIVE_OF_A_KIND];

export default hands;