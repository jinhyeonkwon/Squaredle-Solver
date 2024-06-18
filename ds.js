import words from './word_list.js';

export class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }

  getIsEndofWord() {
    return this.isEndOfWord;
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  startsWith(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return true;
  }
}

const insertWordsIntoTrie = () => {
  const trie = new Trie();
  for (let word of words) {
    trie.insert(word);
  }
  return trie;
};

export const wordsTrie = insertWordsIntoTrie();

export class Board {
  constructor(boardStr) {
    const rows = boardStr.split('/');
    const colNum = rows[0].length;

    const grid = [];

    for (let row of rows) {
      if (colNum !== row.length) {
        throw new Error('Not rectangular board');
      }
      grid.push(row.split(''));
    }

    this.grid = grid;
    this.answer = {};
  }

  getSize() {
    return [this.grid.length, this.grid[0].length];
  }

  getAnswer() {
    return this.answer;
  }

  search() {
    const size = this.getSize();
    this.answer = {};

    for (let i = 0; i < size[0] * size[1]; i++) {
      this.searchFrom(i, '', new Set(), wordsTrie.root);
    }
    return this.getAnswer();
  }

  searchFrom(location, wordSoFar, pathSoFar, trieNode) {
    // location: interpreted as an index (1-dimensional)
    const [row, col] = this.indexToTuple(location);
    const char = this.grid[row][col];
    const newWord = wordSoFar + char;
    const newPath = new Set(pathSoFar);
    newPath.add(location);

    if (!trieNode.children[char]) {
      return false;
    }
    const newTrieNode = trieNode.children[char];

    if (newTrieNode.isEndOfWord) {
      if (!this.answer[newWord.length]) {
        this.answer[newWord.length] = new Set();
      }
      let isUnique = true; // To prevent saving duplicate words with different paths
      for (let answer of this.answer[newWord.length]) {
        if (answer[0] === newWord) {
          isUnique = false;
          break;
        }
      }
      if (isUnique) {
        this.answer[newWord.length].add([newWord, newPath]);
      }
    }

    const nextLocations = this.validNextLocations(location, newPath);
    for (let nextLocation of nextLocations) {
      this.searchFrom(nextLocation, newWord, newPath, newTrieNode);
    }
  }

  tupleToIndex(tuple) {
    return tuple[0] * this.grid[0].length + tuple[1];
  }

  indexToTuple(index) {
    return [
      Math.floor(index / this.grid[0].length),
      index % this.grid[0].length,
    ];
  }

  validNextLocations(location, pathSoFar) {
    let dirs = [];
    const [row, col] = this.indexToTuple(location);
    let nextLocations = new Set();

    let minColDir = -1;
    let minRowDir = -1;

    if (row === 0) {
      minRowDir = 0;
    }
    if (col === 0) {
      minColDir = 0;
    }

    for (let x = minRowDir; x <= 1; x++) {
      for (let y = minColDir; y <= 1; y++) {
        if (
          (x !== 0 || y !== 0) &&
          row + x < this.grid.length &&
          col + y < this.grid[0].length
        ) {
          dirs.push([x, y]);
        }
      }
    }

    for (let dir of dirs) {
      const nextLocation = this.tupleToIndex([row + dir[0], col + dir[1]]);
      if (!pathSoFar.has(nextLocation)) {
        nextLocations.add(nextLocation);
      }
    }
    return nextLocations;
  }
}
