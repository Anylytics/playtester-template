export default class Week {
  constructor(weekNum) {
    this.weekNum = weekNum;
    this.specialEvents = [];
    this.isCurrent = false;
  }

  reHydrate(data) {
    this.weekNum = data.weekNum;
    this.specialEvents = data.specialEvents;
    this.isCurrent = data.isCurrent;
  }

  setCurrent() {
    this.isCurrent = true;
  }

  unsetCurrent() {
    this.isCurrent = false;
  }
}
