import formatRelative from 'date-fns/formatRelative';
import enUS from 'date-fns/locale/en-US';

function getDateObject(dateObjectOrString) {
  if (typeof dateObjectOrString === 'string') {
    return new Date(dateObjectOrString);
  } else {
    return dateObjectOrString;
  }
}

export function relativeDatetime(dateObjectOrString) {
  if (!dateObjectOrString) {
    return dateObjectOrString;
  }

  const date = getDateObject(dateObjectOrString);

  const now = new Date();
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

export function relativeDate(dateObjectOrString) {
  if (!dateObjectOrString) {
    return dateObjectOrString;
  }

  const date = getDateObject(dateObjectOrString);

  const now = new Date();
  return formatRelative(date, now, {locale});
}
