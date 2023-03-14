// Card class
// constructor(rank, suit)
// Initializes a new Card instance with a given rank and suit.
// Assigns the rank and suit to the instance's properties.
// Calculates the card's value using the rank property and assigns it to the value property.
// static getSuitSymbol(suit)
// Returns the symbol for a given suit using a predefined object that maps suits to their respective symbols.

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.value = '23456789TJQKA'.indexOf(rank) + 2;
  }

  static getSuitSymbol(suit) {
    const suitSymbols = {
      'hearts': '♡',
      'diamonds': '♢',
      'clubs': '♣',
      'spades': '♠'
    };

    return suitSymbols[suit];
  }
}

module.exports = Card;
