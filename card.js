class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.value = '23456789TJQKA'.indexOf(rank) + 2;
  }
}


module.exports = Card;


