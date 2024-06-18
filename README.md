# Squaredle-Solver

It is a web program that solves the famous puzzle game [Squaredle](https://squaredle.app/). This is a personal project with no affiliation with Squaredle, and I am not responsible for any disadvantages caused by using it for improper play, such as rank manipulation.

It is currently deployed [here](https://jinhyeonkwon.github.io/Squaredle-Solver/).

## Implementations

### 1. How to save the word set for testing

I used [trie](https://en.wikipedia.org/wiki/Trie) data structure for efficient searching process.<br/>
I defined classes named `Trie` and `TrieNode` in `ds.js`. The Trie class has a variety of functions implemented, but for now, all it does is remember the root and perform an insert operation. The TrieNode class is playing a key role. TrieNode has a `children` Dictionary and a field named `isEndOfWord`. As the searching function go around the board checking for words, the TrieNode can tell if the word so far is an existing word or if there are other words that prefix it.<br/>
The word data was created by referring to the word list of [https://github.com/minoli-g/squaredle-solver](https://github.com/minoli-g/squaredle-solver), which previously implemented the same function. Its word data is based on [https://github.com/dwyl/english-words/](https://github.com/dwyl/english-words/).

### 2. How to traverse the game board

The `Board` class in `ds.js` contains its implementation. The constructor stores the board as a two-dimensional array called `grid`. In the process, it checks that the input is rectangular in shape. The `search` function calls the `searchFrom` function at each starting point. This function recursively calls searchFrom again for possible directions of travel (locations in the board that have not yet been visited), and if it finds a word that exists, it adds it to the `answer`. The `answer` is a Dictionary whose key is the word length and whose value is a Set of [word, path]. The reason for storing the path together is so that I can later extend the ability to see the path in the Result part.

### 3. What I used

This is a simple project without a server, so all functions are run on the client side.

- JQuery for Scripts
- Figma for design

## Future works

- Implementing a feature that tells user the path when the user hover or click a word
- Implementing a info modal
