"use strict";

var _dateUtils = require("./dateUtils");

test('gridCounts contains the right data for October 2021', () => {
  const gridCount = (0, _dateUtils.getGridCountForDate)((0, _dateUtils.addMonths)(new Date(2018, 10 - 1, 1), 12 * 3));
  expect(gridCount).toBe(6);
});
//# sourceMappingURL=dateUtils.test.js.map