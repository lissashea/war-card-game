const Deck = require('./deck');
const Card = require('./card');


class GameOfWar {
  constructor() {
    this.deck = new Deck();//fresh deck
    this.player1 = [];
    this.player2 = [];
    this.dealCards();//deal new deck
    this.round = 1; // initialize round variable to 1
    this.totalCardsPlayer1 = 26; // initialize totalCardsPlayer1 to 26
    this.totalCardsPlayer2 = 26; // initialize totalCardsPlayer2 to 26
    this.inWar = false;
    this.play();
  }
  
  dealCards() {
    for (let i = 0; i < 26; i++) {
      this.player1.push(this.deck.draw());
      this.player2.push(this.deck.draw());
    }
  }
 
  play() {
    this.round = 0;
    let inWar = false;
    let warPot = [];
    while (this.player1.length > 0 && this.player2.length > 0) {
      this.round++;
      console.log(`Round ${this.round}:`);
      if (this.inWar) {
        // continue war round
        this.playWar(warPot);
      if (!this.inWar) {
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
      console.log("War!!!!!!!");
      this.warPot = [card1, card2];
      this.inWar = true;
    }
  }

  playWar(warPot) {
    while (this.inWar) {
      const numCardsInPot = this.warPot.length;
      const numCardsNeeded = Math.max(4 - numCardsInPot, 0);
      if (this.player1.length < numCardsNeeded) {
        console.log("Player 2 wins the game! Player 1 has run out of cards.");
        return;
      } else if (this.player2.length < numCardsNeeded) {
        console.log("Player 1 wins the game! Player 2 has run out of cards.");
        return;
      }
      const cards1 = this.player1.splice(0, numCardsNeeded);
      const cards2 = this.player2.splice(0, numCardsNeeded);
      this.warPot.push(...cards1, ...cards2);
  
      if (this.player1.length === 0) {
        console.log("Player 2 wins the game! Player 1 has run out of cards.");
        return;
      } else if (this.player2.length === 0) {
        console.log("Player 1 wins the game! Player 2 has run out of cards.");
        return;
      }
  
      const lastCard1 = this.player1.shift();
      const lastCard2 = this.player2.shift();
      
      this.warPot.push(lastCard1, lastCard2);
      console.log(`Player 1 plays ${lastCard1.rank} of ${lastCard1.suit}`);
      console.log(`Player 2 plays ${lastCard2.rank} of ${lastCard2.suit}`);
  
      if (lastCard1.score > lastCard2.score) {
        console.log("Player 1 wins the war!");
        this.player1.push(...this.warPot);
        const numCardsAdded = this.warPot.length - numCardsInPot - 2;
        console.log(`${numCardsAdded} cards added to the winner's pot`);
        console.log(`Player 1 now has ${this.player1.length} cards.`);
        this.warPot = []; // empty the warPot for the next round
        this.inWar = false; // war ended, exit the while loop
      } else if (lastCard1.score < lastCard2.score) {
        console.log("Player 2 wins the war!");
        this.player2.push(...this.warPot);
        const numCardsAdded = this.warPot.length - numCardsInPot - 2;
        console.log(`${numCardsAdded} cards added to the winner's pot`);
        console.log(`Player 2 now has ${this.player2.length} cards.`);
        this.warPot = []; // empty the warPot for the next round
        this.inWar = false; // war ended, exit the while loop
      } else {
        console.log("Another tie!");
      }
    }
  }  
}

module.exports = GameOfWar;