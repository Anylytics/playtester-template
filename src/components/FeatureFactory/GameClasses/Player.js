export default class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  addToHand(card) {
    this.hand.push(card);
    return this.hand;
  }

  playCardFromHand(idx) {
    const drawn = this.deck.splice(idx, 1)[0];
    return drawn;
  }
}
