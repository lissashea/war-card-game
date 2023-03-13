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