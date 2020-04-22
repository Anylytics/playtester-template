/* eslint-disable no-mixed-operators, import/prefer-default-export */

export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function genRandomUserName() {
  const adj = [
    'Guilty',
    'Rotten',
    'Supercool',
    'Bearded',
    'Filthy',
    'Stubborn',
  ];
  const nouns = [
    'Spark',
    'Apple',
    'Potato',
    'Dragon',
    'Kitty',
    'Brethren',
    'Fungus',
  ];

  const randAdj = adj[Math.floor(Math.random() * adj.length)];
  const randNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return randAdj + randNoun;
}
