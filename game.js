class Game {
  
  constructor() {
    this.players = this.createPlayers();
    this.deck = this.getDeck();
    this.player1 = players1
    this.player2 = player2
  }

  create() {
    this.player1 
  }

  getDeck() {
    let deck = []
    for(let i = 0; i < suits.length; i++) {
      for(let j = 0; j < values.length; j++) {
        let card = {Value: values[j], Suit: suits[i]}
        deck.push(card);
      }
    }
    return deck 
  }

  deal() {
  return this.deck.pop();
  }


}