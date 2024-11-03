import {addDays, format, formatRelative, startOfDay} from 'date-fns';
import {enUS} from 'date-fns/locale';

function getDateObject(dateObjectOrString) {
  if (typeof dateObjectOrString === 'string') {
    return new Date(dateObjectOrString);
  } else {
    return dateObjectOrString;
  }
}

export function relativeDatetime(dateObjectOrString, {now = new Date()} = {}) {
  if (!dateObjectOrString) {
    return dateObjectOrString;
  }

  const date = getDateObject(dateObjectOrString);
  return formatRelative(date, now);
}

// @see https://github.com/date-fns/date-fns/issues/1218
const formatRelativeLocaleWithoutTime = {
  lastWeek: "'last' eeee",
  yesterday: "'yesterday'",
  today: "'today'",
  tomorrow: "'tomorrow'",
  nextWeek: 'eeee',
  other: 'MM/dd/yyyy',
};

const locale = {
  ...enUS,
  formatRelative: token => formatRelativeLocaleWithoutTime[token],
};

export function relativeDate(dateObjectOrString, {now = new Date()} = {}) {
  if (!dateObjectOrString) {
    return dateObjectOrString;
  }

  const date = getDateObject(dateObjectOrString);

  return formatRelative(date, now, {locale});
}

export function deferDate({start, days, now = new Date()}) {
  let startToUse;
  if (!start) {
    startToUse = now;
  } else {
    const startDate = getDateObject(start);
    if (startDate < now) {
      // no future defer date: defer 1 day from now
      startToUse = now;
    } else {
      // already future: defer one additional day
      startToUse = startDate;
    }
  }

  return startOfDay(addDays(startToUse, days));
}

export function dayOfWeek(dateObjectOrString) {
  const date = getDateObject(dateObjectOrString);
  return format(date, 'EEEE');
}
