import {groupsToSections} from './ui';

describe('UI utility functions', () => {
  describe('groupsToSections', () => {
    it('translates a general groups data structure to RN SectionList format', () => {
      const groups = [
        {name: 'Today', todos: [1, 2]},
        {name: 'Tomorrow', todos: [3, 4]},
      ];
      const sections = [
        {title: 'Today', data: [1, 2]},
        {title: 'Tomorrow', data: [3, 4]},
      ];

      expect(groupsToSections(groups)).toEqual(sections);
    });
  });
});
