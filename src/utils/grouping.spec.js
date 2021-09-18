import {groupByCategory} from './grouping';

describe('grouping', () => {
  describe('groupByCategory', () => {
    it('creates groups with the category name', () => {
      const todo1 = {
        id: 't1',
        type: 'todos',
        attributes: {name: 'Todo 1'},
        relationships: {
          category: {data: null},
        },
      };
      const todo2 = {
        id: 't2',
        type: 'todos',
        attributes: {name: 'Todo 2'},
        relationships: {
          category: {
            data: {id: 'c1', type: 'categories'},
          },
        },
      };
      const todo3 = {
        id: 't3',
        type: 'todos',
        attributes: {name: 'Todo 3'},
        relationships: {
          category: {
            data: {id: 'c2', type: 'categories'},
          },
        },
      };
      const todo4 = {
        id: 't4',
        type: 'todos',
        attributes: {name: 'Todo 4'},
        relationships: {
          category: {
            data: {id: 'c1', type: 'categories'},
          },
        },
      };
      const category1 = {
        id: 'c1',
        type: 'categories',
        attributes: {
          name: 'Category 1',
          'sort-order': 1,
        },
      };
      const category2 = {
        id: 'c2',
        type: 'categories',
        attributes: {
          name: 'Category 2',
          'sort-order': 2,
        },
      };

      const input = {
        data: [todo1, todo3, todo4, todo2],
        included: [category2, category1],
      };
      const expectedOutput = [
        {
          name: 'No Category',
          todos: [todo1],
        },
        {
          name: 'Category 1',
          todos: [todo2, todo4],
        },
        {
          name: 'Category 2',
          todos: [todo3],
        },
      ];

      expect(groupByCategory(input)).toEqual(expectedOutput);
    });
  });
});
