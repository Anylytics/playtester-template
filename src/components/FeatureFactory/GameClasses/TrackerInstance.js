export default class TrackerInstance {
  constructor() {
    this.isCurrent = false;
  }

  setCurrent() {
    this.isCurrent = true;
  }

  unsetCurrent() {
    this.isCurrent = false;
  }
}
