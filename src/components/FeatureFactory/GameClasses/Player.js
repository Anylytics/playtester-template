export default class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.reserve = [];
    this.playerplan = Math.floor(Math.random() * 6);

    const seats = [...'abcdefghijklmnop'];

    this.officeplan = seats.reduce((output, idx) => {
      /* eslint-disable-next-line */
      output[idx] = null;
      return output;
    }, {});
  }

  reHydrate(data) {
    this.name = data.name;
    this.hand = data.hand;
    this.reserve = data.reserve;
    this.officeplan = data.officeplan;
    this.playerplan = data.playerplan;
  }

  setPlan(idx, color) {
    this.officeplan[idx] = color;
  }

  addToHand(card) {
    this.hand.push(card);
    return this.hand;
  }

  playFromHand(idx) {
    const drawn = this.hand.splice(idx, 1)[0];
    return drawn;
  }

  playFromReserve(idx) {
    return this.reserve.splice(idx, 1)[0];
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
