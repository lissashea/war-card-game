// class Card {
//   constructor(suit,rank,score) {
//    this.suit = suit;
//    this.value = rank;
//    this.score = score;
//   }
// }

// class Deck {
//   constructor() {
//     this.cards = []
//     this.createDeck();
//   }

//   createDeck() {
//     let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
//     let values = 
//     ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

//     for(let i = 0; i < suits.length; i++) {
//       for(let j = 0; j < values.length; j++) {
//         this.cards.push(new Card(suits[i],values[j],j + 1))
//       }
//     }
//     this.shuffle();
//   }

//   shuffle() {
//     this.cards = this.cards.sort((a,b) => 0.5 - Math.random())
//   }
// }

// const deck1 = new Deck();
// console.log(deck1)

// class GameOfWar {
//   constructor() {
//     this.deck = new Deck();
//     this.player1 = [];
//     this.player2 = [];
//     this.deck.shuffle();
//     this.dealCards();
//   }
  
//   dealCards() {
//     for (let i = 0; i < 26; i++) {
//       this.player1.push(this.deck.cards.shift());
//       this.player2.push(this.deck.cards.shift());
//     }
//   }

//   playRound() {

//   }

//   playWar() {

//   }

//   determineWinner() {

//   }
// }

// const game = new GameOfWar();
// console.log(game.player1);
// console.log(game.player2);

class Card {
  constructor(suit, rank, score) {
    this.suit = suit;
    this.rank = rank;
    this.score = score;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.createDeck();
    this.shuffle();
  }

  createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    let score = 1;
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        let rankScore = parseInt(ranks[j]);
        if (ranks[j] === 'Ace') {
          rankScore = 1;
        } else if (ranks[j] === 'Jack') {
          rankScore = 11;
        } else if (ranks[j] === 'Queen') {
          rankScore = 12;
        } else if (ranks[j] === 'King') {
          rankScore = 13;
        }
        const card = new Card(suits[i], ranks[j], rankScore);
        this.cards.push(card);
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw() {
    return this.cards.shift();
  }
}

class GameOfWar {
  constructor() {
    this.deck = new Deck();
    this.player1 = [];
    this.player2 = [];
    this.dealCards();
    this.play();
  }
  
  dealCards() {
    for (let i = 0; i < 26; i++) {
      this.player1.push(this.deck.draw());
      this.player2.push(this.deck.draw());
    }
  }

  play() {
    // Game logic goes here
  }
}

const game = new GameOfWar();
console.log(game.player1);
console.log(game.player2);
