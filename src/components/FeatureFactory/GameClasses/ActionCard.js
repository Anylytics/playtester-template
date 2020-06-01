import Card from '@/utils/Card';

export default class ActionCard extends Card {
  constructor(name, description, background) {
    super(name);
    this.description = description;
    this.background = background;
  }
}
