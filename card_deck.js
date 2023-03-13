// class Deck {
//   constructor() {
//     this.cards = this.createDeck();
//     this.shuffle();
//   }

//   createDeck() {
//     const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
//     const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
//     const cards = [];

//     for (let suit of suits) {
//       for (let value of values) {
//         cards.push(value + " of " + suit);
//       }
//     }

//     return cards;
//   }

//   shuffle() {
//     for (let i = this.cards.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       const temp = this.cards[i];
//       this.cards[i] = this.cards[j];
//       this.cards[j] = temp;
//     }
//   }

//   deal() {
//     return this.cards.pop();
//   }
// }

// class Player {
//   constructor(name) {
//     this.name = name;
//     this.deck = [];
//     this.winPile = [];
//   }

//   draw(deck) {
//     this.deck.push(deck.deal());
//   }

//   drawCards(deck, numCards) {
//     for (let i = 0; i < numCards; i++) {
//       this.draw(deck);
//     }
//   }

//   playCard() {
//     return this.deck.shift();
//   }

//   addCardsToWinPile(cards) {
//     this.winPile.push(...cards);
//   }

//   addCardToWinPile(card) {
//     this.winPile.push(card);
//   }

//   canPlay() {
//     return this.deck.length > 0;
//   }

//   outOfCards() {
//     return !this.canPlay() && this.winPile.length > 0;
//   }

//   shuffleWinPile() {
//     const deck = new Deck();
//     deck.cards = this.winPile;
//     deck.shuffle();
//     this.deck = deck.cards;
//     this.winPile = [];
//   }
// }

// class War {
//   constructor() {
//     this.deck = new Deck();
//     this.player1 = new Player('Player 1');
//     this.player2 = new Player('Player 2');
//     this.dealCards();
//   }

//   dealCards() {
//     for (let i = 0; i < 26; i++) {
//       this.player1.draw(this.deck);
//       this.player2.draw(this.deck);
//     }
//   }

//   playRound() {
//     if (!this.player1.canPlay() || !this.player2.canPlay()) {
//       return;
//     }
  
//     const card1 = this.player1.playCard();
//     const card2 = this.player2.playCard();
  
//     console.log(`${this.player1.name} plays: ${card1}`);
//     console.log(`${this.player2.name} plays: ${card2}`);
  
//     if (card1 === card2) {
//       console.log("It's a tie! Time for war!");
//       this.playWarRound();
//     } else if (card1 > card2) {
//       console.log(`${this.player1.name} wins the round!`);
//       this.player1.addCardToWinPile(card1);
//       this.player1.addCardToWinPile(card2);
//     } else {
//       console.log(`${this.player2.name} wins the round!`);
//       this.player2.addCardToWinPile(card1);
//       this.player2.addCardToWinPile(card2);
//     }
//   }

//   playWarRound(warCards1 = [], warCards2 = []) {
//     if (!this.player1.canPlay() || !this.player2.canPlay()) {
//       return;
//     }

//     if (warCards1.length === 0) {
//       warCards1.push(this.player1.playCard());
//     }

//     if (warCards2.length === 0) {
//       warCards2.push(this.player2.playCard());
//     }

//     console.log(`${this.player1.name} puts down ${warCards1.length} cards`);
//     console.log(`${this.player2.name} puts down ${warCards2.length} cards`);
  
//     const card1 = warCards1[warCards1.length - 1];
//     const card2 = warCards2[warCards2.length - 1];
  
//     console.log(`${this.player1.name} plays: ${card1}`);
//     console.log(`${this.player2.name} plays: ${card2}`);
  
//     if (card1 === card2) {
//       console.log("It's a tie again! Another war!");
//       let warCards1Next = warCards1.concat(this.player1.playCards(2));
//       let warCards2Next = warCards2.concat(this.player2.playCards(2));
//       while (warCards1Next.length > 0 && warCards2Next.length > 0) {
//         this.playWarRound(warCards1Next, warCards2Next);
//         warCards1Next = [];
//         warCards2Next = [];
//       }
//     } else if (card1 > card2) {
//       console.log(`${this.player1.name} wins the war and takes all the cards!`);
//       this.player1.addCards([...warCards1, ...warCards2, card1, card2]);
//     } else {
//       console.log(`${this.player2.name} wins the war and takes all the cards!`);
//       this.player2.addCards([...warCards1, ...warCards2, card1, card2]);
//     }
//   }
// }
      
// const newGame = new War();
// newGame.playGame()

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    if (rank === 'J') {
      this.value = 11;
    } else if (rank === 'Q') {
      this.value = 12;
    } else if (rank === 'K') {
      this.value = 13;
    } else if (rank === 'A') {
      this.value = 14;
    } else {
      this.value = parseInt(rank);
    }
  }
}

class Deck {
  constructor() {
    this.cards = []; // an array of Card objects representing the deck
    this.buildDeck();
  }

  buildDeck() {
    const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    for (let suit of suits) {
      for (let rank of ranks) {
        let card = new Card(suit, rank);
        this.cards.push(card);
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal() {
    return this.cards.pop();
  }
}


class Player {
  constructor(name) {
    this.name = name;
    this.drawPile = [];
    this.winPile = [];
  }  
}

class Game {
  constructor(player1, player2) {
    this.deck = new Deck();
    this.player1 = player1;
    this.player2 = player2;
  }

  playRound() {
    let card1 = this.player1.drawPile.length > 0 ? this.player1.drawPile.pop() : null;
    let card2 = this.player2.drawPile.length > 0 ? this.player2.drawPile.pop() : null;
    
    if (card1 && card1.value > (card2 ? card2.value : 0)) {
      this.player1.winPile.push(card1);
      if (card2) this.player1.winPile.push(card2);
    } else if (card2 && card2.value > (card1 ? card1.value : 0)) {
      this.player2.winPile.push(card2);
      if (card1) this.player2.winPile.push(card1);
    } else if (card1 && card2) {
      let warCards = [card1, card2];
      while (card1.value === card2.value) {
        for (let i = 0; i < 3; i++) {
          warCards.push(this.player1.drawPile.length > 0 ? this.player1.drawPile.pop() : null);
          warCards.push(this.player2.drawPile.length > 0 ? this.player2.drawPile.pop() : null);
        }
        card1 = this.player1.drawPile.length > 0 ? this.player1.drawPile.pop() : null;
        card2 = this.player2.drawPile.length > 0 ? this.player2.drawPile.pop() : null;
        if (card1) warCards.push(card1);
        if (card2) warCards.push(card2);
        if (card1 && card1.value > (card2 ? card2.value : 0)) {
          this.player1.winPile.push(...warCards.filter(c => c !== null));
        } else if (card2 && card2.value > (card1 ? card1.value : 0)) {
          this.player2.winPile.push(...warCards.filter(c => c !== null));
        }
      }
    }  
  }

  isGameOver() {
    return (
      (this.player1.drawPile.length === 0 && this.player1.winPile.length === 52) ||
      (this.player2.drawPile.length === 0 && this.player2.winPile.length === 52) ||
      (this.deck.cards.length === 0)
    );
  }

  play() {
    let winner = null;
    let round = 1;
    
    while (!winner) {
      console.log(`Round ${round}`);
      this.playRound();
      
      if (this.player1.drawPile.length === 0 && this.player1.winPile.length === 52) {
        winner = this.player1;
      } else if (this.player2.drawPile.length === 0 && this.player2.winPile.length === 52) {
        winner = this.player2;
      } else if (this.deck.cards.length === 0) {
        winner = this.determineWinner();
      } else if (round > 1000) { // Add this condition to break the loop if the game goes on too long
        console.log('Game has gone on too long. No winner.');
        break;
      }
      
      round++;
    }
    
    if (winner) {
      console.log(`${winner.name} has won the game!`);
    }
  }

  determineWinner() {
    if (this.player1.winPile.length > this.player2.winPile.length) {
      return this.player1;
    } else if (this.player2.winPile.length > this.player1.winPile.length) {
      return this.player2;
    } else {
      return null;
    }    
  }
}


let player1 = new Player("Player 1");
let player2 = new Player("Player 2");
let game = new Game(player1, player2);
game.play();
