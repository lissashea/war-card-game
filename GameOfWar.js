const Deck = require('./deck');
const Card = require('./card');

// GameOfWar class
// constructor()
// Initializes a new GameOfWar instance.
// Creates a new Deck instance and assigns it to the deck property.
// Creates two empty arrays to hold the players' cards and assigns them to the player1 and player2 properties.
// Calls the dealCards method to deal the cards to the players.
// Calls the play method to start the game.
// dealCards()
// Loops through the cards array of the deck object.
// Adds the first card to player1 and the second card to player2.
// Continues until all the cards have been dealt.
// play()
// Initializes a round variable to 1.
// Loops through the game until one player has no more cards.
// Prints out the current round number.
// Calls the playRound method to play a round of the game.
// Increments the round variable.
// If one player has no more cards, prints out the winner of the game.
// playRound()
// Removes and assigns the top card of each player's deck to card1 and card2.
// Prints out the card played by each player.
// If card1 has a higher value than card2, card1 and card2 are added to player1's deck.
// If card1 has a lower value than card2, card1 and card2 are added to player2's deck.
// If card1 has the same value as card2, calls the playWar method to play a war.
// playWar(pot = [])
// If one player has no more cards, returns.
// Takes four cards from each player's deck and assigns them to cards1 and cards2.
// If one player does not have enough cards, adds the cards to the other player's deck and returns.
// Adds cards1 and cards2 to the pot array.
// Removes and assigns the top card of each player's deck to card1 and card2.
// If card1 has a higher value than card2, adds the pot array to player1's deck.
// If card1 has a lower value than card2, adds the pot array to player2's deck.
// If card1 has the same value as card2, calls the playWar method recursively with the current pot array.
// takeCards(player, count)
// Takes a player array and a count integer.
// If the player array has enough cards for the count, removes and returns the first count cards.
// If the player array does not have enough cards for the count, prints out an error message and returns null.


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