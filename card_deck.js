class Deck {
  constructor() {
    this.cards = [];
    this.reset();
  }

  reset() {
    this.cards = [];

    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

    for (let suit in suits) {
      for (let value in values) {
        this.cards.push(values[value] + " of " + suits[suit]);
      }
    }
  }

  // shuffle() {
  //   for (let i = 0; i < this.cards.length; i++) {
  //     const randIdx = Math.floor(Math.random() * this.cards.length);
  //     const temp = this.cards[i];
  //     this.cards[i] = this.cards[randIdx];
  //     this.cards[randIdx] = temp;
  //   }
  // }

  deal() {
    return this.cards.pop();
  }
}


class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  draw(deck) {
    this.hand.push(deck.deal());
  }

  playCard() {
    return this.hand.shift();
  }

  addCards(cards) {
    this.hand.push(...cards);
  }

  canPlay() {
    return this.hand.length > 0;
  }
}

class War {
  constructor() {
    this.deck = new Deck();
    this.player1 = new Player("Player 1");
    this.player2 = new Player("Player 2");
    this.dealCards();
  }

  dealCards() {
    for (let i = 0; i < 26; i++) {
      this.player1.draw(this.deck);
      this.player2.draw(this.deck);
    }
  }

  playRound() {
    if (!this.player1.canPlay() || !this.player2.canPlay()) {
      return;
    }
    
    const card1 = this.player1.playCard();
    const card2 = this.player2.playCard();
    
    console.log(`${this.player1.name} plays: ${card1}`);
    console.log(`${this.player2.name} plays: ${card2}`);

    if (card1 === card2) {
      console.log("It's a tie! Time for war!");
      this.playWarRound();
    } else if (card1 > card2) {
      console.log(`${this.player1.name} wins the round!`);
      this.player1.addCards([card1, card2]);
    } else {
      console.log(`${this.player2.name} wins the round!`);
      this.player2.addCards([card1, card2]);
    }
  }

  playWarRound() {
    const warCards1 = [this.player1.playCard(), this.player1.playCard()];
    const warCards2 = [this.player2.playCard(), this.player2.playCard()];
    
    console.log(`${this.player1.name} puts down ${warCards1.length} cards`);
    console.log(`${this.player2.name} puts down ${warCards2.length} cards`);
    
    const card1 = this.player1.playCard();
    const card2 = this.player2.playCard();
    
    console.log(`${this.player1.name} plays: ${card1}`);
    console.log(`${this.player2.name} plays: ${card2}`);

    if (card1 === card2) {
      console.log("It's a tie again! Another war!");
      this.playWarRound();
    } else if (card1 > card2) {
      console.log(`${this.player1.name} wins the war and takes all the cards!`);
      this.player1.addCards([...warCards1, ...warCards2, card1, card2]);
    } else {
      console.log(`${this.player2.name} wins the war and takes all the cards!`);
      this.player2.addCards([...warCards1, ...warCards2, card1, card2]);
    }
  }

  start() {
    let round = 1;
    while (this.player1.canPlay() && this.player2.canPlay() && round <= 400) {
      console.log(`\nRound ${round}:`);
      this.playRound();
      round++;
    }
    console.log(`\n${this.getWinner()} wins the game!`);
  }

  getWinner() {
    if (this.player1.hand.length === 0) {
      return this.player2.name;
    } else {
      return this.player1.name;
    }
  }
}

const game = new War();
game.start();