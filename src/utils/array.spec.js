import {
  arrayWithItemMovedDownward,
  arrayWithItemMovedUpward,
  elementsWithIndex,
} from './array';

describe('array', () => {
  describe('arrayWithItemMovedDownward', () => {
    const item1 = {name: 'Item 1'};
    const item2 = {name: 'Item 2'};
    const item3 = {name: 'Item 3'};
    const item4 = {name: 'Item 4'};

    it('it moves an item at the start downward', () => {
      const array = [item1, item2, item3, item4];
      const result = arrayWithItemMovedDownward(array, item1);
      expect(result).toEqual([item2, item1, item3, item4]);
    });

    it('it moves an item in the middle downward', () => {
      const array = [item1, item2, item3, item4];
      const result = arrayWithItemMovedDownward(array, item2);
      expect(result).toEqual([item1, item3, item2, item4]);
    });

    it('it does not move an item at the end', () => {
      const array = [item1, item2, item3, item4];
      const result = arrayWithItemMovedDownward(array, item4);
      expect(result).toEqual(array);
    });
  });

  describe('arrayWithItemMovedUpward', () => {
    const item1 = {name: 'Item 1'};
    const item2 = {name: 'Item 2'};
    const item3 = {name: 'Item 3'};
    const item4 = {name: 'Item 4'};

    it('it moves an item at the end upward', () => {
      const array = [item1, item2, item3, item4];
      const result = arrayWithItemMovedUpward(array, item4);
      expect(result).toEqual([item1, item2, item4, item3]);
    });

    it('it moves an item in the middle upward', () => {
      const array = [item1, item2, item3, item4];
      const result = arrayWithItemMovedUpward(array, item3);
      expect(result).toEqual([item1, item3, item2, item4]);
    });

    it('it does not move an item at the start', () => {
      const array = [item1, item2, item3, item4];
      const result = arrayWithItemMovedUpward(array, item1);
      expect(result).toEqual(array);
    });
  });

  describe('elementsWithIndex', function () {
    it('it returns pairs of elements and their index', () => {
      const array = ['a', 'b', 'c'];
      const result = elementsWithIndex(array);
      expect(result).toEqual([
        ['a', 0],
        ['b', 1],
        ['c', 2],
      ]);
    });
  });
});
