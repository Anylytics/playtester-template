export default class Day {
  constructor(dayNum) {
    this.dayNum = dayNum;
    this.isCurrent = false;
  }

  reHydrate(data) {
    this.dayNum = data.dayNum;
    this.isCurrent = data.isCurrent;
  }

  setCurrent() {
    this.isCurrent = true;
  }

  unsetCurrent() {
    this.isCurrent = false;
  }
}
