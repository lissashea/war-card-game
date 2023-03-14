const Card = require('./card');


// Deck class
// constructor()
// Initializes a new Deck instance.
// Creates a new array to hold the cards and assigns it to the cards property.
// Defines an array of suits and a string of ranks.
// Loops through each suit and rank, creating a new Card instance for each combination.
// Adds each new Card instance to the cards array.
// Calls the shuffle method to shuffle the deck.
// shuffle()
// Shuffles the cards array using the Fisher-Yates shuffle algorithm.
// deal()
// Removes and returns the last card in the cards array.


class Deck {
  constructor() {
    this.cards = [];
    const suits = ["♠", "♡", "♢", "♣"]
    const ranks = '23456789TJQKA';

    for (const suit of suits) {
      for (const rank of ranks) {
        this.cards.push(new Card(rank, suit));
      }
    }

    this.shuffle();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal() {
    return this.cards.pop();
  }
}


module.exports = Deck;
