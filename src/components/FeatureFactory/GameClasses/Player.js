export default class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.reserve = [];
  }

  reHydrate(data) {
    this.name = data.name;
    this.hand = data.hand;
    this.reserve = data.reserve;
  }

  addToHand(card) {
    this.hand.push(card);
    return this.hand;
  }

  playFromHand(idx) {
    const drawn = this.hand.splice(idx, 1)[0];
    return drawn;
  }

  reserveToHand(card) {
    this.reserve.push(card);
  }

  resetHand() {
    this.hand.length = 0;
    this.reserve.length = 0;
  }

  toString() {
    return JSON.stringify({
      name: this.name,
      hand: this.hand,
    });
  }
}
