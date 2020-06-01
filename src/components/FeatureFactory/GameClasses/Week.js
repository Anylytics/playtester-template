export default class Week {
  constructor(weekNum) {
    this.weekNum = weekNum;
    this.specialEvents = [];
    this.isCurrent = false;
  }

  setCurrent() {
    this.isCurrent = true;
  }

  unsetCurrent() {
    this.isCurrent = false;
  }
}
