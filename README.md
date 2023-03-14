# Game of War

The Game of War is a classic card game that is typically played with a standard 52-card deck. The game is played by two players, who each start with half of the deck. Players draw cards from their own deck and play them face-up against the other player's card. The player with the higher card wins the round and takes both cards. If the cards have the same value, a "war" is declared and each player draws four more cards and plays another round. The game continues until one player runs out of cards, at which point the other player wins.

## How to Play

To play the Game of War, simply run the `GameOfWar` class provided in the `gameOfWar.js` file. This will create a new deck of cards, shuffle it, deal the cards to the two players, and then start the game. The game will continue until one player has all the cards, at which point the winner will be declared.

## Code Implementation

The code for the Game of War is implemented using three classes: `Card`, `Deck`, and `GameOfWar`. 

The `Card` class represents a single playing card and has properties for the card's rank, suit, and value. The `Deck` class represents a deck of playing cards and has methods for shuffling the deck, dealing cards, and creating a new deck. The `GameOfWar` class represents the game itself and has methods for dealing cards, playing rounds, and declaring the winner.

When a new `GameOfWar` object is created, it creates a new deck of cards, shuffles the deck, and deals the cards to the two players. The game then begins by playing rounds until one player has all the cards. During each round, the top card from each player's deck is played and compared. If one card is higher than the other, the player with the higher card takes both cards and adds them to the bottom of their deck. If the cards have the same value, a war is declared and each player draws four more cards and plays another round. The winner of the war takes all the cards that were played in the war. The game continues until one player has all the cards, at which point the other player is declared the winner.

The `GameOfWar` class also includes several helper methods, such as `takeCards` which is used to take a specified number of cards from a player's deck, and `playWar` which is used to handle the special case where a war is declared. 

Overall, the implementation of the Game of War is a good example of object-oriented programming, as it uses classes to represent the various objects in the game and encapsulates the game logic in a single class.
