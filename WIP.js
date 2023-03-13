class Game {
  constructor() {
    this.cardSuits = ['H', 'S', 'D', 'C'];
    this.cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    this.deck = [];
    this.players = [];
    this.isWar = false;
    this.pot = [];
    this.highCardValue = 0;
    this.winningPlayer = null;
    this.warCards = [];
  }

  createPlayers(numPlayers) {
    let playerCount = numPlayers;
    while (playerCount) {
      let newPlayer = {};
      newPlayer.name = `Player ${playerCount}`;
      newPlayer.hand = [];
      this.players.unshift(newPlayer);
      playerCount--;
    }
    return this.players;
  }

  createDeck() {
    this.cardSuits.forEach(suit => {
      this.cardValues.forEach(value => {
        this.deck.push(new Card(suit, value));
      });
    });
    return this.deck;
  }

  shuffleDeck(deck) {
    let unshuffled = deck.length;
    let randomIndex, lastIndex;
    while (unshuffled) {
      randomIndex = Math.floor(Math.random() * unshuffled--);
      lastIndex = deck[unshuffled];
      deck[unshuffled] = deck[randomIndex];
      deck[randomIndex] = lastIndex;
    }
    return deck;
  }

  dealCards(players, deck) {
    let cardsLeft = deck;
    while (cardsLeft.length >= players.length) {
      players.forEach(player => {
        let dealtCard = cardsLeft.pop();
        player.hand.push(dealtCard);
      });
    }
  }

  playRound() {
    if (this.players.length === 1) {
      return;
    }
    this.pot = [];
    this.resetRoundTrackers();
    this.putCardsInPot(this.pot);
    this.findRoundWinner(this.pot);
    if (this.isWar) {
      return;
    } else {
      this.winningPlayer.hand.unshift(...this.pot);
    }
    this.removeLosers();
  }

  playWar() {
    this.resetRoundTrackers();
    for (let i = this.players.length - 1; i >= 0; i--) {
      if (this.players[i].hand.length < 2) {
        this.pot.push(...this.players[i].hand);
        this.players.splice(i, 1);
      }
    }
    this.putCardsInPot(this.pot);
    this.putCardsInPot(this.warCards);
    this.findRoundWinner(this.warCards);
    this.pot.push(...this.warCards);
    if (this.isWar) {
      return;
    } else {
      this.winningPlayer.hand.unshift(...this.pot);
    }
    this.removeLosers();
  }

  getCardValue(card) {
    switch (card.value) {
      case 'J':
        return 11;
      case 'Q':
        return 12;
      case 'K':
        return 13;
      case 'A':
        return 14;
      default:
        return card.value;
    }
  }

  findRoundWinner(cardsToCompare) {
    for (let i = 0; i < cardsToCompare.length; i++) {
      if (this.getCardValue(cardsToCompare[i]) > this.highCardValue) {
        this.highCardValue = this.getCardValue(cardsToCompare[i]);
        this.winningPlayer = this.players[i];
        this.isWar = false;
      }
      createPlayers(num) {
        let playerCount = num;
        while(playerCount) {
            let newPlayer = {};
            newPlayer.name = `Player ${playerCount}`;
            newPlayer.hand = [];
            this.players.unshift(newPlayer);
            playerCount--;
        }
        return this.players;
    }

    buildDeck() {
        this.suits.forEach(suit => {
            this.ranks.forEach(rank => {
                this.deck.push(new Card(suit, rank));
            });
        });
        return this.deck;
    }

    shuffleDeck(deck) {
        let cardsRemaining = deck.length;
        let randomIndex;
        let lastRemainingIndex;
        while(cardsRemaining) {
            randomIndex = Math.floor(Math.random() * cardsRemaining--);
            lastRemainingIndex = deck[cardsRemaining];
            deck[cardsRemaining] = deck[randomIndex];
            deck[randomIndex] = lastRemainingIndex;
        }
        return deck;
    }

    dealCards(players, deck) {
        let remainingCards = deck;
        while(remainingCards.length >= players.length) {
            players.forEach(player => {
                let dealtCard = remainingCards.pop();
                player.hand.push(dealtCard);         
            });
        }
    }

    playRound () {
        if (this.players.length === 1) {
            return;
        }
        this.pot = [];
        this.resetRoundTrackers();
        this.collectCardsToPot(this.pot);
        this.findRoundWinner(this.pot);
        if (this.war) {
            return;
        } else {
            this.winner.hand.unshift(...this.pot);
        }
        this.eliminateLostPlayers();
    }

    playWar () {
        this.resetRoundTrackers();
        for (let i = this.players.length - 1; i >= 0; i--) {
            if (this.players[i].hand.length < 2) {
                this.pot.push(...this.players[i].hand);
                this.players.splice(i, 1);
            }
        }
        this.collectCardsToPot(this.pot);
        this.collectCardsToPot(this.warCards);
        this.findRoundWinner(this.warCards);
        this.pot.push(...this.warCards);
        if (this.war) {
            return;
        } else {
            this.winner.hand.unshift(...this.pot);
        }
        this.eliminateLostPlayers();
    }

    getInt (card) {
        switch(card.rank) {
        case 0:
            return 10;
        case 'J':
            return 11;
        case 'Q':
            return 12;
        case 'K':
            return 13;
        case 'A':
            return 14;
        default:
            return card.rank;
        }
    }

    findRoundWinner (cardsToCompare) {
        for(let i = 0; i < cardsToCompare.length; i++) {
            if (this.getInt(cardsToCompare[i]) > this.highCard) {
                this.highCard = this.getInt(cardsToCompare[i]);
                this.winner = this.players[i];
                this.war = false;    
            } else if (this.getInt(cardsToCompare[i]) === this.highCard) {
                this.war = true;
            }
        }
    }

    resetRoundTrackers () {
        this.highCard = 0;
        this.winner = null;
        this.war = false;
        this.warCards = [];
    }

    collectCardsToPot (destination) {
        this.players.forEach(player => {
            let card = player.hand.pop();
            destination.push(card);
        });
    }

    // eliminateLostPlayers () {
    //     for (let i = this.players.length - 1; i >= 0; i--) {
    //         if
