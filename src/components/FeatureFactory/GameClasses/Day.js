export default class Day {
  constructor(dayNum) {
    this.dayNum = dayNum;
    this.isCurrent = false;
  }

  setCurrent() {
    this.isCurrent = true;
  }

  unsetCurrent() {
    this.isCurrent = false;
  }
}
