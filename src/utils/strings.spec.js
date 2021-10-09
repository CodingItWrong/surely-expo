import {capitalize} from './strings';

describe('strings', () => {
  describe('capitalize', () => {
    it('capitalizes the first letter', () => {
      const original = 'aBcDe';
      expect(capitalize(original)).toEqual('ABcDe');
    });

    it('returns non-strings unchanged', () => {
      const original = 27;
      expect(capitalize(original)).toEqual(original);
    });

    it('returns empty strings unchanged', () => {
      expect(capitalize('')).toEqual('');
    });
  });
});
