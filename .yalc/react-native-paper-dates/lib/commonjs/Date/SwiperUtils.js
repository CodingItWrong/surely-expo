"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useYearChange = useYearChange;

var _utils = require("../utils");

var React = _interopRequireWildcard(require("react"));

var _dateUtils = require("./dateUtils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useYearChange(onChange, _ref) {
  let {
    selectedYear,
    currentIndexRef
  } = _ref;
  const onChangeRef = (0, _utils.useLatest)(onChange);
  React.useEffect(() => {
    if (selectedYear) {
      const currentIndex = currentIndexRef.current || 0;
      const currentDate = (0, _dateUtils.addMonths)(new Date(), (0, _dateUtils.getRealIndex)(currentIndex));
      currentDate.setFullYear(selectedYear);
      const today = new Date();
      const months = (0, _dateUtils.differenceInMonths)(today, currentDate);
      const newIndex = _dateUtils.startAtIndex + months;

      if (currentIndex !== newIndex) {
        onChangeRef.current(newIndex);
      }
    }
  }, [currentIndexRef, onChangeRef, selectedYear]);
}
//# sourceMappingURL=SwiperUtils.js.map