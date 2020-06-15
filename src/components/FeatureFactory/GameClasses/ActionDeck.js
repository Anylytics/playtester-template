import Papa from 'papaparse';
import Deck from '@/utils/deckGenerator';
import ColorTools from '@/utils/colorTools';
import ActionCard from './ActionCard';

const actionCards = `Card,Color,2_player,3_4_player,5_6_player
Finance,red,3,4,5
Expert,orange,2,3,4
Sales,green,3,4,5
Engineering,blue,3,4,5
Operations,purple,3,4,5
Wild Card,black,1,2,3
Financial Training,red,1,1,2
Expert Training,orange,1,1,1
Sales Training,green,1,1,2
Engineering Training,blue,1,1,2
Operations Training,purple,1,1,2
Wild Card Training,black,0,0,1
Hire off the Bench,grey,3,4,6
Contract a Team,grey,3,4,6`;

const actionCardsDeck = Papa.parse(actionCards, { header: true });

function convertPlayerToDeckCode(playerCount) {
  if (playerCount < 3) return '2_player';
  if (playerCount < 5) return '3_4_player';
  return '5_6_player';
}

export default class ActionDeck extends Deck {
  constructor(numPlayers = 2) {
    const cards = [];
    const gameMode = convertPlayerToDeckCode(numPlayers);

    actionCardsDeck.data.forEach((cardDefinition) => {
      const numCards = parseInt(cardDefinition[gameMode], 0);
      const cardColor = ColorTools.getColorByName(cardDefinition.Color);
      const cardName = cardDefinition.Card;
      new Array(numCards).fill(0).forEach(() => {
        const newCard = new ActionCard(cardName, cardDefinition, cardColor);
        cards.push(newCard);
      });
    });
    super(cards);
  }
}
