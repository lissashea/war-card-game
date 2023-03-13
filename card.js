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

  get numberOfCards() {
    return this.cards.length
  }

  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
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
    let round = 0;
    let inWar = false;
    let warPot = [];

    while (this.player1.length > 0 && this.player2.length > 0) {
      round++;
      console.log(`Round ${round}:`);

      if (inWar) {
        // continue war round
        this.playWar(warPot);
        if (!inWar) {
          // war ended, continue playing game
          this.playRound();
        }
      } else {
        // regular round
        this.playRound();
      }
    }

    if (this.player1.length > 0) {
      console.log("Player 1 wins the game!");
    } else {
      console.log("Player 2 wins the game!");
    }
  }

  playRound() {
    const card1 = this.player1.shift();
    const card2 = this.player2.shift();
    console.log(`Player 1 plays ${card1.rank} of ${card1.suit}`);
    console.log(`Player 2 plays ${card2.rank} of ${card2.suit}`);
  
    if (card1.score > card2.score) {
      console.log("Player 1 wins the round!");
      this.player1.push(card1, card2);
    } else if (card1.score < card2.score) {
      console.log("Player 2 wins the round!");
      this.player2.push(card1, card2);
    } else {
      console.log("War!");
      this.playWar(card1, card2);
    }
  }
  
  playWar(card1, card2) {
    const pot = [card1, card2];
    console.log("War!");
  
    while (true) {
      const card1a = this.player1.shift();
      const card1b = this.player1.shift();
      const card1c = this.player1.shift();
      const card2a = this.player2.shift();
      const card2b = this.player2.shift();
      const card2c = this.player2.shift();
  
      pot.push(card1a, card1b, card1c, card2a, card2b, card2c);
  
      const lastCard1 = this.player1.shift();
      const lastCard2 = this.player2.shift();
      pot.push(lastCard1, lastCard2);
  
      console.log(`Player 1 plays ${lastCard1.rank} of ${lastCard1.suit}`);
      console.log(`Player 2 plays ${lastCard2.rank} of ${lastCard2.suit}`);
  
      if (lastCard1.score > lastCard2.score) {
        console.log("Player 1 wins the war!");
        this.player1.push(...pot);
        break;
      } else if (lastCard1.score < lastCard2.score) {
        console.log("Player 2 wins the war!");
        this.player2.push(...pot);
        break;
      } else {
        console.log("Another tie!");
      }
    }
  }
}

const game = new GameOfWar();
console.log(game.player1);
console.log(game.player2);
