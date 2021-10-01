export const arrayWithItemMovedDownward = (array, itemToMove) => {
  const indexToMove = array.indexOf(itemToMove);
  if (isLastIndex(array, indexToMove)) {
    return array;
  }

  const indexToSwap = indexToMove + 1;
  const itemToSwap = array[indexToSwap];
  return [
    ...elementsBeforeIndex(array, indexToMove),
    itemToSwap,
    itemToMove,
    ...elementsAfterIndex(array, indexToSwap),
  ];
};

export const arrayWithItemMovedUpward = (array, itemToMove) => {
  const indexToMove = array.indexOf(itemToMove);
  if (isFirstIndex(array, indexToMove)) {
    return array;
  }

  const indexToSwap = indexToMove - 1;
  const itemToSwap = array[indexToSwap];
  return [
    ...elementsBeforeIndex(array, indexToSwap),
    itemToMove,
    itemToSwap,
    ...elementsAfterIndex(array, indexToMove),
  ];
};

const isFirstIndex = (_, index) => index === 0;

const isLastIndex = (array, index) => index === array.length - 1;

const elementsBeforeIndex = (array, index) => array.slice(0, index);

const elementsAfterIndex = (array, index) => array.slice(index + 1);

export const elementsWithIndex = array =>
  array.map((element, index) => [element, index]);
