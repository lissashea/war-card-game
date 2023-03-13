Game of War
Game of War is a classic card game played with a standard deck of 52 playing cards. The objective of the game is to win all the cards.

Rules
1. The deck is divided evenly between two players.
In each round, both players play the top card from their deck.
2. The player with the higher card wins the round and takes both cards.
3. If both players play cards of the same rank, a "war" is declared:
4. Each player plays three additional cards face down, and then one more card face up.
5. The player with the higher card wins all the cards in the "war".
6. The game ends when one player has won all the cards.
How to Run


To play the game, run the following command in your terminal:

```
node GameOfWar.js
```
This will start the game and output the progress of each round to the console.

Implementation Details:

1. This Game of War implementation is written in JavaScript and uses classes to represent the game components. The Card class represents a playing card, the Deck class represents a deck of cards, and the GameOfWar class represents the game itself.

2. The game is played by creating a new instance of the GameOfWar class, which initializes a new Deck and deals the cards to two players. The GameOfWar class then proceeds to play rounds until one player wins all the cards.

3. During each round, the GameOfWar class compares the top cards of each player's deck and determines a winner. If a "war" is declared, the GameOfWar class plays additional cards and determines a winner for the "war".

4. At the end of the game, the GameOfWar class outputs the winner to the console.

Future Improvements:

1.Add a user interface to allow players to interact with the game.

2. Allow the user to specify the number of players and the number of cards dealt to each player.
3. Add additional game modes, such as a best-of-three or a timed game.
4. Implement additional card games, such as Go Fish or Poker.