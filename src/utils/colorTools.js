const colorMap = {
  0: '#c23616',
  1: '#44bd32',
  2: '#0097e6',
  3: '#fa983a',
  4: '#8c7ae6',
};
const flatWhite = '#ecf0f1';

function genNextIndex(id, arr) {
  const maxIdx = arr ? arr.length - 1 : 4;
  let idx = parseInt(id, 2);
  idx += 1;
  if (idx > maxIdx) return -1;
  return idx;
}

function rotateColor(currentColor) {
  // if (!currentColor) return colorMap[0];
  Object.keys(colorMap).forEach((c) => {
    if (colorMap[c] === currentColor) {
      const returnColor = colorMap[genNextIndex(c)] || flatWhite;
      console.log(
        'found something',
        c,
        genNextIndex(c),
        colorMap[genNextIndex(c)],
      );
      console.log(returnColor);
      return returnColor;
    }
    return flatWhite;
  });
  return colorMap[0];
}

function colorToId(color) {
  Object.keys(colorMap).forEach((c) => {
    if (colorMap[c] === color) {
      return c || -1;
    }
    return -1;
  });
}

const idMap = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
};

const nameMap = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
};

function getIdToName() {
  return idMap;
}
function getNameToId() {
  return nameMap;
}
function getColorMap() {
  return colorMap;
}

const ColorUtility = {
  colors: ['#c23616', '#44bd32', '#0097e6', '#fa983a', '#8c7ae6'],
  emptyColor: '#ecf0f1',
  getNextColor(incomingColor) {
    if (!incomingColor) return this.colors[0];
    const maxIdx = this.colors.length - 1;
    const currentIdx = this.colors.indexOf(incomingColor);
    const returnIdx = currentIdx > maxIdx ? 0 : currentIdx + 1;
    return this.colors[returnIdx];
  },
};

export default {
  rotateColor,
  getIdToName,
  colorToId,
  getNameToId,
  getColorMap,
  genNextIndex,
  flatWhite,
  ColorUtility,
};
