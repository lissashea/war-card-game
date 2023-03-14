const Deck = require('./deck');
const Card = require('./card');

class GameOfWar {
  constructor() {
    this.deck = new Deck();
    this.player1 = [];
    this.player2 = [];

    this.dealCards();
    this.play();
  }

  dealCards() {
    while (this.deck.cards.length > 0) {
      this.player1.push(this.deck.deal());
      this.player2.push(this.deck.deal());
    }
  }

  play() {
    let round = 1;
    while (this.player1.length > 0 && this.player2.length > 0) {
      console.log(`Round ${round}:`);
      this.playRound();
      round++;
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

    if (card1.value > card2.value) {
      console.log("Player 1 wins the round!");
      this.player1.push(card1, card2);
    } else if (card1.value < card2.value) {
      console.log("Player 2 wins the round!");
      this.player2.push(card1, card2);
    } else {
      console.log("War!");
      this.playWar([card1, card2]);
    }
  }

  playWar(pot = []) {
    if (this.player1.length === 0 || this.player2.length === 0) {
      return;
    }
  
    const cards1 = this.takeCards(this.player1, 4);
    const cards2 = this.takeCards(this.player2, 4);
  
    if (!cards1 || !cards2) {
      if (cards1) {
        this.player1.push(...pot, ...cards1);
      } else if (cards2) {
        this.player2.push(...pot, ...cards2);
      }
      return;
    }
  
    pot.push(...cards1, ...cards2);
    const card1 = cards1.pop();
    const card2 = cards2.pop();
  
    if (card1.value > card2.value) {
      this.player1.push(...pot);
    } else if (card1.value < card2.value) {
      this.player2.push(...pot);
    } else {
      this.playWar(pot);
    }
  }

  takeCards(player, count) {
    if (player.length >= count) {
      return player.splice(0, count);
    } else {
      console.log(`${player === this.player1 ? 'Player 1' : 'Player 2'} does not have enough cards for a war.`);
      return null;
    }
  }
}

module.exports = GameOfWar;