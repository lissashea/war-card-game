const Deck = require('./deck');

class GameOfWar {
  constructor() {
    this.deck = new Deck();//fresh deck
    this.player1 = [];
    this.player2 = [];
    this.dealCards();//deal new deck
    this.round = 1; // initialize round variable to 1
    this.totalCardsPlayer1 = 26; // initialize totalCardsPlayer1 to 26
    this.totalCardsPlayer2 = 26; // initialize totalCardsPlayer2 to 26
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
    while (this.player1.length > 0 && this.player2.length > 0 && round < 25) {
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
    // console.log(`Round ${this.round}:`);
    console.log(`Player 1 (${this.player1.length} cards) plays ${card1.rank} of ${card1.suit}`);
    console.log(`Player 2 (${this.player2.length} cards) plays ${card2.rank} of ${card2.suit}`);
  
    if (card1.score > card2.score) {
      console.log("Player 1 wins the round!");
      this.player1.push(card1, card2);
      console.log(`Player 1 now has ${this.player1.length} cards.`);
      console.log(`Player 2 now has ${this.player2.length} cards.`);
    } else if (card1.score < card2.score) {
      console.log("Player 2 wins the round!");
      this.player2.push(card1, card2);
      console.log(`Player 1 now has ${this.player1.length} cards.`);
      console.log(`Player 2 now has ${this.player2.length} cards.`);
    } else {
      console.log("War!");
      this.playWar(card1, card2);
    }
  
    this.round++;
  }
  
  playWar(card1, card2) {
    const warPot = [card1, card2];
    // console.log("War!");

    while (true) {
      if (this.player1.length < 4) {
        console.log("Player 2 wins the game! Player 1 has run out of cards.");
        return;
      } else if (this.player2.length < 4) {
        console.log("Player 1 wins the game! Player 2 has run out of cards.");
        return;
      }
      const card1a = this.player1.shift();
      const card1b = this.player1.shift();
      const card1c = this.player1.shift();
      const card2a = this.player2.shift();
      const card2b = this.player2.shift();
      const card2c = this.player2.shift();
  
      warPot.push(card1a, card1b, card1c, card2a, card2b, card2c);
     
  
      const lastCard1 = this.player1.shift();
      const lastCard2 = this.player2.shift();
      warPot.push(lastCard1, lastCard2);
      console.log(warPot)
  
      console.log(`Player 1 plays ${lastCard1.rank} of ${lastCard1.suit}`);
      console.log(`Player 2 plays ${lastCard2.rank} of ${lastCard2.suit}`);
  
      if (lastCard1.score > lastCard2.score) {
        console.log("Player 1 wins the war!");
        this.player1.push(...warPot);
        console.log(`${warPot.length} cards added to the winner's pot`)
        console.log(`Player 1 now has ${this.player1.length} cards.`);
        break;
      } else if (lastCard1.score < lastCard2.score) {
        console.log("Player 2 wins the war!");
        this.player2.push(...warPot);//contents of array with spread operator
        console.log(`${warPot.length} cards added to the winner's pot `)
        console.log(`Player 2 now has ${this.player2.length} cards.`);
        break;
      } else {
        console.log("Another tie!");
        continue;
      }
    }
  }
  pot = []
}

module.exports = GameOfWar;
