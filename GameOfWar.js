const Deck = require('./deck');
const Card =  require('./card');

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
    this.warPot = []//collects the war cards during playWar to be added to winning player's array
    this.play();
  }
  
  dealCards() {
    for (let i = 0; i < 26; i++) {
      this.player1.push(this.deck.draw());
      this.player2.push(this.deck.draw());
    }
    console.log(this.player1)
    console.log(this.player2)
  }

  play() {
    console.log("reset")
    this.round = 0;
    this.inWar = false;
    this.warPot = [];
    while ((this.player1.length > 0 && this.player2.length > 0) && (this.round < 25)) {
      this.round++;
      console.log(`Round ${this.round}:`);
      if (this.inWar) {
        // continue war round
        this.playWar(this.warPot);
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
      console.log("War!!!!!!!");
      this.playWar();
      this.warPot.push(card1,card2)
      this.inWar = true;
      console.log(this.warPot)
    }

    if (this.player1.length === 0) {
      console.log("Player 2 wins the game! Player 1 has run out of cards.");
      return;
    } else if (this.player2.length === 0) {
      console.log("Player 1 wins the game! Player 2 has run out of cards.");
      return;
    }
  }
  
  playWar() {
    console.log(this.warPot)
      while (this.inWar) {
        console.log("in War")
      if (this.player1.length < 4) {
        console.log("Player 2 wins the game! Player 1 has run out of cards.");
        return;
      } else if (this.player2.length < 4) {
        console.log("Player 1 wins the game! Player 2 has run out of cards.");
        return;
      }


      const lastCard1 = this.player1.shift();
      const lastCard2 = this.player2.shift();

      this.warPot.push(lastCard1, lastCard2);
      
      const card1a = this.player1.shift();
      const card1b = this.player1.shift();
      const card1c = this.player1.shift();
      const card2a = this.player2.shift();
      const card2b = this.player2.shift();
      const card2c = this.player2.shift();
      console.log(this.warPot)


      this.warPot.push(card1a, card1b, card1c, card2a, card2b, card2c);
  
      console.log(`Player 1 plays ${lastCard1.rank} of ${lastCard1.suit}`);
      console.log(`Player 2 plays ${lastCard2.rank} of ${lastCard2.suit}`);
      console.log(this.warPot)

      if (lastCard1.score > lastCard2.score) {
        console.log("Player 1 wins the war!");
        this.player1.push(...this.warPot);
        console.log(this.player1)
        console.log(`${this.warPot.length} cards added to the winner's pot`);
        console.log(`Player 1 now has ${this.player1.length} cards.`);
        this.warPot = []; // empty the warPot for the next round
        this.inWar = false;
      } else if (lastCard1.score < lastCard2.score) {
        console.log("Player 2 wins the war!");
        this.player2.push(...this.warPot);
        console.log(this.player2)
        console.log(`${this.warPot.length} cards added to the winner's pot`);
        console.log(`Player 2 now has ${this.player2.length} cards.`);
        this.warPot = []; // empty the warPot for the next round
        this.inWar = false;
      } else {
        console.log("Another tie!");
        console.log("****************************************************")
      }
    }
  }
}
module.exports = GameOfWar;