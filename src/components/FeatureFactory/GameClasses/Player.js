export default class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  addToHand(card) {
    this.hand.push(card);
    return this.hand;
  }

  playFromHand(idx) {
    const drawn = this.hand.splice(idx, 1)[0];
    return drawn;
  }

  resetHand() {
    this.hand.length = 0;
  }
}
