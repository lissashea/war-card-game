class Card {
  constructor(suit,rank,score) {
   this.suit = suit;
   this.value = rank;
   this.score = score;
  }
}

class Deck {
  constructor() {
    this.cards = []
    this.createDeck();
  }

  createDeck() {
    let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    let values = 
    ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

    for(let i = 0; i < suits.length; i++) {
      for(let j = 0; j < values.length; j++) {
        this.cards.push(new Card(suits[i],values[j],j + 1))
      }
    }
    this.shuffle();
  }

  shuffle() {
    this.cards = this.cards.sort((a,b) => 0.5 - Math.random())
  }
}

const deck1 = new Deck();
console.log(deck1)

class GameOfWar {
  constructor() {
    this.player1 = [];
    this.player2 = [];
  } 
}

class Player {
  constructor(name) {
    this.name = name;
    this.deck = [];
    this.winPile = [];
  }
}