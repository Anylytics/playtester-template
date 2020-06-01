// This utility accepts an array and will return a Deck object

export default class Deck {
  constructor(arr) {
    this.deck = arr;
    this.drawn = [];
  }

  shuffle() {
    const array = this.deck;
    array.forEach((el, i) => {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    });
  }

  draw() {
    if (this.deck.length === 0) {
      throw new Error('No more cards in the deck');
    }
    const drawn = this.deck.splice(0, 1)[0];
    this.drawn.push(drawn);
    return drawn;
  }

  reset() {
    this.deck = this.deck.concat(this.drawn);
    this.drawn.splice(0, this.drawn.length);
    this.shuffle();
  }

  export() {
    return this.deck.concat(this.drawn);
  }
}
