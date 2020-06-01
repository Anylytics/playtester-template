import Deck from '@/utils/deckGenerator';
import colors from '@/utils/colorTools';
import ActionCard from './ActionCard';

const colorArray = colors.ColorUtility.colors;

const cards = [
  new ActionCard('Finance', '--', colorArray[0]),
  new ActionCard('Expert', '--', colorArray[3]),
  new ActionCard('Sales', '--', colorArray[1]),
  new ActionCard('Engineering', '--', colorArray[2]),
  new ActionCard('Operations', '--', colorArray[4]),
  new ActionCard('Wild', '--', '#34495e'),
  new ActionCard('Finance Training', '--', colorArray[0]),
  new ActionCard('Expert Training', '--', colorArray[3]),
  new ActionCard('Sales Training', '--', colorArray[1]),
  new ActionCard('Engineering Training', '--', colorArray[2]),
  new ActionCard('Operations Training', '--', colorArray[4]),
  new ActionCard('Hire off the bench', '--', colorArray[4]),
  new ActionCard('Contract a team', '--', colorArray[4]),
];

export default class ActionDeck extends Deck {
  constructor() {
    super(new Deck(cards));
  }
}
