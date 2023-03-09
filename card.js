class Cards {

  constructor() {
    this.deck =
  }

    function getDeck() {
    
    let deck = []
    for(let i = 0; i < suits.length; i++) {
      for(let j = 0; j < values.length; j++) {
        let card = {Value: values[j], Suit: suits[i]}
        deck.push(card);
      }
    }
    return deck
  }
}
  




const suits = ("hearts,spades,diamonds,clubs").split(",");
const values = ("2,3,4,5,6,7,8,9,10,J,Q,K,A").split(",");
















