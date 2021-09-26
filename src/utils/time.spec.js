import {dayOfWeek, relativeDate, relativeDatetime} from './time';

describe('time utilities', () => {
  describe('relativeDatetime', () => {
    const now = new Date(2021, 0, 10); // Jan 10

    it('returns null if null is passed in', () => {
      expect(relativeDatetime(null)).toBeNull();
    });

    it('displays today as "today"', () => {
      const date = new Date(2021, 0, 10, 13, 14);
      const result = relativeDatetime(date, {now});

      expect(result).toEqual('today at 1:14 PM');
    });

    it('handles ISO date strings including time zone adjustment', () => {
      const dateString = '2021-01-10T18:14:00.000Z';
      const result = relativeDatetime(dateString, {now});

      expect(result).toEqual('today at 1:14 PM');
    });

    it('displays yesterday as "yesterday"', () => {
      const date = new Date(2021, 0, 9, 13, 14);
      const result = relativeDatetime(date, {now});

      expect(result).toEqual('yesterday at 1:14 PM');
    });

    it('displays tomorrow as "tomorrow"', () => {
      const date = new Date(2021, 0, 11, 13, 14);
      const result = relativeDatetime(date, {now});

      expect(result).toEqual('tomorrow at 1:14 PM');
    });

    it('displays six days ago as day of week', () => {
      const date = new Date(2021, 0, 4, 13, 14);
      const result = relativeDatetime(date, {now});

      expect(result).toEqual('last Monday at 1:14 PM');
    });

    it('displays seven days ago as full date without time', () => {
      const date = new Date(2021, 0, 3, 13, 14);
      const result = relativeDatetime(date, {now});

      expect(result).toEqual('01/03/2021');
    });

    it('displays six days from now as day of week', () => {
      const date = new Date(2021, 0, 16, 13, 14);
      const result = relativeDatetime(date, {now});

      expect(result).toEqual('Saturday at 1:14 PM');
    });

    it('displays seven days from now as full date without time', () => {
      const date = new Date(2021, 0, 17, 13, 14);
      const result = relativeDatetime(date, {now});

      expect(result).toEqual('01/17/2021');
    });
  });

  describe('relativeDate', () => {
    const now = new Date(2021, 0, 10); // Jan 10

    it('returns null if null is passed in', () => {
      expect(relativeDate(null)).toBeNull();
    });

    it('displays today as "today"', () => {
      const date = new Date(2021, 0, 10, 13, 14);
      const result = relativeDate(date, {now});

      expect(result).toEqual('today');
    });

    it('handles ISO date strings including time zone adjustment', () => {
      const dateString = '2021-01-10T18:14:00.000Z';
      const result = relativeDate(dateString, {now});

      expect(result).toEqual('today');
    });

    it('displays yesterday as "yesterday"', () => {
      const date = new Date(2021, 0, 9, 13, 14);
      const result = relativeDate(date, {now});

      expect(result).toEqual('yesterday');
    });

    it('displays tomorrow as "tomorrow"', () => {
      const date = new Date(2021, 0, 11, 13, 14);
      const result = relativeDate(date, {now});

      expect(result).toEqual('tomorrow');
    });

    it('displays six days ago as day of week', () => {
      const date = new Date(2021, 0, 4, 13, 14);
      const result = relativeDate(date, {now});

      expect(result).toEqual('last Monday');
    });

    it('displays seven days ago as full date without time', () => {
      const date = new Date(2021, 0, 3, 13, 14);
      const result = relativeDate(date, {now});

      expect(result).toEqual('01/03/2021');
    });

    it('displays six days from now as day of week', () => {
      const date = new Date(2021, 0, 16, 13, 14);
      const result = relativeDate(date, {now});

      expect(result).toEqual('Saturday');
    });

    it('displays seven days from now as full date without time', () => {
      const date = new Date(2021, 0, 17, 13, 14);
      const result = relativeDate(date, {now});

      expect(result).toEqual('01/17/2021');
    });
  });

  describe('dayOfWeek', () => {
    it('returns one day of the week', () => {
      const date = new Date(2021, 0, 10);
      expect(dayOfWeek(date)).toEqual('Sunday');
    });

    it('returns another day of the week', () => {
      const date = new Date(2021, 0, 11);
      expect(dayOfWeek(date)).toEqual('Monday');
    });

    it('handles ISO strings', () => {
      const dateString = '2021-01-10T18:14:00.000Z';
      expect(dayOfWeek(dateString)).toEqual('Sunday');
    });
  });
});
